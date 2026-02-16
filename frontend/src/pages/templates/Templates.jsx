import React from 'react'
import TemplateCard from './TemplateCard'
import "./templates.css";
import Footer from "../../../src/components/Footer"

const Templates = () => {
  return (
    <>
      <div className="search-bar">
        <div className="heading">
          <h2>Templates</h2>
        </div>
        <div className="search-box">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search" aria-hidden="true"><path d="m21 21-4.34-4.34"></path><circle cx="11" cy="11" r="8"></circle></svg>
          <input type="text" placeholder='Search templates...' />
        </div>
      </div>
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