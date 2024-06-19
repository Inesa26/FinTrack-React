import { Link } from "react-router-dom";
import logoImg from "../../../assets/logo.png";
import SignUpForm from "../../Form/SignUpForm";
import Logo from "../../Image/Image";
import "./SignUpRightSection.css";

export default function SignUpRightSection() {
  return (
    <div className="signup-right-section">
      <div className="logo-button">
        <Link to="/">
          <Logo src={logoImg} alt="FinTrack logo" width={300} />
        </Link>
      </div>
      <SignUpForm />
    </div>
  );
}
