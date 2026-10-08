import { useState } from "react";

import Header from "../components/header/Header";
import Navbar from "../components/navbar/Navbar";
import Welcome from "../components/welcome/Welcome";
import About from "../components/about/About";
import Experience from "../components/experience/Experience";
import Services from "../components/services/Services";
import Work from "../components/work/Work";
import Footer from "../components/footer/Footer";

const Home = () => {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <div
      className={`min-h-screen bg-paper text-ink ${
        introComplete ? "animate-[site-reveal_1100ms_cubic-bezier(0.22,1,0.36,1)_both]" : ""
      }`}
    >
      {!introComplete && <Welcome onComplete={() => setIntroComplete(true)} />}
      <Navbar />
      <main>
        <Header />
        <About />
        <Experience />
        <Services />
        <Work />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
