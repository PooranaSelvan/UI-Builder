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

      // Navbar
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
                borderWidth: "0px",
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
            backgroundColor: "#ff6b6b",
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
                    borderTopLeftRadius: "6px",
                    borderTopRightRadius: "6px",
                    borderBottomLeftRadius: "6px",
                    borderBottomRightRadius: "6px",
                    borderWidth: "none",
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
                    borderTopLeftRadius: "6px",
                    borderTopRightRadius: "6px",
                    borderBottomLeftRadius: "6px",
                    borderBottomRightRadius: "6px",
                    borderWidth: "2px",
                    borderStyle: "solid",
                    borderColor: "#fff",
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
      },
      {
        id: "body",
        label: "Body",
        icon: Layout,
        tag: "section",
        rank: 2,
        content: "Body Section",
        defaultProps: {
          className: "layout-body test-component",
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            paddingTop: "100px",
            paddingBottom: "100px",
            paddingLeft: "30px",
            paddingRight: "30px",
            backgroundColor: "#ff6b6b",
            color: "#ffffff",
            gap: "30px"
          }
        },
        children: [
          {
            id: "body-heading",
            label: "Heading",
            tag: "h2",
            content: "Build Faster. Design Smarter.",
            defaultProps: {
              className: "body-heading test-component",
              style: {
                fontSize: "42",
                fontWeight: "700",
                margin: 0
              }
            },
            children: []
          },
          {
            id: "body-subheading",
            label: "Sub Heading",
            tag: "h3",
            content: "A powerful low-code UI builder for modern web teams",
            defaultProps: {
              className: "body-subheading test-component",
              style: {
                fontSize: "24",
                fontWeight: "500",
                margin: 0,
                opacity: "0.9"
              }
            },
            children: []
          },
          {
            id: "body-paragraph-1",
            label: "Paragraph",
            tag: "p",
            content: "Sirpam lets designers and developers collaborate visually. Drag components, customize styles, and see changes instantly — without writing repetitive code.",
            defaultProps: {
              className: "body-paragraph test-component",
              style: {
                fontSize: "18",
                maxWidth: "800px",
                lineHeight: "1.7",
                opacity: "0.95"
              }
            },
            children: []
          },
          {
            id: "body-paragraph-2",
            label: "Paragraph",
            tag: "p",
            content: "From landing pages to full-scale applications, Sirpam helps you create reusable UI blocks, maintain consistency, and ship products faster.",
            defaultProps: {
              className: "body-paragraph test-component",
              style: {
                fontSize: "18",
                maxWidth: "800px",
                lineHeight: "1.7",
                opacity: "0.95"
              }
            },
            children: []
          },
          {
            id: "body-cta",
            label: "CTA Button",
            tag: "button",
            content: "Explore Features",
            defaultProps: {
              className: "btn btn-light test-component",
              style: {
                marginTop: "20px",
                paddingTop: "14px",
                paddingBottom: "14px",
                paddingLeft: "36px",
                paddingRight: "36px",
                fontSize: "16",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
                borderBottomLeftRadius: "8px",
                borderBottomRightRadius: "8px",
                borderWidth: "0px",
                cursor: "pointer",
                backgroundColor: "#ffffff",
                color: "#ff6b6b",
                fontWeight: "600"
              }
            },
            children: []
          }
        ]
      },
      {
        id: "cards",
        label: "Cards",
        icon: Layout,
        tag: "section",
        rank: 3,
        content: "Cards Section",
        defaultProps: {
          className: "layout-cards test-component",
          style: {
            paddingTop: "100px",
            paddingBottom: "100px",
            paddingLeft: "40px",
            paddingRight: "40px",
            backgroundColor: "#ff6b6b",
            display: "flex",
            justifyContent: "center"
          }
        },
        children: [
          {
            id: "cards-container",
            label: "Cards Container",
            tag: "div",
            defaultProps: {
              className: "cards-container test-component",
              style: {
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "30px",
                width: "1100px"
              }
            },
            children: [
              {
                id: "card-1",
                label: "Card",
                tag: "div",
                defaultProps: {
                  className: "card test-component",
                  style: {
                    background: "#ffffff",
                    paddingTop: "32px",
                    paddingBottom: "32px",
                    paddingLeft: "32px",
                    paddingRight: "32px",
                    borderTopLeftRadius: "14px",
                    borderTopRightRadius: "14px",
                    borderBottomLeftRadius: "14px",
                    borderBottomRightRadius: "14px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                    color: "#333"
                  }
                },
                children: [
                  {
                    id: "card-1-title",
                    label: "Title",
                    tag: "h3",
                    content: "Drag & Drop Builder",
                    defaultProps: {
                      className: "card-title test-component",
                      style: {
                        fontSize: "22",
                        fontWeight: "600",
                        margin: 0
                      }
                    },
                    children: []
                  },
                  {
                    id: "card-1-text",
                    label: "Text",
                    tag: "p",
                    content: "Build layouts visually using intuitive drag and drop components.",
                    defaultProps: {
                      className: "card-text test-component",
                      style: {
                        fontSize: "16",
                        lineHeight: "1.6",
                        color: "#555"
                      }
                    },
                    children: []
                  }
                ]
              },
              {
                id: "card-2",
                label: "Card",
                tag: "div",
                defaultProps: {
                  className: "card test-component",
                  style: {
                    background: "#ffffff",
                    paddingTop: "32px",
                    paddingBottom: "32px",
                    paddingLeft: "32px",
                    paddingRight: "32px",
                    borderTopLeftRadius: "14px",
                    borderTopRightRadius: "14px",
                    borderBottomLeftRadius: "14px",
                    borderBottomRightRadius: "14px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                    color: "#333"
                  }
                },
                children: [
                  {
                    id: "card-2-title",
                    label: "Title",
                    tag: "h3",
                    content: "Reusable Components",
                    defaultProps: {
                      className: "card-title test-component",
                      style: {
                        fontSize: "22",
                        fontWeight: "600",
                        margin: 0
                      }
                    },
                    children: []
                  },
                  {
                    id: "card-2-text",
                    label: "Text",
                    tag: "p",
                    content: "Create once, reuse everywhere to maintain consistency.",
                    defaultProps: {
                      className: "card-text test-component",
                      style: {
                        fontSize: "16",
                        lineHeight: "1.6",
                        color: "#555"
                      }
                    },
                    children: []
                  }
                ]
              },
              {
                id: "card-3",
                label: "Card",
                tag: "div",
                defaultProps: {
                  className: "card test-component",
                  style: {
                    background: "#ffffff",
                    paddingTop: "32px",
                    paddingBottom: "32px",
                    paddingLeft: "32px",
                    paddingRight: "32px",
                    borderTopLeftRadius: "14px",
                    borderTopRightRadius: "14px",
                    borderBottomLeftRadius: "14px",
                    borderBottomRightRadius: "14px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                    color: "#333"
                  }
                },
                children: [
                  {
                    id: "card-3-title",
                    label: "Title",
                    tag: "h3",
                    content: "Live Preview",
                    defaultProps: {
                      className: "card-title test-component",
                      style: {
                        fontSize: "22",
                        fontWeight: "600",
                        margin: 0
                      }
                    },
                    children: []
                  },
                  {
                    id: "card-3-text",
                    label: "Text",
                    tag: "p",
                    content: "See changes instantly while editing your UI.",
                    defaultProps: {
                      className: "card-text test-component",
                      style: {
                        fontSize: "16",
                        lineHeight: "1.6",
                        color: "#555"
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
        id: "footer",
        label: "Footer",
        icon: Grid,
        tag: "footer",
        rank: 10,
        content: "Footer",
        defaultProps: {
          className: "layout-footer test-component",
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            paddingTop: "50px",
            paddingBottom: "30px",
            paddingLeft: "40px",
            paddingRight: "40px",
            backgroundColor: "#ff6b6b",
            color: "white"
          }
        },
        children: [
          {
            id: "footer-top",
            label: "Footer Top",
            tag: "div",
            defaultProps: {
              className: "footer-top test-component",
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "40px",
                flexWrap: "wrap"
              }
            },
            children: [
              {
                id: "footer-brand",
                label: "Brand",
                tag: "div",
                content: "Sirpam UI Builder",
                defaultProps: {
                  className: "footer-brand test-component",
                  style: {
                    fontSize: "22px",
                    fontWeight: "700",
                    cursor: "pointer"
                  }
                },
                children: []
              },

              {
                id: "footer-links",
                label: "Footer Links",
                tag: "ul",
                defaultProps: {
                  className: "footer-links test-component",
                  style: {
                    listStyle: "none",
                    display: "flex",
                    gap: "25px",
                    flexWrap: "wrap"
                  }
                },
                children: [
                  {
                    id: "footer-link-home",
                    label: "Link",
                    tag: "li",
                    content: "Home",
                    defaultProps: {
                      className: "footer-link test-component",
                      style: { cursor: "pointer" }
                    },
                    children: []
                  },
                  {
                    id: "footer-link-about",
                    label: "Link",
                    tag: "li",
                    content: "About",
                    defaultProps: {
                      className: "footer-link test-component",
                      style: { cursor: "pointer" }
                    },
                    children: []
                  },
                  {
                    id: "footer-link-features",
                    label: "Link",
                    tag: "li",
                    content: "Features",
                    defaultProps: {
                      className: "footer-link test-component",
                      style: { cursor: "pointer" }
                    },
                    children: []
                  },
                  {
                    id: "footer-link-contact",
                    label: "Link",
                    tag: "li",
                    content: "Contact",
                    defaultProps: {
                      className: "footer-link test-component",
                      style: { cursor: "pointer" }
                    },
                    children: []
                  }
                ]
              }
            ]
          },

          {
            id: "footer-divider",
            label: "Divider",
            tag: "div",
            defaultProps: {
              className: "footer-divider test-component",
              style: {
                height: "1px",
                backgroundColor: "rgba(255,255,255,0.4)",
                width: "100%"
              }
            },
            children: []
          },

          {
            id: "footer-bottom",
            label: "Footer Bottom",
            tag: "div",
            defaultProps: {
              className: "footer-bottom test-component",
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "14px",
                flexWrap: "wrap",
                gap: "10px"
              }
            },
            children: [
              {
                id: "footer-copy",
                label: "Copyright",
                tag: "span",
                content: "© 2026 Sirpam UI Builder. All rights reserved.",
                defaultProps: {
                  className: "footer-copy test-component",
                  style: {
                    opacity: "0.9"
                  }
                },
                children: []
              },
              {
                id: "footer-privacy",
                label: "Privacy Link",
                tag: "span",
                content: "Privacy Policy",
                defaultProps: {
                  className: "footer-link test-component",
                  style: {
                    cursor: "pointer",
                    opacity: "0.9"
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