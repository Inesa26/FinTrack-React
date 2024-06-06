import Navbar from "../../components/Navbar/Navbar.tsx";
import Header from "../../components/Header/Header.tsx";
import MainContent from "../../components/MainContent/MainContent.tsx";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <Header />
      <MainContent />
    </div>
  );
}
