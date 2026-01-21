import React from "react";
import "./errorPage.css";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import errorImage from "../../assets/error-msg.png";

const ErrorPage = () => {
     let navigate = useNavigate();

     return (
          <div className="error-container">
               <div className="error-card">
                    <h1 className="error-code">404</h1>
                    <h2 className="error-title">Page Not Found</h2>
                    <button style={{ padding: "10px 20px", borderRadius: "8px", fontSize: "14px", fontWeight: "600" }} className="primary-button" onClick={() => navigate("/")}>
                         Go Back Home
                    </button>
               </div>
          </div>
     );
};

export default ErrorPage;