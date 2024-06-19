import { useNavigate } from "react-router-dom";
import logoImg from "../../../assets/logo.png";
import Image from "../../Image/Image.tsx";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <Image src={logoImg} alt="FinTrack logo" width={180} />
      <div className="navbar-links">
        <a href="about">About</a>
        <a href="pricing">Pricing</a>
        <a href="product">Product</a>
        <a href="contact">Contact</a>
      </div>
      <button className="login-button" onClick={() => navigate("/login")}>
        Login
      </button>
    </nav>
  );
}
