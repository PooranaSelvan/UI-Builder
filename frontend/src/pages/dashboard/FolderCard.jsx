import React from "react";
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
  menuRef
}) => {
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
          ref={menuRef}
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
            <div className="dropdown-menu">
              <div className="menu-item">
                <Pencil size={16} />
                Rename
              </div>

              <div className="menu-item">
                <Copy size={16} />
                Duplicate
              </div>

              <div className="menu-divider" />

              <div className="menu-item delete">
                <Trash2 size={16} />
                Delete
              </div>
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
