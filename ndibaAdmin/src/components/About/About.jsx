import React, { useState, useEffect } from "react";
import { FaDiscord, FaDownload, FaGithub, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { database } from "../../firebase"; // Adjust the path based on your structure
import { ref, onValue, set } from "firebase/database";
import "./About.css";

const About = () => {
    const userId = "user1"; // Replace this with your actual user ID or authentication logic
    const [isModalOpen, setModalOpen] = useState(false);
    const [socialLinks, setSocialLinks] = useState({
        linkedin: '',
        github: '',
        youtube: '',
        twitter: '',
        discord: ''

    });
    const [contactInfo, setContactInfo] = useState({
        email: '',
        phone: '',
        about: '',
        resumeUrl: '', // Initially empty, will be fetched from Firebase
    });

    // Fetch user data from Firebase
    useEffect(() => {
        const userRef = ref(database, `users/${userId}/about/`);
        const unsubscribe = onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setSocialLinks({
                    linkedin: data.socialLinks?.linkedin || '',
                    github: data.socialLinks?.github || '',
                    youtube: data.socialLinks?.youtube || '',
                    twitter: data.socialLinks?.twitter || '',
                    discord: data.socialLinks?.discord || ''
                });
                setContactInfo({
                    email: data.email || '',
                    phone: data.phone || '',
                    about: data.about || '',
                    resumeUrl: data.resumeUrl || '',
                });
            } else {
                console.log("No entries found.");
            }
        });

        return () => unsubscribe();
    }, [userId]);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (['linkedin', 'github', 'youtube', 'twitter', 'discord'].includes(name)) {
            setSocialLinks({ ...socialLinks, [name]: value });
        } else {
            setContactInfo({ ...contactInfo, [name]: value });
        }
    };

    // Save links and contact info to Firebase
    const handleSaveInfo = () => {
        const userRef = ref(database, `users/${userId}/about`);
        set(userRef, {
            socialLinks,
            email: contactInfo.email,
            phone: contactInfo.phone,
            about: contactInfo.about,
            resumeUrl: contactInfo.resumeUrl // Ensure this is updated
        })
            .then(() => {
                setModalOpen(false); // Close modal after saving
            })
            .catch((error) => {
                console.error("Error saving info:", error);
            });
    };

    const resumeDownloadLink = contactInfo.resumeUrl ? `${contactInfo.resumeUrl}?t=${new Date().getTime()}` : '';

    const openSocialLink = (url) => {
        if (url) {
            window.open(url, "_blank"); 
        }
    };

    return (
        <div className="about-container" id="about">
            <div className="animatea one" >
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
                        <p >Peter Ndiba</p>
                    </div>
                    {/* <div className="column-tag">
                        <p className="column-tag-title">Roles: </p>
                        <p >ROS Developer, PCB Designer, Mechatronics Engineer</p>
                    </div> */}
                    <div className="column-tag">
                        <p className="column-tag-title">Email: </p>
                        <p >{contactInfo.email || 'my email'}</p>
                    </div>
                    <div className="column-tag">
                        <p className="column-tag-title">Phone: </p>
                        <p >{contactInfo.phone || 'my phone'}</p>
                    </div>
                    <div className="column-tag">
                        <p className="column-tag-title">Profiles: </p>
                        <div className="icons" style={{ cursor: 'pointer', marginTop:"15px" }}>
                            <FaLinkedin style={{ color: "#24a8e6", fontSize: "1.5rem" }} onClick={() => openSocialLink(socialLinks.linkedin)} />
                            <FaGithub style={{ color: "#24a8e6", fontSize: "1.5rem", marginLeft: "10px" }} onClick={() => openSocialLink(socialLinks.github)} />
                            <FaYoutube style={{ color: "#24a8e6", fontSize: "1.5rem", marginLeft: "10px" }} onClick={() => openSocialLink(socialLinks.youtube)} />
                            <FaTwitter style={{ color: "#24a8e6", fontSize: "1.5rem", marginLeft: "10px" }} onClick={() => openSocialLink(socialLinks.twitter)} />
                            <FaDiscord style={{ color: "#24a8e6", fontSize: "1.5rem", marginLeft: "10px" }} onClick={() => openSocialLink(socialLinks.twitter)} />
                        </div>
                    </div>
                </div>
                <div className="column-two" >
                    {contactInfo && contactInfo.about ? (
                        <p>{contactInfo.about}</p>
                    ) : (
                        <div>
                            I completed my <span className="about-key-word">BSc in Mechatronics Engineering</span> at <span className="about-key-word">Dedan Kimathi University of Technology</span>
                            <br /><br />
                            I love to play the Guitar, Flute, and Keyboard, and I actively participate in football and cricket matches, which keeps me physically active.
                            <br /><br />
                            🏆 I am a <span className="about-key-word">HubSpot Certified Digital Marketer</span>.
                        </div>
                    )}

                </div>
            </div>
            <div className="github">
                {resumeDownloadLink && (
                    <a href={resumeDownloadLink} download style={{ border: "none" }}>
                        <button className="resume-download">
                            <FaDownload style={{ color: "white", fontSize: "1rem", marginRight: "20px" }} />
                            Download my Resume
                        </button>
                    </a>
                )}
            </div>

            <button
                onClick={handleOpenModal}
                style={{
                    marginTop: "5%",
                    width: "240px",
                    height: "50px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#24a8e6",
                    color: "#FFF",
                    fontSize: "18px",
                    cursor: "pointer",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                    transition: "background-color 0.3s ease, transform 0.2s ease",
                }}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#1a8ac1";
                    e.target.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#24a8e6";
                    e.target.style.transform = "scale(1)";
                }}
            >
                Edit About
            </button>

            {/* Modal for Social Links and Contact Info */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Edit Your Information</h3>
                        <div style={{display:"flex", flexDirection:"row", gap:"90px"}}>
                        <input
                            type="text"
                            name="email"
                            value={contactInfo.email}
                            onChange={handleInputChange}
                            placeholder="Email Address"
                        />
                        <input
                            type="text"
                            name="phone"
                            value={contactInfo.phone}
                            onChange={handleInputChange}
                            placeholder="Phone Number"
                        />
                        </div>
                        <textarea
                            name="about"
                            value={contactInfo.about}
                            onChange={handleInputChange}
                            placeholder="About Me"
                        />
                        <input
                            type="text"
                            name="resumeUrl"
                            value={contactInfo.resumeUrl}
                            onChange={handleInputChange}
                            placeholder="Resume URL"
                        />
                        <input
                            type="text"
                            name="linkedin"
                            value={socialLinks.linkedin}
                            onChange={handleInputChange}
                            placeholder="LinkedIn URL"
                        />
                        <input
                            type="text"
                            name="github"
                            value={socialLinks.github}
                            onChange={handleInputChange}
                            placeholder="GitHub URL"
                        />
                        <input
                            type="text"
                            name="youtube"
                            value={socialLinks.youtube}
                            onChange={handleInputChange}
                            placeholder="YouTube URL"
                        />
                        <input
                            type="text"
                            name="twitter"
                            value={socialLinks.twitter}
                            onChange={handleInputChange}
                            placeholder="Twittter URL"
                        />
                        <input
                            type="text"
                            name="discord"
                            value={socialLinks.discord}
                            onChange={handleInputChange}
                            placeholder="Discord URL"
                        />
                        <div className="modal-actions">
                            <button onClick={handleSaveInfo}>Save</button>
                            <button onClick={handleCloseModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default About;
