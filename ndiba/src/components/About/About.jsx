import React from "react";
import { FaDownload, FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import "./About.css"
import contributions from "../images/contributions.PNG"

const About = () => {
    return (
        <div className="about-container" id="about">
            <div
                        className="animate one"
                        style={{ marginTop: "-.1%", marginLeft: "10px" }}
                    >
                        <span>A</span>
                        <span>b</span>
                        <span>o</span>
                        <span>u</span>
                        <span>t</span>&nbsp;
                        <span>M</span>
                        <span>e</span>
                    </div>
            <div className="about">
                <div className="column-one">
                    <div className="column-tag">
                        <p className="column-tag-title">Name: </p>
                        <p>Peter Ndiba</p>
                    </div>
                    <div className="column-tag">
                        <p className="column-tag-title">Profile: </p>
                        <p>ROS Developer, PCB Designer, Mechatronics Engineer</p>
                    </div>
                    <div className="column-tag">
                        <p className="column-tag-title">Email: </p>
                        <p>ndibapeter4@gmail.com</p>
                    </div>
                    <div className="column-tag">
                        <p className="column-tag-title">Phone: </p>
                        <p>+254757159399</p>
                    </div>
                    <div className="column-tag">
                        <p className="column-tag-title">Profiles: </p>
                        <div className="icons">
                            <FaLinkedin style={{ color: "#24a8e6", fontSize: "1.5rem", marginTop: "15px" }} />
                            <FaGithub style={{ color: "#24a8e6", fontSize: "1.5rem", marginLeft: "10px" }} />
                            <FaYoutube style={{ color: "#24a8e6", fontSize: "1.5rem", marginLeft: "10px" }} />
                        </div>
                    </div>
                </div>
                <div className="column-two">
                    
                    <div>
                        I completed my <span className="about-key-word">BSc in Mechatronics Engineering</span> at <span className="about-key-word">Dedan Kimathi University of Technology</span>
                        <br></br><br></br>

                        I love to play the Guitar, Flute and Keyboard, and I actively participate in football and cricket matches, which keeps me physically active.
                        <br></br>
                        <br></br>

                        🏆 I am a <span className="about-key-word">HubSpot Certified Digital Marketer</span>.
                    </div>

                </div>

            </div>
            <div className="github">
                <button className="resume-download"><FaDownload style={{ color: "white", fontSize: "1rem", marginRight: "20px" }} />Download my Resume</button>

                {/* <p>These are my GitHub Contributions since 2023</p>
                <img src={contributions}></img>
                <p>Last Update (British Standard Time): <span className="about-key-word">July 12, 2024 at 7:53:59 PM</span> */}

                {/* </p> */}
            </div>
        </div>
    )
}

export default About