import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import "./work-canvas.css";
import { useDroppable } from "@dnd-kit/core";

const SortableItem = ({ ele }) => {
     const { id, tag, content, defaultProps, children } = ele;
     const { setNodeRef, attributes, listeners, transform, transition } = useSortable({ id });

     // console.log(listeners, defaultProps, attributes);

     const { setNodeRef: setDropRef, isOver } = useDroppable({
          id: id,
          data: {
               type: "component",
          },
     });

     const style = {
          transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
          transition,
          border: isOver ? "5px solid deepskyblue" : "none",
          marginBottom: 10
     };

     const renderComponent = () => {
          const childrenElements = children?.length ? children.map((child) => child.content) : content;

          if (typeof tag === "string") {
               return React.createElement(tag, defaultProps, childrenElements);
          }

          return React.createElement(tag, defaultProps);
     };

     return (
          <div ref={(node) => { setNodeRef(node); setDropRef(node); }} style={style} {...attributes} {...listeners}>
               {React.createElement(tag, defaultProps, children?.length ? children.map((child) => (
                    <SortableItem key={child.id} ele={child} />
               ))
                    : content
               )}
          </div>
     );
};

export default SortableItem;
