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
    setZoom(zoom - 0.25);

    if (zoom <= 0.25) {
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
  const toastErrorStyle = { style: { borderRadius: '10px', background: 'var(--primary)', color: 'white' }, iconTheme: { primary: 'white', secondary: 'var(--primary)' } };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    setSelectedComponentId(null);
    if (!over || active.id === over.id) return;

    const isFromSidebar = !!active.data.current?.component;
    const isChild = isChildComponent(components, active.id);


    // From SideBar
    if (isFromSidebar) {
      const componentData = active.data.current.component;

      // From SideBar to Canvas -- Layout Components
      if (over.id === "canvas") {
        if (componentData?.rank === 4) {
          toast.error("Basic elements must be inside a layout", toastErrorStyle);
          return;
        }

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

      // From SideBar to Canvas -- Child Components
      let overData = over.data.current;
      if (overData?.rank && componentData.rank < overData.rank) {
        toast.error("You cannot place this component inside a smaller Component.", toastErrorStyle);
        return;
      }

      let newChild = { ...componentData, id: `${componentData.id}-${uuidv4()}`, children: [] };

      setComponents((items) => addChildToComponent(items, over.id, newChild));
      return;
    }


    // From Canvs Area
    if (isChild && over.id === "canvas") {
      toast.error("Child elements must inside a Layout Component", toastErrorStyle);
      return;
    }

    // Re-Order Canvas Elements - Sorting
    if (!isChild && components.some((c) => c.id === over.id)) {
      setComponents((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);

        if (oldIndex === -1 || newIndex === -1) return items;

        return arrayMove(items, oldIndex, newIndex);
      });
      return;
    }

    // Putting Into Another Component
    if (over.id !== "canvas") {
      const componentData = findComponentById(components, active.id);
      if (!componentData) return;

      setComponents((items) => {
        let newComponents;
        let movingChild = componentData;

        if (isChild) {
          const { newComponent, child } = removeChild(items, active.id);
          newComponents = newComponent;
          movingChild = child;
        } else {
          newComponents = items.filter((item) => item.id !== active.id);
        }

        return addChildToComponent(newComponents, over.id, movingChild);
      });
    }
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
    let newComponent = cloneComponents(items);
    let arr = [newComponent];

    while (arr.length > 0) {
      let obj = arr.pop();
      let index = obj.findIndex(child => child && child.id === childId);

      if (index !== -1) {
        child = obj[index];
        obj.splice(index, 1);
        break;
      }

      obj.forEach(item => {
        if (item.children?.length) {
          arr.push(item.children);
        }
      });
    }

    return { newComponent, child };
  };


  // To Check a Element is a Child Element
  const isChildComponent = (items, id) => {
    for (let item of items) {
      if (item.children?.some(child => child.id === id)) {
        return true;
      }

      if (item.children?.length) {
        if (isChildComponent(item.children, id)) {
          return true;
        }
      }
    }
    return false;
  };


  // Right SideBar Methods - Gowtham
  const deleteComponent = () => {
    if (!selectedComponentId) return;

    let arr = [{ parent: null, items: cloneComponents(components) }];

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

    setComponents(arr);
    setSelectedComponentId(null);
  };

  const clearComponentSelection = () => {
    setSelectedComponentId(null);
  };

  const cloneComponents = (obj) => {
    if (obj === null || typeof obj !== "object") {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(cloneComponents);
    }

    const clonedObj = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = cloneComponents(obj[key]);
      }
    }

    return clonedObj;
  };

  const updateComponent = (id, updater) => {
    setComponents(prev => {
      const cloned = cloneComponents(prev);

      const stack = [...cloned];

      while (stack.length) {
        const node = stack.pop();

        if (node.id === id) {
          updater(node);
          break;
        }

        if (node.children?.length) {
          stack.push(...node.children);
        }
      }

      return cloned;
    });
  }


  // console.log(components);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", height: "93vh", overflow: "hidden" }}>
        <LeftPanel components={componentLibrary} />
        <Canvas components={components} zoom={zoom} selectedComponentId={selectedComponentId} onSelectComponent={(id) => setSelectedComponentId(id)} clearComponentSelection={clearComponentSelection} />
        <RightSideBar selectedComponent={selectedComponent} updateComponent={updateComponent} deleteComponent={deleteComponent} />
      </div>
      <Dock zoom={zoom} onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} onReset={handleReset} />
    </DndContext>
  );
};

export default Workspace;
