import React from "react";
import "./Projects.css"
import ProjectsCard from "../ProjectsCard/ProjectsCard";

const Projects = () => {
    return (
        <div className="projects-container" id="projects">
            <div
                className="animate one"
                style={{ marginTop: "-.1%", marginLeft: "10px" }}
            >
                <span>M</span>
                <span>y</span>&nbsp;
                <span>P</span>
                <span>r</span>
                <span>o</span>
                <span>j</span>
                <span>e</span>
                <span>c</span>
                <span>t</span>
                <span>s</span>
            </div>
            <div className="cards">
                <ProjectsCard/>
                <ProjectsCard/>
                <ProjectsCard/>
                <ProjectsCard/>
                <ProjectsCard/>
                <ProjectsCard/>
                <ProjectsCard/>
                <ProjectsCard/>
</div>
        </div>
    )
}

export default Projects