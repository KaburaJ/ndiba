import React, { useState } from "react";
import "./ProjectsCard.css";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

const ProjectsCard = ({ cardData, onSave, onDelete }) => {
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
        <div className="card-hover">
            <div className="card-hover__content">
                <FaPencilAlt onClick={handleEditClick} className="icon" />
                <FaTrash onClick={handleDeleteClick} className="icon" />
                <h3 className="card-hover__title" style={{ fontSize: "16px" }}>{cardData.title}</h3>
                <p className="card-hover__text" style={{ marginBottom: "30px", fontSize: "16px" }}>{cardData.content}</p>
                <a href={cardData.link} className="card-hover__link" target="_blank" rel="noopener noreferrer">
                    <span>See More</span>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </a>
            </div>
            <img src={cardData.image} alt="Project" />
            {isEditing && (
                <EditModal
                    cardData={cardData}
                    onSave={handleSaveClick}
                    onCancel={() => setIsEditing(false)}
                />
            )}
        </div>
    );
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
                setNewData({ ...newData, image: formData.data.secure_url});
                setPreviewUrl(formData.data?formData.data.secure_url:null); // Set the preview URL to the uploaded image or video'
                console.log(formData.data?formData.data.secure_url:null)
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
                <input
                    type="text"
                    name="link"
                    value={newData.link}
                    onChange={handleChange}
                    placeholder="Link to your project"
                />
                <form onSubmit={handleFileUpload} className="upload-form">
                    <label htmlFor="file-input" style={{ height: "3em" }}>
                        Choose File
                        <input id="file-input" type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
                    </label>
                    <button type="submit" className="button" sty>Upload</button>
                </form>
                {previewUrl && (
                    <div className="post-preview">
                        {selectedFile.type && selectedFile.type.startsWith('image') && (
                            <img src={previewUrl} alt="Post Preview" />
                        )}
                        {selectedFile.type && (selectedFile.type.startsWith('video') || selectedFile.type.startsWith('audio')) && (
                            <video src={previewUrl} alt="Post Preview" controls />
                        )}
                    </div>
                )}                <div className="buttons">
                    <button onClick={() => onSave(newData)} className="button">Save</button>
                    <button onClick={onCancel} className="button">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ProjectsCard;
