import React from 'react'
import sales from "./assets/sales.png"
import "./templateCard.css"
import { Eye, ExternalLink } from 'lucide-react'
import Button from '../../components/Button.jsx'

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
        <div className="button-part">
            <Button className='btn-view'><Eye size={16}/>View Template</Button>
            <Button className='btn-open'><ExternalLink size={16}/>Open Template</Button>
            {/* <button className='btn-view'><Eye/>View Template</button>
            <button className='btn-open'>Open Template</button> */}
        </div>
    </div>
  );
}

export default TemplateCard 