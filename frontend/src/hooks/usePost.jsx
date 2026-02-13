import { useEffect, useState } from "react";
import axios from "axios";

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
          } catch (error) {
               let message = error.response?.data?.message || "Error Happened!";
               setError(message);
          } finally {
               setLoading(false);
          }
     }

     return { postData, data, loading, error };
}


export default usePost;