import {
  Type,
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
  Table,
  BarChart,
  Heading,
  AlignLeft
} from "lucide-react";

export const components = [
  {
    title: "Layout",
    type: "grid",
    items: [
      { id: "row", label: "Row", icon: Grid },
      { id: "column", label: "Column", icon: Layout },
      { id: "table", label: "Table", icon: Table }
    ]
  },
  {
    title: "Basic Elements",
    type: "grid",
    items: [
      { id: "text", label: "Text", icon: Type },
      { id: "heading", label: "Heading", icon: Heading },
      { id: "paragraph", label: "Paragraph", icon: AlignLeft },
      { id: "image", label: "Image", icon: Image },
      { id: "button", label: "Button", icon: MousePointerClick },
      { id: "link", label: "Link", icon: Link2 },
      { id: "container", label: "Container", icon: Square },
      { id: "divider", label: "Divider", icon: Minus },
      { id: "video", label: "Video", icon: Video }
    ]
  },
  {
    title: "Forms",
    type: "grid",
    items: [
      { id: "input", label: "Input", icon: FormInput },
      { id: "textarea", label: "Textarea", icon: AlignLeft },
      { id: "select", label: "Select", icon: List }
    ]
  }
];
