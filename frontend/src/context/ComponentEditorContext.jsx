import { createContext, useState } from "react";

export const ComponentEditorContext = createContext(null);

export const ComponentEditorProvider = ({ children }) => {
  const [components, setComponents] = useState([]);

  return (
    <ComponentEditorContext.Provider value={{ components, setComponents }}>
      {children}
    </ComponentEditorContext.Provider>
  );
};
