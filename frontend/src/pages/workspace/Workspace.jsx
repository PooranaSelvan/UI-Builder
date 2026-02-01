import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import LeftPanel from "./LeftSideBar/LeftPanel";
import Canvas from "./Canvas/Canvas";
import { v4 as uuidv4 } from "uuid";
import RightSideBar from "./RightSideBar/RightSideBar";
import toast from 'react-hot-toast';
import Dock from "./components/Dock";


const Workspace = () => {
  const [components, setComponents] = useState([]);
  const [zoom, setZoom] = useState(1);


  // Zoom Functions
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 2));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.25));
  }

  const handleReset = () => {
    setZoom(1);
  }



  const toastErrorStyle = { borderRadius: '10px', background: 'var(--primary)', color: 'white' }

  const handleDragEnd = (event) => {
    const { active, over } = event;
    // active - current dragging
    // over - current dropped


    // console.log(active, over);

    if (!over) return;


    const isFromSidebar = !!active.data.current?.component; // to check whether from sidebar or sortable
    const componentData = active.data.current?.component;


    // Add from sidebar
    if (isFromSidebar && over.id === "canvas" && componentData?.rank === 4) {
      toast.error("Basic elements must be inside a layout", { style: { ...toastErrorStyle }, iconTheme: { primary: 'white', secondary: 'var(--primary)', } });
      return;
    }

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

      // console.log(componentData, over.data.current);

      if (over.data.current?.rank && componentData.rank < over.data.current.rank) {
        toast.error("You cannot place this component inside a smaller Component.", { style: { ...toastErrorStyle }, iconTheme: { primary: 'white', secondary: 'var(--primary)', } });
        return;
      }

      let newChild = { ...componentData, id: `${componentData.id}-${uuidv4()}`, children: [] };

      setComponents((prev) => addChildToComponent(prev, over.id, newChild));
      return;
    }


    // Child Removing 
    if (!isFromSidebar && over.id === "canvas") {
      setComponents((prev) => {
        const { newComponent, child } = removeChild(prev, active.id);

        if (!child) return prev;

        return [...newComponent, child];
      });

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


  const removeChild = (items, childId) => {
    let child = null;

    const newComponent = items.map((item) => {
      if (!item.children) return item;

      let childIndex = item.children.findIndex((child) => child.id === childId);
      if (childIndex === -1) return item;

      child = item.children[childIndex];

      return { ...item, children: item.children.filter((child) => child.id !== childId) };
    });

    return { newComponent, child };
  };


  // console.log(components);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", height: "93vh", overflow: "hidden" }}>
        <LeftPanel />
        <Canvas components={components} zoom={zoom} />
        <RightSideBar />
      </div>
      <Dock zoom={zoom} onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} onReset={handleReset} />
    </DndContext>
  );
};

export default Workspace;
