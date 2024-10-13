import React, { useEffect } from 'react';
import './Gif.css'; // Create a CSS file for styling

const TenorGif = () => {
    useEffect(() => {
        // Dynamically load the Tenor embed script
        const script = document.createElement('script');
        script.src = 'https://tenor.com/embed.js';
        script.async = true;
        document.body.appendChild(script);

        // Clean up the script on component unmount
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="gif-container">
            <div
                className="tenor-gif-embed"
                data-postid="18871668"
                data-share-method="host"
                data-aspect-ratio="1"
                data-width="100%"
                data-loop="true"
            >
                <a href="https://tenor.com/view/rob%C3%B4-gif-24233833">Robô Sticker</a>
                from <a href="https://tenor.com/search/rob%C3%B4-stickers">Robô Stickers</a>
            </div>
            
        </div>
    );
};

export default TenorGif;
