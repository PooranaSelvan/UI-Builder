import { useState } from "react";
import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import LeftPanel from "./LeftSideBar/LeftPanel";
import Canvas from "./Canvas/Canvas";
import { v4 as uuidv4 } from "uuid";
import RightSideBar from "./RightSideBar/RightSideBar";
import { components as componentLibrary } from "./utils/ComponentsData.js";

const Workspace = () => {
  const [components, setComponents] = useState([]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    // active - current dragging
    // over - current dropped


    console.log(active, over);

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


    // Adding Child
    if (isFromSidebar && over.id !== "canvas") {
      let componentData = active.data.current.component;

      if(componentData.rank < over.data.current.rank){
        console.log("Bigger Element!");
        return;
      }

      let newChild = { ...componentData, id: `${componentData.id}-${uuidv4()}`, children: [] };

      setComponents((prev) => addChildToComponent(prev, over.id, newChild));
      return;
    }


    // Moving Inside the Canvas Area
     setComponents((items) => {
      let oldIndex = items.findIndex((i) => i.id === active.id); // where dragged from
      let newIndex = items.findIndex((i) => i.id === over.id); // where it putted

      if (oldIndex === -1 || newIndex === -1) return items;

      return arrayMove(items, oldIndex, newIndex); // immutable aa re-order pannum
    });
  };


  const addChildToComponent = (items, parentId, newChild) => {
    return items.map((item) => {
      if (item.id === parentId) {
        return { ...item, children: [...(item.children || []), newChild] };
      }

      if (item.children?.length) {
        return {
          ...item,
          children: addChildToComponent(item.children, parentId, newChild),
        };
      }

      return item;
    });
  };



  // console.log(components);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", height: "93vh", overflow: "hidden" }}>
        <LeftPanel
          components={componentLibrary}
        />

        <Canvas components={components} />
        <RightSideBar />
      </div>
    </DndContext>
  );
};

export default Workspace;
