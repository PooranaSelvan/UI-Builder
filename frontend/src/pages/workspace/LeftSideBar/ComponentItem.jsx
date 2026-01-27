import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export default function ComponentItem({ id, icon: Icon, label, type }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      data: {
        type,
        component: id
      }
    });

  const style = {
    transform: CSS.Translate.toString(transform),

  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="grid-item"
    >
      <Icon size={20} />
      <span>{label}</span>
    </div>
  );
}
