import React, { useState, useEffect } from 'react';

const ConsoleText = ({ words, colors }) => {
  const [text, setText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorClass, setCursorClass] = useState('console-underscore');
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const typingSpeed = 120; // Speed of typing
    const waitingTime = 1000; // Time to wait after typing is done
    const erasingSpeed = 60; // Speed of erasing

    let timer;

    if (isDeleting) {
      if (letterCount > 0) {
        timer = setTimeout(() => {
          setText(currentWord.substring(0, letterCount - 1));
          setLetterCount(letterCount - 1);
        }, erasingSpeed);
      } else {
        setIsDeleting(false);
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setLetterCount(0);
        setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
      }
    } else {
      if (letterCount < currentWord.length) {
        timer = setTimeout(() => {
          setText(currentWord.substring(0, letterCount + 1));
          setLetterCount(letterCount + 1);
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, waitingTime);
      }
    }

    return () => clearTimeout(timer);
  }, [letterCount, isDeleting, currentWordIndex, words, colors]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorClass((prev) => (prev === 'console-underscore' ? 'console-underscore hidden' : 'console-underscore'));
    }, 400);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div>
      <div id="console" style={{ color: colors[currentColorIndex], marginLeft: '15px' }}>
        {text}
        <span className={cursorClass}>|</span>
      </div>
    </div>
  );
};

export default ConsoleText;
