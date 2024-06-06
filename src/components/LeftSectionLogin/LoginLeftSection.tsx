import LogInForm from "../Forms/LogInForm";
import Logo from "../Image/Image";
import logoImg from "../../assets/logo.png";
import "./LoginLeftSection.css";

export default function LoginLeftSection() {
  return (
    <div className="login-left-section">
      <Logo src={logoImg} alt="FinTrack logo" width={300} />
      <LogInForm />
    </div>
  );
}
