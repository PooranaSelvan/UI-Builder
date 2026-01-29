import React from "react";
import "./work-canvas.css";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

const Canvas = ({ components }) => {
  const { setNodeRef, isOver } = useDroppable({ id: "canvas" });

  return (
    <div className="work-canvas-wrapper">
      <div ref={setNodeRef} className="canvas-drop-zone" style={{ flex: 1, padding: "20px", background: isOver ? "#eaf7ff" : "white", border: isOver ? "2px dashed black" : "", }}>

        {components.length === 0 && (
          <p style={{ color: "#999", textAlign: "center" }}>Drag components here</p>
        )}

        <SortableContext items={components.map((c) => c.id)} strategy={verticalListSortingStrategy}>
          {components.map((ele) => (
            <SortableItem key={ele.id} ele={ele} />
          ))}
        </SortableContext>

        <div id="canvas-end" style={{ height: 80, border: "2px dashed transparent"}}/>
      </div>
    </div>
  );
};

export default Canvas;
