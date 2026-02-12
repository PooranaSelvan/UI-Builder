import { useEffect, useState } from "react";
import axios from "axios";

function usePost(url) {
     const [data, setData] = useState(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);

     async function postData(userData) {
          try {
               let res = await axios.post(url, userData);
               setData(res.data);
               setLoading(false);
          } catch (error) {
               console.log(error);
               setError(error);
          }
     }

     return {postData, data, loading, error };
}


export default usePost;