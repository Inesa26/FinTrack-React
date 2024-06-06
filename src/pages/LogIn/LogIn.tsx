import "./LogIn.css";
import LoginRightSection from "../../components/RightSectionLogin/LoginRightSection.tsx";
import LoginLeftSection from "../../components/LeftSectionLogin/LoginLeftSection.tsx";

export default function LogIn() {
  return (
    <div className="log-in">
      <LoginLeftSection />
      <LoginRightSection />
    </div>
  );
}
