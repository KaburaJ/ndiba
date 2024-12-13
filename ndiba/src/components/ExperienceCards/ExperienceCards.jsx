import React from "react";
import "./ExperienceCard.css";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

const ExperienceCard = ({ cardData, onEditClick, onDelete, showImage }) => {
    return (
        <div className="features-one__single">
            <div className="features-one__single-icon text-center">
                {/* <img src={cardData.image} alt={cardData.title} style={{ width: "80px", height: "80px", borderRadius: "50%" }} /> */}
            </div>
            <div className="features-one__single-content">
                <h2>{cardData.title}</h2>
                <p>{cardData.content}</p>
            </div>
            {/* <div className="card-actions">
                <FaPencilAlt
                    onClick={(e) => {
                        e.stopPropagation();
                        onEditClick(cardData)
                    }}
                    className="icon"
                    style={{ zIndex: 999 }}
                />
                <FaTrash
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(cardData.id)
                    }}
                    className="icon"
                    style={{ zIndex: 999 }}
                />
            </div> */}
        </div>
    );
};

export default ExperienceCard;
