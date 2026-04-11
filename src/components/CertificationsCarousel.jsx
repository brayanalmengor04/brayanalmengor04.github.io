import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { ExternalLink, ZoomIn, ChevronLeft, ChevronRight, MoveHorizontal, Maximize2 } from 'lucide-react';
import { certifications } from '../data/certifications';
import { ui } from '../i18n/ui';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function CertificationsCarousel({ lang = 'es' }) {
    const [pdfPreviews, setPdfPreviews] = useState({});
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [showDragHint, setShowDragHint] = useState(true);
    const [themeClass, setThemeClass] = useState(''); // State to sync portal theme
    const swiperRef = useRef(null);
    const t = (key) => ui[lang][key] || key;
    // Smart truncation function with ellipsis
    const truncateTitle = (text, maxLength = 60) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength).trim() + '...';
    };
    // Load PDF preview for a single certificate lazily
    const loadPreview = async (certId, file) => {
        try {
            const pdfjsLib = await import('pdfjs-dist');
            pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
            const pdf = await pdfjsLib.getDocument(file).promise;
            const page = await pdf.getPage(1);
            const viewport = page.getViewport({ scale: 1 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            await page.render({ canvasContext: context, viewport }).promise;
            setPdfPreviews(prev => ({ ...prev, [certId]: canvas.toDataURL('image/jpeg', 0.8) }));
        } catch (err) {
            console.error(`Error loading preview for ${certId}:`, err);
        }
    };

    useEffect(() => {
        // Load initial few previews (first 3 certificates) on mount
        certifications.slice(0, 3).forEach(cert => loadPreview(cert.id, cert.file));
        // Hide drag hint after 3 seconds
        const timer = setTimeout(() => setShowDragHint(false), 3000);

        // SYNC THEME: Observer to copy html classes (dark/light) to portal
        const updateTheme = () => setThemeClass(document.documentElement.className);
        updateTheme();
        const observer = new MutationObserver(updateTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, []);

    const handleInteraction = () => {
        setShowDragHint(false);
    };

    return (
        <>
            <div className="relative">
                {/* Drag Hint */}
                {showDragHint && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none animate-pulse">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
                            <MoveHorizontal className="w-5 h-5 text-white animate-bounce-horizontal" />
                            <span className="text-white text-sm font-medium">Desliza para ver más</span>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <button
                    className="swiper-button-prev-custom absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 shadow-lg"
                    onClick={() => swiperRef.current?.slidePrev()}
                >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                <button
                    className="swiper-button-next-custom absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 shadow-lg"
                    onClick={() => swiperRef.current?.slideNext()}
                >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                <Swiper
                    effect="coverflow"
                    grabCursor
                    centeredSlides
                    slidesPerView="auto"
                    initialSlide={2}
                    coverflowEffect={{
                        rotate: 25,
                        stretch: 0,
                        depth: 350,
                        modifier: 1.2,
                        slideShadows: false,
                    }}
                    pagination={{ clickable: true }}
                    navigation={{
                        prevEl: '.swiper-button-prev-custom',
                        nextEl: '.swiper-button-next-custom',
                    }}
                    modules={[EffectCoverflow, Pagination, Navigation]}
                    className="cert-swiper !overflow-visible py-16 max-w-7xl mx-auto px-4"
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    onSlideChange={(swiper) => {
                        handleInteraction();
                        // Lazy load preview for active slide and its neighbours
                        const activeIndex = swiper.activeIndex;
                        const idsToLoad = [];
                        [activeIndex - 2, activeIndex - 1, activeIndex, activeIndex + 1, activeIndex + 2].forEach(i => {
                            const cert = certifications[i];
                            if (cert && !pdfPreviews[cert.id]) idsToLoad.push(cert);
                        });
                        idsToLoad.forEach(cert => {
                            // Call the same lazy loader defined in useEffect via closure
                            // eslint-disable-next-line no-use-before-define
                            loadPreview(cert.id, cert.file);
                        });
                    }}
                    onTouchStart={handleInteraction}
                >
                    {certifications.map((cert) => (
                        <SwiperSlide key={cert.id} className="!w-[280px] md:!w-[340px] lg:!w-[360px] aspect-[3/4.2]">
                            <div
                                className="relative h-full rounded-2xl overflow-hidden border-2 border-black/5 dark:border-white/10 shadow-2xl transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] cursor-pointer group bg-white dark:bg-gray-900 card"
                                onClick={() => setSelectedPdf(cert)}
                            >
                                {/* PDF Image as Background */}
                                {pdfPreviews[cert.id] ? (
                                    <div className="absolute inset-0">
                                        <img
                                            src={pdfPreviews[cert.id]}
                                            alt=""
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        {/* Enhanced Gradient Overlay - Adapts to Theme */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/50 dark:from-gray-900/95 dark:via-gray-900/50 to-transparent opacity-100 transition-opacity duration-500" />
                                    </div>
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                                        <div className="w-10 h-10 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
                                    </div>
                                )}

                                {/* Logo */}
                                <div className="absolute top-4 right-4 z-10">
                                    <div className="w-14 h-14 rounded-xl bg-white/90 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20 p-2.5 shadow-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                                        <img src={cert.logo} alt="" className="w-full h-full object-contain" />
                                    </div>
                                </div>

                                {/* Zoom Icon on Hover */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center z-10">
                                    <div className="opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500">
                                        <div className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border-2 border-white/40 shadow-2xl">
                                            <Maximize2 className="w-10 h-10 text-white drop-shadow-lg" />
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col justify-end z-20">
                                    <h3
                                        className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight mb-2.5 drop-shadow-sm dark:drop-shadow-lg transition-transform duration-300 group-hover:translate-x-1"
                                        title={t(cert.titleKey)}
                                    >
                                        {truncateTitle(t(cert.titleKey))}
                                    </h3>
                                    <p className="text-gray-700 dark:text-white/85 text-sm md:text-base font-medium mb-4">
                                        {t(cert.orgKey)}
                                    </p>
                                    <div className="flex items-center justify-between gap-3">
                                        <span className="px-4 py-1.5 rounded-full bg-white/15 text-white/95 text-xs md:text-sm font-semibold border border-white/25 backdrop-blur-sm shadow-lg">
                                            {t(cert.dateKey)}
                                        </span>
                                        <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow-xl transform transition-all duration-300 group-hover:rotate-45 group-hover:scale-110">
                                            <ExternalLink size={16} strokeWidth={2.5} />
                                        </div>
                                    </div>
                                </div>

                                {/* Enhanced Hover Border Glow */}
                                <div className={`absolute inset-0 border-2 border-transparent transition-all duration-500 pointer-events-none rounded-2xl ${cert.border || 'group-hover:border-white/60 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]'}`} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Premium Modal Design - Portal to escape AOS transforms */}
            {selectedPdf && typeof document !== 'undefined' && createPortal(
                <div
                    className={`fixed inset-0 z-[99999] flex items-center justify-center p-4 animate-in fade-in duration-500 ${themeClass}`}
                    onClick={() => setSelectedPdf(null)}
                >
                    {/* Animated Background Gradients */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse ${themeClass.includes('light') ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20' : 'bg-gradient-to-br from-blue-400/10 to-purple-400/10'}`} />
                        <div className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 ${themeClass.includes('light') ? 'bg-gradient-to-tr from-pink-500/20 to-orange-500/20' : 'bg-gradient-to-tr from-pink-400/10 to-orange-400/10'}`} />
                        <div className={`absolute inset-0 backdrop-blur-2xl ${themeClass.includes('light') ? 'bg-white/90' : 'bg-black/85'}`} />
                    </div>

                    <div
                        className="relative w-full max-w-7xl h-[92vh] flex flex-col animate-in zoom-in-95 duration-500"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Glassmorphism Header */}
                        <div className={`relative backdrop-blur-2xl p-4 md:p-5 flex items-center gap-3 md:gap-4 border-b shadow-2xl rounded-t-3xl z-50 overflow-hidden ${themeClass.includes('light') ? 'bg-white/95 border-gray-200/50' : 'bg-gray-900/95 border-white/10'}`}>
                            {/* Header Gradient Accent */}
                            <div className={`absolute inset-0 ${themeClass.includes('light') ? 'bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5' : 'bg-gradient-to-r from-blue-400/5 via-purple-400/5 to-pink-400/5'}`} />

                            <button
                                className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border shadow-lg hover:shadow-xl group ${themeClass.includes('light') ? 'bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-900 border-gray-300/50' : 'bg-gradient-to-br from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 text-white border-white/10'}`}
                                onClick={() => setSelectedPdf(null)}
                            >
                                <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
                            </button>

                            <div className={`relative w-12 h-12 rounded-xl p-2.5 border shadow-lg ${themeClass.includes('light') ? 'bg-gradient-to-br from-white to-gray-50 border-gray-300/50' : 'bg-gradient-to-br from-white/10 to-white/5 border-white/15'}`}>
                                <img src={selectedPdf.logo} alt="" className="w-full h-full object-contain" />
                            </div>

                            <div className="relative flex-1 min-w-0">
                                <h3 className={`text-base md:text-lg font-bold truncate bg-clip-text text-transparent ${themeClass.includes('light') ? 'text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700' : 'bg-gradient-to-r from-white to-gray-200 text-white'}`}>{t(selectedPdf.titleKey)}</h3>
                                <p className={`text-xs md:text-sm truncate mt-0.5 ${themeClass.includes('light') ? 'text-gray-600' : 'text-white/70'}`}>{t(selectedPdf.orgKey)}</p>
                            </div>

                        </div>

                        {/* Premium PDF Viewer Container */}
                        <div className={`relative flex-1 backdrop-blur-xl rounded-b-3xl shadow-2xl overflow-hidden border-x border-b ${themeClass.includes('light') ? 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200/50' : 'bg-gradient-to-br from-gray-900/95 to-gray-800/95 border-white/10'}`}>
                            {/* Decorative Corner Accents */}
                            <div className={`absolute top-0 left-0 w-32 h-32 rounded-br-full ${themeClass.includes('light') ? 'bg-gradient-to-br from-blue-500/10 to-transparent' : 'bg-gradient-to-br from-blue-400/5 to-transparent'}`} />
                            <div className={`absolute bottom-0 right-0 w-32 h-32 rounded-tl-full ${themeClass.includes('light') ? 'bg-gradient-to-tl from-purple-500/10 to-transparent' : 'bg-gradient-to-tl from-purple-400/5 to-transparent'}`} />

                            {/* PDF Content */}
                            <div className="absolute inset-0 p-4 md:p-6 flex items-center justify-center">
                                <div className={`w-full h-full rounded-2xl overflow-hidden shadow-2xl ring-1 ${themeClass.includes('light') ? 'ring-black/5 bg-white' : 'ring-white/5 bg-gray-800'}`}>
                                    <iframe
                                        src={`${selectedPdf.file}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                                        className={`w-full h-full ${themeClass.includes('light') ? '' : 'brightness-90 contrast-95'}`}
                                        title="PDF Viewer"
                                        style={{
                                            border: 'none',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            <style>{`
                .cert-swiper .swiper-pagination-bullet {
                    background: white;
                    opacity: 0.4;
                    width: 8px;
                    height: 8px;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .cert-swiper .swiper-pagination-bullet-active {
                    opacity: 1;
                    width: 32px;
                    border-radius: 4px;
                    background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 100%);
                    box-shadow: 0 0 12px rgba(255,255,255,0.6);
                }
                .cert-swiper .swiper-pagination {
                    bottom: 0 !important;
                }
                @keyframes bounce-horizontal {
                    0%, 100% { transform: translateX(-6px); }
                    50% { transform: translateX(6px); }
                }
                .animate-bounce-horizontal {
                    animation: bounce-horizontal 1.5s ease-in-out infinite;
                }
                
                /* Smooth scrolling for iframe */
                iframe {
                    -webkit-overflow-scrolling: touch;
                }
                
                /* Enhanced slide spacing */
                .cert-swiper .swiper-slide {
                    margin: 0 20px;
                }
                
                @media (min-width: 768px) {
                    .cert-swiper .swiper-slide {
                        margin: 0 25px;
                    }
                }
                
                @media (min-width: 1024px) {
                    .cert-swiper .swiper-slide {
                        margin: 0 30px;
                    }
                }
            `}</style>
        </>
    );
}