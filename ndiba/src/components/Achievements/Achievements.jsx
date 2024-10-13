import React from "react";
import "./Achievements.css"
import ProjectsCard from "../ProjectsCard/ProjectsCard";
import PublicationCard from "../PublicationCard/PublicationCard";

const Achievements = () => {
    return (
        <div className="projects-container" id="achievements">
            <div
                className="animate one"
                style={{ marginTop: "-.1%", marginLeft: "10px" }}
            >
                <span>M</span>
                <span>y</span>&nbsp;
                <span>A</span>
                <span>c</span>
                <span>h</span>
                <span>i</span>
                <span>e</span>
                <span>v</span>
                <span>e</span>
                <span>m</span>
                <span>e</span>
                <span>n</span>
                <span>t</span>
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

export default Achievements