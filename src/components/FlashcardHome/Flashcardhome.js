import React, { useState } from "react";
import "./Flashcardhome.css";
import CreateNewContent from "../CreatenewContent/CreateNewContent";
import MyCardsContent from "../MyCardsContent/MyCardsContent";
import ViewFlashcard from "../viewFlashcard/viewFlashcard";

const Flashcardhome = () => {
  const [selectedLink, setSelectedLink] = useState("createNew");
  const [createGroup, setcreateGroup] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState({});

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  return (
    <div className="flashcard-homepage">
      <h4>Create Flashcard</h4>
      <div className="links">
        <button onClick={() => handleLinkClick("createNew")}>Create New</button>
        <button onClick={() => handleLinkClick("myCards")}>My Cards</button>
      </div>
      <div className="content">
        {selectedLink === "createNew" && (
          <CreateNewContent setcreateGroup={setcreateGroup} />
        )}
        {selectedLink === "myCards" && (
          <MyCardsContent
            createGroup={createGroup}
            setSelectedLink={setSelectedLink}
            setSelectedGroup={setSelectedGroup}
          />
        )}
        {selectedLink === "viewFlashcard" && (
          <ViewFlashcard selectedGroup={selectedGroup} />
        )}
      </div>
    </div>
  );
};

export default Flashcardhome;
