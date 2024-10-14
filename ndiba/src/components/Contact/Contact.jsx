import React, { useEffect, useState } from "react";
import "./Contact.css";
import { FaEnvelope, FaGithub, FaLinkedinIn, FaMapMarker, FaPhone, FaTwitter } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import { database } from "../../firebase"; 
import { ref, onValue } from "firebase/database";

const Contact = () => {
  const userId = "user1"; 
  const [socialLinks, setSocialLinks] = useState({
      linkedin: '',
      github: '',
      youtube: '',
      twitter: ''
  });
  const [contactInfo, setContactInfo] = useState({
      email: '',
      phone: '',
      about: '',
      resumeUrl: '', 
  });

  useEffect(() => {
      const userRef = ref(database, `users/${userId}/about/`);
      const unsubscribe = onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
              setSocialLinks({
                  linkedin: data.socialLinks?.linkedin || '',
                  github: data.socialLinks?.github || '',
                  youtube: data.socialLinks?.youtube || '',
                  twitter: data.socialLinks?.twitter || ''
              });
              setContactInfo({
                  email: data.email || '',
                  phone: data.phone || '',
                  about: data.about || '',
                  resumeUrl: data.resumeUrl || '',
              });
          } else {
              console.log("No entries found.");
          }
      });

      return () => unsubscribe();
  }, [userId]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stateMessage, setStateMessage] = useState(null);
  const [senderData, setSenderData] = useState({
    from_name: '',
    user_email: '',
    phone_number: '',
    message: ''
  });

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
        templateParams, 
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
              <div className="information">
                <FaEnvelope style={{ color: "#003363", fontSize: "1rem", marginRight: "10px" }} />
                <p>{contactInfo.email || 'lorem@ipsum.com'}</p>
              </div>
              <div className="information">
                <FaPhone style={{ color: "#003363", fontSize: "1rem", marginRight: "10px" }} />
                <p>{contactInfo.phone || '123-456-789'}</p>
              </div>
            </div>
            <div className="social-media">
              <p>Connect with me :</p>
              <div className="social-icons">
                {socialLinks.linkedin && (
                  <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedinIn style={{ color: "#003363", fontSize: "1.5rem" }} />
                  </a>
                )}
                {socialLinks.twitter && (
                  <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                    <FaTwitter style={{ color: "#003363", fontSize: "1.5rem", marginLeft: "10px" }} />
                  </a>
                )}
                {socialLinks.github && (
                  <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub style={{ color: "#003363", fontSize: "1.5rem", marginLeft: "10px" }} />
                  </a>
                )}
                {contactInfo.email && (
                  <a href={`mailto:${contactInfo.email}`}>
                    <FaEnvelope style={{ color: "#003363", fontSize: "1.5rem", marginLeft: "10px" }} />
                  </a>
                )}
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
              {stateMessage && (
                <p className={stateMessage.includes("successfully") ? "success" : "error"}>
                  {stateMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
