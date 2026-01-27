import React from "react";
import "./work-canvas.css";
import { useDroppable } from "@dnd-kit/core";

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
      <div ref={setNodeRef} className="canvas-drop-zone" style={{ flex: 1, padding: 20, background: isOver ? "#eaf7ff" : "white", border: isOver ? "2px dashed black" : "",}}>
        
        {components.length === 0 && (
          <p style={{ color: "#999" }}>Drag components here</p>
        )}

        {components.map((ele) => (
          <div key={ele.id} style={{ marginBottom: 10 }}>
            {renderComponent(ele)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Canvas;
