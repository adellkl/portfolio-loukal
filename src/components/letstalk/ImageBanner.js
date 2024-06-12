import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./ImageBanner.css";
import ImageBannerSrc from "../../assets/images/letstalk.webp"; // Ajustez le chemin selon l'endroit où vous avez sauvegardé l'image

const ImageBanner = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className={`image-banner ${isHomePage ? "left" : "right"}`}>
      <Link to="/contact">
        <img src={ImageBannerSrc} alt="Let's Talk" />
      </Link>
    </div>
  );
};

export default ImageBanner;
