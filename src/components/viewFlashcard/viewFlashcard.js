import React, { useState, useEffect, useRef } from "react";
import "./viewFlashcard.css";
import share from "../../Assets/share.png";
import download from "../../Assets/download.png";
import print from "../../Assets/print.png";
import copy from "../../Assets/copy.png";
import facebooklogo from "../../Assets/facebook.png";
import twitterlogo from "../../Assets/twitter.png";
import linkedinlogo from "../../Assets/linkedin.png";

const ViewFlashcard = ({ selectedGroup }) => {
  const [currentPage, setCurrentPage] = useState(-1);
  const [sharebtn, setsharebtn] = useState(false);
  const slidesRef = useRef(null);

  useEffect(() => {
    if (sharebtn) {
      const overlayDiv = document.querySelector(".overlay");
      overlayDiv.classList.add("active");
    } else {
      const overlayDiv = document.querySelector(".overlay");
      overlayDiv.classList.remove("active");
    }
  }, [sharebtn]);

  function nextPage() {
    if (currentPage === selectedGroup.termsList.length - 1) {
      return;
    }
    setCurrentPage((prevPage) => prevPage + 1);
  }

  function prevPage() {
    if (currentPage === -1) {
      return;
    }
    setCurrentPage((prevPage) => prevPage - 1);
  }

  const handleShare = () => {
    // Logic for sharing
    setsharebtn(!sharebtn);
  };

  const handleDownload = () => {
    // Logic for downloading
    console.log("Download button clicked");
  };

  const handlePrint = () => {
    // Logic for printing
    console.log("Print button clicked");
  };

  return (
    <div className="flashcards-container">
      <div className="flashcard-title">
        <h2 className="group-title">Flashcards</h2>
        <div className="selected-group">
          <h4 className={`group-name ${currentPage === -1 ? "active" : ""}`}>
            {selectedGroup.groupName}:
          </h4>
          {selectedGroup && (
            <ul className="term-ul">
              {selectedGroup.termsList.map((card, index) => (
                <li
                  key={index}
                  className={`term-li ${currentPage === index ? "active" : ""}`}
                >
                  {card.term}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="flashcard-details">
        {selectedGroup && (
          <div className="carousel" ref={slidesRef}>
            <div className="carousel-inner">
              <div
                className={`carousel-item ${
                  currentPage === -1 ? "active" : ""
                }`}
              >
                <img src={selectedGroup.groupimgURL} alt="Group" />
                <p>{selectedGroup.groupDescription}</p>
              </div>
              <div
                className={`carousel-item terms ${
                  currentPage !== -1 ? "active" : ""
                }`}
              >
                <ul className="terms-ul-desc">
                  {selectedGroup.termsList.map((term, index) => (
                    <li
                      key={index}
                      className={`terms ${
                        currentPage === index ? "active" : ""
                      }`}
                    >
                      <span>{term.term}</span>
                      <img src={term.image} alt="term-img" />
                      <p>{term.definition}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="carousel-btns">
              <button className="carousel-prev" onClick={prevPage}>
                {"<<"}
              </button>
              <span>
                {currentPage === -1
                  ? `${currentPage + 2} / ${selectedGroup.termsList.length + 1}`
                  : `${currentPage + 2} / ${
                      selectedGroup.termsList.length + 1
                    }`}
              </span>
              <button className="carousel-next" onClick={nextPage}>
                {">>"}
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flashcard-actions">
        <button onClick={handleShare}>
          <img src={share} alt="share" /> Share
        </button>
        <button onClick={handleDownload}>
          <img src={download} alt="share" /> Download
        </button>
        <button onClick={handlePrint}>
          <img src={print} alt="share" /> Print
        </button>
      </div>
      <ShareModal sharebtn={sharebtn} setsharebtn={setsharebtn} />
      <div className="overlay blur"></div>
    </div>
  );
};
function ShareModal({ sharebtn, setsharebtn }) {
  const currentURL = window.location.href;
  function copyText() {
    var input = document.getElementById("copyInput");
    var inputValue = input.value.trim(); // Get the trimmed value of the input field
    if (inputValue) {
      navigator.clipboard
        .writeText(inputValue)
        .then(() => alert("Copied: " + inputValue))
        .catch((err) => console.error("Unable to copy text:", err));
    } else {
      alert("Input field is empty!"); // Handle empty input field
    }
  }

  return (
    sharebtn && (
      <div id="share-modal">
        <div className="modal-content">
          <button
            type="button"
            className="close-btn"
            onClick={() => setsharebtn(!sharebtn)}
          >
            &times;
          </button>
          <p>Share</p>
          <div className="input-container">
            <div>
              <label htmlFor="copyInput" className="link">
                Link
              </label>
              <input type="text" id="copyInput" value={currentURL} readOnly />
            </div>
            <button onClick={copyText}>
              <img src={copy} alt="copy-btn" />
            </button>
          </div>
          <div className="social-icons">
            <a
              href="https://www.facebook.com/dishant.shinde.503"
              className="social-icon"
            >
              <img src={facebooklogo} alt="Facebook" />
            </a>
            <a href="#" className="social-icon">
              <img src={twitterlogo} alt="Twitter" />
            </a>
            <a
              href="www.linkedin.com/in/dishant-shinde-33a003211"
              className="social-icon"
            >
              <img src={linkedinlogo} alt="LinkedIn" />
            </a>
          </div>
        </div>
      </div>
    )
  );
}

export default ViewFlashcard;
