import React from "react";
import "./Experience.css"
import ProjectsCard from "../ProjectsCard/ProjectsCard";
import PublicationCard from "../PublicationCard/PublicationCard";

const Experience = () => {
    return (
        <div className="projects-container" id="experience">
            <div
                className="animate one"
                style={{ marginTop: "-.1%", marginLeft: "10px" }}
            >
                <span>M</span>
                <span>y</span>&nbsp;
                <span>E</span>
                <span>x</span>
                <span>p</span>
                <span>e</span>
                <span>r</span>
                <span>i</span>
                <span>e</span>
                <span>n</span>
                <span>c</span>
                <span>e</span>
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

export default Experience