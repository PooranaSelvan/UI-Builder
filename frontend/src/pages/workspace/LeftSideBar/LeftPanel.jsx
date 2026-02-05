import "./LeftPanel.css";
import ComponentItem from "./ComponentItem";
import { Search, Plus } from "lucide-react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function LeftPanel({ components }) {
  const location = useLocation();
  const isComponentEditor = location.pathname === "/component-editor";
  const [widthPercent, setWidthPercent] = useState(16);
  const isResizing = useRef(false);
  const navigate = useNavigate();

  const handlePointerDown = (e) => {
    isResizing.current = true;
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isResizing.current) return;
    const screenWidth = window.innerWidth;
    let newPercent = (e.clientX / screenWidth) * 100;
    newPercent = Math.min(16, Math.max(12, newPercent));
    setWidthPercent(newPercent);
  };           

  const handlePointerUp = (e) => {
    isResizing.current = false;
    e.target.releasePointerCapture(e.pointerId);
  };

  return (
    <>
      <aside className="left-panel" style={{ width: `${widthPercent}%` }}>
        {/* RESIZE */}
        <div
          className="resize-handle"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}/>

        {/* TABS */}
        <div className="panel-tabs">
          <button className="tab active">Components</button>
          <button className="tab" disabled>Layers</button>
        </div>
        <br />

        {/* SEARCH */}
        <div className="search-box">
          <Search size={16} />
          <input placeholder="Search components..." />
        </div>

          {/* PLUS ICON TO NAVIGATE */}
          {!isComponentEditor && (
          <button
            className="add-component-btn"
            onClick={() => navigate("/component-editor")}
            title="Open Component Editor">
            <Plus size={18} />
          </button>
        )}

        {/* COMPONENT LIST */}
        {components.map((section) => (
          <div key={section.title} className="panel-section">
            <p className="section-heading">{section.title}</p>

            <div className="grid">
              {section.items.map((item) => (
                <ComponentItem key={item.id} item={item}    />
              ))}
            </div>
          </div>
        ))}
   
      </aside>
    </>
  );
}
