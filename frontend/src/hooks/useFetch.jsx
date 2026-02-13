import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function useFetch(url) {
     const [data, setData] = useState(null);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState(null);

     async function fetchData() {
          try {
               setLoading(true);
               setError(null);

               let res = await axios.get(url, { withCredentials: true });
               setData(res.data);
               setLoading(false);
          } catch (error) {
               let message = error.response?.data?.message || "Error Happened!";
               setError(message);
          } finally {
               setLoading(false);
          }
     }

     return { fetchData, data, loading, error };
}


export default useFetch;