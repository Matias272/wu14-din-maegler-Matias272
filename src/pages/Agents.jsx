import { Link, useLoaderData } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Banner from "../assets/giant-building.jpg";
import MailIcon from "../assets/icons/mail.svg";
import LinkedIcon from "../assets/icons/linked.svg";
import "./Agents.scss";

export default function Agents() {
  const { agents } = useLoaderData();

  return (
    <>
      <Header />
      <main className="agents_page">
        <section className="agents_page_head">
          <img className="agents_page_head_img" src={Banner} alt="" />
          <h1>Medarbejdere i Roskilde</h1>
        </section>

        <section className="section_wrapper agents_page_content">
          {agents.length === 0 ? (
            <p className="agents_page_empty">Ingen mæglere fundet.</p>
          ) : (
            <ul className="agents_page_grid">
              {agents.map((agent) => (
                <li key={agent.id} className="agents_page_card">
                  <Link to={`/agents/${agent.id}`} className="agents_page_card_link">
                    <figure>
                      <img src={agent.image?.url} alt={agent.name} />
                      <figcaption className="agents_page_card_content">
                        <h3>{agent.name}</h3>
                        <p>{agent.title}</p>
                        <ul className="agents_page_card_icons">
                          <li>
                            <button
                              type="button"
                              aria-label="Send mail"
                              onClick={(event) => {
                                event.preventDefault();
                                window.location.href = `mailto:${agent.email}`;
                              }}
                            >
                              <img src={MailIcon} alt="Mail" />
                            </button>
                          </li>
                          <li>
                            <span aria-hidden="true">
                              <img src={LinkedIcon} alt="LinkedIn" />
                            </span>
                          </li>
                        </ul>
                      </figcaption>
                    </figure>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}