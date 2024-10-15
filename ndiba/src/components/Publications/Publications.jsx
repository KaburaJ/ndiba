import React, { useEffect, useState } from "react";
import { database } from "../../firebase"; // Adjust based on your file structure
import { ref, set, remove, onValue } from "firebase/database";
import "./Publications.css"
import PublicationCard from "../PublicationCard/PublicationCard";

const Publications = () => {
    const userId = "user1"; // Replace with dynamic user ID if needed

    const [blogCards, setCards] = useState([]);
    // Fetch cards from Firebase
    useEffect(() => {
        const cardsRef = ref(database, `users/${userId}/blogs`);
        const unsubscribe = onValue(cardsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Convert the snapshot into an array of experience cards
                const loadedCards = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],  // Spread the experience data for each key
                }));
                setCards(loadedCards);
                // console.log(blogCards)
            } else {
                setCards([]);  // If no data is found, clear the card list
            }
        }, (error) => {
            console.error("Error fetching experience data: ", error);
        });

        // Clean up the listener when the component is unmounted
        return () => unsubscribe();
    }, [userId]);
    return (
        <div className="projects-container" id="blogs">
            <div
                className="animate one"
                style={{ marginTop: "-.1%", marginLeft: "10px" }}
            >
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
                        {/* {console.log(card)}  Check each card's content */}
                        {card && (
                            <PublicationCard cardData={card} />
                        )}
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default Publications