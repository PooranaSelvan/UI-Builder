import { useDraggable } from "@dnd-kit/core";
import * as LucideIcons from "lucide-react";
import { useState,useEffect } from "react";

export default function ComponentItem({ item }) {
  const { id, iconName, icon, label } = item;
  const [menuPos, setMenuPos] = useState(null);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setMenuPos({ x: e.clientX, y: e.clientY });
  };
  
  const Icon = iconName ? LucideIcons[iconName] || LucideIcons.Square : icon || LucideIcons.Square;

  // console.log(item); // full tag object uhm irukum

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      data: {
        component: item
      }
    });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    cursor: "grab",
    zIndex: isDragging ? 999 : 'auto',
    backgroundColor : isDragging ? "#f0f0f0" : ""
  };

  useEffect(() => {
    const close = () => setMenuPos(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <>
    <div ref={setNodeRef} style={{...style }} {...listeners} {...attributes} className="grid-item" onContextMenu={handleContextMenu}>
      <Icon size={22} />
      <span>{label}</span>
    </div>
   {menuPos && item.isRootCustom && (
    <div
    className="context-menu"
    style={{
      position: "fixed",
      top: menuPos.y,
      left: menuPos.x,
      zIndex: 1000
    }}>
    <div onClick={() => onEdit(item)}>Edit Component</div>
    <div onClick={() => onRename(item)}>Rename</div>
    <div onClick={() => onChangeIcon(item)}>Change Icon</div>
    <div onClick={() => onDelete(item)}>Delete</div>
  </div>
)}
    </>
  );
}
