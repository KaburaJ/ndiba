import React, { useState, useEffect } from "react";
import "./ProjectsCard.css";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProjectsCard = ({ cardData, onSave, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const navigation = useNavigate()
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleDeleteClick = () => {
        onDelete(cardData.id);
    };

    const navigateProject = () => {
        window.open(cardData.link, "_blank");
      };
      

    return (
        <div className="card-hover" onClick={navigateProject} >
            <div className="card-hover__content">
                <div className="icon-container">
                <FaPencilAlt onClick={handleEditClick} className="icon" />
                <FaTrash onClick={handleDeleteClick} className="icon" /></div>
                <h3 className="card-hover__title">{cardData.title}</h3>
                <p className="card-hover__text">{cardData.content}</p>
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

// const EditModal = ({ cardData, onSave, onCancel }) => {
//     const [newData, setNewData] = useState(cardData);
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [previewUrl, setPreviewUrl] = useState(cardData.image || "");

//     const handleFileUpload = async (e) => {
//         e.preventDefault();
//         if (!selectedFile) return;

//         setLoading(true);

//         const formData = new FormData();
//         formData.append("file", selectedFile);
//         formData.append("upload_preset", "ibu9fmn9");

//         const url = selectedFile.type.startsWith("image")
//             ? "https://api.cloudinary.com/v1_1/dfqjfd2iv/image/upload"
//             : "https://api.cloudinary.com/v1_1/dfqjfd2iv/video/upload";

//         try {
//             const response = await fetch(url, {
//                 method: "POST",
//                 body: formData,
//             });
//             const result = await response.json();

//             if (result.secure_url) {
//                 console.log("Uploaded URL:", result.secure_url);
//                 setNewData((prevData) => ({
//                     ...prevData,
//                     image: result.secure_url, // Update the image field
//                 }));
//                 setPreviewUrl(result.secure_url); // Update the preview with the hosted URL
//             } else {
//                 alert("File upload failed. Please try again.");
//                 console.error("Failed to retrieve secure_url");
//             }
//         } catch (error) {
//             alert("Error during upload. Check your internet connection and try again.");
//             console.error("Error during upload:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setNewData({ ...newData, [name]: value });
//     };

//     const handleSave = () => {
//         // Check if image is uploaded properly
//         if (newData.image.startsWith("blob:")) {
//             alert("Please upload the file to host it before saving.");
//             return;
//         }
//         onSave(newData); // Save after ensuring the image is a hosted URL
//     };

//     return (
//         <div className="modal" style={{backgroundColor:"#003363"}}>
//             <div className="modal-content">
//                 <h2>Edit Card</h2>
//                 <input
//                     type="text"
//                     name="title"
//                     value={newData.title}
//                     onChange={handleChange}
//                     placeholder="Title"
//                 />
//                 <textarea
//                     name="content"
//                     value={newData.content}
//                     onChange={handleChange}
//                     placeholder="Content"
//                 />
//                 <input
//                     type="text"
//                     name="link"
//                     value={newData.link}
//                     onChange={handleChange}
//                     placeholder="Link to your project"
//                 />
//                 <form onSubmit={handleFileUpload} className="upload-form">
//                     <label>
//                         Choose File
//                         <input
//                             type="file"
//                             onChange={(e) => {
//                                 const file = e.target.files[0];
//                                 if (file) {
//                                     setSelectedFile(file);
//                                     setPreviewUrl(URL.createObjectURL(file)); // Show blob preview
//                                 }
//                             }}
//                         />
//                     </label>
//                     {previewUrl && (
//                         <img
//                             src={previewUrl}
//                             alt="Preview"
//                             style={{ width: "150px", height: "150px", marginTop: "10px" }}
//                         />
//                     )}
//                     {loading ? (
//                         <p style={{color:"#003363"}}>Uploading...</p>
//                     ) : (
//                         <button type="submit" className="button">
//                             Upload
//                         </button>
//                     )}
//                 </form>
//                 {loading ? (<div className="buttons">
//                     <button onClick={handleSave} className="button">
//                         Save
//                     </button>
//                     <button onClick={onCancel} className="button">
//                         Cancel
//                     </button>
//                 </div>):null}
//             </div>
//         </div>
//     );
// };
const EditModal = ({ cardData, onSave, onCancel }) => {
    const [newData, setNewData] = useState(cardData);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(cardData.image || "");
    const [progress, setProgress] = useState(0);

    const handleFileSelection = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("File size exceeds 5MB. Please choose a smaller file.");
                return;
            }
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) return;

        setLoading(true);

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", "ibu9fmn9");

        const url = "https://api.cloudinary.com/v1_1/dfqjfd2iv/image/upload";

        try {
            const response = await fetch(url, {
                method: "POST",
                body: formData,
            });
            const result = await response.json();
            if (result.secure_url) {
                setNewData((prevData) => ({
                    ...prevData,
                    image: result.secure_url,
                }));
                setPreviewUrl(result.secure_url);
            } else {
                alert("Upload failed.");
            }
        } catch (error) {
            alert("Error during upload. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Edit Card</h2>
                <input type="text" name="title" value={newData.title} onChange={(e) => setNewData({ ...newData, title: e.target.value })} />
                <textarea name="content" value={newData.content} onChange={(e) => setNewData({ ...newData, content: e.target.value })} />
                <form onSubmit={handleFileUpload}>
                    <input type="file" onChange={handleFileSelection} />
                    {previewUrl && <img src={previewUrl} alt="Preview" />}
                    {loading && <progress value={progress} max="100" />}
                    <button type="submit" disabled={loading}>Upload</button>
                </form>
                <input
                    type="text"
                    name="link"
                    value={newData.link}
                    onChange={(e) => setNewData({ ...newData, link: e.target.value })}
                    placeholder="Link to your project"
                />
                <div style={{display:"flex", flexDirection:"row", marginTop:"20px"}}>
                <button onClick={() => onSave(newData)} disabled={loading}>Save</button>
                <button onClick={onCancel}>Cancel</button></div>
            </div>
        </div>
    );
};



export default ProjectsCard;
