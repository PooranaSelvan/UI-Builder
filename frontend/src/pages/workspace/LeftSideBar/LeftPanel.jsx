import "./LeftPanel.css";
import { components } from "../utils/ComponentsData";
import ComponentItem from "./ComponentItem";
import { Search } from "lucide-react";

export default function LeftPanel() {
  return (
    <aside className="left-panel">
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
                <ComponentItem key={item.id} id={item.id} icon={item.icon} label={item.label} tag={item.tag} item={item} />
              ))}
            </div>
          )}
        </div>
      ))}
    </aside>
  );
}
