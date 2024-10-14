import React, { useEffect, useState } from "react";
import "./Contact.css";
import { FaEnvelope, FaGithub, FaLinkedinIn, FaMapMarker, FaPhone, FaTwitter } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import { database } from "../../firebase"; // Adjust the path based on your structure
import { ref, onValue, set, off } from "firebase/database";


const Contact = () => {
  const [name, setName] = useState("Peter Ndiba");
  const [roles, setRoles] = useState(["ROS Developer"]); // Initialize as an array
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userID = "user1"; // Replace with a dynamic value in a real app

  useEffect(() => {
    // Load initial data from Firebase using the unique user ID
    const nameRef = ref(database, `users/${userID}/name`);
    const roleRef = ref(database, `users/${userID}/role`);

    // Listen for value changes
    onValue(nameRef, (snapshot) => {
      setName(snapshot.val() || "Peter Ndiba");
    });

    onValue(roleRef, (snapshot) => {
      setRoles(snapshot.val() ? snapshot.val().split(",") : ["ROS Developer"]); // Split roles string into array
    });

    // Cleanup the listener on unmount
    return () => {
      off(nameRef); // Remove listener for name
      off(roleRef); // Remove listener for role
    };
  }, [userID]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stateMessage, setStateMessage] = useState(null);

  // Store sender data in state
  const [senderData, setSenderData] = useState({
    from_name: '',
    user_email: '',
    phone_number: '',
    message: ''
  });

  // Function to update senderData from form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSenderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare template params for EmailJS
    const templateParams = {
      from_name: senderData.from_name,
      user_email: senderData.user_email,
      phone_number: senderData.phone_number,
      message: senderData.message,
    };

    emailjs
      .send(
        process.env.REACT_APP_SERVICE_ID,  
        process.env.REACT_APP_TEMPLATE_ID,  
        templateParams,  // Pass the template parameters
        process.env.REACT_APP_PUBLIC_KEY 
      )
      .then(
        (result) => {
          setStateMessage('Message sent successfully!');
          setIsSubmitting(false);
          setTimeout(() => setStateMessage(null), 5000);
        },
        (error) => {
          setStateMessage('Failed to send message. Please try again.');
          setIsSubmitting(false);
          setTimeout(() => setStateMessage(null), 5000);
        }
      );

    // Reset form after submission
    e.target.reset();
    setSenderData({
      from_name: '',
      user_email: '',
      phone_number: '',
      message: ''
    });
  };

  return (
    <div className="contact" id="contact">
      <div className="animate one" style={{ marginTop: "-.1%", marginLeft: "10px" }}>
        <span>C</span><span>o</span><span>n</span><span>t</span><span>a</span><span>c</span><span>t</span>&nbsp;
        <span>M</span><span>e</span>
      </div>
      <div className="container">
        <img src="img/shape.png" className="square" alt="" />
        <div className="form">
          <div className="contact-info">
            <h3 className="title">Let's get in touch</h3>
            <p className="text">Feel free to reach out to me for any inquiries or collaborations!</p>
            <div className="info">
              {/* <div className="information">
                <FaMapMarker style={{ color: "#003363", fontSize: "1rem", marginRight: "10px" }} />
                <p>92 Cherry Drive Uniondale, NY 11553</p>
              </div> */}
              <div className="information">
                <FaEnvelope style={{ color: "#003363", fontSize: "1rem", marginRight: "10px" }} />
                <p>lorem@ipsum.com</p>
              </div>
              <div className="information">
                <FaPhone style={{ color: "#003363", fontSize: "1rem", marginRight: "10px" }} />
                <p>123-456-789</p>
              </div>
            </div>
            <div className="social-media">
              <p>Connect with me :</p>
              <div className="social-icons">
                <FaLinkedinIn style={{ color: "#003363", fontSize: "1.5rem" }} />
                <FaTwitter style={{ color: "#003363", fontSize: "1.5rem", marginLeft: "10px" }} />
                <FaGithub style={{ color: "#003363", fontSize: "1.5rem", marginLeft: "10px" }} />
                <FaEnvelope style={{ color: "#003363", fontSize: "1.5rem", marginLeft: "10px" }} />
              </div>
            </div>
          </div>

          <div className="contact-form">
            <form onSubmit={sendEmail} autoComplete="off">
              <h3 className="title">Contact me</h3>
              <div className="input-container">
                <input
                  type="text"
                  name="from_name"
                  className="input"
                  required
                  placeholder="Username"
                  onChange={handleChange}
                />
              </div>
              <div className="input-container">
                <input
                  type="email"
                  name="user_email"
                  className="input"
                  required
                  placeholder="Email"
                  onChange={handleChange}
                />
              </div>
              <div className="input-container">
                <input
                  type="tel"
                  name="phone_number"
                  className="input"
                  placeholder="Phone Number"
                  onChange={handleChange}
                />
              </div>
              <div className="input-container textarea">
                <textarea
                  name="message"
                  className="input"
                  required
                  placeholder="Message"
                  onChange={handleChange}
                ></textarea>
              </div>
              <input
                type="submit"
                value={isSubmitting ? "Sending..." : "Send"}
                className="btn"
                disabled={isSubmitting}
              />
              {stateMessage && <p>{stateMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
