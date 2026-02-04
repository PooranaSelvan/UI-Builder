import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import "./ComponentEditor.css";
import LeftPanel from "../workspace/LeftSideBar/LeftPanel";
import Canvas from "../workspace/Canvas/Canvas";
import RightSideBar from "../workspace/RightSideBar/RightSideBar";

import { BasicComponents } from "../workspace/utils/basicComponentsData";

const ComponentEditor = () => {
  /* ---------------- State ---------------- */

  const [components, setComponents] = useState([]);
  const [selectedComponentId, setSelectedComponentId] = useState(null);
  const [savedComponents, setSavedComponents] = useState([]);

  /* ---------------- Helpers ---------------- */

  const cloneComponents = (items) =>
    items.map(item => ({
      ...item,
      children: item.children ? cloneComponents(item.children) : [],
    }));

  const findComponentById = (items, id) => {
    for (let item of items) {
      if (item.id === id) return item;
      if (item.children?.length) {
        const found = findComponentById(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const selectedComponent = selectedComponentId
    ? findComponentById(components, selectedComponentId)
    : null;

  const isChildComponent = (items, id) => {
    for (let item of items) {
      if (item.children?.some(child => child.id === id)) return true;
      if (item.children?.length) {
        if (isChildComponent(item.children, id)) return true;
      }
    }
    return false;
  };

  const addChildToComponent = (items, parentId, newChild) =>
    items.map(item => {
      if (item.id === parentId) {
        return {
          ...item,
          children: [...(item.children || []), newChild],
        };
      }
      if (item.children?.length) {
        return {
          ...item,
          children: addChildToComponent(item.children, parentId, newChild),
        };
      }
      return item;
    });

  const removeChild = (items, childId) => {
    let removedChild = null;
    const cloned = cloneComponents(items);
    const stack = [cloned];

    while (stack.length) {
      const arr = stack.pop();
      const index = arr.findIndex(i => i.id === childId);

      if (index !== -1) {
        removedChild = arr[index];
        arr.splice(index, 1);
        break;
      }

      arr.forEach(i => i.children?.length && stack.push(i.children));
    }

    return { newTree: cloned, removedChild };
  };

  /* ---------------- Drag Logic ---------------- */

  const toastErrorStyle = {
    style: {
      borderRadius: "10px",
      background: "var(--primary)",
      color: "white",
    },
  };

  const handleDragEnd = ({ active, over }) => {
    setSelectedComponentId(null);
    if (!over || active.id === over.id) return;

    const isFromSidebar = !!active.data.current?.component;
    const isChild = isChildComponent(components, active.id);

    /* Sidebar to Canvas */
    if (isFromSidebar && over.id === "canvas") {
      const componentData = active.data.current.component;

      if (componentData.rank === 4) {
        toast.error("Basic elements must be inside a layout", toastErrorStyle);
        return;
      }

      const newId = `${componentData.id}-${uuidv4()}`;
      setComponents(prev => [...prev, { ...componentData, id: newId }]);
      setSelectedComponentId(newId);
      return;
    }

    /* Sidebar to Child */
    if (isFromSidebar && over.id !== "canvas") {
      const componentData = active.data.current.component;

      if (
        over.data.current?.rank &&
        componentData.rank < over.data.current.rank
      ) {
        toast.error(
          "You cannot place this component inside a smaller component",
          toastErrorStyle
        );
        return;
      }

      const newChild = {
        ...componentData,
        id: `${componentData.id}-${uuidv4()}`,
        children: [],
      };

      setComponents(prev => addChildToComponent(prev, over.id, newChild));
      return;
    }

    /* Child to Canvas (blocked) */
    if (isChild && over.id === "canvas") {
      toast.error(
        "Child elements must be inside a layout component",
        toastErrorStyle
      );
      return;
    }

    /* Move child */
    if (!isFromSidebar && over.id !== "canvas") {
      const componentData = findComponentById(components, active.id);
      if (!componentData) return;

      setComponents(prev => {
        let updatedTree;
        let movingItem = componentData;

        if (isChild) {
          const res = removeChild(prev, active.id);
          updatedTree = res.newTree;
          movingItem = res.removedChild;
        } else {
          updatedTree = prev.filter(i => i.id !== active.id);
        }

        return addChildToComponent(updatedTree, over.id, movingItem);
      });
      return;
    }

    /* Sort top-level */
    if (!isChild) {
      setComponents(prev => {
        const oldIndex = prev.findIndex(i => i.id === active.id);
        const newIndex = prev.findIndex(i => i.id === over.id);
        if (oldIndex === -1 || newIndex === -1) return prev;
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const saveSelectedComponent = () => {
    if (!selectedComponent) return;

    const cleanComponent = (comp) => ({
      ...comp,
      id: `${comp.type}-${uuidv4()}`,
      isCustom: true,
      children: comp.children?.map(cleanComponent) || [],
    });

    setSavedComponents((prev) => [
      ...prev,
      {
        ...cleanComponent(selectedComponent),
        isRootCustom: true,
      },
    ]);

    toast.success("Component saved successfully!");
  };


  /* ---------------- Render ---------------- */

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="component-editor-wrapper">


        <LeftPanel components={BasicComponents} />
          <Canvas
            components={components}
            selectedComponentId={selectedComponentId}
            onSelectComponent={setSelectedComponentId}
            clearComponentSelection={() => setSelectedComponentId(null)}
          />
        <RightSideBar selectedComponent={selectedComponent} />

      </div>
    </DndContext>
  );

};

export default ComponentEditor;
