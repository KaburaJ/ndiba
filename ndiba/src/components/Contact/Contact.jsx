import React from "react";
import "./Contact.css"
import { FaEnvelope, FaFacebook, FaGithub, FaLinkedinIn, FaMapMarker, FaPhone, FaTwitter } from "react-icons/fa";

const Contact = () => {
    return(
      <div className="contact" id="contact">
      <div
                        className="animate one"
                        style={{ marginTop: "-.1%", marginLeft: "10px" }}
                    >
                        <span>C</span>
                        <span>o</span>
                        <span>n</span>
                        <span>t</span>
                        <span>a</span>
                        <span>c</span>
                        <span>t</span>&nbsp;
                        <span>M</span>
                        <span>e</span>
                    </div>
        <div className="container">
      {/* <span className="big-circle"></span> */}
      <img src="img/shape.png" className="square" alt="" />
      <div className="form">
        <div className="contact-info">
          <h3 className="title">Let's get in touch</h3>
          <p className="text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            dolorum adipisci recusandae praesentium dicta!
          </p>

          <div className="info">
            <div className="information">
              <FaMapMarker style={{ color: "#003363", fontSize: "1rem", marginRight: "10px" }}/>
              <p>92 Cherry Drive Uniondale, NY 11553</p>
            </div>
            <div className="information">
              <FaEnvelope style={{ color: "#003363", fontSize: "1rem", marginRight: "10px" }}/>
              <p>lorem@ipsum.com</p>
            </div>
            <div className="information">
              <FaPhone style={{ color: "#003363", fontSize: "1rem", marginRight: "10px" }}/>
              <p>123-456-789</p>
            </div>
          </div>

          <div className="social-media">
            <p>Connect with me :</p>
            <div className="social-icons">
              <FaLinkedinIn style={{ color: "#003363", fontSize: "1.5rem" }}/>
              <FaTwitter style={{ color: "#003363", fontSize: "1.5rem", marginLeft: "10px" }}/>
              <FaGithub style={{ color: "#003363", fontSize: "1.5rem", marginLeft: "10px" }}/>
              <FaEnvelope style={{ color: "#003363", fontSize: "1.5rem", marginLeft: "10px" }}/>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <span className="circle one"></span>
          <span className="circle two"></span>

          <form action="index.html" autoComplete="off">
            <h3 className="title">Contact me</h3>
            <div className="input-container">
              <input type="text" name="name" className="input" />
              <label htmlFor="">Username</label>
              <span>Username</span>
            </div>
            <div className="input-container">
              <input type="email" name="email" className="input" />
              <label htmlFor="">Email</label>
              <span>Email</span>
            </div>
            <div className="input-container">
              <input type="tel" name="phone" className="input" />
              <label htmlFor="">Phone</label>
              <span>Phone</span>
            </div>
            <div className="input-container textarea">
              <textarea name="message" className="input"></textarea>
              <label htmlFor="">Message</label>
              <span>Message</span>
            </div>
            <input type="submit" value="Send" className="btn" />
          </form>
        </div>
      </div>
    </div>
    </div>
    )
}

export default Contact