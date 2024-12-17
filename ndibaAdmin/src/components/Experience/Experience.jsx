import React, { useState, useEffect } from "react";
import { database } from "../../firebase";
import { ref as dbRef, set, remove, onValue } from "firebase/database";
import ExperienceCard from "../ExperienceCards/ExperienceCards";
import "./Experience.css";

const Experience = () => {
    const userId = "user1";
    const [cards, setCards] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCard, setCurrentCard] = useState(null);
    const [updatedData, setUpdatedData] = useState({
        title: "",
        content: "",
        startDate: "",
        endDate: "",
        image: ""
    });

    // Fetch cards and sort them
    useEffect(() => {
        const cardsRef = dbRef(database, `users/${userId}/experience`);
        onValue(cardsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const loadedCards = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key]
                }));

                // Sort cards: most recent startDate first
                const sortedCards = loadedCards.sort((a, b) => {
                    const dateA = new Date(a.startDate || "1970-01");
                    const dateB = new Date(b.startDate || "1970-01");

                    return dateB - dateA; // Sort descending
                });

                setCards(sortedCards);
            } else {
                setCards([]);
            }
        });
    }, [userId]);

    const handleSaveCard = (id, newData) => {
        const cardRef = dbRef(database, `users/${userId}/experience/${id}`);
        set(cardRef, newData).catch((error) => console.error("Error saving card:", error));
        setIsModalOpen(false);
    };

    const handleEditClicked = (card) => {
        setCurrentCard(card);
        setUpdatedData({
            title: card.title,
            content: card.content,
            startDate: card.startDate || "",
            endDate: card.endDate || "",
            image: card.image || ""
        });
        setIsModalOpen(true);
    };

    const handleAddCard = () => {
        const newCard = {
            title: "New Job",
            content: "Job description goes here.",
            startDate: "2024-01",
            endDate: "",
            image: ""
        };

        const newCardRef = dbRef(database, `users/${userId}/experience/${Date.now()}`);
        set(newCardRef, newCard);
    };

    const handleDeleteCard = (id) => {
        const cardRef = dbRef(database, `users/${userId}/experience/${id}`);
        remove(cardRef);
    };

    return (
        <div className="projects-container" id="experience">
 <div
                className="animate one"
                style={{ marginTop: "-.1%", marginLeft: "10px", marginBottom: "10px" }}
            >
                <span>M</span>
                <span>y</span>&nbsp;
                <span>E</span>
                <span>x</span>
                <span>p</span>
                <span>e</span>
                <span>r</span>
                <span>i</span>
                <span>e</span>
                <span>n</span>
                <span>c</span>
                <span>e</span>
            </div>            
            <div className="cards-grid">
                {cards.map((card) => (
                    <ExperienceCard
                        key={card.id}
                        cardData={card}
                        onEditClick={handleEditClicked}
                        onDelete={handleDeleteCard}
                    />
                ))}
            </div>
            <button
                    onClick={handleAddCard}
                    style={{
                        marginLeft: "6%",
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
            {/* Modal */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit Experience</h2>
                        <input
                            type="text"
                            placeholder="Title"
                            value={updatedData.title}
                            onChange={(e) => setUpdatedData({ ...updatedData, title: e.target.value })}
                        />
                        <textarea
                            placeholder="Description"
                            value={updatedData.content}
                            onChange={(e) => setUpdatedData({ ...updatedData, content: e.target.value })}
                        />
                        <input
                            type="month"
                            placeholder="Start Date"
                            value={updatedData.startDate}
                            onChange={(e) => setUpdatedData({ ...updatedData, startDate: e.target.value })}
                        />
                        <input
                            type="month"
                            placeholder="End Date"
                            value={updatedData.endDate}
                            onChange={(e) => setUpdatedData({ ...updatedData, endDate: e.target.value })}
                        />
                        <button onClick={() => handleSaveCard(currentCard.id, updatedData)}>Save</button>
                        <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Experience;
