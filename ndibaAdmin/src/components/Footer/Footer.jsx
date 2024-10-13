import React from "react";
import "./Footer.css"

const Footer = () => {
    return (
        <footer className="foot" style={{height:"11vh", paddingTop:"35px", marginTop:"-20px", backgroundColor:"#003363", color:"white", textAlign:"center"}}>
            <p>Created by <a style={{textDecoration:"none", color:"#24a8e6", border:"none", marginLeft:"-15px"}} href="https://github.com/KaburaJ">Kabura</a></p>
        </footer>

    )
}

export default Footer