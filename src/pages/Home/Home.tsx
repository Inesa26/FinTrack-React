import Navbar from "../../components/Home/Navbar/Navbar.tsx";
import Header from "../../components/Header/HomeHeader/Header.tsx";
import MainContent from "../../components/Home/MainContent/MainContent.tsx";
import "./Home.css";
import { Helmet } from "react-helmet-async";


export default function Home() {
  return (
    <><Helmet>
      <title>Home</title>
    </Helmet>
    <div className="home">
        <Navbar />
        <Header />
        <MainContent />
      </div></>
  );
}
