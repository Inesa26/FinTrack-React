import { useState } from "react";
import CoreHelp from "../CoreHelp/CoreHelp.tsx";
import "./MainContent.css";
import homeImg from "../../../assets/home.png";
import questionImg from "../../../assets/question.png";
import dataImg from "../../../assets/data.png";
import answerImg from "../../../assets/answers.png";
import efficientImg from "../../../assets/efficient.png";

export default function MainContent() {
  const [selectedDescription, setSelectedDescription] = useState("");
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleSelect = (description: string) => {
    setSelectedDescription(description);
  };

  const handleTabButtonClick = (title: string) => {
    setSelectedDescription("");
    setActiveButton(title);
  };

  return (
    <div className="main-content">
      <div className="home-image">
        <img src={homeImg} alt="Home image" />
      </div>
      <div className="core-help">
        <h1 id="helps-you">FinTrack helps you:</h1>
        <ul>
          <CoreHelp
            title="Ask the Questions"
            description="Where does my money go?"
            image={questionImg}
            onSelect={handleSelect}
            activeButton={activeButton}
            onClick={handleTabButtonClick}
          />
          <CoreHelp
            title="See the Data"
            description="Unlock key insights."
            image={dataImg}
            onSelect={handleSelect}
            activeButton={activeButton}
            onClick={handleTabButtonClick}
          />
          <CoreHelp
            title="Be Efficient"
            description="No missed payments."
            image={efficientImg}
            onSelect={handleSelect}
            activeButton={activeButton}
            onClick={handleTabButtonClick}
          />
          <CoreHelp
            title="Have the Answers"
            description="Anytime, anywhere."
            image={answerImg}
            onSelect={handleSelect}
            activeButton={activeButton}
            onClick={handleTabButtonClick}
          />
        </ul>
        {selectedDescription && (
          <div className="description-box">
            <p>{selectedDescription}</p>
          </div>
        )}
      </div>
    </div>
  );
}
