import React from 'react'
import TemplateCard from './TemplateCard'
import "./templates.css";
import Footer from "../../../src/components/Footer"

const Templates = () => {
  return (
    <>
      <div className="search-bar">
        <div className="heading">
          <h1>Templates</h1>
        </div>
        <div className="search-box">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search" aria-hidden="true"><path d="m21 21-4.34-4.34"></path><circle cx="11" cy="11" r="8"></circle></svg>
          <input type="text" placeholder='Search templates...' />
        </div>
      </div>
      <div className="template-container">
        <TemplateCard name={"Sample"} description={"Im a description"} />
        <TemplateCard name={"Sample"} description={"Im a description"} />
        <TemplateCard name={"Sample"} description={"Im a description"} />
        <TemplateCard name={"Sample"} description={"Im a description"} />
        <TemplateCard name={"Sample"} description={"Im a description"} />
        <TemplateCard name={"Sample"} description={"Im a description"} />
      </div>
      <Footer></Footer>
    </>

  )
}

export default Templates