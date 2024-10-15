import React, { useEffect, useState } from "react";
import { database } from "../../firebase"; // Adjust based on your file structure
import { ref, set, remove, onValue } from "firebase/database";
import "./Projects.css"
import ProjectsCard from "../ProjectsCard/ProjectsCard";

const Projects = () => {
    const userId = "user1"; // Replace with dynamic user ID if needed

    const [blogCards, setCards] = useState([]);
    // Fetch cards from Firebase
    useEffect(() => {
        const cardsRef = ref(database, `users/${userId}/projects`);
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
        <div className="projects-container" id="projects">
            <div
                className="animate one"
                style={{ marginTop: "-.1%", marginLeft: "10px" }}
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
            {blogCards.map((card) => (
                    <div key={card.id}>
                        {/* {console.log(card)}  Check each card's content */}
                        {card && (
                            <ProjectsCard cardData={card} />
                        )}
                    </div>
                ))}
</div>
        </div>
    )
}

export default Projects