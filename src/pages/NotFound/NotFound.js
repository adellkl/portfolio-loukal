import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";



const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
       
        <div className="not-found-text">
          
          <h1>OUPS ! PAGE INTROUVABLE.</h1>
          <p>
          Pas de panique 
          </p>
          <Link to="/" className="not-found-button">HOME</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
