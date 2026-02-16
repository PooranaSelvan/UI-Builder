import React from 'react'
import TemplateCard from './TemplateCard'
import "./templates.css";
import Footer from "../../../src/components/Footer"

const Templates = () => {
  return (
    <>
      <div className="template-container">
        <TemplateCard></TemplateCard>
        <TemplateCard></TemplateCard>
        <TemplateCard></TemplateCard>
        <TemplateCard></TemplateCard>
        <TemplateCard></TemplateCard>
        <TemplateCard></TemplateCard>
        <TemplateCard></TemplateCard>
        <TemplateCard></TemplateCard>
        <TemplateCard></TemplateCard>
      </div>
      <Footer></Footer>
    </>

  )
}

export default Templates