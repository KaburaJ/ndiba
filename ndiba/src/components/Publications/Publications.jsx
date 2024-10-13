import React from "react";
import "./Publications.css"
import PublicationCard from "../PublicationCard/PublicationCard";

const Publications = () => {
    return (
        <div className="projects-container" id="blogs">
            <div
                className="animate one"
                style={{ marginTop: "-.1%", marginLeft: "10px" }}
            >
                <span>M</span>
                <span>y</span>&nbsp;
                <span>B</span>
                <span>l</span>
                <span>o</span>
                <span>g</span>
                <span>s</span>
                <span>/</span>
                <span>P</span>
                <span>u</span>
                <span>b</span>
                <span>l</span>
                <span>i</span>
                <span>c</span>
                <span>a</span>
                <span>t</span>
                <span>i</span>
                <span>o</span>
                <span>n</span>
                <span>s</span>
            </div>
            <div className="cards">
                <PublicationCard/>
                <PublicationCard/>
                <PublicationCard/>
                {/* <PublicationCard/>
                <PublicationCard/> */}
</div>
        </div>
    )
}

export default Publications