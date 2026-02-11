import React, { useContext } from "react";
import { VOID_TAGS } from "../workspace/utils/voidTags.js";
import { ComponentEditorContext } from "../../context/ComponentEditorContext";

const ComponentEditorPreview = () => {
  const { components } = useContext(ComponentEditorContext);

  const renderComponents = (arr = []) =>
    arr.map((ele) => {
      const { id, tag, content, defaultProps = {}, children = [] } = ele;

      const { res, style } = getEventProps(
        defaultProps.events,
        defaultProps.style
      );

      const props = {
        key: id,
        ...defaultProps,
        ...res,
        style,
        className: removeClass(defaultProps.className, [
          "test-component",
          "component-drag",
        ]),
      };

      delete props.events;

      if (typeof tag === "string" && VOID_TAGS.has(tag)) {
        return React.createElement(tag, props);
      }

      return React.createElement(
        tag,
        props,
        children.length ? renderComponents(children) : content
      );
    });

  const removeClass = (className = "", remove = []) =>
    className
      .split(" ")
      .filter((cls) => cls && !remove.includes(cls))
      .join(" ");

  const getEventProps = (events = {}, baseStyle = {}) => {
    const res = {};
    const style = { ...baseStyle };

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
  };

  return (
    <div
      className="preview-container"
      style={{
        flex: 1,
        minHeight: "100vh",
        background: "#f9f9f9",
      }}
    >
      {renderComponents(components)}
    </div>
  );
};

export default ComponentEditorPreview;
