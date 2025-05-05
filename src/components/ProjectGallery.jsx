import { useState } from "react";
import { featuredWorks } from "../data/proyectData";
import { motion, AnimatePresence } from "framer-motion"; 
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"; 

const categories = ["All", "Web", "Android", "UI/UX"];
const categoryMap = {
  Web: ["portfolio", "postifySC", "restaurantMenu", "finnantrack"],
  Android: ["cebuTech"],
  "UI/UX": ["figmaDesign"],
};

const ProjectGallery = () => {
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
      <h2 className="text-3xl text-white font-bold mb-6 text-center">Portfolio Projects</h2>
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full font-semibold border transition-all duration-300 cursor-pointer ${
              activeCategory === cat
                ? "bg-theme-magenta-blue text-white"
                : "border-gray-400 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {currentProjects.map(([key, project]) => {
            const isExpanded = expandedCards[key];
            const shouldTruncate = project.description.length > MAX_DESC_LENGTH;
            const displayedDescription = isExpanded
              ? project.description
              : shouldTruncate
              ? project.description.slice(0, MAX_DESC_LENGTH) + "..."
              : project.description;
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-theme-magenta-blue rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 flex flex-col"
              >
                <img src={project.img} alt={project.title} className="w-full h-48 object-cover" />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-xl text-white font-bold mb-2">{project.title}</h3>
                  <motion.div layout className="text-gray-300 text-sm mb-3">
                    {displayedDescription}
                    {shouldTruncate && (
                      <button
                        onClick={() => toggleExpand(key)}
                        className="ml-1 text-green-300 text-xs cursor-pointer"
                      >
                        {isExpanded ? "Show Less" : "Read More"}
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
                  <div className="flex justify-between mt-auto">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 mt-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm"
                      >
                        <FaGithub className="text-xl" />
                        GitHub
                      </a>
                    )}
                    {project.previewLink && (
                      <a
                        href={project.previewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 mt-4 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                      >
                        <FaExternalLinkAlt className="text-xl" />
                        Demo
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
            className={`px-4 py-2 rounded-lg text-white font-semibold ${
              currentPage === 1
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-theme-magenta-blue hover:bg-purple-700 cursor-pointer"
            } transition-all`}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => handlePageChange(num)}
              className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
                currentPage === num
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
            className={`px-4 py-2 rounded-lg text-white font-semibold cursor-pointer ${
              currentPage === totalPages
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-theme-magenta-blue hover:bg-purple-700"
            } transition-all`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
export default ProjectGallery;
