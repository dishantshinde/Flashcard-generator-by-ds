import React, { useState } from "react";
import "./CreateNewContent.css";
import uploadLogo from "../../Assets/logo img.jpg";
import deleteIcon from "../../Assets/delete icon.png";
import editIcon from "../../Assets/edit icon.png";

const CreateNewContent = ({ setcreateGroup }) => {
  const [fileName, setfileName] = useState("");
  const [groupName, setgroupName] = useState("");
  const [groupDescription, setgroupDescription] = useState("");
  const [termsList, setTermsList] = useState([]);
  const filledInput =
    groupName && groupDescription && termsList.length ? true : false;

  const handleCreategroup = (e) => {
    e.preventDefault();
    if (
      groupName.trim() === "" &&
      groupDescription.trim() === "" &&
      termsList.length === 0
    ) {
      alert("please enter complete details and terms");
      return;
    }
    const groupData = {
      groupName,
      groupDescription,
      groupimgURL: fileName,
      termsList,
    };
    setcreateGroup((prevgrp) => [...prevgrp, groupData]);
    setfileName("");
    setgroupName("");
    setgroupDescription("");
    setTermsList([]);
  };
  return (
    <div className="create-new-content">
      <Newgroup
        fileName={fileName}
        setfileName={setfileName}
        setgroupName={setgroupName}
        setgroupDescription={setgroupDescription}
      />
      <Flashcardterms termsList={termsList} setTermsList={setTermsList} />
      <div className="btn-container">
        <button
          onClick={(e) => handleCreategroup(e)}
          type="submit"
          className="create-btn"
          style={filledInput ? { backgroundColor: "red" } : {}}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateNewContent;

export function Newgroup({
  fileName,
  setfileName,
  setgroupName,
  setgroupDescription,
}) {
  const handlefilechange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setfileName(URL.createObjectURL(file));
    }
  };

  return (
    <div className="new-group">
      <div className="group-name">
        <span>Create group</span>
        <div className="group-inp-img">
          <input
            type="text"
            placeholder="Enter group name"
            onChange={(e) => setgroupName(e.target.value)}
          />
          <img
            src={fileName}
            alt={fileName ? `${fileName}` : ""}
            className={`group-img ${fileName ? "active" : ""}`}
          />
          <div className="group-upload-img">
            <input
              type="file"
              id="fileInput"
              accept=".jpg,.jpeg,.png"
              style={{ display: "none" }}
              onChange={(e) => handlefilechange(e)}
            />
            <img src={uploadLogo} alt="upload-img" />
            <label htmlFor="fileInput" className="file-label">
              Upload image
            </label>
          </div>
        </div>
      </div>
      <div className="group-description">
        <span>Add Description</span>
        <textarea
          rows={10}
          placeholder="Enter group description"
          onChange={(e) => setgroupDescription(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}

export function Flashcardterms({ termsList, setTermsList }) {
  const [newTerm, setNewTerm] = useState("");
  const [newDefinition, setNewDefinition] = useState("");
  const [newImage, setNewImage] = useState("");
  const [showNewTermInput, setShowNewTermInput] = useState(true); // Set to true initially
  const [editIndex, setEditIndex] = useState(-1); // Track the index of the item being edited

  const handleAddTerm = () => {
    if (newTerm.trim() === "" || newDefinition.trim() === "") {
      alert("Please enter both term and definition.");
      return;
    }

    const newTermItem = {
      term: newTerm,
      definition: newDefinition,
      image: newImage ? URL.createObjectURL(newImage) : null,
    };
    setTermsList([...termsList, newTermItem]);
    // Reset input fields after adding
    setNewTerm("");
    setNewDefinition("");
    setNewImage("");
    // Hide the input section (optional, depending on your UI/UX)
    setShowNewTermInput(false);
  };

  const handleEditTerm = (index) => {
    setEditIndex(index);
    setShowNewTermInput(true);
    setNewTerm(termsList[index].term);
    setNewDefinition(termsList[index].definition);
    setNewImage(termsList[index].image);
  };

  const handleDeleteTerm = (index) => {
    const updatedList = termsList.filter((_, idx) => idx !== index);
    setTermsList(updatedList);
  };

  return (
    <div className="flashcard-terms">
      <ol className="circle-list">
        {termsList.map((termItem, index) => (
          <li key={index}>
            <div className="term">
              <label htmlFor={`term${index + 1}`}>Enter Term:</label>
              <input
                type="text"
                id={`term${index + 1}`}
                name={`term${index + 1}`}
                value={termItem.term}
                readOnly={index !== editIndex}
              />
            </div>
            <div className="definition">
              <label htmlFor={`definition${index + 1}`}>
                Enter Definition:
              </label>
              <input
                type="text"
                id={`definition${index + 1}`}
                name={`definition${index + 1}`}
                value={termItem.definition}
                readOnly={index !== editIndex}
              />
            </div>
            <div className="image">
              <img src={termItem.image} alt="term-img" className="term-img" />
            </div>
            <div className="term-buttons">
              <button onClick={() => handleDeleteTerm(index)}>
                <img src={deleteIcon} alt="Delete Icon" />
              </button>
              <button onClick={() => handleEditTerm(index)}>
                <img src={editIcon} alt="Edit Icon" />
              </button>
            </div>
          </li>
        ))}
        {showNewTermInput && (
          <li>
            <div className="term">
              <label htmlFor="newTerm">Enter Term:</label>
              <input
                type="text"
                id="newTerm"
                name="newTerm"
                value={newTerm}
                onChange={(e) => setNewTerm(e.target.value)}
              />
            </div>
            <div className="definition">
              <label htmlFor="newDefinition">Enter Definition:</label>
              <input
                type="text"
                id="newDefinition"
                name="newDefinition"
                value={newDefinition}
                onChange={(e) => setNewDefinition(e.target.value)}
              />
            </div>
            <div className="image">
              <label htmlFor="newImage">Upload Image:</label>
              <input
                type="file"
                id="newImage"
                name="newImage"
                onChange={(e) => setNewImage(e.target.files[0])}
              />
            </div>

            <button className="term-add-btn" onClick={handleAddTerm}>
              + Add
            </button>
          </li>
        )}
      </ol>
      {!showNewTermInput && (
        <button
          className="add-more-btn"
          onClick={() => setShowNewTermInput(true)}
        >
          + Add More
        </button>
      )}
    </div>
  );
}
