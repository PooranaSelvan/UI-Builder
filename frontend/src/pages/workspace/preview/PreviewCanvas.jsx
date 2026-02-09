import React, { useContext } from 'react';
import { VOID_TAGS } from "../utils/voidTags.js";
import { ComponentContext } from '../../../context/ComponentContext.jsx';

const PreviewCanvas = () => {
     let { components } = useContext(ComponentContext);

     const renderComponents = (arr) => {
          let components = arr.map(ele => {
               const { id, tag, content, defaultProps, children = [] } = ele;
               let { res, style } = getEventProps(defaultProps.events, defaultProps.style);
               let props = { key: id, ...defaultProps, ...res, style };
               delete props.events;

               if (typeof tag === "string" && VOID_TAGS.has(tag)) {
                    return React.createElement(tag, { key: id, ...{ ...props, className: removeClass(defaultProps?.className, ["test-component", "component-drag"]) } });
               }

               return React.createElement(tag, { key: id, ...{ ...props, className: removeClass(defaultProps?.className, ["test-component", "component-drag"]) } }, children?.length > 0 ? renderComponents(children) : content);
          });

          return components;
     };

     const removeClass = (className = "", remove = []) => {
          return className.split(" ").filter(ele => ele && !remove.includes(ele)).join(" ");
     };

     const getEventProps = (events = {}, baseStyle = {}) => {
          let res = {};
          let style = { ...baseStyle };


          // Navigation & Visibility
          if (events.navigation || events.visibility) {
               res.onClick = () => {
                    if (events.navigation?.type === "navigate") {
                         window.location.href = events.navigation.target;
                    }


                    if(events.visibility?.action === "hide") {
                         style.display = "none";
                    }
                    if(events.visibility?.action === "show") {
                         style.display = "block";
                    }
                    if(events.visibility?.action === "toggle") {
                         style.display = style.display === "block" ? "none" : "block";
                    }
               }
          }


          // Hover
          if (events.style?.hoverColor) {
               let originalColor = baseStyle?.backgroundColor;

               res.onMouseEnter = (e) => {
                    e.currentTarget.style.backgroundColor = events.style.hoverColor;
               };
               res.onMouseLeave = (e) => {
                    e.currentTarget.style.backgroundColor = originalColor || "";
               };
          }


          return { res, style };
     }


     return (
          <div className='preview-container' style={{ flex: 1 }}>
               {renderComponents(components)}
          </div>
     )
}

export default PreviewCanvas;