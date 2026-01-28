import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

const SortableItem = ({ ele }) => {
     const { id, tag, content, defaultProps, children } = ele;
     const { setNodeRef, attributes, listeners, transform, transition, isOver } = useSortable({ id });

     const style = {
          transform: CSS.Transform.toString(transform),
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
          <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
               {renderComponent()}
          </div>
     );
};

export default SortableItem;
