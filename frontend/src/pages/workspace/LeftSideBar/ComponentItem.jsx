import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export default function ComponentItem({ item }) {
  const { id, icon: Icon, label } = item;

  // console.log(item); // full tag object uhm irukum

  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id,
      data: {
        component: item
      }
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={{...style, zIndex : 100}} {...listeners} {...attributes} className="grid-item">
      <Icon size={22} />
      <span>{label}</span>
    </div>
  );
}
