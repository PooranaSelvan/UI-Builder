import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import LeftPanel from "./LeftSideBar/LeftPanel";
import Canvas from "./Canvas/Canvas";
import { v4 as uuidv4 } from "uuid";

const Workspace = () => {
  const [components, setComponents] = useState([]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    // active - current dragging
    // over - dropped

    if (!over) return;
    const isFromSidebar = !!active.data.current?.component; // to check whether from sidebar or sortable

    if (isFromSidebar && over.id === "canvas") {
      const componentData = active.data.current.component;

      setComponents((prev) => [
        ...prev,
        {
          ...componentData,
          id: `${componentData.id}-${uuidv4()}`,
        },
      ]);


      return;
    }

    setComponents((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id); // where dragged from
      const newIndex = items.findIndex((i) => i.id === over.id); // where it putted

      if (oldIndex === -1 || newIndex === -1) return items;

      return arrayMove(items, oldIndex, newIndex); // immutable aa re-order pannum
    });

  };


  console.log(components);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", height: "93vh" }}>
        <LeftPanel />
        <Canvas components={components} />
      </div>
    </DndContext>
  );
};

export default Workspace;
