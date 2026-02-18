import { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import api from "../utils/axios.js";

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

  // FETCH COMPONENTS
  const fetchCustomComponents = async () => {
    if (!user?.userId) return;

    try {
      const res = await api.get(`/builder/components/${user.userId}`);

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
      const res = await api.post(`builder/components`, { userId: user.userId, ...payload });
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
      await api.delete(`/builder/components/${componentId}`, {
        data: { userId: user.userId }
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
