import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";

import LeftPanel from "../workspace/LeftSideBar/LeftPanel";
import Canvas from "../workspace/Canvas/Canvas";
import RightSideBar from "../workspace/RightSideBar/RightSideBar";

import { basicComponents } from "../workspace/utils/basicComponentsData";

const ComponentEditor = () => {
  const [components, setComponents] = useState([]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const isFromSidebar = !!active.data.current?.component;

    // Drop into canvas
    if (isFromSidebar && over.id === "canvas") {
      const componentData = active.data.current.component;
      setComponents((prev) => [
        ...prev,
        { ...componentData, id: `${componentData.id}-${uuidv4()}` }
      ]);
      return;
    }

    // Add as child
    if (isFromSidebar && over.id !== "canvas") {
      const componentData = active.data.current.component;
      if (componentData.rank < over.data.current.rank) return;

      const newChild = {
        ...componentData,
        id: `${componentData.id}-${uuidv4()}`,
        children: []
      };

      setComponents((prev) => addChild(prev, over.id, newChild));
      return;
    }

    // Reorder
    setComponents((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const addChild = (items, parentId, child) =>
    items.map((item) => {
      if (item.id === parentId) {
        return { ...item, children: [...(item.children || []), child] };
      }
      if (item.children?.length) {
        return { ...item, children: addChild(item.children, parentId, child) };
      }
      return item;
    });

  const saveComponent = () => {
    const saved = JSON.parse(localStorage.getItem("customComponents")) || [];
    saved.push({
      id: uuidv4(),
      name: `CustomComponent-${saved.length + 1}`,
      tree: components
    });
    localStorage.setItem("customComponents", JSON.stringify(saved));
    alert("Custom Component Saved!");
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", height: "93vh" }}>
      <LeftPanel components={basicComponents} />
        <Canvas components={components} />
        <RightSideBar />
      </div>

      <button
        style={{ position: "fixed", bottom: 20, right: 20 ,backgroundColor:"red"}}
        onClick={saveComponent}
      >
        Save Component
      </button>

    </DndContext>
  );
};

export default ComponentEditor;
