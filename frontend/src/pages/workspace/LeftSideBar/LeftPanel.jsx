import "./LeftPanel.css";
import ComponentItem from "./ComponentItem";
import { Search, Plus } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { X, ChevronRight } from "lucide-react";
import { getIconByName } from "../utils/icons";
import { useCustomComponents } from "../../../context/CustomComponentsContext";


export default function LeftPanel({ components, onAddJsonComponent, onEditSavedComponent, onRenameComponent, onChangeIcon, onDeleteComponent }) {
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [jsonInput, setJsonInput] = useState("");
  const location = useLocation();
  const { addCustomComponent } = useCustomComponents();
  const isComponentEditor = location.pathname === "/component-editor";
  const [widthPercent, setWidthPercent] = useState(16);
  const isResizing = useRef(false);
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (components.length > 0) {
      setOpenSections(prev => {
        const newSections = { ...prev };
        components.forEach(section => {
          if (!(section.title in newSections)) {
            newSections[section.title] = true;
          }
        });
        return newSections;
      });
    }
  }, [components]);


  const toggleSection = (title) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  /* ---------------- Resize Logic ---------------- */

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


  /* ---------------- JSON Save ---------------- */
  const handleSaveJsonComponent = async () => {
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
        iconName: raw.icon || "Square",
        children: Array.isArray(raw.children) ? raw.children : [],
        defaultProps: raw.defaultProps || {},
      };
      await addCustomComponent({
        componentName: parsed.label,
        icon: raw.icon || "Square",
        data: JSON.stringify([parsed]),
      });

      toast.success("Component added successfully!");
      setJsonInput("");
      setShowJsonModal(false);

    } catch (err) {
      toast.error("Invalid JSON format!");
    }
  };

  /* ---------------- Search Components ---------------- */
  const filteredSections = components
    .map((section) => {
      const filteredItems = section.items.filter((item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return {
        ...section,
        items: filteredItems,
      };
    })
    .filter((section) => section.items.length > 0);
  const finalSections = filteredSections;

  return (
    <>
      <aside className="left-panel" style={{ width: `${widthPercent}%` }}>
        {/* RESIZE HANDLE */}
        <div
          className="resize-handle"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        />

        <div className="left-panel-scroll">
          {/* TABS */}
          <div className="panel-tabs">
            <button className="tab active">Components</button>
            <button className="tab" disabled>
              Layers
            </button>
          </div>
          <br />

          {/* SEARCH */}
          <div className="search-row">
            <div className="search-box">
              <Search size={16} />
              <input placeholder="Search components..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {!isComponentEditor && (
              <button
                className="add-near-search-btn"
                onClick={() => navigate("/component-editor")}
                title="Open Component Editor"
              >
                <Plus size={18} />
              </button>
            )}
          </div>

          {/* ACCORDION SECTIONS */}
          {finalSections.map((section) => (
            <div key={section.title} className="panel-section">
              {/* HEADER */}
              <div
                className="section-header"
                onClick={() => toggleSection(section.title)}
              >
                <ChevronRight
                  size={16}
                  className={`chevron ${openSections[section.title] || searchTerm ? "open" : ""
                    }`}
                />
                <span>{section.title}</span>
              </div>

              {/* CONTENT */}
              {(searchTerm || openSections[section.title]) && section.items.length > 0 && (
                <div className="grid">
                  {section.items.map((item, index) => {
                    const uniqueId = item.id || item._id || `${section.title}-${index}`;

                    const draggableItem = {
                      ...item,
                      id: uniqueId,
                      children: item.children || [],
                      tag: item.tag || "div",
                      rank: item.rank ?? 1,
                      defaultProps: item.defaultProps || {},
                      isRootCustom: item.isRootCustom || false,
                    };

                    return (
                      <ComponentItem
                        key={uniqueId}
                        item={draggableItem}
                        onEditSavedComponent={onEditSavedComponent}
                        onRenameComponent={onRenameComponent}
                        onChangeIcon={onChangeIcon}
                        onDeleteComponent={onDeleteComponent}
                      />
                    );
                  })}

                </div>
              )}
            </div>
          ))}

          {searchTerm && finalSections.length === 0 && (
            <p className="no-results">No components found</p>
          )}

          {/* ADD JSON BUTTON */}
          {isComponentEditor && (
            <button
              className="add-json-component-btn"
              onClick={() => setShowJsonModal(true)}
            >
              <Plus size={18} /> Add JSON Component
            </button>
          )}
        </div>

        {/* JSON MODAL */}
        {showJsonModal && (
          <div className="json-component-modal">
            <div className="json-modal-box">
              <div className="modal-header">
                <h4>Add Component via JSON</h4>
                <X size={18} onClick={() => setShowJsonModal(false)} />
              </div>

              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="json-textarea"
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
              />

              <button className="json-save-btn" onClick={handleSaveJsonComponent}>
                Save Component
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
