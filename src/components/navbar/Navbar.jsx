import React, { useState } from "react";
import "./navbar.css";

const Navbar = () => {
  const [activeNav, setActiveNav] = useState("#header");
  return (
    <nav>
      <div className="nav__name">
        <span>Hi, my name is</span>
        <span>Hikmal Alfatih</span>
      </div>
      <div className="nav__container">
        <div className="nav__menu">
          <a href="#header" onClick={() => setActiveNav("#header")}>
            <i
              className={
                activeNav === "#header"
                  ? "active__nav nav__icon uil uil-estate"
                  : "nav__icon uil uil-estate"
              }
            ></i>
            <span className="nav__link">Home</span>
          </a>
          <a href="#about" onClick={() => setActiveNav("#about")}>
            <i
              className={
                activeNav === "#about"
                  ? "active__nav nav__icon uil uil-user"
                  : "nav__icon uil uil-user"
              }
            ></i>
            <span className="nav__link">About</span>
          </a>
          <a href="#work" onClick={() => setActiveNav("#work")}>
            <i
              className={
                activeNav === "#work"
                  ? "active__nav nav__icon uil uil-folder-open"
                  : "nav__icon uil uil-folder-open"
              }
            ></i>
            <span className="nav__link">Work</span>
          </a>
        </div>
        <div className="nav__contact">
          <a href="#services" onClick={() => setActiveNav("#services")}>
            <i
              className={
                activeNav === "#services"
                  ? "active__nav nav__icon uil uil-bookmark"
                  : "nav__icon uil uil-bookmark"
              }
            ></i>
            <span className="nav__link">Service</span>
          </a>
          <a href="#footer" onClick={() => setActiveNav("#footer")}>
            <i
              className={
                activeNav === "#footer"
                  ? "active__nav nav__icon uil uil-comment-lines"
                  : "nav__icon uil uil-comment-lines"
              }
            ></i>
            <span className="nav__link">Contact</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
