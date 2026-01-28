import { useDraggable } from "@dnd-kit/core";

export default function ComponentItem({ item }) {
  const { id, icon: Icon, label } = item;

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
    zIndex: isDragging ? 999 : 'auto'
  };

  return (
    <div ref={setNodeRef} style={{ ...style }} {...listeners} {...attributes} className="grid-item">
      <Icon size={22} />
      <span>{label}</span>
    </div>
  );
}
