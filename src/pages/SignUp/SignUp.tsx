import { Helmet } from "react-helmet-async";
import SignUpLeftSection from "../../components/SignUp/LeftSectionSingUp/SignUpLeftSection";
import SignUpRightSection from "../../components/SignUp/RightSectionSingUp/SignUpRightSection";
import "./SignUp.css";

export default function LogIn() {
  return (
    <><Helmet>
      <title>Sign Up</title>
    </Helmet><div className="sign-up">
        <SignUpLeftSection />
        <SignUpRightSection />
      </div></>
  );
}
