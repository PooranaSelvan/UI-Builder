import { createContext, useContext, useState } from "react";
const ComponentContext = createContext();

export const ComponentProvider = ({ children }) => {
  const [customComponentDraft, setCustomComponentDraft] = useState({
    name: "",
    iconName: null,
    schema: null
  });

  const setIcon = (iconName) => {
    setCustomComponentDraft(prev => ({
      ...prev,
      iconName
    }));
  };

  return (
    <ComponentContext.Provider
      value={{
        customComponentDraft,
        setCustomComponentDraft,
        setIcon
      }}
    >
      {children}
    </ComponentContext.Provider>
  );
};


export const useComponentContext = () => useContext(ComponentContext);
