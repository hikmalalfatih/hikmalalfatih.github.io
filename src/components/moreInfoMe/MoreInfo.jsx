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
          <i class="uil uil-angle-left-b"></i>
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
            Feel free to contact me <i class="uil uil-arrow-up-right"></i>
          </a>
          <div className="info__sosmed">
            <span>Also available on</span>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://wa.me/6281903031378/?text=Hello%20Hikmal"
            >
              WhatsApp <i class="uil uil-arrow-up-right"></i>
            </a>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://instagram.com/hikmalalfatih05"
            >
              Instagram <i class="uil uil-arrow-up-right"></i>
            </a>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://www.linkedin.com/in/hikmal-alfatih-ba264a148"
            >
              LinkedIn <i class="uil uil-arrow-up-right"></i>
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
                href="https://drive.google.com/file/d/13QQTPeuV_KyC8hjwK8MEu-gCbnej9fxH/view?usp=sharing"
              >
                Academic Transcript{" "}
                <i class="uil uil-arrow-up-right"></i>
              </a>
              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://drive.google.com/file/d/1KeKm4urNFo7IGHbsnc0UX60YpqZMBr72/view?usp=drive_link"
              >
                id Card{" "}
                <i class="uil uil-arrow-up-right"></i>
              </a>
            </div>
          </div>
          <div className="info__item">
            <h1>Experience</h1>
            <div className="info__detail">
              <a target="_blank" rel="noreferrer noopener" href="">
                Intern - Technician - PT. iColor Digital Indonesia{" "}
                <i class="uil uil-arrow-up-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="info__typography">
        <div class="typo__filled">
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
        <div class="typo__filled">
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
