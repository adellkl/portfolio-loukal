import React, { useState } from "react";
import "./style.css";
import { VscGrabber, VscClose } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { logotext, socialprofils } from "../content_option";
import Themetoggle from "../components/themetoggle";

const Headermain = () => {
  const [isActive, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!isActive);
    document.body.classList.toggle("ovhidden");
  };

  return (
    <>
      <header className="fixed-top site__header">
        <div className="d-flex align-items-center justify-content-between">
          <Link className="navbar-brand nav_ac" to="/">
            {logotext}
          </Link>
          <div className="d-flex align-items-center">
            <Themetoggle />
            <button
              className="menu__button nav_ac"
              onClick={handleToggle}
              aria-label={isActive ? "Close Menu" : "Open Menu"}
            >
              {isActive ? <VscClose /> : <VscGrabber />}
            </button>
          </div>
        </div>

        <div className={`site__navigation ${!isActive ? "" : "menu__opend"}`}>
          <div className="bg__menu h-100">
            <div className="menu__wrapper">
              <div className="menu__container p-3">
                <ul className="the_menu">
                  <li className="menu_item">
                    <Link onClick={handleToggle} to="/" className="my-3">Accueil</Link>
                  </li>
                  <li className="menu_item">
                    <Link onClick={handleToggle} to="/portfolio" className="my-3">Portfolio</Link>
                  </li>
                  <li className="menu_item">
                    <Link onClick={handleToggle} to="/about" className="my-3">À propos</Link>
                  </li>
                  <li className="menu_item">
                    <Link onClick={handleToggle} to="/contact" className="my-3">Contact</Link>
                  </li>
                  <li className="menu_item">
                    <Link onClick={handleToggle} to="/blog" className="my-3">Blog</Link>
                  </li>
                  <li className="menu_item">
                    <a
                      onClick={handleToggle}
                      href="https://www.canva.com/design/DAGWiduMpEs/IgC6O8Gxos00pVkuEmrQMA/view?utm_content=DAGWiduMpEs&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h4d49f55c00"
                      className="my-3"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Curriculum Vitae
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="menu_footer d-flex flex-column flex-md-row justify-content-between align-items-md-center position-absolute w-100 p-3">
            <div className="d-flex">
              <a href={socialprofils.github} target="_blank" rel="noopener noreferrer">Github</a>
              <a href={socialprofils.linkedin} target="_blank" rel="noopener noreferrer">Linkedin</a>
            </div>
            <p className="copyright m-0">© {logotext}</p>
          </div>
        </div>
      </header>
      <div className="br-top"></div>
      <div className="br-bottom"></div>
      <div className="br-left"></div>
      <div className="br-right"></div>
    </>
  );
};

export default Headermain;
