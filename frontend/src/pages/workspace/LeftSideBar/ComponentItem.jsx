import { useDraggable } from "@dnd-kit/core";
import * as LucideIcons from "lucide-react";
import { useState, useEffect } from "react";

export default function ComponentItem({ item, onEditSavedComponent, onRenameComponent, onChangeIcon, onDeleteComponent }) {
  const { id, iconName, icon, label } = item;
  const [menuPos, setMenuPos] = useState(null);

  const Icon = iconName ? LucideIcons[iconName] || LucideIcons.Square : icon || LucideIcons.Square;

  const { attributes, listeners, setNodeRef, transform, isDragging } =
  useDraggable({
    id: item.id,
    data: { component: item }, 
  });


  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    cursor: "grab",
    zIndex: isDragging ? 999 : "auto",
    backgroundColor: isDragging ? "#f0f0f0" : "",
  };

  useEffect(() => {
    const handleClick = () => setMenuPos(null);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setMenuPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        onPointerDown={(e) => {
          if (e.button === 2) return;
          listeners.onPointerDown?.(e);
        }}
        className="grid-item"
        onContextMenu={handleContextMenu}
      >
        <Icon size={22} />
        <span>{label}</span>
      </div>

      {menuPos && item.isRootCustom && (
        <div
          className="context-menu"
          style={{ position: "fixed", top: menuPos.y, left: menuPos.x, zIndex: 2000 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div onClick={() => { onEditSavedComponent(item); setMenuPos(null); }}>Edit Component</div>
          <div onClick={() => { onRenameComponent(item); setMenuPos(null); }}>Rename</div>
          <div onClick={() => { onChangeIcon(item); setMenuPos(null); }}>Change Icon</div>
          <div onClick={() => { onDeleteComponent(item); setMenuPos(null); }}>Delete</div>
        </div>
      )}
    </>
  );
}
