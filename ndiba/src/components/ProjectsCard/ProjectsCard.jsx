import React from "react";
import projectSampleImage from "../images/adam-lukomski-ja9VHwgcABo-unsplash.jpg"
import "./ProjectsCard.css"

const ProjectsCard = ({cardData}) => {
    return (
            <div className="card-hover">
                <div className="card-hover__content" >
                    <h3 className="card-hover__title" style={{fontSize:"16px"}}>
                        {cardData.title}
                    </h3>
                    <p className="card-hover__text" style={{fontSize:"14px"}}>{cardData.content}</p>
                    <a href={cardData.link} className="card-hover__link" style={{border:"none"}}>
                        <span style={{color:"#24a8e6", marginTop:"20px"}}>See More</span>
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{color:"#24a8e6", marginTop:"20px"}}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </a>
                </div>
                {/* <div className="card-hover__extra">
                    <h4>Learn <span>now</span> and get <span>40%</span> discount!</h4>
                </div> */}
                <img src={cardData.image} alt={projectSampleImage}></img>
            </div>
    )
}

export default ProjectsCard