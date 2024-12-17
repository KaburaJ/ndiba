import React, { useState, useEffect, Suspense } from "react";
import Navbar from "./components/Navbar/Navbar";
import TenorGif from "./components/Gif/Gif";
import "./App.css";
import ConsoleText from "./components/ConsoleText/ConsoleText";
import Footer from "./components/Footer/Footer";
import { database } from "./firebase"; // Firebase setup
import { ref, onValue, set, off } from 'firebase/database'; // Firebase functions

// Lazy load other components
const About = React.lazy(() => import("./components/About/About"));
const Skills = React.lazy(() => import("./components/Skills/Skills"));
const Projects = React.lazy(() => import("./components/Projects/Projects"));
const Publications = React.lazy(() => import("./components/Publications/Publications"));
const Experience = React.lazy(() => import("./components/Experience/Experience"));
const Achievements = React.lazy(() => import("./components/Achievements/Achievements"));
const Contact = React.lazy(() => import("./components/Contact/Contact"));

const Modal = ({ isOpen, onClose, onSave, name, roles }) => {
  const [newName, setNewName] = useState(name);
  const [newRoles, setNewRoles] = useState(roles.join(", "));

  const handleSave = () => {
    onSave(newName, newRoles.split(",").map(role => role.trim()));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Information</h2>
        <label>
          Name:
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </label>
        <label>
          Roles (separated by commas):
          <input
            type="text"
            value={newRoles}
            onChange={(e) => setNewRoles(e.target.value)}
          />
        </label>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [name, setName] = useState("Peter Ndiba");
  const [roles, setRoles] = useState(["ROS Developer"]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userID = "user1";

  useEffect(() => {
    const nameRef = ref(database, `users/${userID}/name`);
    const roleRef = ref(database, `users/${userID}/role`);

    onValue(nameRef, (snapshot) => {
      setName(snapshot.val() || "Peter Ndiba");
    });

    onValue(roleRef, (snapshot) => {
      setRoles(snapshot.val() ? snapshot.val().split(",") : ["ROS Developer"]);
    });

    return () => {
      off(nameRef);
      off(roleRef);
    };
  }, [userID]);

  const saveChanges = (newName, newRoles) => {
    set(ref(database, `users/${userID}/name`), newName);
    set(ref(database, `users/${userID}/role`), newRoles.join(","));
    setName(newName);
    setRoles(newRoles);
  };

  const formatName = (name) => {
    return name.split(" ").map((word, wordIndex) => (
      <span key={wordIndex} style={{ marginRight: "5px" }}>
        {word.split("").map((char, index) => (
          <span key={index}>{char}</span>
        ))}
      </span>
    ));
  };

  return (
    <div id="home">
      <Navbar />
      <div className="content">
        <TenorGif />
        <div className="overlay">
          <h1 className="intro-text">
            Hello, I am
            <div
              className="animatey oney"
              style={{ marginTop: "-.1%", marginLeft: "10px" }}
            >
              {formatName(name)}
            </div>
          </h1>
          <p className="intro-sub-text">
            I am a
            <ConsoleText
              words={roles}
              colors={["#24a8e6", "#24a8e6", "#24a8e6"]}
            />
          </p>
        </div>
        
      </div>

      {/* Suspense Wrapping Lazy Loaded Components */}
      <Suspense fallback={<div>Loading...</div>}>
        <About />
        <Skills />
        <Experience />
        <Projects />
        {/* <Publications /> */}
        <Achievements />
        <Contact />
      </Suspense>
      <Footer />
    </div>
  );
};

export default App;
