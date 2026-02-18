import {
  Image,
  Square,
  Link2,
  Video,
  Minus,
  Layout,
  MousePointerClick,
  FormInput,
  List,
  Grid,
  Heading,
  AlignLeft,
  SquareCheck,
  CircleCheck
} from "lucide-react";

export const components = [
  {
    title: "Layout",
    type: "grid",
    items: [
      {
        id: "container",
        label: "Container",
        icon: Square,
        tag: "div",
        rank: 1,
        content: "Container",
        defaultProps: {
          className: "layout-container test-component", style: {
            height: "500px"
          }
        },
        children: []
      },
      {
        id: "navbar",
        label: "Navbar",
        icon: Grid,
        tag: "nav",
        rank: 1,
        content: "Navbar",
        defaultProps: {
          className: "layout-navbar test-component",
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "15px",
            paddingBottom: "15px",
            paddingLeft: "40px",
            paddingRight: "40px",
            backgroundColor: "#ff6b6b",
            color: "white",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
          }
        },
        children: [
          {
            id: "navbar-logo",
            label: "Logo",
            tag: "div",
            content: "Logo",
            defaultProps: {
              className: "navbar-logo test-component",
              style: {
                fontSize: "24px",
                fontWeight: "700",
                cursor: "pointer"
              }
            },
            children: []
          },

          // Navigations
          {
            id: "navbar-links",
            label: "Navigation Links",
            tag: "ul",
            defaultProps: {
              className: "navbar-links test-component",
              style: {
                display: "flex",
                gap: "25px",
                listStyle: "none",
                margin: 0,
                padding: 0
              }
            },
            children: [
              {
                id: "link-home",
                label: "Link",
                tag: "li",
                content: "Home",
                defaultProps: {
                  className: "nav-link test-component",
                  style: { cursor: "pointer" }
                },
                children: []
              },
              {
                id: "link-features",
                label: "Link",
                tag: "li",
                content: "Features",
                defaultProps: {
                  className: "nav-link test-component",
                  style: { cursor: "pointer" }
                },
                children: []
              },
              {
                id: "link-templates",
                label: "Link",
                tag: "li",
                content: "Templates",
                defaultProps: {
                  className: "nav-link test-component",
                  style: { cursor: "pointer" }
                },
                children: []
              },
              {
                id: "link-contact",
                label: "Link",
                tag: "li",
                content: "Contact",
                defaultProps: {
                  className: "nav-link test-component",
                  style: { cursor: "pointer" }
                },
                children: []
              }
            ]
          },

          {
            id: "navbar-get",
            label: "Nav Button",
            tag: "button",
            content: "Get Started",
            defaultProps: {
              className: "btn btn-primary test-component",
              style: {
                paddingTop: "10px",
                paddingBottom: "10px",
                paddingLeft: "25px",
                paddingRight: "25px",
                borderTopLeftRadius: "6px",
                borderTopRightRadius: "6px",
                borderBottomLeftRadius: "6px",
                borderBottomRightRadius: "6px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "white",
                color: "red",
                fontWeight: "600"
              }
            },
            children: []
          }
        ]
      },
      {
        id: "hero",
        label: "Hero",
        icon: Layout,
        tag: "section",
        rank: 1,
        content: "Hero Section",
        defaultProps: {
          className: "layout-hero test-component",
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            paddingTop: "80px",
            paddingBottom: "80px",
            paddingLeft: "20px",
            paddingRight: "20px",
            background: "#ff6b6b",
            color: "white",
            gap: "20px"
          }
        },
        children: [
          {
            id: "hero-heading",
            label: "Heading",
            tag: "h1",
            content: "Welcome to Sirpam UI Builder",
            defaultProps: {
              className: "hero-heading test-component",
              style: {
                fontSize: "48",
                fontWeight: "700",
                margin: 0
              }
            },
            children: []
          },
          {
            id: "hero-paragraph",
            label: "Paragraph",
            tag: "p",
            content: "Build beautiful websites in minutes with drag-and-drop components.",
            defaultProps: {
              className: "hero-paragraph test-component",
              style: {
                fontSize: "20",
                width: "600px",
                lineHeight: "1.6"
              }
            },
            children: []
          },
          {
            id: "hero-buttons",
            label: "Button Group",
            tag: "div",
            defaultProps: {
              className: "hero-buttons test-component",
              style: {
                display: "flex",
                gap: "15px",
                justifyContent: "center"
              }
            },
            children: [
              {
                id: "hero-btn-1",
                label: "Primary Button",
                tag: "button",
                content: "Get Started",
                defaultProps: {
                  className: "btn btn-primary test-component",
                  style: {
                    paddingTop: "12px",
                    paddingBottom: "12px",
                    paddingLeft: "30px",
                    paddingRight: "30px",
                    fontSize: "16",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: "#fff",
                    color: "red",
                    fontWeight: "600"
                  }
                },
                children: []
              },
              {
                id: "hero-btn-2",
                label: "Secondary Button",
                tag: "button",
                content: "Learn More",
                defaultProps: {
                  className: "btn btn-secondary test-component",
                  style: {
                    paddingTop: "12px",
                    paddingBottom: "12px",
                    paddingLeft: "30px",
                    paddingRight: "30px",
                    fontSize: "16",
                    borderRadius: "6px",
                    border: "2px solid #fff",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    color: "#fff",
                    fontWeight: "600"
                  }
                },
                children: []
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Basic Elements",
    type: "grid",
    items: [
      {
        id: "heading",
        label: "Heading",
        icon: Heading,
        tag: "h2",
        rank: 4,
        content: "Heading Text",
        defaultProps: { className: "basic-heading test-component" }
      },
      {
        id: "paragraph",
        label: "Paragraph",
        icon: AlignLeft,
        tag: "p",
        rank: 4,
        content: "Paragraph text goes here. This is a sample paragraph that can be edited later.",
        defaultProps: { className: "basicparagraph test-component" }
      },
      {
        id: "image",
        label: "Image",
        icon: Image,
        tag: "img",
        rank: 4,
        defaultProps: {
          className: "basic-image test-component",
          src: "https://placehold.co/200x200",
          alt: "Placeholder image"
        }
      },
      {
        id: "button",
        label: "Button",
        icon: MousePointerClick,
        tag: "button",
        rank: 4,
        content: "Click me",
        defaultProps: {
          className: "basic-button test-component",
          type: "button",
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
      },
      {
        id: "divider",
        label: "Divider",
        icon: Minus,
        tag: "hr",
        rank: 4,
        defaultProps: { className: "basic-divider test-component" }
      },
      {
        id: "video",
        label: "Video",
        icon: Video,
        tag: "div",
        rank: 4,
        content: "Video placeholder",
        defaultProps: { className: "basic-video test-component" }
      }
    ]
  },
  {
    title: "Forms",
    type: "grid",
    items: [
      {
        id: "input",
        label: "Input",
        icon: FormInput,
        tag: "input",
        rank: 4,
        defaultProps: {
          className: "form-input test-component",
          type: "text",
          placeholder: "Enter your text here",
        }
      },
      {
        id: "textarea",
        label: "Textarea",
        icon: AlignLeft,
        tag: "textarea",
        rank: 4,
        defaultProps: {
          className: "form-textarea test-component",
          placeholder: "Enter your para here",
          rows: 3
        }
      },
      {
        id: "select",
        label: "Select",
        icon: List,
        tag: "select",
        rank: 4,
        defaultProps: {
          className: "form-select test-component"
        },
        children: [
          { tag: "option", content: "Option 1", defaultProps: { value: "1" } },
          { tag: "option", content: "Option 2", defaultProps: { value: "2" } },
          { tag: "option", content: "Option 3", defaultProps: { value: "3" } },
        ]
      },
      {
        id: "checkbox",
        label: "Check Box",
        icon: SquareCheck,
        tag: "input",
        rank: 4,
        defaultProps: {
          className: "form-checkbox test-component",
          type: "checkbox"
        }
      },
      {
        id: "radio",
        label: "Radio Button",
        icon: CircleCheck,
        tag: "input",
        rank: 4,
        defaultProps: {
          className: "form-radio test-component",
          type: "radio"
        }
      },
    ]
  }
];