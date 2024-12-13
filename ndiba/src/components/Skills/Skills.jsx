import React, { useState, useEffect } from "react";
import { database } from "../../firebase";
import { ref, set, remove, onValue } from "firebase/database";
import "./Skills.css";
import { FaPen, FaTrash } from "react-icons/fa";

export default function Skills() {
    const userId = "user1"; // Replace with dynamic user ID if needed
    const [skills, setSkills] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newSkill, setNewSkill] = useState({ name: "", proficiency: 0 });
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentSkill, setCurrentSkill] = useState(null);

    // Fetch skills from Firebase on component mount
    useEffect(() => {
        const skillsRef = ref(database, `users/${userId}/skills`);
        onValue(skillsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const loadedSkills = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
                setSkills(loadedSkills);
            } else {
                setSkills([]);
            }
        });
    }, [userId]);

    // Re-animate progress bars when skills change
    useEffect(() => {
        progressBarAndCountNumber();
    }, [skills]);

    // Add or update skill in Firebase
    const handleSaveSkill = () => {
        if (newSkill.name.trim() === "" || newSkill.proficiency === 0) {
            alert("Please provide valid skill information.");
            return;
        }

        const newId = isEditMode && currentSkill ? currentSkill.id : Date.now().toString();
        const skillRef = ref(database, `users/${userId}/skills/${newId}`);

        set(skillRef, newSkill)
            .then(() => {
                // Reset modal state only after the Firebase operation completes
                setNewSkill({ name: "", proficiency: 0 });
                setIsModalOpen(false);
                setIsEditMode(false);
                setCurrentSkill(null);
            })
            .catch((error) => {
                console.error("Error saving skill:", error);
                alert("Failed to save skill. Please try again.");
            });
    };


    // Delete skill from Firebase
    const handleDeleteSkill = (id) => {
        const skillRef = ref(database, `users/${userId}/skills/${id}`);
        remove(skillRef).then(() => {
            setSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== id));
        });
    };

    // Open edit modal with current skill details
    const handleEditSkill = (skill) => {
        setCurrentSkill(skill);
        setNewSkill({ name: skill.name, proficiency: skill.proficiency });
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    return (
        <div className="projects-container" id="skills">
            <div className="animate one" style={{ marginTop: "-1%", marginLeft: "10px", marginBottom: "40px" }}>
                <span>M</span>
                <span>y</span>&nbsp;
                <span>S</span>
                <span>k</span>
                <span>i</span>
                <span>l</span>
                <span>l</span>
                <span>s</span>
            </div>
            <section>
                <div className="skills-container">
                    {skills.map((skill) => (
                        <div className="parent-skill" key={skill.id}>
                            <div className="skill">
                                <div className="progress" data-progress={skill.proficiency}>
                                    <span className="progress-number" style={{ color: "white" }}>0%</span>
                                </div>
                            </div>
                            <span className="title">{skill.name}</span>
                            <div style={{ marginTop: "10px" }}>

                                <FaPen onClick={() => handleEditSkill(skill)}
                                    style={{
                                        padding: "5px 10px",
                                        borderRadius: "5px",
                                        // backgroundColor: "#1a8ac1",
                                        color: "red",
                                        border: "none",
                                        marginRight: "5px",
                                        cursor: "pointer",
                                    }} />
                                <FaTrash
                                    onClick={() => handleDeleteSkill(skill.id)}
                                    style={{
                                        padding: "5px 10px",
                                        borderRadius: "5px",
                                        color: "red",
                                        border: "none",
                                        cursor: "pointer",
                                    }} />
                            </div>
                        </div>
                    ))}
                </div>
                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>{isEditMode ? "Edit Skill" : "Add a New Skill"}</h2>
                            <label>
                                Skill Name:
                                <input
                                    type="text"
                                    value={newSkill.name}
                                    onChange={(e) =>
                                        setNewSkill({ ...newSkill, name: e.target.value })
                                    }
                                />
                            </label>
                            <label>
                                Proficiency (%):
                                <input
                                    type="number"
                                    value={newSkill.proficiency}
                                    onChange={(e) =>
                                        setNewSkill({
                                            ...newSkill,
                                            proficiency: Math.min(Math.max(Number(e.target.value), 0), 100),
                                        })
                                    }
                                />
                            </label>
                            <div className="modal-actions">
                                <button onClick={handleSaveSkill}>
                                    {isEditMode ? "Save Changes" : "Add"}
                                </button>
                                <button
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setIsEditMode(false);
                                        setCurrentSkill(null);
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}

// Progress bar animation function
function progressBarAndCountNumber() {
    const progressElements = document.querySelectorAll(".progress");
    progressElements.forEach((element) => {
        const progressValue = Number(element.dataset.progress);
        element.parentElement.style.background = `conic-gradient(#1A8AC1 ${progressValue}%, #212428 0)`;
        element.firstElementChild.textContent = `${progressValue}%`;
    });
}
