import React, { useState } from "react";
import "./PublicationCard.css";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

const PublicationCard = ({ cardData, onSave, onDelete, showImage = true }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleDeleteClick = () => {
        onDelete(cardData.id);
    };

    const handleSaveClick = (newData) => {
        onSave(cardData.id, newData);
        setIsEditing(false);
    };

    return (
        <>
            <section className="articles" style={{ position: "relative" }}>
                <article
                    onClick={() => cardData.link && window.open(cardData.link, "_blank")}
                    style={{ cursor: cardData.link ? "pointer" : "default" }}
                >
                    <div className="article-wrapper" style={{ marginBottom: "20px" }}>
                        {showImage && (
                            <figure>
                                <img
                                    src={cardData.image || "defaultImage.jpg"}
                                    alt="Card"
                                />
                            </figure>
                        )}
                        <div className="article-body">
                            <div className="icon-container">
                                <FaPencilAlt
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditClick();
                                    }}
                                    style={{zIndex:99}}
                                    className="icon"
                                />
                                <FaTrash
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteClick();
                                    }}
                                    style={{zIndex:99}}
                                    className="icon"
                                />
                            </div>
                            <h2>{cardData.title}</h2>
                            <p>{cardData.content}</p>
                            {cardData.link && (
                                <a
                                    href={cardData.link}
                                    className="read-more"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    Read more
                                </a>
                            )}
                        </div>
                    </div>
                </article>
                {isEditing && (
                    <EditModal
                        cardData={cardData}
                        onSave={handleSaveClick}
                        onCancel={() => setIsEditing(false)}
                    />
                )}
            </section>
        </>
    );
};

const EditModal = ({ cardData, onSave, onCancel }) => {
    const [newData, setNewData] = useState({ ...cardData });
    const [imagePreview, setImagePreview] = useState(cardData.image || "");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewData({ ...newData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewData({ ...newData, image: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        if (newData.image && newData.image instanceof File) {
            // Upload image to Cloudinary first
            handleImageUpload();
        } else {
            onSave(newData);
        }
    };

    const handleImageUpload = async () => {
        const formData = new FormData();
        formData.append("file", newData.image);
        formData.append("upload_preset", "ibu9fmn9");

        const url = "https://api.cloudinary.com/v1_1/dfqjfd2iv/image/upload";

        setLoading(true);
        try {
            const response = await fetch(url, { method: "POST", body: formData });
            const result = await response.json();
            if (result.secure_url) {
                newData.image = result.secure_url;
                onSave(newData);
            } else {
                alert("Image upload failed.");
            }
        } catch (error) {
            alert("Error during upload.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Edit Card</h2>
                <input
                    type="text"
                    name="title"
                    value={newData.title}
                    onChange={handleChange}
                />
                <textarea
                    name="content"
                    value={newData.content}
                    onChange={handleChange}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {imagePreview && <img src={imagePreview} alt="Image Preview" />}
                <div style={{display:"flex", flexDirection:"row", marginTop:"20px"}}>
                <button onClick={handleSave} disabled={loading}>Save</button>
                <button onClick={onCancel}>Cancel</button></div>
            </div>
        </div>
    );
};

export default PublicationCard;
