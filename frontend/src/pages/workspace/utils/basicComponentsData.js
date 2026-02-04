import {
    Grid,
    Layout,
    Square,
    Heading,
    AlignLeft,
    MousePointerClick,
    FormInput,
    Image,
    CircleUserRound,
    Link2
  } from "lucide-react";
  
  export const BasicComponents = [
    {
      title: "Layout",
      type: "grid",
      items: [
        {
          id: "row",
          label: "Row",
          icon: Grid,
          tag: "div",
          rank: 1,
          content: "Row",
          defaultProps: { className: "layout-row", style: { minHeight: "100px" } },
          children: []
        },
        {
          id: "column",
          label: "Column",
          icon: Layout,
          tag: "div",
          rank: 2,
          content: "Column",
          defaultProps: { className: "layout-column", style: { minHeight: "100px" } },
          children: []
        },
        {
          id: "container",
          label: "Container",
          icon: Square,
          tag: "div",
          rank: 3,
          content: "Container",
          defaultProps: { className: "layout-container", style: { minHeight: "150px" } },
          children: []
        }
      ]
    },
    {
      title: "Basic",
      type: "grid",
      items: [
        {
          id: "heading",
          label: "Heading",
          icon: Heading,
          tag: "h3",
          rank: 4,
          content: "Heading",
          defaultProps: { className: "basic-heading" }
        },
        {
          id: "paragraph",
          label: "Text",
          icon: AlignLeft,
          tag: "p",
          rank: 4,
            content: "Paragraph text goes here. This is a sample paragraph that can be edited later.",
          placeholder: "Enter your para here",
          defaultProps: { className: "basic-text" }
        },
        {
          id: "button",
          label: "Button",
          icon: MousePointerClick,
          tag: "button",
          rank: 4,
          content: "Button",
          defaultProps: { className: "basic-button", type: "button" }
        },
        {
          id: "input",
          label: "Input",
          icon: FormInput,
          tag: "input",
          rank: 4,
          defaultProps: { className: "basic-input", placeholder: "Enter text" }
        },
        {
          id: "image",
          label: "Image",
          icon: Image,
          tag: "img",
          rank: 4,
          defaultProps: {
            className: "basic-image",
            src: "https://placehold.co/150x150",
            alt: "placeholder"
          }
        },
        {
            id: "avatar",
            label: "Avatar",
            icon: CircleUserRound,
            tag: "img",
            rank: 4,
            componentType: "avatar",
            defaultProps: {
              className: "avatar",
              src: "",
              alt: "User avatar"
            }
          },
        {
            id: "link",
            label: "Link",
            icon: Link2,
            tag: "a",
            rank: 4,
            content: "Link",
            defaultProps: {
              className: "basic-link test-component",
              href: "#"
            }
          }
      ]
    }
  ];
  