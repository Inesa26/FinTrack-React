import { Helmet } from "react-helmet-async";
import LoginLeftSection from "../../components/LogIn/LeftSectionLogin/LoginLeftSection.tsx";
import LoginRightSection from "../../components/LogIn/RightSectionLogin/LoginRightSection.tsx";
import "./LogIn.css";

export default function LogIn() {
  return (
    <>
      <Helmet>
        <title>Log In</title>
      </Helmet>
      <div className="log-in">
        <LoginLeftSection />
        <LoginRightSection />
      </div>
    </>
  );
}
