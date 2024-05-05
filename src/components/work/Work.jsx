import React from "react";
import malih from "../../assets/malih.JPG";
import "./work.css";

const Work = () => {
  return (
    <section className="work" id="work">
      <div className="work__title">
        <div className="work__typography">
          <h2>work</h2>
          <h2>work</h2>
          <h2>work</h2>
        </div>
        <span>Featured Projects</span>
      </div>
      <div className="work__container">
        <div className="work__menu">
          <div className="work__item">
            <img
              className="work__image"
              src={malih}
              alt="Personal Profil"
            />
            <div className="work__button">
              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://game.hikmalalfatih.repl.co"
              >
                <i class="uil uil-arrow-up-left"></i>
                <span>Online Preview</span>
              </a>
            </div>
          </div>
          <div className="work__text">
            <span className="title__link">01.</span>
            <div className="work__subtitle">
              <span className="title__link">Permainan Sederhana</span>
              <p>Tebak Angka</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
