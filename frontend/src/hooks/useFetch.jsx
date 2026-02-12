import { useEffect, useState } from "react";
import axios from "axios";

function useFetch(url) {
     const [data, setData] = useState(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);

     async function fetchData() {
          try {
               let res = await axios.get(url);
               setData(res.data);
               setLoading(false);
          } catch (error) {
               console.log(error);
               setError(error);
          }
     }

     return {fetchData, data, loading, error };
}


export default useFetch;