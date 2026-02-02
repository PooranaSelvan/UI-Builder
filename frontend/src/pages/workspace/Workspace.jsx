import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import LeftPanel from "./LeftSideBar/LeftPanel";
import Canvas from "./Canvas/Canvas";
import { v4 as uuidv4 } from "uuid";
import RightSideBar from "./RightSideBar/RightSideBar";
import toast from 'react-hot-toast';
import Dock from "./components/Dock";
import { components as componentLibrary } from "./utils/ComponentsData.js";

const Workspace = () => {
  const [components, setComponents] = useState([]);
  const [zoom, setZoom] = useState(1);
  const [selectedComponentId, setSelectedComponentId] = useState(null);


  // Zoom Functions
  const handleZoomIn = () => {
    setZoom(zoom + 0.25);

    if (zoom >= 2) {
      setZoom(1);
    }
  };

  const handleZoomOut = () => {
    setZoom(zoom + -0.25);

    if (zoom <= 0) {
      setZoom(1);
    }
  }

  const handleReset = () => {
    setZoom(1);
  }


  const findComponentById = (items, id) => {
    for (let ele of items) {
      if (ele.id === id) {
        return ele;
      }

      if (ele.children?.length) {
        let element = findComponentById(ele.children, id);
        if (element) return element;
      }
    }

    return null;
  }


  const selectedComponent = selectedComponentId ? findComponentById(components, selectedComponentId) : null;
  const toastErrorStyle = { borderRadius: '10px', background: 'var(--primary)', color: 'white' };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    // active - current dragging
    // over - current dropped


    // console.log(active, over);

    setSelectedComponentId(null);
    if (!over) return;


    if (active.id === over.id) return;


    const isFromSidebar = !!active.data.current?.component; // to check whether from sidebar or sortable
    const componentData = active.data.current?.component;
    const isFromCanvas = !isFromSidebar && components.some(ele => ele.id === active.id);


    // Add from sidebar
    if (isFromSidebar && over.id === "canvas" && componentData?.rank === 4) {
      toast.error("Basic elements must be inside a layout", { style: { ...toastErrorStyle }, iconTheme: { primary: 'white', secondary: 'var(--primary)', } });
      return;
    }

    if (isFromSidebar && over.id === "canvas") {
      const componentData = active.data.current.component;
      const newId = `${componentData.id}-${uuidv4()}`;

      setComponents((prev) => [
        ...prev,
        {
          ...componentData,
          id: newId,
        },
      ]);
      setSelectedComponentId(newId);

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
      setComponents((ele) => {
        const { newComponent, child } = removeChild(ele, active.id);

        if (!child) return ele;

        return [...newComponent, child];
      });

      return;
    }


    // Adding a Child from Drop Zone
    if (isFromCanvas && over.id !== "canvas") {
      let currentComponent = components.find(ele => ele.id === active.id);
      if (!currentComponent) return;


      if (over.data.current?.rank && currentComponent.rank < over.data.current.rank) {
        toast.error("You cannot place this component inside a smaller Component.", { style: { ...toastErrorStyle }, iconTheme: { primary: 'white', secondary: 'var(--primary)', } });
        return;
      }

      setComponents((prev) => {
        let balanceComponents = prev.filter(ele => ele.id !== active.id);

        return addChildToComponent(balanceComponents, over.id, currentComponent);
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


  // Right SideBar Methods
  const updateComponent = (id, updates) => {
    let arr = [...structuredClone(components)];

    while (arr.length > 0) {
      let currentObj = arr.pop();

      if (currentObj.id === id) {
        Object.assign(currentObj, updates);
        break;
      }

      if (currentObj.children?.length) {
        arr.push(...currentObj.children);
      }
    }

    setComponents(newItems);
  };


  const deleteComponent = () => {
    if (!selectedComponentId) return;

    let arr = [{ parent: null, items: structuredClone(components) }];

    while (arr.length > 0) {
      const { items } = arr.pop();

      let itemIndex = items.findIndex(ele => ele.id === selectedComponentId);

      if (itemIndex !== -1) {
        items.splice(itemIndex, 1);
        break;
      }

      items.forEach(item => {
        if (item.children?.length) {
          arr.push({ parent: item, items: item.children });
        }
      });
    }

    setComponents(newItems);
    setSelectedComponentId(null);
  };

  const clearComponentSelection = () => {
    setSelectedComponentId(null);
  };


  // console.log(components);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", height: "93vh", overflow: "hidden" }}>
        <LeftPanel components={componentLibrary}/>
        <Canvas components={components} zoom={zoom} selectedComponentId={selectedComponentId} onSelectComponent={(id) => setSelectedComponentId(id)} clearComponentSelection={clearComponentSelection} />
        <RightSideBar selectedComponent={selectedComponent} updateComponent={updateComponent} deleteComponent={deleteComponent} />
      </div>
      <Dock zoom={zoom} onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} onReset={handleReset} />
    </DndContext>
  );
};

export default Workspace;
