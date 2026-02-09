import "./LeftPanel.css";
import ComponentItem from "./ComponentItem";
import { Search, Plus } from "lucide-react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import { ICONS, getIconByName } from "../utils/icons";

export default function LeftPanel({ components, onAddJsonComponent, onEditSavedComponent, onRenameComponent, onChangeIcon, onDeleteComponent }) {

  const [showJsonModal, setShowJsonModal] = useState(false);
  const [jsonInput, setJsonInput] = useState("");

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

  const handleSaveJsonComponent = () => {
    try {
      const raw = JSON.parse(jsonInput);

      if (!raw.label || !raw.tag || raw.rank === undefined) {
        toast.error("Required fields: label, tag, rank");
        return;
      }

      if (typeof raw.rank !== "number") {
        toast.error("rank must be a number");
        return;
      }

      const parsed = {
        ...raw,
        id: `json-${Date.now()}`,
        icon: getIconByName(raw.icon || "Square"),
        children: Array.isArray(raw.children) ? raw.children : [],
        defaultProps: raw.defaultProps || {},
        isRootCustom: true
      };

      onAddJsonComponent?.(parsed);

      toast.success("Component added successfully!");
      setJsonInput("");
      setShowJsonModal(false);
    } catch {
      toast.error("Invalid JSON format!");
    }
  };



  return (
    <>
      <aside className="left-panel" style={{ width: `${widthPercent}%` }}>
        <div className="left-panel-wrapper">
          {/* RESIZE */}
          <div
            className="resize-handle"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp} />

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
                  <ComponentItem
                    key={item.id}
                    item={item}
                    onEdit={item.isRootCustom ? onEditSavedComponent : undefined}
                    onRename={item.isRootCustom ? onRenameComponent : undefined}
                    onChangeIcon={item.isRootCustom ? onChangeIcon : undefined}
                    onDelete={item.isRootCustom ? onDeleteComponent : undefined}
                  />
                ))}

              </div>
            </div>
          ))}

          {isComponentEditor && (
            <button
              className="add-json-component-btn"
              onClick={() => setShowJsonModal(true)}
              title="Add Component from JSON"
              style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 6 }}
            >
              <Plus size={18} /> Add JSON Component
            </button>
          )}

          {showJsonModal && (
            <div className="json-component-modal">
              {/* MODAL BOX */}
              <div className="json-modal-box">
                <div className="modal-header">
                  <h4>Add Component via JSON</h4>
                  <X
                    size={18}
                    className="modal-cancel-btn"
                    onClick={() => setShowJsonModal(false)}
                  />
                </div>

                <textarea
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder={`Sample JSON:
{
  "id": "my-component",
  "label": "My Component",
  "icon": "Square",
  "tag": "div",
  "rank": 2,
  "defaultProps": { "className": "my-component test-component" },
  "children": []
}`}
                  className="json-textarea"
                />

                <button
                  className="json-save-btn"
                  onClick={handleSaveJsonComponent}
                >
                  Save Component
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
