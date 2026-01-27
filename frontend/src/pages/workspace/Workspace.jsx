import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import LeftPanel from "./LeftSideBar/LeftPanel";
import Canvas from "./Canvas/Canvas";
import {v4 as uuidv4 } from "uuid";

const Workspace = () => {
  const [components, setComponents] = useState([]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (over.id === "canvas") {
      const componentData = active.data.current.component;

      setComponents((prev) => [
        ...prev,
        {
          ...componentData, 
          id: `${componentData.id}-${uuidv4()}`,
        },
      ]);
    }
  };


  console.log(components);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", height : "93vh"}}>
        <LeftPanel />
        <Canvas components={components} />
      </div>
    </DndContext>
  );
};

export default Workspace;
