import React, { useEffect, useState } from "react";
import { database } from "../../firebase"; // Adjust based on your file structure
import { ref, set, remove, onValue } from "firebase/database";
import "./Achievements.css"
import ProjectsCard from "../ProjectsCard/ProjectsCard";
import PublicationCard from "../PublicationCard/PublicationCard";

const Achievements = () => {
    const userId = "user1"; // Replace with dynamic user ID if needed

    const [blogCards, setCards] = useState([]);
    // Fetch cards from Firebase
    useEffect(() => {
        const cardsRef = ref(database, `users/${userId}/achievements`);
        const unsubscribe = onValue(cardsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Convert the snapshot into an array of experience cards
                const loadedCards = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],  // Spread the experience data for each key
                }));
                setCards(loadedCards);
                console.log(blogCards)
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
        <div className="projects-container" id="achievements">
            <div
                className="animate one"
                style={{ marginTop: "-.1%", marginLeft: "10px" }}
            >
                <span>M</span>
                <span>y</span>&nbsp;
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
                    <div key={card.id}>
                        {console.log(card)}  {/* Check each card's content */}
                        {card && (
                            <PublicationCard cardData={card} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Achievements