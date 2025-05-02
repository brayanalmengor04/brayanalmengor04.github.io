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

const MAX_DESC_LENGTH = 100;
const ProjectGallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedCards, setExpandedCards] = useState({});
  const toggleExpand = (key) => {
    setExpandedCards((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const filteredProjects = Object.entries(featuredWorks).filter(([key]) => {
    if (activeCategory === "All") return true;
    return categoryMap[activeCategory]?.includes(key);
  });

  return (
    <div className="p-6 max-w-6xl mx-auto " id="portfolio">
      <h2 className="text-3xl text-white font-bold mb-6 text-center">Portfolio Projects</h2>

      {/* Filters */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
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

      {/* Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProjects.map(([key, project]) => {
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
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-xl text-white font-bold mb-2">{project.title}</h3>

                  {/* Description with animation */}
                  <motion.div
                    layout
                    className="text-gray-300 text-sm mb-3"
                    initial={false}
                    animate={{ height: "auto" }}
                  >
                    {displayedDescription}
                    {shouldTruncate && (
                      <button
                        onClick={() => toggleExpand(key)}
                        className="ml-1 text-green-300 text-xs cursor-pointer "
                      >
                        {isExpanded ? "Show Less" : "Read More"}
                      </button>
                    )}
                  </motion.div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies?.map((tech, idx) => (
                      <tech.icon
                        key={idx}
                        className={`text-xl text-white ${tech.hoverBg} transition-transform hover:scale-125 cursor-pointer`}
                        title={tech.name}
                      />
                    ))}
                  </div>

                  {/* Links */}
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
    </div>
  );
};

export default ProjectGallery;
