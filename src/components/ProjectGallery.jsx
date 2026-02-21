import { useState } from "react";
import { featuredWorks } from "../data/proyectData";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useTranslations } from "../i18n/utils";

const categories = ["All", "Web", "Android", "UI/UX", "Bot"];
const categoryMap = {
  Web: ["portfolio", "ecoParaisoLodge", "restaurantMenu"],
  Android: ["cebuTech"],
  "UI/UX": ["figmaDesign"],
  Bot: ["nexaryBot"],
};

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
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto" id="portfolio">
      {/* Título */}
      <h2
        className="text-3xl font-bold mb-6 text-center"
        style={{ color: "var(--text-primary)" }}
      >
        {t("project.title")}
      </h2>

      {/* Filtros de categoría */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setCurrentPage(1);
            }}
            style={{
              padding: "6px 18px",
              borderRadius: "999px",
              fontWeight: 600,
              fontSize: "0.875rem",
              cursor: "pointer",
              transition: "all 0.25s ease",
              background: activeCategory === cat ? "var(--accent-primary)" : "transparent",
              color: activeCategory === cat ? "#ffffff" : "var(--text-primary)",
              border: `2px solid ${activeCategory === cat ? "var(--accent-primary)" : "var(--border-secondary)"}`,
            }}
            onMouseEnter={(e) => {
              if (activeCategory !== cat) {
                e.currentTarget.style.background = "var(--accent-primary)";
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.borderColor = "var(--accent-primary)";
              }
            }}
            onMouseLeave={(e) => {
              if (activeCategory !== cat) {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--text-primary)";
                e.currentTarget.style.borderColor = "var(--border-secondary)";
              }
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de proyectos */}
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
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-primary)",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-md)",
                  display: "flex",
                  flexDirection: "column",
                  transition: "box-shadow 0.3s ease, transform 0.3s ease",
                }}
                whileHover={{ y: -4 }}
              >
                {/* Imagen con banda de accent arriba */}
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      height: "3px",
                      background: "var(--accent-primary)",
                    }}
                  />
                  <img
                    src={project.img}
                    alt={title}
                    style={{ width: "100%", height: "180px", objectFit: "cover", display: "block" }}
                  />
                </div>

                {/* Contenido */}
                <div style={{ padding: "16px", display: "flex", flexDirection: "column", flex: 1 }}>
                  {/* Título */}
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      marginBottom: "8px",
                      color: "var(--text-primary)",
                    }}
                  >
                    {title}
                  </h3>

                  {/* Descripción */}
                  <motion.div
                    layout
                    style={{
                      fontSize: "0.85rem",
                      lineHeight: 1.6,
                      color: "var(--text-secondary)",
                      marginBottom: "12px",
                      flex: 1,
                    }}
                  >
                    {displayedDescription}
                    {shouldTruncate && (
                      <button
                        onClick={() => toggleExpand(key)}
                        style={{
                          marginLeft: "4px",
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          color: "var(--accent-primary)",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                        }}
                      >
                        {isExpanded ? t("project.btn.showless") : t("project.btn.readmore")}
                      </button>
                    )}
                  </motion.div>

                  {/* Íconos de tecnologías */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
                    {project.technologies?.map((tech, idx) => (
                      <tech.icon
                        key={idx}
                        className={`text-xl ${tech.hoverBg} transition-transform hover:scale-125 cursor-pointer`}
                        style={{ color: "var(--text-muted)" }}
                        title={tech.name}
                      />
                    ))}
                  </div>

                  {/* Botones */}
                  <div style={{ display: "flex", gap: "8px", marginTop: "auto" }}>
                    {project.githubLink && project.githubLink !== "#" && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          background: "var(--bg-tertiary)",
                          color: "var(--text-primary)",
                          border: "1.5px solid var(--border-secondary)",
                          textDecoration: "none",
                          transition: "all 0.25s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "var(--accent-primary)";
                          e.currentTarget.style.color = "#ffffff";
                          e.currentTarget.style.borderColor = "var(--accent-primary)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "var(--bg-tertiary)";
                          e.currentTarget.style.color = "var(--text-primary)";
                          e.currentTarget.style.borderColor = "var(--border-secondary)";
                        }}
                      >
                        <FaGithub style={{ fontSize: "1rem" }} />
                        {t("project.btn.github")}
                      </a>
                    )}
                    {(project.isProduction ? project.productionUrl : project.previewLink) && (
                      <a
                        href={project.isProduction ? project.productionUrl : project.previewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          background: "var(--accent-primary)",
                          color: "#ffffff",
                          border: "1.5px solid var(--accent-primary)",
                          textDecoration: "none",
                          transition: "all 0.25s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = "0.85";
                          e.currentTarget.style.transform = "scale(1.03)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = "1";
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      >
                        <FaExternalLinkAlt style={{ fontSize: "0.9rem" }} />
                        {t("project.btn.demo")}
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "40px", gap: "8px", flexWrap: "wrap" }}>
          {/* Anterior */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: "8px 18px",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "0.875rem",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              background: currentPage === 1 ? "var(--bg-tertiary)" : "var(--accent-primary)",
              color: currentPage === 1 ? "var(--text-muted)" : "#ffffff",
              border: `1.5px solid ${currentPage === 1 ? "var(--border-primary)" : "var(--accent-primary)"}`,
              opacity: currentPage === 1 ? 0.5 : 1,
              transition: "all 0.25s ease",
            }}
          >
            {t("project.btn.prev")}
          </button>

          {/* Números de página */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => handlePageChange(num)}
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "0.875rem",
                cursor: "pointer",
                background: currentPage === num ? "var(--accent-primary)" : "var(--bg-tertiary)",
                color: currentPage === num ? "#ffffff" : "var(--text-primary)",
                border: `1.5px solid ${currentPage === num ? "var(--accent-primary)" : "var(--border-secondary)"}`,
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                if (currentPage !== num) {
                  e.currentTarget.style.borderColor = "var(--accent-primary)";
                  e.currentTarget.style.color = "var(--accent-primary)";
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== num) {
                  e.currentTarget.style.borderColor = "var(--border-secondary)";
                  e.currentTarget.style.color = "var(--text-primary)";
                }
              }}
            >
              {num}
            </button>
          ))}

          {/* Siguiente */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: "8px 18px",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "0.875rem",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              background: currentPage === totalPages ? "var(--bg-tertiary)" : "var(--accent-primary)",
              color: currentPage === totalPages ? "var(--text-muted)" : "#ffffff",
              border: `1.5px solid ${currentPage === totalPages ? "var(--border-primary)" : "var(--accent-primary)"}`,
              opacity: currentPage === totalPages ? 0.5 : 1,
              transition: "all 0.25s ease",
            }}
          >
            {t("project.btn.next")}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;
