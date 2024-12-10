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
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // Display only 3 cards at a time

    // Calculate the number of pages
    const totalPages = Math.ceil(cards.length / itemsPerPage);

    // Determine the cards to display on the current page
    const visibleCards = cards.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Fetch project cards from Firebase on mount
    useEffect(() => {
        const cardsRef = ref(database, `users/${userId}/projects`);
        onValue(cardsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const loadedCards = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                    month: data[key].month || new Date().getMonth() + 1, // Default to current month
                    year: data[key].year || new Date().getFullYear(),    // Default to current year
                }));
                // Sort by year and month
                loadedCards.sort((a, b) =>
                    a.year === b.year ? a.month - b.month : a.year - b.year
                );
                setCards(loadedCards);
            } else {
                setCards([]);
            }
        });
    }, [userId]);



    const handleAddCard = () => {
        const currentDate = new Date();
        const newCard = {
            title: "New Project",
            content: "Project description goes here.",
            image: projectSampleImage,
            link: "",
            month: currentDate.getMonth() + 1, // Months are 0-indexed
            year: currentDate.getFullYear(),
        };

        const newCardRef = ref(database, `users/${userId}/projects/${Date.now()}`);
        set(newCardRef, newCard); // Save new card in Firebase
    };



    const handleSaveCard = (id, newData) => {
        const cardRef = ref(database, `users/${userId}/projects/${id}`);
        set(cardRef, newData)
            .then(() => {
                console.log("Card updated successfully:", newData);
            })
            .catch((error) => {
                console.error("Error updating card:", error);
            });

        const updatedCards = cards.map((card) => (card.id === id ? { ...card, ...newData } : card));
        setCards(updatedCards);
    };


    const handleDeleteCard = (id) => {
        const cardRef = ref(database, `users/${userId}/projects/${id}`);
        remove(cardRef); // Remove card from Firebase

        const updatedCards = cards.filter((card) => card.id !== id);
        setCards(updatedCards);
    };
    const handleEditClicked = (card) => {
        const defaultMonth = new Date().getMonth() + 1; // Current month
        const defaultYear = new Date().getFullYear();  // Current year

        const data = {
            title: card.title,
            content: card.content,
            link: card.link,
            month: card.month || defaultMonth,
            year: card.year || defaultYear,
        };

        console.log("Updated Data:", data); // Debugging
        setCurrentCard(card);
        setUpdatedData(data);
        setIsModalOpen(true);
    };


    const handleModalSave = () => {
        const updatedCard = { ...currentCard, ...updatedData }; // Include all updated fields
        handleSaveCard(currentCard.id, updatedCard);
        setIsModalOpen(false);
    };

    const handlePreviousClick = (event) => {
        event.stopPropagation();
        setCurrentPage((prev) => Math.max(prev - 1, 1))

    }

    const handleNextClick = (event) => {
        event.stopPropagation();
        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
        console.log("next clicked")
    }


    return (
        <div className="projects-container" id="projects">
            <div
                className="animate one"
                style={{ marginTop: "-.1%", marginLeft: "10px", marginBottom: "10px" }}
            >
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
                {visibleCards.map((card) => (
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
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="pagination-controls">
                <button
                    onClick={handlePreviousClick}
                    disabled={currentPage === 1}
                    className={`pagination-button ${currentPage === 1 ? "disabled" : ""}`}
                >
                    Previous
                </button>
            
                <span className="pagination-info">{currentPage} of {totalPages}</span>
            
                <button
                    onClick={handleNextClick}
                    disabled={currentPage === totalPages}
                    className={`pagination-button ${currentPage === totalPages ? "disabled" : ""}`}
                >
                    Next
                </button>
            </div>

            )}

            {isModalOpen && (
                <div className="modal" style={{ maxWidth: "80%", height: "auto", overflow: "scroll" }}>
                    <div className="modal-content">
                        <h2>Edit Card</h2>
                        <label>
                            Month:
                            <input
                                type="number"
                                min="1"
                                max="12"
                                value={updatedData.month}
                                onChange={(e) => setUpdatedData({ ...updatedData, month: Number(e.target.value) })}
                            />
                        </label>
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

                        <label>
                            Year:
                            <input
                                type="number"
                                value={updatedData.year}
                                onChange={(e) => setUpdatedData({ ...updatedData, year: Number(e.target.value) })}
                            />
                        </label><label>
                            Month:
                            <input
                                type="number"
                                min="1"
                                max="12"
                                value={updatedData.month}
                                onChange={(e) => {
                                    const newMonth = Number(e.target.value);
                                    console.log("Updated Month:", newMonth); // Debugging
                                    setUpdatedData({ ...updatedData, month: newMonth });
                                }}
                            />
                        </label>
                        <label>
                            Year:
                            <input
                                type="number"
                                value={updatedData.year}
                                onChange={(e) => {
                                    const newYear = Number(e.target.value);
                                    console.log("Updated Year:", newYear); // Debugging
                                    setUpdatedData({ ...updatedData, year: newYear });
                                }}
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
