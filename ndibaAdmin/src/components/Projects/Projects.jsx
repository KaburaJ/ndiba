import React, { useState, useEffect } from "react";
import { database } from "../../firebase"; // Adjust based on your file structure
import { ref, set, remove, onValue } from "firebase/database";
import "./Projects.css";
import ProjectsCard from "../ProjectsCard/ProjectsCard";
import projectSampleImage from "../images/adam-lukomski-ja9VHwgcABo-unsplash.jpg";

const Projects = () => {
    const userId = "user1"; // Replace this with your actual user ID or authentication logic
    const [cards, setCards] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCard, setCurrentCard] = useState(null);
    const [updatedData, setUpdatedData] = useState({ title: "", content: "", link: "" });

    // Fetch project cards from Firebase on mount
    useEffect(() => {
        const cardsRef = ref(database, `users/${userId}/projects`);
        onValue(cardsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const loadedCards = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
                setCards(loadedCards);
            } else {
                setCards([]);
            }
        });
    }, [userId]);

    // Add a new card and store it in Firebase
    const handleAddCard = () => {
        const newCard = {
            title: "New Project",
            content: "Project description goes here.",
            image: projectSampleImage,
            link: "", // Initialize the link
        };

        const newCardRef = ref(database, `users/${userId}/projects/${Date.now()}`);
        set(newCardRef, newCard); // Save new card in Firebase
    };

    // Save the edited card to Firebase
    const handleSaveCard = (id, newData) => {
        if (newData.image && !newData.image.startsWith("https://")) {
            console.error("Invalid image URL:", newData.image);
            return;
        }
        ///////
    
        const cardRef = ref(database, `users/${userId}/projects/${id}`);
        set(cardRef, newData) // Update Firebase with the correct URL
            .then(() => {
                console.log("Card updated successfully:", newData);
            })
            .catch((error) => {
                console.error("Error updating card:", error);
            });
    
        const updatedCards = cards.map((card) => (card.id === id ? { ...card, ...newData } : card));
        setCards(updatedCards);
    };
    

    // Delete a card from Firebase
    const handleDeleteCard = (id) => {
        const cardRef = ref(database, `users/${userId}/projects/${id}`);
        remove(cardRef); // Remove card from Firebase

        const updatedCards = cards.filter((card) => card.id !== id);
        setCards(updatedCards);
    };

    // Open edit modal when edit button is clicked
    const handleEditClicked = (card) => {
        setCurrentCard(card);
        setUpdatedData({ title: card.title, content: card.content, link: card.link });
        setIsModalOpen(true);
    };

    // Save changes from modal
    const handleModalSave = () => {
        handleSaveCard(currentCard.id, updatedData);
        setIsModalOpen(false);
    };

    return (
        <div className="projects-container" id="projects">
            <div className="animate one" style={{ marginTop: "-.1%", marginLeft: "10px" }}>
                <span>M</span>
                <span>y</span>&nbsp;
                <span>P</span>
                <span>r</span>
                <span>o</span>
                <span>j</span>
                <span>e</span>
                <span>c</span>
                <span>t</span>
                <span>s</span>
            </div>
            <div className="cardsp">
                {cards.map((card) => (
                    <div key={card.id}>
                        <ProjectsCard
                            cardData={card}
                            onSave={handleSaveCard}
                            onDelete={handleDeleteCard}
                            onEditClick={() => handleEditClicked(card)}
                        />
                    </div>
                ))}
                <button
                    onClick={handleAddCard}
                    style={{
                        // marginLeft:"120%",
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
                    Add Project
                </button>
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit Card</h2>
                        <label>
                            Title:
                            <input
                                type="text"
                                value={updatedData.title}
                                onChange={(e) => setUpdatedData({ ...updatedData, title: e.target.value })}
                            />
                        </label>
                        <label>
                            Content:
                            <textarea
                                value={updatedData.content}
                                onChange={(e) => setUpdatedData({ ...updatedData, content: e.target.value })}
                            />
                        </label>
                        <label>
                            Link:
                            <input
                                type="text"
                                value={updatedData.link}
                                onChange={(e) => setUpdatedData({ ...updatedData, link: e.target.value })}
                            />
                        </label>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <button onClick={handleModalSave}>Save</button>
                            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;
