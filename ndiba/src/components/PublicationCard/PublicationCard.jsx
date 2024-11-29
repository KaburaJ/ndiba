import blogImg from "../images/yucel-moran-fZYgnAoeio4-unsplash.jpg";
import React, { useState } from "react";
import "./PublicationCard.css";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

const PublicationCard = ({ cardData }) => {  
    if (!cardData || !cardData.image) return null;
    return (
        <>
            <section className="articles" style={{ position: "relative" }}>
                <article>
                    <div className="article-wrapper" style={{ marginBottom: "20px" }}>
                        <figure>
                        <img src={cardData.image || blogImg} alt={cardData.title || "Image"} />
                        </figure>
                        <div className="article-body">
                            <h2 style={{fontSize:"16px"}}>{cardData.title}</h2>
                            <p style={{fontSize:"14px"}}>{cardData.content}</p>
                            {cardData.link && (
                                <a href={cardData.link} className="read-more" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ marginTop: "20px" }}>
                                    Read more
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    </div>
                </article>
            </section>
        </>
    );
};

export default PublicationCard;



