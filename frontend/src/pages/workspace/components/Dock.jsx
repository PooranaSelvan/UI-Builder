import React from 'react';
import "./docs.css";
import { ZoomIn, ZoomOut, RotateCw, Minimize2, Maximize2 } from 'lucide-react';

const Dock = ({ zoom, onZoomOut, onZoomIn, onReset }) => {
     let zoomPercentage = Math.round(zoom * 100);
     let canZoomIn = zoom < 2;
     let canZoomOut = zoom > 0.25;


     return (
          <div className='dock-wrapper'>
               <ZoomOut onClick={onZoomOut} disabled={!canZoomOut} />
               <input type="text" value={`${zoomPercentage}%`} readOnly />
               <ZoomIn onClick={onZoomIn} disabled={!canZoomIn} />
               <div className="divider-line" />
               {zoom < 1 ? (
                    <Maximize2 onClick={onReset} />
               ) : zoom === 1 ? (
                    <RotateCw onClick={onReset} />
               ) : (
                    <Minimize2 onClick={onReset} />
               )}
          </div>
     )
}

export default Dock