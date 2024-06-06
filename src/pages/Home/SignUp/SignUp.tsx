import SignUpLeftSection from "../../../components/LeftSectionSingUp/SignUpLeftSection";
import SignUpRightSection from "../../../components/RightSectionSingUp/SignUpRightSection";
import "./SignUp.css";

export default function LogIn() {
  return (
    <div className="sign-up">
      <SignUpLeftSection />
      <SignUpRightSection />
    </div>
  );
}
