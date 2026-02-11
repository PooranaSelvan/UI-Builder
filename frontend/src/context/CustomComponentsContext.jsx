import { createContext, useState , useContext } from "react";

export const CustomComponentsContext = createContext(null);

export const CustomComponentsProvider = ({ children }) => {
  const [customComponents, setCustomComponents] = useState([]);

  return (
    <CustomComponentsContext.Provider
      value={{ customComponents, setCustomComponents }}>
      {children}
    </CustomComponentsContext.Provider>
  );
};
export const useCustomComponents = () => {
    const context = useContext(CustomComponentsContext);
  
    if (!context) {
      throw new Error(
        "useCustomComponents must be used inside CustomComponentsProvider"
      );
    }
  
    return context;
  };