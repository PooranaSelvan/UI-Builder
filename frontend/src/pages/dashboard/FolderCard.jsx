import React, { useEffect, useRef } from "react";
import {
  Folder,
  MoreVertical,
  ChevronRight,
  Pencil,
  Copy,
  Trash2
} from "lucide-react";

const FolderCard = ({
  app,
  index,
  activeMenu,
  setActiveMenu,
  setSelectedApp,
  handleDeleteProject
}) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div
      className="folder-card"
      onClick={() => setSelectedApp(app)}
    >
      <div className="card-top">
        <div className="folder-icon folder-color">
          <Folder size={26} />
        </div>

        <div
          className="menu-wrapper"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical
            size={18}
            className="three-dots"
            onClick={() =>
              setActiveMenu(activeMenu === index ? null : index)
            }
          />

          {activeMenu === index && (
            <div className="dropdown-menu" ref={menuRef}>
              <div className="menu-item">
                <Pencil size={16} />
                Rename
              </div>
              <div className="menu-divider" />
              <button className="menu-item delete" style={{ width: "100%", backgroundColor: "transparent" }} onClick={(e) => { e.stopPropagation(); handleDeleteProject(app.id) }}>
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <h3>{app.name}</h3>
      <p className="desc">{app.desc}</p>

      <div className="card-footer">
        <span>{app.pages.length} pages</span>
        <ChevronRight size={22} />
      </div>
    </div>
  );
};

export default FolderCard;
