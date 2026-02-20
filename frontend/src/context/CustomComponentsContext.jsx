import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";

export const CustomComponentsContext = createContext(null);

export const CustomComponentsProvider = ({ children, user }) => {
  const [customComponents, setCustomComponents] = useState([]);
  const baseUrl = import.meta.env.VITE_SITE_TYPE === "development" ? import.meta.env.VITE_BACKEND_LOCAL : import.meta.env.VITE_BACKEND_PROD;

  // FETCH COMPONENTS
  const fetchCustomComponents = async () => {


    if (!user?.userId) return;

    try {
      const res = await axios.get(`${baseUrl}builder/components/${user.userId}`, {
        withCredentials: true,
      });

      const normalized = (res.data.components || []).map(c => ({
        _id: c.id,
        componentName: c.componentName || "Unnamed Component",
        icon: c.icon || "Square",
        data: typeof c.data === "string" ? c.data : JSON.stringify(c.data),
      }));

      setCustomComponents(normalized);
    } catch (err) {
      console.error(err);
    }
  };
  

  useEffect(() => {
    if (user?.userId) fetchCustomComponents();
  }, [user]);

  // CREATE
  const addCustomComponent = async (payload) => {
    if (!user?.userId) return null;
  
    try {
      await axios.post(`${baseUrl}builder/components`, { userId: user.userId, ...payload }, { withCredentials: true });
      await fetchCustomComponents();
      return true;
    } catch (err) {
      console.error(err);
      return null;
    }
  };
  

  // DELETE
  const deleteCustomComponent = async (componentId) => {
    if (!user?.userId) return;

    try {
      await axios.delete(`${baseUrl}builder/components/${componentId}`, {
        data: { userId: user.userId },
        withCredentials: true,
      });

      setCustomComponents(prev => prev.filter(c => c._id !== componentId));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete component");
    }
  };

  //UPDATE
  const updateCustomComponent = async (componentId, payload) => {
    if (!componentId) return false;

    const body = {
      data: payload.data, 
    };
  
    if (payload.componentName !== undefined && payload.componentName !== null) {
      body.componentName = payload.componentName;
    }
  
    if (payload.icon !== undefined && payload.icon !== null) {
      body.icon = payload.icon;
    }
  
    try {
      await axios.put(
        `${baseUrl}builder/components/${componentId}`,
        body,
        { withCredentials: true }
      );
  
      await fetchCustomComponents();
      return true;
  
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
      toast.error("Failed to update component");
      return false;
    }
  };
  
  return (
    <CustomComponentsContext.Provider
    value={{
      customComponents,
      addCustomComponent,
      deleteCustomComponent,
      updateCustomComponent
    }}
    
    >
      {children}
    </CustomComponentsContext.Provider>
  );
};

export const useCustomComponents = () => {
  return useContext(CustomComponentsContext);
};
