import React, { useEffect, useState } from 'react'
import TemplateCard from './TemplateCard'
import "./templates.css";
import Footer from "../../../src/components/Footer";
import { useNavigate } from 'react-router-dom';
import api from '../../utils/axios';
import toast from 'react-hot-toast';
import Loading from "../../components/Loading";

const Templates = () => {
  let navigate = useNavigate();
  const [templates, setTemplates] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDatas() {
      try {
        let res = await api.get("/template");

        setTemplates(res.data.data);
      } catch (error) {
        console.log(error);
        console.log(error.response);
        toast.error(error.response?.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDatas();
  }, [navigate]);

  if (loading) {
    return (
      <div style={{height : "90vh", display : "flex", flexWrap : "wrap", alignItems : "center", justifyContent : "center"}}>
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className='template-wrapper'>
        <div className="search-bar">
          <h1>Templates</h1>
        </div>
        <div className="template-container">
          {
            templates.map(ele => (
              <TemplateCard key={ele.templateId} name={ele.templateName} description={ele.description} pageId={ele.templateId} />
            ))
          }
        </div>
        <p>More Templates Coming Soon...</p>
      </div>
      <Footer />
    </>
  )
}

export default Templates