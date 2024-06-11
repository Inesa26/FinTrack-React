import LogInForm from "../../Form/LogInForm";
import Logo from "../../Image/Image";
import logoImg from "../../../assets/logo.png";
import "./LoginLeftSection.css";
import { Link } from 'react-router-dom';

export default function LoginLeftSection() {
  return (
    <div className="login-left-section">
         <Link to="/">
            <div className = "logo-button">
      <Logo src={logoImg} alt="FinTrack logo" width={300} />
      </div>
      </Link>
      <LogInForm />
    </div>
  );
}
