import React, { useState } from "react";
import "./MyCardsContent.css";

const MyCardsContent = ({ createGroup, setSelectedLink, setSelectedGroup }) => {
  const [seeMore, setseeMore] = useState(false);
  const handleseeMore = () => {
    if (createGroup.length < 6) {
      alert("Your flashcards groups are less than 6!");
    } else {
      setseeMore(!seeMore);
    }
  };
  const handleselected = (data) => {
    setSelectedGroup(data);
    setSelectedLink("viewFlashcard");
  };
  return (
    <div className="my-cards-content">
      {createGroup.length ? (
        <MyCards
          myArray={createGroup}
          seeMore={seeMore}
          handleselected={handleselected}
        />
      ) : (
        <p>No groups present to display, create to see</p>
      )}
      <button type="click" className="seemore-btn" onClick={handleseeMore}>
        {seeMore ? "<< see less" : "see more >>"}
      </button>
    </div>
  );
};

const MyCards = ({ myArray, seeMore, handleselected }) => {
  return (
    <div className="my-cards">
      {seeMore
        ? myArray.map((item, index) => (
            <MyCard key={index} data={item} handleselected={handleselected} />
          ))
        : myArray
            .slice(0, 6)
            .map((item, index) => (
              <MyCard key={index} data={item} handleselected={handleselected} />
            ))}
    </div>
  );
};

const MyCard = ({ data, handleselected }) => {
  return (
    <div className="my-card">
      <div className="card-content">
        <h3>{data.groupName}</h3>
        <p>{data.groupDescription}</p>
        <span>{`${data.termsList.length} ${
          data.termsList.length > 1 ? "cards" : "card"
        }`}</span>
        <button onClick={() => handleselected(data)}>View Cards</button>
      </div>
    </div>
  );
};

export default MyCardsContent;
