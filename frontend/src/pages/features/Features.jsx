import React from 'react';
import "./features.css";
import Footer from '../../components/Footer.jsx';
import Button from '../../components/Button.jsx';
import { MoveRight, Play, Check } from 'lucide-react';
import float from './assets/float.png';
import publish from './assets/publish.png';
import connectivity from './assets/connectivity.png';

const bottomStyle = {
  gap : '15px'
}

const Features = () => {
  return (
    <>
      <div className="feature-container">
        <div className="heading-section">
          <div className="heading-content">
            <h1>Build powerful websites <span>without limits.</span></h1>
          </div>
          <div className="heading-text">
            <p>Design and launch websites at the speed of thought. A minimalist canvas for maximum productivity.</p>
          </div>
          <div className="heading-btn">
            <Button className='build-btn'>Start Building <MoveRight size={12} /></Button>
            <Button className='demo-btn'><Play size={12} color='red' /> View Demo</Button>
          </div>
        </div>
        <div className="features">
          <div className="features-content">
            <div className="feature-image">
              <div className="floating-box">
                <img src={float} alt="float-animation" />
              </div>
            </div>
            <div className="feature-text">
              <span>
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
                </svg>
                <p>Visual Builder</p>
              </span>
              <h2>Pixel-perfect design,<span>effortlessly.</span></h2>
              <p>Create amazing interfaces with our drag-and-drop canvas.</p>
              <ul>
                <li>
                  <span className='check'><Check size={14} /></span>
                  Drag-and-drop components
                </li>
                <li>
                  <span className='check'><Check size={14} /></span>
                  Auto-responsive layouts
                </li>
                <li>
                  <span className='check'><Check size={14} /></span>
                  Pre-built templates
                </li>
              </ul>
            </div>
          </div>
          <div className="features-content">
            <div className="feature-text">
              <span>
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                </svg>
                <p>Connectivity</p>
              </span>
              <h2>Your data,<span>unified instantly.</span></h2>
              <p>Connect to a database or API in seconds. Whether it is Excel Sheets, sync your data without writing code.</p>
            </div>
            <div className="feature-image">
              <div className="floating-box connect-float">
                <img src={connectivity} alt="float-animation" id='connectivity-image'/>
              </div>
            </div>
          </div>
          <div className="features-content">
            <div className="feature-image publish-image">
              <div className="floating-box publish-float">
                <img src={publish} alt="float-animation" id='publish'/>
              </div>
            </div>
            <div className="feature-text">
              <span>
                <span id='publish-dot'></span>
                <p>Visual Builder</p>
              </span>
              <h2>Pixel-perfect design,<span>effortlessly.</span></h2>
              <p>Create amazing interfaces with our drag-and-drop canvas.</p>
              <ul>
                <li>
                  <span className='check'><Check size={14} /></span>
                  Drag-and-drop components
                </li>
                <li>
                  <span className='check'><Check size={14} /></span>
                  Auto-responsive layouts
                </li>
                <li>
                  <span className='check'><Check size={14} /></span>
                  Pre-built templates
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="feature-bottom">
          <div className="bottom-text">
            <h1>Ready to build your Next Tool?</h1>
          </div>
          <div className="heading-btn">
            <Button className='build-btn' style={bottomStyle}>Get Started <MoveRight size={14} /></Button>
            <Button className='demo-btn'>Watch Demo</Button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default Features