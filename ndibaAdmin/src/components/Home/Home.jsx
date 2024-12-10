import React, { useState, useEffect } from "react";
import "./Home.css";
import { database } from "../../firebase"; // Import the Realtime Database setup
import { ref, onValue, set, off } from 'firebase/database'; // Import required functions
import About from "../About/About";
import Experience from "../Experience/Experience";
import Projects from "../Projects/Projects";
import Publications from "../Publications/Publications";
import Achievements from "../Achievements/Achievements";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import ConsoleText from "../ConsoleText/ConsoleText";
import Skills from "../Skills/Skills";
import TenorGif from "../Gif /Gif";

const Modal = ({ isOpen, onClose, onSave, name, roles }) => {
  const [newName, setNewName] = useState(name);
  const [newRoles, setNewRoles] = useState(roles.join(", ")); // Convert roles array to string

  const handleSave = () => {
    onSave(newName, newRoles.split(",").map(role => role.trim())); // Split string into array and trim spaces
    onClose(); // Close the modal
  };

  if (!isOpen) return null; // If modal is not open, return null

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

const Home = () => {
  const [name, setName] = useState("Peter Ndiba");
  const [roles, setRoles] = useState(["ROS Developer"]); // Initialize as an array
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userID = "user1"; // Replace with a dynamic value in a real Home

  useEffect(() => {
    // Load initial data from Firebase using the unique user ID
    const nameRef = ref(database, `users/${userID}/name`);
    const roleRef = ref(database, `users/${userID}/role`);

    // Listen for value changes
    onValue(nameRef, (snapshot) => {
      setName(snapshot.val() || "Peter Ndiba");
    });

    onValue(roleRef, (snapshot) => {
      setRoles(snapshot.val() ? snapshot.val().split(",") : ["ROS Developer"]); // Split roles string into array
    });

    // Cleanup the listener on unmount
    return () => {
      off(nameRef); // Remove listener for name
      off(roleRef); // Remove listener for role
    };
  }, [userID]);

  const saveChanges = (newName, newRoles) => {
    // Save changes to Firebase
    set(ref(database, `users/${userID}/name`), newName);
    set(ref(database, `users/${userID}/role`), newRoles.join(",")); // Join array back into string
    setName(newName); // Update local state
    setRoles(newRoles); // Update local roles
  };

  // Function to convert name into span elements
  const formatName = (name) => {
    return name.split('').map((char, index) => (
      <span key={index}>{char}</span>
    ));
  };

  return (
    <div id="home">
      <Navbar />
      <div className="content">
        <TenorGif/>
        <div className="overlay">
          <h1 className="intro-text">
            Hello, I am
            <div
              className="animatey oney"
              style={{ marginTop: "-.1%", marginLeft: "10px" }}
            >
              {formatName(name)} {/* Call the formatName function */}
            </div>
          </h1>
          <p className="intro-sub-text">
            I am a
            <ConsoleText
              words={roles}
              colors={['#24a8e6', '#24a8e6', '#24a8e6']}
            />
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              marginLeft: "40%",
              marginTop: "5%",
              width: "240px",
              height: "50px", // Increased height for better visibility
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#24a8e6", // Bright blue
              color: "#FFF",
              fontSize: "18px",
              cursor: "pointer", // Change cursor to pointer
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", // Add shadow for depth
              transition: "background-color 0.3s ease, transform 0.2s ease", // Smooth transitions
            }}
            id="edit-button"
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#1a8ac1"; // Darker blue on hover
              e.target.style.transform = "scale(1.05)"; // Slightly enlarge
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#24a8e6"; // Revert to original color
              e.target.style.transform = "scale(1)"; // Revert to original size
            }}
          >
            Edit Name and Roles
          </button>

        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={saveChanges}
          name={name}
          roles={roles}
        />

      </div>
      <About />
      <Skills/>
      <Experience />
      <Projects />
      <Publications />
      <Achievements />
      {/* <Contact /> */}
      <Footer />
    </div>
  );
};

export default Home;
