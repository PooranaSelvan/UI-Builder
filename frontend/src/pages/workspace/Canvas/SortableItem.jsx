import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import "./work-canvas.css";
import { useDroppable } from "@dnd-kit/core";
import { VOID_TAGS } from "../utils/voidTags";

const SortableItem = ({ ele }) => {
     const { id, tag, content, defaultProps, children, rank } = ele;
     const { setNodeRef, attributes, listeners, transform, transition } = useSortable({ id });
     const isVoid = typeof tag === "string" && VOID_TAGS.has(tag);

     // console.log(listeners, defaultProps, attributes);

     const { setNodeRef: setDropRef, isOver } = useDroppable({
          id: id,
          data: {
               rank,
               type: "component",
          },
          disabled: isVoid
     });

     const style = {
          transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
          transition,
          border: isOver ? "5px solid deepskyblue" : "none",
          marginBottom: 10
     };

     return (
          <div ref={(node) => { setNodeRef(node); setDropRef(node); }} style={style} {...attributes} {...listeners}>
               {isVoid ? (
                    React.createElement(tag, defaultProps)
               ) : (
                    React.createElement(tag, defaultProps, children?.length ? children.map((child) => (<SortableItem key={child.id} ele={child} /> )) : content)
               )}
          </div>
     );
};

export default SortableItem;
