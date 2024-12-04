import React, { useState } from "react";
import "./PublicationCard.css";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

const PublicationCard = ({ cardData, onSave, onDelete }) => {
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

    const handleCardClick = () => {
        if (cardData.link) {
            window.open(cardData.link, "_blank", "noopener noreferrer");
        }
    };

    const EditModal = ({ cardData, onSave, onCancel }) => {
        const [newData, setNewData] = useState(cardData);
    //Cloudinary Implementation
    const [selectedFile, setSelectedFile] = useState(null);
    const [caption, setCaption] = useState('');
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileUpload = async (e) => {
        e.preventDefault();

        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('upload_preset', 'ibu9fmn9');

            const url = selectedFile.type && selectedFile.type.startsWith('image')
                ? 'https://api.cloudinary.com/v1_1/dfqjfd2iv/image/upload'
                : 'https://api.cloudinary.com/v1_1/dfqjfd2iv/video/upload';

            try {
                setNewData({ ...newData, image: url });
                setPreviewUrl(url); // Set the preview URL to the uploaded image or video
            } catch (error) {
                console.error('Error while uploading post:', error);
            }
        }
    };
        const handleChange = (e) => {
            const { name, value } = e.target;
            setNewData({ ...newData, [name]: value });
        };
    
        const handleImageChange = (e) => {
            if (e.target.files && e.target.files[0]) {
                setNewData({ ...newData, image: URL.createObjectURL(e.target.files[0]) });
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
                        placeholder="Title"
                    />
                    <textarea
                        name="content"
                        value={newData.content}
                        onChange={handleChange}
                        placeholder="Content"
                    />
                    <input type="file" onChange={handleFileUpload} />
                    <img src={newData.image} alt="Preview" style={{ width: "150px", height: "150px" }} />
    
                    {cardData.link !== undefined && (
                        <input
                            type="text"
                            name="link"
                            value={newData.link || ""}
                            onChange={handleChange}
                            placeholder="Enter the link to your blog"
                        />
                    )}
    
                    <div className="buttons">
                        <button onClick={() => onSave(newData)} className="button">Save</button>
                        <button onClick={onCancel} className="button">Cancel</button>
                    </div>
                </div>
            </div>
        );
    };    
    

    return (
        <>
            <section className="articles" style={{ position: "relative" }}>
                <article onClick={handleCardClick} style={{ cursor: cardData.link ? "pointer" : "default" }}>
                    <div className="article-wrapper" style={{ marginBottom: "20px" }}>
                    <figure>
                        <img src={cardData.image || "defaultImage.jpg"} alt="Card" />
                    </figure>
                        <div className="article-body">
                            <div className="icon-container">
                                <FaPencilAlt onClick={(e) => { e.stopPropagation(); handleEditClick(); }} className="icon" style={{zIndex:999}}/>
                                <FaTrash onClick={(e) => { e.stopPropagation(); handleDeleteClick(); }} className="icon" style={{zIndex:999}}/>
                            </div>
                            <h2 style={{fontSize:"16px"}}>{cardData.title}</h2>
                            <p style={{fontSize:"16px"}}>{cardData.content}</p>
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
    const [newData, setNewData] = useState(cardData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewData({ ...newData, [name]: value });
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setNewData({ ...newData, image: URL.createObjectURL(e.target.files[0]) });
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
                    placeholder="Title"
                />
                <textarea
                    name="content"
                    value={newData.content}
                    onChange={handleChange}
                    placeholder="Content"
                />
                <input type="file" onChange={handleImageChange} />
                <img src={newData.image} alt="Preview" style={{ width: "150px", height: "150px" }} />
                <div className="buttons">
                    <button onClick={() => onSave(newData)} className="button">Save</button>
                    <button onClick={onCancel} className="button">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default PublicationCard;
