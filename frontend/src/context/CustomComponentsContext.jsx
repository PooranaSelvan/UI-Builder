import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";

export const CustomComponentsContext = createContext(null);

export const CustomComponentsProvider = ({ children, user }) => {
  const [customComponents, setCustomComponents] = useState([]);

  const addCustomComponentToState = (component) => {
    setCustomComponents(prev => [
      ...prev,
      {
        _id: component._id,
        componentName: component.componentName || "My Component",
        icon: component.icon || "Square",
        data: typeof component.data === "string" ? component.data : JSON.stringify(component.data),
      },
    ]);
  };

  const baseUrl = import.meta.env.VITE_SITE_TYPE === "development" ? import.meta.env.VITE_BACKEND_LOCAL : import.meta.env.VITE_BACKEND_PROD;

  // FETCH COMPONENTS
  const fetchCustomComponents = async () => {
    if (!user?.userId) return;

    try {
      const res = await axios.get(`${baseUrl}builder/components/${user.userId}`, {
        withCredentials: true,
      });

      const normalized = (res.data.components || []).map(c => ({
        _id: c._id,
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
      const res = await axios.post(`${baseUrl}builder/components`, { userId: user.userId, ...payload }, { withCredentials: true });
      const saved = res.data.component || res.data;
      addCustomComponentToState(saved);

      return saved;
    } catch (err) {
      console.error(err);
      toast.error("Failed to save component");
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



  return (
    <CustomComponentsContext.Provider
      value={{
        customComponents,
        addCustomComponent,
        deleteCustomComponent,
        setCustomComponents,
        addCustomComponentToState,
      }}
    >
      {children}
    </CustomComponentsContext.Provider>
  );
};

export const useCustomComponents = () => {
  return useContext(CustomComponentsContext);
};
