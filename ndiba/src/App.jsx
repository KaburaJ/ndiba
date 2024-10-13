import React from "react";
import Navbar from "./components/Navbar/Navbar";
import TenorGif from "./components/Gif/Gif";
import "./App.css";
import ConsoleText from "./components/ConsoleText/ConsoleText";
import { FaDownload, FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Publications from "./components/Publications/Publications";
import Experience from "./components/Experience/Experience";
import Achievements from "./components/Achievements/Achievements";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

const App = () => {

  return (
    <div id="home">
      <Navbar />
      <div style={{ height: "97vh", paddingTop: "20px", marginLeft: "5%", display: "flex", flexDirection: "column" }}>
        <TenorGif />
        <div className="overlay">
          <h1 className="intro-text">
            Hello, I am
            <div
              className="animatey oney"
              style={{ marginTop: "-.1%", marginLeft: "10px" }}
            >
              <span> P</span>
              <span>e</span>
              <span>t</span>
              <span>e</span>
              <span>r</span>&nbsp;
              <span>N</span>
              <span>d</span>
              <span>i</span>
              <span>b</span>
              <span>a</span>
            </div>
          </h1>
          <p className="intro-sub-text">
            I am a
            <ConsoleText
              words={['ROS Developer', 'PCB Designer', 'Mechatronics Engineer']}
              colors={['#24a8e6', '#24a8e6', '#24a8e6']}
            />
          </p>
        </div>
      </div>
      <About/>
      <Experience/>
      <Projects/>
      <Publications/>
      <Achievements/>
      <Contact/>
      <Footer/>
    </div>
  );
};

export default App;
