import React from "react";
import "./Navbar.css"; // Import your CSS file for styling
import flashcardIcon from "../../Assets/flash-card.png";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-heading">
        <img src={flashcardIcon} alt="flashcard-icon" />
        <span className="heading-text">flashcard generator</span>
      </div>
      <div className="navbar-login">
        <button className="login-button">Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
