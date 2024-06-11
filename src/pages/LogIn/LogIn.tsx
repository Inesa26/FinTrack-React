import "./LogIn.css";
import LoginRightSection from "../../components/LogIn/RightSectionLogin/LoginRightSection.tsx";
import LoginLeftSection from "../../components/LogIn/LeftSectionLogin/LoginLeftSection.tsx";
import { Helmet } from "react-helmet-async";

export default function LogIn() {
  return (
    <><Helmet>
      <title>Log In</title>
    </Helmet><div className="log-in">
        <LoginLeftSection />
        <LoginRightSection />
      </div></>
  );
}
