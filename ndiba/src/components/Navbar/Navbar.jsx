import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { FaBars } from 'react-icons/fa';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true); // State for navbar visibility
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let timeoutId;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show the navbar when scrolling
      if (currentScrollY < lastScrollY || currentScrollY === 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      lastScrollY = currentScrollY;

      // Set a timeout to check if scrolling has stopped
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsVisible(true); // Show the navbar after user stops scrolling
      }, 200); // Adjust delay as needed
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="navbar-content">
        <h1>Peter Ndiba</h1>
        <FaBars className="hamburger" onClick={toggleMenu} />
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><a href="#home" onClick={handleLinkClick}>Home</a></li>
          <li><a href="#about" onClick={handleLinkClick}>About</a></li>
          <li><a href="#experience" onClick={handleLinkClick}>Experience</a></li>
          <li><a href="#skills" onClick={handleLinkClick}>Skills</a></li>
          <li><a href="#projects" onClick={handleLinkClick}>Projects</a></li>
          <li><a href="#blogs" onClick={handleLinkClick}>Blogs</a></li>
          <li><a href="#achievements" onClick={handleLinkClick}>Achievements</a></li>
          <li><a href="#contact" onClick={handleLinkClick}>Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
