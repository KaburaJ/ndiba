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
            {isModalOpen && (
  <div className="modal">
    <div className="modal-content">
      <h2>Edit Experience</h2>
        Title:
        <input
          type="text"
          value={updatedData.title}
          onChange={(e) => setUpdatedData({ ...updatedData, title: e.target.value })}
        />
        Content:
        <textarea
          value={updatedData.content}
          onChange={(e) => setUpdatedData({ ...updatedData, content: e.target.value })}
        />
      <div className="modal-actions">
        <button onClick={handleModalSave} className="modal-save-button">Save</button>
        <button onClick={() => setIsModalOpen(false)} className="modal-cancel-button">Cancel</button>
      </div>
    </div>
  </div>
)}

        </div>
    );
};

export default Experience;
