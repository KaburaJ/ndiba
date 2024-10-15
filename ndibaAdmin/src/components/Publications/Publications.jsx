import React, { useEffect, useState } from "react";
import "./Publications.css";
import PublicationCard from "../PublicationCard/PublicationCard";
import blogImg from "../images/yucel-moran-fZYgnAoeio4-unsplash.jpg";
import { db, storage } from "../../firebase";  // Firestore and Firebase Storage
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore"; // Firestore functions

const Publications = () => {
    const [blogCards, setCards] = useState([]);
    const userId = "user1";

    useEffect(() => {
        const cardsCollection = collection(db, `users/${userId}/blogs`);
        const unsubscribe = onSnapshot(cardsCollection, (snapshot) => {
            const loadedCards = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCards(loadedCards);
        });

        return () => unsubscribe();
    }, [userId]);

    const handleAddCard = async () => {
        const newCard = {
            title: "New Blog",
            content: "Blog description goes here.",
            image: blogImg,
            link: "Please enter the link to your blog:",
        };

        await addDoc(collection(db, `users/${userId}/blogs`), newCard);
    };

    const handleSaveCard = async (id, newData) => {
        const cardDocRef = doc(db, `users/${userId}/blogs`, id);
        await updateDoc(cardDocRef, newData);
    };

    const handleDeleteCard = async (id) => {
        const cardDocRef = doc(db, `users/${userId}/blogs`, id);
        await deleteDoc(cardDocRef);
    };

    return (
        <div className="projects-container" id="blogs">
            <div className="animate one" style={{ marginTop: "-.1%", marginLeft: "10px" }}>
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
                <span>s</span>
            </div>
            <div className="cardsb">
                {blogCards.map((card) => (
                    <div key={card.id}>
                        <PublicationCard
                            cardData={card}
                            onSave={handleSaveCard}
                            onDelete={handleDeleteCard}
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
                    Add Blog
                </button>
            </div>
        </div>
    );
};

export default Publications;
