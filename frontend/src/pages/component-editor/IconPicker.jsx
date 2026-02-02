import { ICONS } from "./icons";
import { useComponentContext } from "./ComponentContext";
import "./icon-picker.css";

export default function IconPicker() {
  const { customComponentDraft, setIcon } = useComponentContext();

  return (
    <div className="icon-picker">
      <h4>Select Icon</h4>

      <div className="icon-grid">
        {ICONS.map(([name, Icon]) => (
          <button
            key={name}
            className={`icon-btn ${
              customComponentDraft.iconName === name ? "active" : ""
            }`}
            onClick={() => setIcon(name)}
            title={name}
          >
            <Icon size={20} />
          </button>
        ))}
      </div>
    </div>
  );
}
