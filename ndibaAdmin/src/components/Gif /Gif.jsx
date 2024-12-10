// import React, { useEffect } from 'react';
// import './Gif.css'; // Create a CSS file for styling

// const TenorGif = () => {
//     useEffect(() => {
//         // Dynamically load the Tenor embed script
//         const script = document.createElement('script');
//         script.src = 'https://tenor.com/embed.js';
//         script.async = true;
//         document.body.appendChild(script);

//         // Clean up the script on component unmount
//         return () => {
//             if (document.body.contains(script)) {
//                 document.body.removeChild(script); // Check if the script is still in the body before removing
//             }
//         };
//     }, []);

//     return (
//         <div className="gif-container">
//             {/* <div
//                 className="tenor-gif-embed"
//                 data-postid="18871668"
//                 data-share-method="host"
//                 data-aspect-ratio="1"
//                 data-width="100%"
//                 data-loop="true"
//             >
//                 <a href="https://tenor.com/view/rob%C3%B4-gif-24233833"></a>
//                 f<a href="https://tenor.com/search/rob%C3%B4-stickers"></a>
//             </div> */}
//             <div className="tenor-gif-embed" data-postid="18871668" data-share-method="host" data-aspect-ratio="1" data-width="100%">
//                 <a href="https://tenor.com/view/rob%C3%B4-gif-24233833"></a>
//                 <a href="https://tenor.com/search/rob%C3%B4-stickers"></a>
//             </div>
//             {/* <div class="tenor-gif-embed" data-postid="24233833" data-share-method="host" data-aspect-ratio="1" data-width="100%"><a href="https://tenor.com/view/rob%C3%B4-gif-24233833">Robô Sticker</a>from <a href="https://tenor.com/search/rob%C3%B4-stickers">Robô Stickers</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script> */}

//             {/* <div className="tenor-gif-embed" data-postid="5175695279238915494" data-share-method="host" data-aspect-ratio="1.33155" data-width="100%">
//                 <a href="https://tenor.com/view/happy-hello-excited-hi-wave-gif-5175695279238915494"></a>
//                 <a href="https://tenor.com/search/happy-gifs"></a>
//             </div> */}
//             {/* <div class="tenor-gif-embed" data-postid="5072286" data-share-method="host" data-aspect-ratio="1" data-width="100%"><a href="https://tenor.com/view/hello-gif-5072286">Hello GIF</a>from <a href="https://tenor.com/search/hello-gifs">Hello GIFs</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script> */}
//         </div>
//     );
// };

// export default TenorGif;


import React from 'react';
import './Gif.css'; // Create a CSS file for styling
import hiRobotGif from '../images/hi-robot.gif'; // Import the local gif file

const TenorGif = () => {
    return (
        <div className="gif-container">
            {/* Render the local GIF */}
            <img src={hiRobotGif} alt="Hi Robot" className="gif" />
        </div>
    );
};

export default TenorGif;
