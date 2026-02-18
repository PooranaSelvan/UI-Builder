import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import Loading from '../../components/Loading';
import RenderComponents from "../../components/RenderComponents";

const Project = () => {
  const { pageId } = useParams();
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(false);
  const baseUrl = import.meta.env.VITE_SITE_TYPE === "development" ? import.meta.env.VITE_BACKEND_LOCAL : import.meta.env.VITE_BACKEND_PROD;
  let navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        let res = await axios.get(`${baseUrl}builder/publish/${pageId}`, {
          withCredentials: true
        });

        // console.log(res);

        setComponents(res.data.data || []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error.response);
        if (error.response.status === 404) {
          toast.error(error.response?.data.message);
          navigate("/dashboard");
        }
      }
    }

    fetchData();
  }, [pageId]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
        <Loading />
      </div>
    );
  }

  if (components.length === 0) {
    return (
      <div>There is No Components to Preview!</div>
    );
  }

  return (
    components.length && (
      <RenderComponents>
        {components}
      </RenderComponents>
    )
  )
}

export default Project