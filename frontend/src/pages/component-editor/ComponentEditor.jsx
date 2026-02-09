import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import "./ComponentEditor.css";
import LeftPanel from "../workspace/LeftSideBar/LeftPanel";
import Canvas from "../workspace/Canvas/Canvas";
import RightSideBar from "../workspace/RightSideBar/RightSideBar";
import IconPicker from "./IconPicker";
import { Search, X, Eye } from "lucide-react";
import { BasicComponents } from "../workspace/utils/basicComponentsData";
import { ICONS, getIconByName } from "../workspace/utils/icons";
import Button from "../../components/Button.jsx";


const ComponentEditor = () => {
  /* ---------------- State ---------------- */

  const [components, setComponents] = useState([]);
  const [selectedComponentId, setSelectedComponentId] = useState(null);
  const [savedComponents, setSavedComponents] = useState([]);
  const [customIconName, setCustomIconName] = useState("Square");
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [lastSavedComponentId, setLastSavedComponentId] = useState(null);
  const [customComponentName, setCustomComponentName] = useState("");
  const [showNameInput, setShowNameInput] = useState(false);
  const [iconSearch, setIconSearch] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [editingSavedComponentId, setEditingSavedComponentId] = useState(null);



  /* ---------------- Helpers ---------------- */


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

  const cloneComponentWithNewIds = (component) => {
    return {
      ...component,
      id: `${component.id}-${uuidv4()}`,
      children: component.children
        ? component.children.map(child => cloneComponentWithNewIds(child))
        : []
    };
  };

  const startEditingSavedComponent = (savedComponent) => {
    setEditingSavedComponentId(savedComponent.id);
    setCustomComponentName(savedComponent.label);
    setCustomIconName(savedComponent.iconName || "Square");
  
    const cloned = cloneComponentWithNewIds(savedComponent);
    setComponents([cloned]);
    setSelectedComponentId(cloned.id);
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

      const clonedComponent = cloneComponentWithNewIds(componentData);

      setComponents(prev => [...prev , clonedComponent]);
      setSelectedComponentId(clonedComponent.id);
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

  const deleteComponent = () => {
    if (!selectedComponentId) return;

    const newComponents = cloneComponents(components);

    let stack = [{ items: newComponents }];

    while (stack.length > 0) {
      const { items } = stack.pop();

      const index = items.findIndex(
        item => item.id === selectedComponentId
      );

      if (index !== -1) {
        items.splice(index, 1);
        break;
      }

      items.forEach(item => {
        if (item.children?.length) {
          stack.push({ items: item.children });
        }
      });
    }

    setComponents(newComponents);
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

  const saveCanvasAsComponent = () => {
    if (!components.length) {
      toast.error("Canvas is empty");
      return;
    }
  
    if (editingSavedComponentId) {
      setSavedComponents(prev =>
        prev.map(comp => {
          if (comp.id !== editingSavedComponentId) return comp;
  
          return {
            ...comp,
            children: deepCloneWithoutIds(components),
          };
        })
      );
  
      setComponents([]);
      setSelectedComponentId(null);
      setEditingSavedComponentId(null);
  
      toast.success("Custom Component Updated!");
      return;
    }
    setCustomComponentName("");
    setCustomIconName("Square");
    setShowNameInput(true);
  };
  
  

  const selectedComponent = selectedComponentId
    ? findComponentById(components, selectedComponentId)
    : null;

  const combinedComponents = [
    ...BasicComponents,
    ...(savedComponents.length
      ? [
        {
          title: "Custom Components",
          type: "grid",
          items: savedComponents,
        },
      ]
      : []),
  ];

  const handleNameSubmit = () => {
    if (!customComponentName.trim()) return;
    const newId = `custom-${uuidv4()}`;
    setLastSavedComponentId(newId);
    setShowNameInput(false);
    setShowIconPicker(true);
  };

  const deepCloneWithoutIds = (items) =>
    items.map(({ id, ...rest }) => ({
      ...rest,
      children: rest.children ? deepCloneWithoutIds(rest.children) : [],
    }));
   
    const handleIconSelect = (iconName) => {
      setCustomIconName(iconName);
      const componentToSave = {
        id: editingSavedComponentId || `custom-${uuidv4()}`,
        label: customComponentName,
        tag: "div",
        iconName,
        isRootCustom: true,
        defaultProps: {
          className: "custom-component-root",
        },
        children: deepCloneWithoutIds(components),
      };
    
      setSavedComponents(prev => {
        if (editingSavedComponentId && !components.length) {
          setSavedComponents(prev =>
            prev.map(c =>
              c.id === editingSavedComponentId ? { ...c, iconName } : c
            )
          );
          setEditingSavedComponentId(null);
          setShowIconPicker(false);
          return;
        }        
        return [...prev, componentToSave];
      });

      setComponents([]);
      setSelectedComponentId(null);
      setEditingSavedComponentId(null);
      setShowIconPicker(false);
      setCustomComponentName("");
      setCustomIconName("Square");
    
      toast.success(
        editingSavedComponentId
          ? "Custom Component Updated!"
          : "Custom Component Saved!"
      );
    };
    
  const handleAddJsonComponent = (newComponent) => {
    setSavedComponents(prev => [
      ...prev,
      { ...newComponent, children: newComponent.children || [] }
    ])
  };

  const handleRenameComponent = (component) => {
    const newName = prompt("Enter new name", component.label);
    if (!newName) return;
  
    setSavedComponents(prev =>
      prev.map(c =>
        c.id === component.id ? { ...c, label: newName } : c
      )
    );
  };

  const handleChangeIcon = (component) => {
    setEditingSavedComponentId(component.id);
    setCustomComponentName(component.label);
    setShowIconPicker(true);
  };

  const handleDeleteComponent = (component) => {
    if (!window.confirm("Delete this component?")) return;
  
    setSavedComponents(prev =>
      prev.filter(c => c.id !== component.id)
    );
  
    if (editingSavedComponentId === component.id) {
      setComponents([]);
      setEditingSavedComponentId(null);
    }
  };
  
  /* ---------------- Render ---------------- */

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="component-editor-wrapper">
        <div className="editor-top-bar">
          <Button
            className="secondary-button"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              padding: "10px 20px",
            }}
            onClick={() => setPreviewMode(!previewMode)}>
          <Eye size={20} />
            Preview
          </Button>

          <button
            className="save-component-btn"
            disabled={!components.length && !editingSavedComponentId}
            onClick={saveCanvasAsComponent} >
           {editingSavedComponentId ? "Update Component" : "Save Component"}
          </button>

        </div>


        <div className="editor-body">
          <LeftPanel components={combinedComponents}
            onAddJsonComponent={(newComp) => {
  
              const newId = `custom-${uuidv4()}`;
              setSavedComponents(prev => [...prev, { ...newComp, id: newId }]);
              toast.success("JSON component added!");
            }} 
            onEditSavedComponent={startEditingSavedComponent}
            onRenameComponent={handleRenameComponent}
            onChangeIcon={handleChangeIcon}
            onDeleteComponent={handleDeleteComponent}
            />

          <Canvas
            components={components}
            selectedComponentId={selectedComponentId}
            onSelectComponent={setSelectedComponentId}
            clearComponentSelection={() => setSelectedComponentId(null)} />

          <RightSideBar
            selectedComponent={selectedComponent}
            updateComponent={updateComponent}
            deleteComponent={deleteComponent} />
        </div>
      </div>


      {/* Component Name Modal */}
      {showNameInput && (
        <div className="custom-component-modal">
          <div className="modal-header">
            <h4>Name your component</h4>
            <X size={20} className="modal-cancel-btn" onClick={() => setShowNameInput(false)} />
          </div>
          <input
            type="text"
            placeholder="Enter component name..."
            value={customComponentName}
            onChange={(e) => setCustomComponentName(e.target.value)}/>
          <button
            disabled={!customComponentName.trim()}
            onClick={handleNameSubmit}>
            Next: Choose Icon
          </button>
        </div>
      )}

      {/* Icon Picker Modal */}
      {showIconPicker && (
        <div className="icon-picker-wrapper">
          <div className="modal-header">
            <h4>Choose an icon for {customComponentName || "your component"}</h4>
            <X size={20} className="modal-cancel-btn" onClick={() => setShowIconPicker(false)} />
          </div>


          <div className="icon-picker-search">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search icons..."
              value={iconSearch}
              onChange={(e) => setIconSearch(e.target.value)}
            />
          </div>

          <div className="icon-picker-grid">
            <IconPicker
              search={iconSearch}
              value={customIconName}
              onChange={handleIconSelect}
              className="icon-picker-item"
            />
          </div>
        </div>
      )}
    </DndContext>
  );
};

export default ComponentEditor;
