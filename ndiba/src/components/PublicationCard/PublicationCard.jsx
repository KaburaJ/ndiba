import React from "react";
import "./PublicationCard.css"
import blogImg from "../images/yucel-moran-fZYgnAoeio4-unsplash.jpg"

const PublicationCard = () => {
    return (
        <section className="articles">
            <article>
                <div className="article-wrapper">
                    <figure>
                        <img src={blogImg} alt="" />
                    </figure>
                    <div className="article-body">
                        <h2>This is some blog title</h2>
                        <p>
                            Curabitur convallis ac quam vitae laoreet. Nulla mauris ante, euismod sed lacus sit amet, congue bibendum eros. Etiam mattis lobortis porta. Vestibulum ultrices iaculis enim imperdiet egestas.
                        </p>
                        <a href="#" className="read-more">
                            Read more <span className="sr-only">about this is some title</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </div>
            </article>
            
        </section>
    )
}

export default PublicationCard