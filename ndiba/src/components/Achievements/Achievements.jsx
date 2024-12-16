import React, { useState, useEffect } from "react";
import { database } from "../../firebase"; // Adjust based on your file structure
import { ref, set, remove, onValue } from "firebase/database";
import "./Achievements.css";
import PublicationCard from "../PublicationCard/PublicationCard";
import blogImg from "../images/yucel-moran-fZYgnAoeio4-unsplash.jpg";
import ProjectsCard from "../ProjectsCard/ProjectsCard";

const Achievements = () => {
    const userId = "user1"; // Replace this with your actual user ID or authentication logic
    const [blogCards, setCards] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCard, setCurrentCard] = useState(null);
    const [updatedData, setUpdatedData] = useState({ title: "", content: "", link: "" });

    // Fetch blog cards from Firebase on mount
    useEffect(() => {
        const cardsRef = ref(database, `users/${userId}/achievements`);
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
            title: "New Achievement",
            content: "Achievement description goes here.",
            image: blogImg,
            // link: "",
        };

        const newCardRef = ref(database, `users/${userId}/achievements/${Date.now()}`);
        set(newCardRef, newCard); // Save new card in Firebase
    };

    // Save the edited card to Firebase
    const handleSaveCard = (id, newData) => {
        const cardRef = ref(database, `users/${userId}/achievements/${id}`);
        set(cardRef, newData); // Update Firebase with new data

        const updatedCards = blogCards.map((card) => (card.id === id ? { ...card, ...newData } : card));
        setCards(updatedCards);
    };

    // Delete a card from Firebase
    const handleDeleteCard = (id) => {
        const cardRef = ref(database, `users/${userId}/achievements/${id}`);
        remove(cardRef); // Remove card from Firebase

        const updatedCards = blogCards.filter((card) => card.id !== id);
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
        <div className="projects-container" id="achievements">
            <div className="animate one" style={{ marginTop: "-.1%", marginLeft: "10px", marginBottom:"40px" }}>
                {/* <span>M</span>
                <span>y</span>&nbsp; */}
                <span>A</span>
                <span>c</span>
                <span>h</span>
                <span>i</span>
                <span>e</span>
                <span>v</span>
                <span>e</span>
                <span>m</span>
                <span>e</span>
                <span>n</span>
                <span>t</span>
                <span>s</span>
            </div>
            <div className="cardsach">
                {blogCards.map((card) => (
                    // <PublicationCard
                    //     key={card.id}
                    //     cardData={card}
                    //     onSave={handleSaveCard}
                    //     onDelete={handleDeleteCard}
                    //     onEditClick={() => handleEditClicked(card)}
                    // />
                    <ProjectsCard
                            key={card.id}
                            cardData={card}
                            onSave={handleSaveCard}
                            onDelete={handleDeleteCard}
                            onEditClick={() => handleEditClicked(card)}
                        />
                ))}
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

export default Achievements;
