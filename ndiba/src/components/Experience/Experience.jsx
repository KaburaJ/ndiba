import React, { useState, useEffect } from "react";
import { database, storage } from "../../firebase";
import { ref as dbRef, set, remove, onValue } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import ExperienceCard from "../ExperienceCards/ExperienceCards";
import "./Experience.css";

const Experience = () => {
    const userId = "user1";
    const [cards, setCards] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCard, setCurrentCard] = useState(null);
    const [updatedData, setUpdatedData] = useState({ title: "", content: "", image: "" });

    useEffect(() => {
        const cardsRef = dbRef(database, `users/${userId}/experience`);
        onValue(cardsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const loadedCards = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
                setCards(loadedCards);
            } else {
                setCards([]);
            }
        });
    }, [userId]);

    const handleSaveCard = (id, newData) => {
        const cardRef = dbRef(database, `users/${userId}/experience/${id}`);
        set(cardRef, newData).catch((error) => console.error("Error saving card:", error));

        setCards((prevCards) => prevCards.map((card) => (card.id === id ? { ...card, ...newData } : card)));
    };

    const handleEditClicked = (card) => {
        setCurrentCard(card);
        setUpdatedData({ title: card.title, content: card.content, image: card.image || "" });
        setIsModalOpen(true);
    };

    const handleModalSave = () => {
        handleSaveCard(currentCard.id, updatedData);
        setIsModalOpen(false);
    };

    const handleAddCard = () => {
        const newCard = {
            title: "New Job",
            content: "Job description goes here.",
            image: "",
        };

        const newCardRef = dbRef(database, `users/${userId}/experience/${Date.now()}`);
        set(newCardRef, newCard);
    };

    const handleDeleteCard = (id) => {
        const cardRef = dbRef(database, `users/${userId}/experience/${id}`);
        remove(cardRef);
        setCards((prevCards) => prevCards.filter((card) => card.id !== id));
    };

    return (
        <div className="projects-container" id="experience">
        <div
                className="animate one"
                style={{ marginTop: "-.1%", marginLeft: "10px", marginBottom: "40px" }}
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
                        showImage={true}
                    />
                ))}
            </div>
        </div>
    );
};

export default Experience;
