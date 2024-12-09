import React, { useEffect, useState } from "react";
import "./Publications.css";
import PublicationCard from "../PublicationCard/PublicationCard";
import blogImg from "../images/yucel-moran-fZYgnAoeio4-unsplash.jpg";
import { database } from "../../firebase";
import { ref, set, remove, onValue } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Publications = () => {
    const userId = "user1";

    const [blogCards, setCards] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCard, setCurrentCard] = useState(null);
    const [updatedData, setUpdatedData] = useState({ title: "", content: "", link: "", image: "" });
    const [imagePreview, setImagePreview] = useState(null);

    const storage = getStorage();

    useEffect(() => {
        const cardsRef = ref(database, `users/${userId}/blogs`);
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
            title: "New Blog",
            content: "Blog description goes here.",
            image: blogImg,
            link: "Please enter the link to your blog:",
        };
        const newCardRef = ref(database, `users/${userId}/blogs/${Date.now()}`);
        set(newCardRef, newCard);
    };

    const handleSaveCard = async (id, newData) => {
        let imageUrl = newData.image;
        
        // If a new image is selected
        if (typeof newData.image !== 'string') {
            const file = newData.image;
            const imageRef = storageRef(storage, `images/${Date.now()}-${file.name}`);
            const uploadTask = uploadBytesResumable(imageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Monitor upload progress if needed
                },
                (error) => {
                    console.error("Error uploading image: ", error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        imageUrl = downloadURL;  // Get the download URL after upload
                        saveCardData(id, { ...newData, image: imageUrl });
                    });
                }
            );
        } else {
            saveCardData(id, newData); // No image uploaded, proceed with the current image
        }
    };

    const saveCardData = (id, updatedCardData) => {
        const cardRef = ref(database, `users/${userId}/blogs/${id}`);
        set(cardRef, updatedCardData);
        
        const updatedCards = blogCards.map((card) =>
            card.id === id ? { ...card, ...updatedCardData } : card
        );
        setCards(updatedCards);
        setIsModalOpen(false);
    };

    const handleDeleteCard = (id) => {
        const cardRef = ref(database, `users/${userId}/blogs/${id}`);
        remove(cardRef);

        const updatedCards = blogCards.filter((card) => card.id !== id);
        setCards(updatedCards);
    };

    const handleEditClicked = (card) => {
        setCurrentCard(card);
        setUpdatedData({
            title: card.title,
            content: card.content,
            link: card.link || "",
            image: card.image || "",
        });
        setImagePreview(card.image);  // Set the initial image preview
        setIsModalOpen(true);
    };

    const handleModalSave = () => {
        handleSaveCard(currentCard.id, updatedData);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUpdatedData({ ...updatedData, image: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="projects-container" id="blogs">
            <div className="animate one" style={{ marginTop: "-.1%", marginLeft: "10px", marginBottom:"40px" }}>
                <span>M</span>
                <span>y</span>&nbsp;
                <span>B</span>
                <span>l</span>
                <span>o</span>
                <span>g</span>
                <span>s</span>
                <span>/</span>
                <span>P</span>
                <span>u</span>
                <span>b</span>
                <span>l</span>
                <span>i</span>
                <span>c</span>
                <span>a</span>
                <span>t</span>
                <span>i</span>
                <span>o</span>
                <span>n</span>
                <span>s</span>
            </div>
            <div className="cardsb">
                {blogCards.map((card) => (
                    <div key={card.id}>
                        <PublicationCard
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
                    Add Blog
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
                            Link to your Blog:
                            <input
                                type="text"
                                value={updatedData.link}
                                onChange={(e) => setUpdatedData({ ...updatedData, link: e.target.value })}
                            />
                        </label>

                        <label>
                            Upload Image:
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </label>
                        {imagePreview && (
                            <div>
                                <img
                                    src={imagePreview}
                                    alt="Image Preview"
                                    style={{ width: "100%", maxHeight: "150px", maxWidth: "150px", objectFit: "cover" }}
                                />
                            </div>
                        )}

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

export default Publications;
