import React from 'react';
import "./docs.css";
import { ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

const Dock = ({zoom, onZoomOut, onZoomIn, onReset }) => {
     let zoomPercentage = Math.round(zoom * 100);
     let canZoomIn = zoom < 2;
     let canZoomOut = zoom > 0.25;


     return (
          <div className='dock-wrapper'>
               <ZoomOut onClick={onZoomOut} disabled={!canZoomOut} />
               <input type="text" value={`${zoomPercentage}%`} readOnly />
               <ZoomIn onClick={onZoomIn} disabled={!canZoomIn} />
               <div className="v-line" />
               <RotateCw onClick={onReset} />
          </div>
     )
}

export default Dock