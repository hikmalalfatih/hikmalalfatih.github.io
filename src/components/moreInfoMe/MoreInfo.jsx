import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import picture from "../../assets/profileImage.JPG";

import "./moreInfo.css";
import { Link } from "react-router-dom";

const MoreInfo = () => {
  const { scrollYProgress } = useScroll();
  const first = useTransform(scrollYProgress, [0, 1], [0, 600]);
  const second = useTransform(scrollYProgress, [0, 1], [0, 400]);
  return (
    <section className="info">
      <div className="back__button">
        <Link to="/">
          <i className="uil uil-angle-left-b"></i>
        </Link>
      </div>
      <div className="info__container">
        <div className="info__me">
          <div className="info__more">
            <img className="info__picture" src={picture} alt="" />
            <span>
              I am a professional certified technician for all Apple devices since 2022.
              I am proficient in repairing and troubleshooting Apple software and hardware.
              I have been involved in several official Apple service providers 
              and have many customers who trust me to handle their Apple products.
            </span>
          </div>
          <a href="#info__contact">
            Feel free to contact me <i className="uil uil-arrow-up-right"></i>
          </a>
          <div className="info__sosmed">
            <span>Also available on</span>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://wa.me/6281903031378/?text=Hello%20Hikmal"
            >
              WhatsApp <i className="uil uil-arrow-up-right"></i>
            </a>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://instagram.com/hikmalalfatih"
            >
              Instagram <i className="uil uil-arrow-up-right"></i>
            </a>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://www.linkedin.com/in/hikmal-alfatih-ba264a148"
            >
              LinkedIn <i className="uil uil-arrow-up-right"></i>
            </a>
          </div>
        </div>
        <div className="info__achieve">
          <div className="info__item">
            <h1>Certificate</h1>
            <div className="info__detail">
              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://drive.google.com/file/d/10gp7yppJlmyCRH_iUHKwpwRZLFS-r-Ox/view?usp=sharing"
              >
                Academic Transcript{" "}
                <i className="uil uil-arrow-up-right"></i>
              </a>
              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://drive.google.com/file/d/1WMvKPNLi9YPFcgzEacuh5jbwStjU980Y/view?usp=sharing"
              >
                Certificate of Completion{" "}
                <i className="uil uil-arrow-up-right"></i>
              </a>
              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://drive.google.com/file/d/1Chml6SGk3UtQz0rneIVayaweMNn_HBbj/view?usp=sharing"
              >
                Machine Expert{" "}
                <i className="uil uil-arrow-up-right"></i>
              </a>
            </div>
          </div>
          <div className="info__item">
            <h1>Experience</h1>
            <div className="info__detail">
              <a target="_blank" rel="noreferrer noopener" href="https://www.instagram.com/bdg.applenesia/reel/DdD_r1lTjtj/">
                Machine Expert - Applenesia{" "}
                <i className="uil uil-arrow-up-right"></i>
              </a>
              <a target="_blank" rel="noreferrer noopener" href="https://drive.google.com/file/d/14_b89l3c8n7KDSrPBJA9m7_TZH_fj6GJ/view?usp=sharing">
                Machine Expert certificate{" "}
                <i className="uil uil-arrow-up-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="info__typography">
        <div className="typo__filled">
          <motion.h1
            initial={{ x: -1800 }}
            animate={{ x: 0, transition: { duration: 0.8 } }}
            style={{ x: first }}
            className="info__typo"
          >
            contact <span className="typo__outline">me</span> - contact{" "}
            <span className="typo__outline">me</span> - contact{" "}
            <span className="typo__outline">me</span> - contact{" "}
            <span className="typo__outline">me</span> - contact{" "}
            <span className="typo__outline">me</span> -
          </motion.h1>
        </div>
        <div className="typo__filled">
          <motion.h1
            initial={{ x: -1800 }}
            animate={{ x: 0, transition: { duration: 0.8 } }}
            style={{ x: second }}
            className="info__typo"
          >
            <span className="typo__outline"> contact</span> me -{" "}
            <span className="typo__outline"> contact</span> me -{" "}
            <span className="typo__outline"> contact</span> me -{" "}
            <span className="typo__outline"> contact</span> me -{" "}
            <span className="typo__outline"> contact</span> me -{" "}
            <span className="typo__outline"> contact</span> me -{" "}
            <span className="typo__outline"> contact</span> me -
          </motion.h1>
        </div>
      </div>
    </section>
  );
};

export default MoreInfo;
