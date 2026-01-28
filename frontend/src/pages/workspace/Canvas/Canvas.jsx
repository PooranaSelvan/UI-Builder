import React from "react";
import "./work-canvas.css";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

const Canvas = ({ components }) => {
  const { setNodeRef, isOver } = useDroppable({ id: "canvas" });

  const renderComponent = (ele) => {
    const { tag, content, defaultProps, children } = ele;

    const childrenElements = children?.length ? children.map((childEle) => renderComponent(childEle)) : content;

    if (typeof tag === "string") {
      let Tag = tag;
      return <Tag {...defaultProps}>{childrenElements}</Tag>;
    }

    return React.createElement(tag, defaultProps);
  };

  return (
    <div className="work-canvas-wrapper">
      <div ref={setNodeRef} className="canvas-drop-zone" style={{ flex: 1, padding: 20, background: isOver ? "#eaf7ff" : "white", border: isOver ? "2px dashed black" : "", }}>

        {components.length === 0 && (
          <p style={{ color: "#999", textAlign: "center" }}>Drag components here</p>
        )}

        <SortableContext items={components.map((c) => c.id)} strategy={verticalListSortingStrategy}>
          {components.map((ele) => (
            <SortableItem key={ele.id} ele={ele} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default Canvas;
