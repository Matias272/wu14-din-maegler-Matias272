import Header from "../components/Header";
import Footer from "../components/Footer";
import "./NotFound.scss";
import { useNavigate } from "react-router";
export default function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <section className="notfound">
        <div className="notfound_title">
          <h2>Hov!</h2>
        </div>
        <p className="notfound_p1">Du er havnet på en side som ikke findes! </p>
        <p className="notfound_p2">
          Det er vi kede af! Vi har sendt en besked af sted til vores
          internetbureau, og bedt dem se på fejlen.
        </p>
        <button onClick={() => navigate("/")} className="notfound_btn">Tilbage til forsiden</button>
      </section>
      <Footer />
    </>
  );
}
