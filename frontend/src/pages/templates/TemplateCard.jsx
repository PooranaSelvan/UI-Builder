import React from 'react'
import sales from "./assets/sales.jpg"
import "./templateCard.css"

const TemplateCard = () => {
  return (
    <div className="template-card">
        <div className="image-part">
            <img src={sales} alt="template" className='template-img'/>
        </div>
        <div className="content-part">
            <h3 className='template-heading'>Sample-template</h3>
            <p className='template-description'>sample template description</p>
        </div>
    </div>
  );
}

export default TemplateCard 