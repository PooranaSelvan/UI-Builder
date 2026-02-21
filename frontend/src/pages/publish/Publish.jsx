import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from "react-hot-toast";
import Loading from '../../components/Loading';
import RenderComponents from "../../components/RenderComponents";
import api from "../../utils/axios.js";

const Project = () => {
  const { pageUrl } = useParams();
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      console.log(pageUrl);
      try {
        let res = await api.get(`/builder/publish/${pageUrl}`);

        console.log(res.data);

        setComponents(res.data.data || []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error.response);
        if (error.response.status === 404) {
          toast.error(error.response?.data.message);
          navigate("/dashboard");
        }

        if (error.response.status === 400) {
          toast.error(error.response?.data.message);
          navigate("/dashboard");
        }
      }
    }

    fetchData();
  }, [pageUrl]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
        <Loading />
      </div>
    );
  }

  if (components.length === 0) {
    toast.error("This web-page is not Developed!");
    navigate("/");
    // return;
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