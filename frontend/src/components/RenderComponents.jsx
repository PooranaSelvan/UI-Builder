import React, { useState } from "react";
import { VOID_TAGS } from "../pages/workspace/utils/voidTags";

const RenderComponents = ({ children }) => {
     const [hiddenIds, setHiddenIds] = useState({});
     const [dynamicText, setDynamicText] = useState({});
     const [hoveredIds, setHoveredIds] = useState({});

     const toggleVisibility = (id, action = "toggle") => {
          if (!id) return;

          setHiddenIds((prev) => {
               const updated = { ...prev };

               if (action === "show") {
                    delete updated[id];
               } else if (action === "hide") {
                    updated[id] = true;
               } else {
                    if (updated[id]) {
                         delete updated[id];
                    } else {
                         updated[id] = true;
                    }
               }

               return updated;
          });
     };

     const removeClass = (className = "") => {
          return className.split(" ").filter((c) => c && c !== "test-component").join(" ");
     };

     const handleAction = (event, eventName, id) => {
          if (!event?.action) return undefined;

          return (e) => {
               if (eventName === "onKeyDown" && event.key) {
                    let keyPressed = e.key === " " ? "Space" : e.key;
                    if (keyPressed !== event.key) return;
               }

               let value = e?.target?.value !== undefined ? e.target.value : "";

               const { action, message, targetId } = event;
               let target = targetId || id;

               switch (action) {
                    case "log":
                         console.log(message || value);
                         break;
                    case "alert":
                         alert(message || value);
                         break;
                    case "visibility":
                         toggleVisibility(target);
                         break;
                    case "update":
                         setDynamicText((prev) => ({
                              ...prev,
                              [target]: message || value,
                         }));
                         break;
                    default:
                         break;
               }
          };
     };

     const createHandlers = (events = {}, baseStyle = {}, id) => {
          const res = {};

          // Navigation
          if (events.navigation?.targetPage) {
               res.onClick = (e) => {
                    e.preventDefault();
                    const { targetPage, target = "_self" } = events.navigation;

                    if (target === "_blank") {
                         window.open(targetPage, "_blank", "noopener,noreferrer");
                    } else {
                         window.location.href = targetPage;
                    }
               };
          } else if (events.visibility?.trigger === "click") {
               res.onClick = () => {
                    toggleVisibility(events.visibility.targetId || id, events.visibility.action);
               };
          } else if (events.onClick) {
               res.onClick = handleAction(events.onClick, "onClick", id);
          }


          if (events.visibility?.trigger === "hover") {
               const { action, targetId } = events.visibility;
               const target = targetId || id;

               res.onMouseEnter = () => {
                    toggleVisibility(target, action);
               };

               res.onMouseLeave = () => {
                    let reverse = action === "show" ? "hide" : action === "hide" ? "show" : "toggle";
                    toggleVisibility(target, reverse);
               };
          } else if (events.style) {
               res.onMouseEnter = () => {
                    setHoveredIds((prev) => ({ ...prev, [id]: true }));
               };

               res.onMouseLeave = () => {
                    setHoveredIds((prev) => {
                         const updated = { ...prev };
                         delete updated[id];
                         return updated;
                    });
               };
          }

          // Direct mapped events
          if (events.onChange) {
               res.onChange = handleAction(events.onChange, "onChange", id);
          }

          if (events.onFocus) {
               res.onFocus = handleAction(events.onFocus, "onFocus", id);
          }

          if (events.onBlur) {
               res.onBlur = handleAction(events.onBlur, "onBlur", id);
          }

          if (events.onClick) {
               res.onClick = handleAction(events.onClick, "onClick", id);
          }

          if (events.onKeyDown) {
               res.onKeyDown = handleAction(events.onKeyDown, "onKeyDown", id);
          }

          return { res };
     };

     const renderElements = (elements) => {

          let ele = elements.map((element, index) => {
               console.log(element);
               const { id, tag, content, defaultProps = {}, children = [], baseClassName } = element;
               const { events, style: rawStyle = {}, mediaquery, ...rest } = defaultProps;
               const { res } = createHandlers(events, rawStyle, id);
               let elementStyle = { ...rawStyle };
               let mediaQuery = mediaquery?.style || "";

               if (hoveredIds[id] && events?.style) {
                    if (events.style.hoverColor) {
                         elementStyle.backgroundColor = events.style.hoverColor;
                    }
                    if (events.style.borderColor) {
                         elementStyle.borderColor = events.style.borderColor;
                    }
                    if (events.style.color) {
                         elementStyle.color = events.style.color;
                    }
               }

               if (hiddenIds[id]) {
                    elementStyle.display = "none";
               }

               let orginalClassName = removeClass(rest.className) || "";

               const props = { ...rest, ...res, id, style: elementStyle, className: orginalClassName };
               const key = id || `${tag}-${index}`;

               // let sample = removeClass(Array.from(new Set([...orginalClassName.split(" "), baseClassName && baseClassName.split(" ")].flat(Infinity))).join(" ")) || "";

               if (VOID_TAGS.has(tag)) {
                    return (
                         <>
                              {mediaQuery && <style>{mediaQuery}</style>}
                              {React.createElement(tag, { key, ...props })}
                         </>
                    );
               }

               const textContent = id in dynamicText ? dynamicText[id] : content;

               return (
                    <>
                         {mediaQuery && <style>{mediaQuery}</style>}
                         {React.createElement(tag, {key, ...props }, children.length > 0 ? renderElements(children) : textContent)}
                    </>
               );
          });

          return ele;
     };

     return <>{renderElements(children)}</>;
};

export default RenderComponents;