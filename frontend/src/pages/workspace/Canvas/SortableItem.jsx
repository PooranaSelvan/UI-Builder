import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

const SortableItem = ({ ele }) => {
     const { id, tag, content, defaultProps, children } = ele;
     const { setNodeRef, attributes, listeners, transform, transition, isOver } = useSortable({ id }); 

     console.log(listeners, defaultProps);

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
          <div ref={setNodeRef} style={style} id={id} {...attributes} {...listeners}>
               {renderComponent()}
          </div>
     );
};

export default SortableItem;
