import "./LeftPanel.css";
import { components } from "../utils/ComponentsData";
import ComponentItem from "./ComponentItem";
import { Search } from "lucide-react";
import { useState, useRef } from "react";

export default function LeftPanel() {
  const [widthPercent, setWidthPercent] = useState(16);
  const isResizing = useRef(false);

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
    <aside className="left-panel" style={{ width: `${widthPercent}%` }}>
      <div
        className="resize-handle"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      />

      <div className="panel-tabs">
        <button className="tab active">Components</button>
        <button className="tab">Layers</button>
      </div>

      <h3 className="panel-title">Components</h3>

      <div className="search-box">
        <Search size={16} />
        <input placeholder="Search components..." />
      </div>

      {components.map((section) => (
        <div key={section.title} className="panel-section">
          <p className="section-heading">{section.title}</p>

          {section.type === "grid" && (
            <div className="grid">
              {section.items.map((item) => (
                <ComponentItem
                  key={item.id}
                  id={item.id}
                  icon={item.icon}
                  label={item.label}
                  tag={item.tag}
                  item={item}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </aside>
  );
}
