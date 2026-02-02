import { useEffect, useState } from "react";
import axios from "axios";

function postFetch(url, userData) {
     const [data, setData] = useState(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);

     useEffect(async () => {
          try {
               let res = await axios.post(url, userData);
               setData(res.data);
               setLoading(false);
          } catch (error) {
               console.log(error);
               setError(error);
          }
     }, [url]);

     return { data, loading, error };
}


export default postFetch;