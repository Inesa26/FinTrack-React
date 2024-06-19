import { Link } from "react-router-dom";
import logoImg from "../../../assets/logo.png";
import LogInForm from "../../Form/LogInForm";
import Logo from "../../Image/Image";
import "./LoginLeftSection.css";

export default function LoginLeftSection() {
  return (
    <div className="login-left-section">
      <Link to="/">
        <div className="logo-button">
          <Logo src={logoImg} alt="FinTrack logo" width={300} />
        </div>
      </Link>
      <LogInForm />
    </div>
  );
}
