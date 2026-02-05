import * as LucideIcons from "lucide-react";

export default function IconPicker({ value, onChange }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }}>
      {Object.entries(LucideIcons)
        .filter(([name]) => name[0] === name[0].toUpperCase())
        .slice(0, 1900)
        .map(([name, Icon]) => (
          <div
            key={name}
            onClick={() => onChange(name)}
            style={{
              padding: 6,
              border: value === name ? "2px solid #000" : "1px solid #ddd",
              cursor: "pointer"
            }}>
            <Icon size={18} />
          </div>
        ))}
    </div>
  );
}
