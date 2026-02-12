import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function usePost(url) {
     const [data, setData] = useState(null);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState(null);

     async function postData(userData) {
          try {
               setLoading(true);
               setError(null);

               let res = await axios.post(url, userData, { withCredentials: true });
               setData(res.data);
               setLoading(false);
               toast.success(res.data.message || "Success");
          } catch (error) {
               let message = error.response?.data?.message || "Error Happened!";
               setError(message);
               toast.error(message);
          } finally {
               setLoading(false);
          }
     }

     return { postData, data, loading, error };
}


export default usePost;