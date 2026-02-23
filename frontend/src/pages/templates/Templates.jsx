import React from 'react'
import TemplateCard from './TemplateCard'
import "./templates.css";
import Footer from "../../../src/components/Footer";

const Templates = () => {
  return (
    <>
      <div className='template-wrapper'>
        <div className="search-bar">
          <h1>Templates</h1>
        </div>
        <div className="template-container">
          <TemplateCard name={"Sample"} description={"Im a description"} />
          <TemplateCard name={"Sample"} description={"Im a description"} />
          <TemplateCard name={"Sample"} description={"Im a description"} />
        </div>
        <p>More Templates Coming Soon...</p>
      </div>
      <Footer />
    </>
  )
}

export default Templates