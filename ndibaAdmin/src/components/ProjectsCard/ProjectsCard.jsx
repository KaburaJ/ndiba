import React, { useState, useEffect } from "react";
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

    return (
        <div className="card-hover">
            <div className="card-hover__content">
                <FaPencilAlt onClick={handleEditClick} className="icon" />
                <FaTrash onClick={handleDeleteClick} className="icon" />
                <h3 className="card-hover__title">{cardData.title}</h3>
                <p className="card-hover__text">{cardData.content}</p>
                <a
                    href={cardData.link}
                    className="card-hover__link"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <span>See More</span>
                </a>
            </div>
            <img src={cardData.image} alt="Project" className="back" />
            {isEditing && (
                <EditModal
                    cardData={cardData}
                    onSave={(newData) => {
                        onSave(cardData.id, newData);
                        setIsEditing(false);
                    }}
                    onCancel={() => setIsEditing(false)}
                />
            )}
        </div>
    );
};

const EditModal = ({ cardData, onSave, onCancel }) => {
    const [newData, setNewData] = useState(cardData);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(cardData.image || "");

    // Check for internet connection
    useEffect(() => {
        const handleOffline = () => alert("You are offline. Check your internet connection!");
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    const handleFileUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) return;

        setLoading(true);

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", "ibu9fmn9");

        const url = selectedFile.type.startsWith("image")
            ? "https://api.cloudinary.com/v1_1/dfqjfd2iv/image/upload"
            : "https://api.cloudinary.com/v1_1/dfqjfd2iv/video/upload";

        try {
            const response = await fetch(url, {
                method: "POST",
                body: formData,
            });
            const result = await response.json();

            if (result.secure_url) {
                setNewData({ ...newData, image: result.secure_url });
                setPreviewUrl(result.secure_url);
                console.log("Uploaded URL:", result.secure_url);
            } else {
                alert("File upload failed. Please try again.");
                console.error("Failed to retrieve secure_url");
            }
        } catch (error) {
            alert("Error during upload. Check your internet connection and try again.");
            console.error("Error during upload:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewData({ ...newData, [name]: value });
    };

    return (
        <div className="modal" style={{backgroundColor:"#001931"}}>
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
                    <label>
                        Choose File
                        <input
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setSelectedFile(file);
                                    setPreviewUrl(URL.createObjectURL(file));
                                }
                            }}
                        />
                    </label>
                    {previewUrl && (
                        <img
                            src={previewUrl}
                            alt="Preview"
                            style={{ width: "150px", height: "150px", marginTop: "10px" }}
                        />
                    )}
                    {loading ? (
                        <p style={{color:"black"}}>Uploading...</p>
                    ) : (
                        <button type="submit" className="button">
                            Upload
                        </button>
                    )}
                </form>
                <div className="buttons">
                    <button
                        onClick={() => {
                            if (newData.image.startsWith("blob:")) {
                                alert("Please upload the file to host it before saving.");
                                return;
                            }
                            onSave(newData);
                        }}
                        className="button"
                    >
                        Save
                    </button>
                    <button onClick={onCancel} className="button">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectsCard;
