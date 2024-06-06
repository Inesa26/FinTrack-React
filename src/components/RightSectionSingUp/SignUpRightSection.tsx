import SignUpForm from "../Forms/SignUpForm";
import Logo from "../Image/Image";
import logoImg from "../../assets/logo.png";
import "./SignUpRightSection.css";

export default function SignUpRightSection() {
  return (
    <div className="signup-right-section">
      <Logo src={logoImg} alt="FinTrack logo" width={300} />
      <SignUpForm />
    </div>
  );
}
