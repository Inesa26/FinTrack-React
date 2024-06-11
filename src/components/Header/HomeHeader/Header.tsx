import "./Header.css";
import Message from "../../Message.tsx";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="left-section">
        <Message
          text="Finance Made Simple"
          color="#404041"
          size="90px"
          margin="10px"
          children={undefined}
        ></Message>
        <Message text="Success Made" color="#404041" size="90px" margin="10px">
          <span id="possible">Possible.</span>
        </Message>
      </div>
      <div className="right-section">
        <Message
          text="A rich life isn’t just about money. It’s about how you use it."
          color="#404041"
          size="25px"
          margin="10px"
          children={undefined}
        ></Message>
        <button className="get-started-btn" onClick={() => navigate("/signup")}>
          Get Started
        </button>
      </div>
    </header>
  );
}
