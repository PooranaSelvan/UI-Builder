import { createContext, useState } from "react";


export const ComponentContext = createContext(null);

export const ComponentProvider = ({ children }) => {
     const [components, setComponents] = useState([]);

     return (
          <ComponentContext.Provider value={{components, setComponents}}>
               {children}
          </ComponentContext.Provider>
     );
}