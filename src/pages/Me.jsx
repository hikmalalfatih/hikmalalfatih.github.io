import React from "react";
import { Link } from "react-router-dom";

import LoaderMe from "../components/loaderMe/LoaderMe";
import MoreInfo from "../components/moreInfoMe/MoreInfo";
import Contact from "../components/contact/Contact";

const Me = () => {
  return (
    <section>
      <LoaderMe />
      <MoreInfo />
      <Contact />
    </section>
  );
};

export default Me;
