import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import "./work-canvas.css";
import { useDroppable } from "@dnd-kit/core";
import { VOID_TAGS } from "../utils/voidTags";
import { GripHorizontal } from 'lucide-react';

const SortableItem = ({ ele, isSelected, onSelect, selectedComponentId }) => {
     const { id, tag, content, defaultProps, children = [], rank } = ele;
     const { setNodeRef, attributes, listeners, transform, transition } = useSortable({ id });
     const isVoid = typeof tag === "string" && VOID_TAGS.has(tag);

     // console.log(listeners, defaultProps, attributes);

     const selectComponent = (e) => {
          e.stopPropagation();
          onSelect(id);
     };

     const { setNodeRef: setDropRef, isOver } = useDroppable({
          id: id,
          data: {
               rank,
               type: "component",
          },
          disabled: isVoid
     });

     const style = {
          transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
          transition,
          border: isSelected ? "2px solid deepskyblue" : "none",
          borderRadius: "12px",
          marginBottom: 10,
          position : "relative"
     };

     return (
          <div ref={(node) => { setNodeRef(node); setDropRef(node) }} style={style} {...attributes} onClick={selectComponent}>
               <div {...listeners} className="component-drag" onClick={(e) => e.stopPropagation()}>
                    <GripHorizontal size={22} />
               </div>

               {isVoid ? (
                    React.createElement(tag, defaultProps)
               ) : (
                    React.createElement(tag, defaultProps, children?.length > 0 ? children.map((child) => (<SortableItem key={child.id} ele={child} isSelected={child.id === selectedComponentId} selectedComponentId={selectedComponentId} onSelect={onSelect} />)) : content)
               )}
          </div>
     );

};

export default SortableItem;
