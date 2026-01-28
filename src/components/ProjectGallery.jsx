import { useState } from "react";
import { featuredWorks } from "../data/proyectData";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaRocket } from "react-icons/fa";

const categories = ["All", "Web", "Android", "UI/UX", "Bot"];
const categoryMap = {
  Web: ["portfolio", "ecoParaisoLodge", "restaurantMenu"],
  Android: ["cebuTech"],
  "UI/UX": ["figmaDesign"],
  Bot: ["nexaryBot"],
};

import { useTranslations } from "../i18n/utils";

const ProjectGallery = ({ lang = "es" }) => {
  const t = useTranslations(lang);
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedCards, setExpandedCards] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const toggleExpand = (key) => {
    setExpandedCards((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const filteredProjects = Object.entries(featuredWorks).filter(([key]) => {
    if (activeCategory === "All") return true;
    return categoryMap[activeCategory]?.includes(key);
  });
  const PROJECTS_PER_PAGE = 6;
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const currentProjects = filteredProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);
  const MAX_DESC_LENGTH = 100;
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <div className="p-6 max-w-6xl mx-auto" id="portfolio">
      <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: 'var(--text-primary)' }}>{t('project.title')}</h2>
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setCurrentPage(1);
            }}
            // Aqui son los botones de las categoria cambiar al cambiar modo light las letras se vuelvan blancas
            className={`px-4 py-2 rounded-full font-semibold border transition-all duration-300 cursor-pointer ${activeCategory === cat
              ? "bg-theme-magenta-blue text-white border-theme-magenta-blue"
              : "text-theme-secondary hover:bg-theme-magenta-blue hover:text-white"
              }`}
            style={{ borderColor: activeCategory === cat ? 'var(--accent-primary)' : 'var(--border-secondary)' }}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {currentProjects.map(([key, project]) => {
            const isExpanded = expandedCards[key];
            const title = t(`project.${key}.title`) || project.title;
            const description = t(`project.${key}.desc`) || project.description;
            const shouldTruncate = description.length > MAX_DESC_LENGTH;
            const displayedDescription = isExpanded
              ? description
              : shouldTruncate
                ? description.slice(0, MAX_DESC_LENGTH) + "..."
                : description;
            return (
              // Aqui deno cambiar el bg-theme-magenta-blue de forma dinamica al cambiar el modo light y las letras de forma dinamica al cambiar el modo light
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-theme-magenta-blue rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 flex flex-col"
              >
                <img src={project.img} alt={title} className="w-full h-48 object-cover" />
                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl text-white font-bold">{title}</h3>
                    {project.isProduction && (
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 border border-green-500/50">
                        <FaRocket className="text-green-400 text-xs" />
                        <span className="text-green-400 text-xs font-semibold">LIVE</span>
                      </div>
                    )}
                  </div>
                  <motion.div layout className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                    {displayedDescription}
                    {shouldTruncate && (
                      <button
                        onClick={() => toggleExpand(key)}
                        className="ml-1 text-green-300 text-xs cursor-pointer"
                      >
                        {isExpanded ? t('project.btn.showless') : t('project.btn.readmore')}
                      </button>
                    )}
                  </motion.div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies?.map((tech, idx) => (
                      <tech.icon
                        key={idx}
                        className={`text-xl text-white ${tech.hoverBg} transition-transform hover:scale-125 cursor-pointer`}
                        title={tech.name}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between gap-2 mt-auto">
                    {project.githubLink && project.githubLink !== "#" && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 mt-4 px-4 py-2 rounded-lg transition-all duration-300 text-sm font-semibold hover:scale-105 hover:shadow-lg flex-1"
                        style={{
                          background: "var(--bg-secondary)",
                          color: "var(--text-primary)",
                          border: "2px solid var(--border-secondary)"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "var(--accent-primary)";
                          e.currentTarget.style.color = "#ffffff";
                          e.currentTarget.style.borderColor = "var(--accent-primary)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "var(--bg-secondary)";
                          e.currentTarget.style.color = "var(--text-primary)";
                          e.currentTarget.style.borderColor = "var(--border-secondary)";
                        }}
                      >
                        <FaGithub className="text-xl" />
                        {t('project.btn.github')}
                      </a>
                    )}
                    {(project.isProduction ? project.productionUrl : project.previewLink) && (
                      <a
                        href={project.isProduction ? project.productionUrl : project.previewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 mt-4 px-4 py-2 rounded-lg transition-all duration-300 text-sm font-semibold hover:scale-105 hover:shadow-lg flex-1"
                        style={{
                          background: "var(--accent-primary)",
                          color: "#ffffff",
                          border: "2px solid var(--accent-primary)"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "var(--gradient-primary)";
                          e.currentTarget.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "var(--accent-primary)";
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      >
                        <FaExternalLinkAlt className="text-xl" />
                        {t('project.btn.demo')}
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 gap-2 flex-wrap">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg text-white font-semibold ${currentPage === 1
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-theme-magenta-blue hover:bg-purple-700 cursor-pointer"
              } transition-all`}
          >
            {t('project.btn.prev')}
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => handlePageChange(num)}
              className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${currentPage === num
                ? "bg-white text-theme-magenta-blue"
                : "bg-theme-magenta-blue text-white hover:bg-purple-700"
                }`}
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg text-white font-semibold cursor-pointer ${currentPage === totalPages
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-theme-magenta-blue hover:bg-purple-700"
              } transition-all`}
          >
            {t('project.btn.next')}
          </button>
        </div>
      )}
    </div>
  );
};
export default ProjectGallery;
