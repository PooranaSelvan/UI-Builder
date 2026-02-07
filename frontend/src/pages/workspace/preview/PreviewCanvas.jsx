import React from 'react';
import { VOID_TAGS } from "../utils/voidTags.js";

const PreviewCanvas = ({ components }) => {
     const renderComponents = (arr) => {
          return arr.map(ele => {
               const { id, tag, content, defaultProps, children = [] } = ele;
               const isVoid = typeof tag === "string" && VOID_TAGS.has(tag);

               if (isVoid) {
                    return React.createElement(tag, { key: id, ...{ ...defaultProps, className: removeClass(defaultProps?.className, []) } });
               }

               return React.createElement(tag, { key: id, ...{ ...defaultProps, className: removeClass(defaultProps?.className, []) } }, children?.length > 0 ? renderComponents(children) : content);
          });
     };

     const removeClass = (className = "", remove = []) => {
          return className.split(" ").filter(ele => ele && !remove.includes(ele)).join(" ");
     };


     return (
          <div className='preview-container' style={{ flex: 1 }}>
               {components.length === 0 ? (
                    <p>No Components</p>
               ) : (
                    renderComponents(components)
               )}
          </div>
     )
}

export default PreviewCanvas;