import React, { useState } from "react";
import { VOID_TAGS } from "../pages/workspace/utils/voidTags";

const RenderComponents = ({ children }) => {
     const [hiddenIds, setHiddenIds] = useState({});

     const changeVisibility = (id, action) => {
          if (!id) return;

          setHiddenIds((prev) => {
               const updated = { ...prev };

               if (action === "hide") {
                    updated[id] = true;
               } else if (action === "show") {
                    delete updated[id];
               } else if (action === "toggle") {
                    updated[id] ? delete updated[id] : (updated[id] = true);
               }

               return updated;
          });
     };

     const removeClass = (className = "", remove = []) => {
          return className.split(" ").filter(ele => ele && !remove.includes(ele)).join(" ");
     };


     const createEventHandlers = (events = {}, baseStyle = {}, id) => {
          const handlers = {};
          let style = { ...baseStyle };

          // Click Navigation
          if (events?.navigation?.type === "navigate") {
               handlers.onClick = () => {
                    window.open(events.navigation.target, "_blank");
               };
          }

          // Visibility Events
          if (events?.visibility) {
               const { trigger = "click", action, targetId } = events.visibility;
               const target = targetId || id;

               if (trigger === "click") {
                    handlers.onClick = () => changeVisibility(target, action);
               }

               if (trigger === "hover") {
                    handlers.onMouseEnter = () => changeVisibility(target, action);

                    handlers.onMouseLeave = () => {
                         const reverse =
                              action === "show"
                                   ? "hide"
                                   : action === "hide"
                                        ? "show"
                                        : "toggle";

                         changeVisibility(target, reverse);
                    };
               }
          }

          // Hover Style Effects
          if (events?.style) {
               const { hoverColor, borderColor, color } = events.style;

               handlers.onMouseEnter = (e) => {
                    if (hoverColor) e.currentTarget.style.backgroundColor = hoverColor;
                    if (borderColor) e.currentTarget.style.borderColor = borderColor;
                    if (color) e.currentTarget.style.color = color;
               };

               handlers.onMouseLeave = (e) => {
                    e.currentTarget.style.backgroundColor =
                         baseStyle.backgroundColor || "";
                    e.currentTarget.style.borderColor =
                         baseStyle.borderColor || "";
                    e.currentTarget.style.color = baseStyle.color || "";
               };
          }

          // Input onChange
          if (events?.onChange) {
               handlers.onChange = (e) => {
                    const value = e.target.value;

                    if (events.onChange.action === "log") {
                         console.log(value);
                    }

                    if (events.onChange.action === "alert") {
                         alert(value);
                    }

                    if (events.onChange.action === "visibility") {
                         changeVisibility(events.onChange.targetId, "toggle");
                    }

                    if (events.onChange.action === "update") {
                         const el = document.getElementById(events.onChange.targetId);
                         if (el) el.textContent = value;
                    }
               };
          }

          return { handlers, style };
     };


     const renderElements = (elements) => {
          return elements.map((element) => {
               const { id, tag, content, defaultProps = {}, children = [] } = element;

               const { handlers, style } = createEventHandlers(defaultProps.events, defaultProps.style, id);

               // If element is hidden, add display none
               const finalStyle = hiddenIds[id] ? { ...style, display: "none" } : style;

               const props = { ...defaultProps, ...handlers, style: finalStyle, id };
               delete props.events;

               if (typeof tag === "string" && VOID_TAGS.has(tag)) {
                    return React.createElement(tag, { key: id, ...{...props, className: removeClass(defaultProps?.className, ["test-component"])} });
               }

               return React.createElement(tag, { key: id, ...{...props, className: removeClass(defaultProps?.className, ["test-component"])} }, children.length > 0 ? renderElements(children) : content);
          });
     };


     
     return (
          renderElements(children)
     )
};

export default RenderComponents;