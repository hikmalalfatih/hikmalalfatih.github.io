import React from "react";

import Header from "../components/header/Header";
import Loader from "../components/loaderHome/Loader";
import Navbar from "../components/navbar/Navbar";
import Work from "../components/work/Work";
import About from "../components/about/About";
import Services from "../components/services/Services";
import Footer from "../components/footer/Footer";

const Home = () => {
  return (
    <div>
      <Loader />
      <Navbar />
      <Header />
      <About />
      <Work />
      <Services />
      <Footer />
    </div>
  );
};

export default Home;
