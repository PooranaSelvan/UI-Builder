import { useEffect, useState, useContext } from "react";
import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import LeftPanel from "./LeftSideBar/LeftPanel";
import Canvas from "./Canvas/Canvas";
import { v4 as uuidv4 } from "uuid";
import RightSideBar from "./RightSideBar/RightSideBar";
import toast from 'react-hot-toast';
import Dock from "./components/Dock";
import { components as componentLibrary } from "./utils/ComponentsData.js";
import { CustomComponentsContext } from "../../context/CustomComponentsContext";
import "./workspace.css";
import Button from "../../components/Button.jsx";
import { Smartphone, Tablet, MonitorCheck, Fullscreen, Eye, Rocket, Save } from 'lucide-react';
import { useParams } from "react-router-dom";
import api from "../../utils/axios.js";

const Workspace = ({ isAuthenticated }) => {
  const [components, setComponents] = useState([]);
  const [zoom, setZoom] = useState(1);
  const [selectedComponentId, setSelectedComponentId] = useState(null);
  const { pageId } = useParams();
  const { customComponents } = useContext(CustomComponentsContext);


  useEffect(() => {
    async function fetchComponents() {
      try {
        let res = await api.get(`/builder/page/${pageId}`);

        // console.log(res.data);

        setComponents(res.data.data || []);
      } catch (error) {
        console.log(error);
        toast.error("Something Went Wrong! Please Refresh & Try Again!");
      }
    }

    fetchComponents();
  }, [pageId]);


  const handleSavePage = async () => {
    if (!isAuthenticated) {
      toast.error("Login to Save Page!");
      return;
    }

    try {
      let res = await api.put(`/builder/pages/${pageId}`, {
        data: components
      });

      localStorage.setItem("previewComponents", JSON.stringify(components));
      toast.success("Pages Saved Successfully!");
    } catch (error) {
      console.log(error);
    }
  }



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


  // DFS
  const findComponentById = (items, id) => {
    for (let ele of items) {
      if (ele.id === id) {
        return ele;
      }

      if (ele.children && ele.children.length > 0) {
        let element = findComponentById(ele.children, id);
        if (element) return element;
      }
    }

    return null;
  }

  const cloneWithNewIds = (component) => {
    const newId = `${component.id}-${uuidv4()}`;

    return {
      ...component,
      id: newId,
      children: component.children?.map(cloneWithNewIds) || [],
    };
  };



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

        const clonedComponent = cloneWithNewIds(componentData);

        setComponents((prev) => [...prev, clonedComponent]);
        setSelectedComponentId(clonedComponent.id);

        return;
      }


      // From SideBar to Canvas -- Child Components
      let overData = over.data.current;
      if (overData?.rank && componentData.rank < overData.rank) {
        toast.error("You cannot place this component inside a smaller Component.", toastErrorStyle);
        return;
      }

      let newChild = cloneWithNewIds(componentData);

      setComponents((items) => addChildToComponent(items, over.id, newChild));
      return;
    }


    // From Canvs Area
    if (isChild && over.id === "canvas") {
      const draggedComponent = findComponentById(components, active.id);
      if (!draggedComponent) return;

      if (draggedComponent.rank === 4) {
        toast.error("Basic elements must inside a Layout Component", toastErrorStyle);
        return;
      }

      setComponents((items) => {
        const { newComponent, child } = removeChild(items, active.id);
        return [...newComponent, child];
      });

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
      let componentData = findComponentById(components, active.id);
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

      if (item.children && item.children.length > 0) {
        return { ...item, children: addChildToComponent(item.children, parentId, newChild) };
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
        if (item.children && item.children.length > 0) {
          arr.push(item.children);
        }
      });
    }

    return { newComponent, child };
  };


  // To Check a Element is a Child Element
  const isChildComponent = (items, id) => {
    for (let item of items) {
      if (item.children && item.children.some(child => child.id === id)) {
        return true;
      }

      if (item.children && item.children.length > 0) {
        if (isChildComponent(item.children, id)) {
          return true;
        }
      }
    }
    return false;
  };


  // Right SideBar Methods - Gowtham
  const deleteComponent = () => {
    const cloned = cloneComponents(components);

    const remove = (items) => {
      const index = items.findIndex(i => i.id === selectedComponentId);

      if (index !== -1) {
        items.splice(index, 1);
        return true;
      }

      return items.some(item =>
        item.children && remove(item.children)
      );
    };

    remove(cloned);
    setComponents(cloned);
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
    setComponents(existingComponent => {
      const cloneStructure = cloneComponents(existingComponent);
      updateNodeById(cloneStructure, id, updater);
      return cloneStructure;
    })
  }

  const updateNodeById = (nodes, id, updater) => {
    for (const node of nodes) {
      if (node.id === id) {
        updater(node);
        return true
      }

      if (node.children && node.children.length) {
        if (updateNodeById(node.children, id, updater)) {
          return true;
        }
      }
    }
    return false
  }


  const handleNavigatePreview = () => {
    if (components.length === 0) {
      toast.error("There is no Components Load Preview!", toastErrorStyle);
      return;
    }

    localStorage.setItem("previewComponents", JSON.stringify(components));
    window.open("/preview", "_blank");
  }

  const combinedComponents = [
    ...componentLibrary,
    ...(customComponents.length
      ? [
        {
          title: "Custom Components",
          type: "grid",
          items: customComponents.map(c => ({
            id: c._id,
            originalId: c._id,
            label: c.componentName,
            iconName: c.icon || "Square",
            isRootCustom: true,
            children: c.data ? JSON.parse(c.data) : [],
          })),
        },
      ]
      : []),
  ];


  
  let sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    })
  );


  // console.log(components);

  return (
    <>
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <div style={{ display: "flex", height: "93vh", overflow: "hidden", position: "relative" }}>
          <div className="workspace-topbar">
            <div className="workspace-topbar-screens">
              <Button style={{ background: "transparent" }} className="workspace-topbar-screen-btn">
                <Smartphone />
              </Button>
              <Button style={{ background: "transparent" }} className="workspace-topbar-screen-btn">
                <Tablet />
              </Button>
              <Button style={{ background: "transparent" }} className="workspace-topbar-screen-btn">
                <MonitorCheck />
              </Button>
              <Button style={{ background: "transparent" }} className="workspace-topbar-screen-btn">
                <Fullscreen />
              </Button>
            </div>
            <div className="divider-line" />
            <div className="workspace-topbar-btns">
              <Button className="primary-button" style={{ display: "flex", alignItems: "center", justifyCenter: "center", gap: "10px", padding: "10px 20px" }} onClick={handleSavePage} disabled={!components.length}>
                <Save size={20} />
                Save Page
              </Button>
              <Button className="secondary-button" style={{ display: "flex", alignItems: "center", justifyCenter: "center", gap: "10px", padding: "10px 20px" }} onClick={handleNavigatePreview}>
                <Eye size={20} />
                Preview
              </Button>
              <Button className="primary-button" style={{ display: "flex", alignItems: "center", justifyCenter: "center", gap: "10px", padding: "10px 20px" }}>
                <Rocket size={20} />
                Publish
              </Button>
            </div>
          </div>
          <LeftPanel components={combinedComponents} />
          <Canvas components={components} zoom={zoom} selectedComponentId={selectedComponentId} onSelectComponent={(id) => setSelectedComponentId(id)} clearComponentSelection={clearComponentSelection} />
          <RightSideBar selectedComponent={selectedComponent} updateComponent={updateComponent} deleteComponent={deleteComponent} />
        </div >
        <Dock zoom={zoom} onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} onReset={handleReset} />
      </DndContext >
    </>
  );
};

export default Workspace;
