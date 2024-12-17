import React from "react";
import "./ExperienceCard.css";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

const ExperienceCard = ({ cardData, onEditClick, onDelete }) => {
    const { startDate, endDate } = cardData;

    // Display "Present" if no endDate is provided
    const displayEndDate = endDate ? endDate : startDate ? "Present" : "";

    return (
        <div className="features-one__single">
            <div className="features-one__single-icon text-center">
                <p style={{color:"white"}}>
                    {startDate} - {displayEndDate}
                </p>
            </div>
            <div className="features-one__single-content">
                <h2>{cardData.title}</h2>
                <p>{cardData.content}</p>
            </div>
            <div className="card-actions">
                <FaPencilAlt
                    onClick={(e) => {
                        e.stopPropagation();
                        onEditClick(cardData);
                    }}
                    className="icon"
                />
                <FaTrash
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(cardData.id);
                    }}
                    className="icon"
                />
            </div>
        </div>
    );
};

export default ExperienceCard;
