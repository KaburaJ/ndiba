import React, { useState, useEffect } from "react";
import { database } from "../../firebase"; // Make sure to adjust the import based on your file structure
import { ref, set, remove, onValue } from "firebase/database";
import "./Experience.css";
import ProjectsCard from "../ProjectsCard/ProjectsCard";
import PublicationCard from "../PublicationCard/PublicationCard";
import blogImg from "../images/yucel-moran-fZYgnAoeio4-unsplash.jpg";

const Experience = () => {
    const userId = "user1"; 

    const [blogCards, setCards] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCard, setCurrentCard] = useState(null);
    const [updatedData, setUpdatedData] = useState({ title: "", content: "" });

    useEffect(() => {
        const cardsRef = ref(database, `users/${userId}/experience`);
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

    const handleAddCard = () => {
        const newCard = {
            title: "New Job",
            content: "Job description goes here.",
            image: blogImg,
            link: "",
        };

        const newCardRef = ref(database, `users/${userId}/experience/${Date.now()}`);
        set(newCardRef, newCard);
    };

    const handleSaveCard = (id, newData) => {
        const cardRef = ref(database, `users/${userId}/experience/${id}`);
        set(cardRef, newData); // Update Firebase with new data

        const updatedCards = blogCards.map((card) => (card.id === id ? { ...card, ...newData } : card));
        setCards(updatedCards);
    };

    const handleDeleteCard = (id) => {
        const cardRef = ref(database, `users/${userId}/experience/${id}`);
        remove(cardRef); // Remove card from Firebase

        const updatedCards = blogCards.filter((card) => card.id !== id);
        setCards(updatedCards);
    };

    const handleEditClicked = (card) => {
        setCurrentCard(card);
        setUpdatedData({ title: card.title, content: card.content });
        setIsModalOpen(true);
    };

    const handleModalSave = () => {
        handleSaveCard(currentCard.id, updatedData);
        setIsModalOpen(false);
    };

    return (
        <div className="projects-container" id="experience">
            <div className="animate one" style={{ marginTop: "-.1%", marginLeft: "10px" }}>
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
            <div className="cardsa">
                {blogCards.map((card) => (
                    <div key={card.id}>
                        <PublicationCard
                            cardData={card}
                            onSave={handleSaveCard}
                            onDelete={handleDeleteCard}
                            onEditClick={()=>handleEditClicked(card)}
                        />
                        {/* <button onClick={() => handleEditClick(card)}>
                            ✏️
                        </button> */}
                    </div>
                ))}
                <button
                onClick={handleAddCard}
                style={{
                    marginLeft:"6%",
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
                Add Experience
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
                        <div style={{display:"flex", flexDirection:"row"}}>
                        <button onClick={handleModalSave}>Save</button>
                        <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Experience;
