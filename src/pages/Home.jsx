import Footer from "../components/Footer";
import Header from "../components/Header";
import Search from "../components/Search";
import { useState } from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router";
import { z } from "zod";
import House from "../assets/icons/house-hand.svg";
import HomeIc from "../assets/icons/home.svg";
import Property from "../assets/icons/property.svg";
import Hero from "../assets/hero.jpg";
import Giant from "../assets/giant-building.jpg";
import Family from "../assets/family.jpg";
import Phone2 from "../assets/Phone-2.png";
import Phone1 from "../assets/Phone-1.png";
import Arrow from "../assets/icons/Arrow.svg";
import Linked from "../assets/icons/linked.svg";
import Mail from "../assets/icons/mail.svg";
import Store from "../assets/icons/play-store.svg";
import Apple from "../assets/icons/apple.svg";
import Per from "../assets/icons/cust1.svg";
import Ubi from "../assets/icons/maps2.svg";
import "./Home.scss";
import HomeCard from "../components/HomeCard";

const newsletterSchema = z.object({
  email: z.string().email(),
});

export default function Home() {
  const { homes, agents } = useLoaderData();
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.toString().trim() ?? "";
    const result = newsletterSchema.safeParse({ email });

    if (!result.success) {
      return;
    }

    setIsSubscribed(true);
    event.currentTarget.reset();

    setTimeout(() => {
      setIsSubscribed(false);
    }, 2500);
  };

  return (
    <>
      {isSubscribed && <div className="home_news_success">Tilmedlt</div>}
      <Header />
      <section className="home_hero">
        <img className="home_hero_img" src={Hero} alt="" />
        <div className="home_hero_content">
          <h2>Søg efter din drømmebolig</h2>
          <Search antalBoliger={homes.length} />
        </div>
      </section>
      <section className="home_intro">
        <div className="section_wrapper home_intro_wrapper">
          <figure className="home_intro_img">
            <img src={Family} alt="" />
            <figcaption className="home_intro_img_over">
              <div className="home_intro_img_over_content">
                <h2>38+</h2>
                <p>års mægler- erfaring</p>
              </div>
            </figcaption>
          </figure>
          <article className="home_intro_content">
            <h2>Vi har fulgt danskerne hjem i snart 4 årtier</h2>
            <h4>Det synes vi siger noget om os!</h4>
            <br />
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has normal distribution.
            </p>
            <br />
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
            <br />
            <ul className="home_intro_content_ul">
              <li>
                <figure>
                  <img src={House} alt="" />
                  <figcaption>
                    <h4>4829</h4>
                    <p>boliger solgt</p>
                  </figcaption>
                </figure>
              </li>
              <li>
                <figure>
                  <img src={HomeIc} alt="" />
                  <figcaption>
                    <h4>158</h4>
                    <p>boliger til salg</p>
                  </figcaption>
                </figure>
              </li>
            </ul>
          </article>
        </div>
      </section>
      <hr className="intro_line" />
      <section>
        <div className="section_wrapper intro_bottom_info">
          <ul className="intro_bottom_info_ul">
            <li>
              <figure className="intro_bottom_info_ul_fig">
                <img src={Property} alt="" />
                <figcaption>
                  <h4>Bestil et salgstjek</h4>
                  <p>
                    Med et Din Mægler Salgstjek bliver du opdateret på værdien
                    af din bolig.
                  </p>
                </figcaption>
              </figure>
            </li>
            <li>
              <figure className="intro_bottom_info_ul_fig">
                <img src={Ubi} alt="" />
                <figcaption>
                  <h4>74 Butikker</h4>
                  <p>
                    Hos Din Mægler er din bolig til salg i alle vores 74
                    butikker, som er fordelt rundt om i Danmark.
                  </p>
                </figcaption>
              </figure>
            </li>
            <li>
              <figure className="intro_bottom_info_ul_fig">
                <img src={Per} alt="" />
                <figcaption>
                  <h4>Tilmeld køberkartotek</h4>
                  <p>
                    Når du er tilmeldt vores køberkartotek, bliver du kontaktet
                    inden en ny bolig bliver annonceret.
                  </p>
                </figcaption>
              </figure>
            </li>
          </ul>
        </div>
      </section>

      <section className="home_homes">
        <div className="section_wrapper home_homes_wrapper">
          <div className="home_homes_head">
            <h2>Udvalgte Boliger</h2>
            <p>
              There are many variations of passages of Lorem Ipsum available but
              the this in majority have suffered alteration in some
            </p>
          </div>

          <ul className="home_homes_grid">
            {homes.slice(0, 4).map((home) => (
              <li key={home.id}>
                <HomeCard home={home} />
              </li>
            ))}
          </ul>
          <Link to="/properties" className="home_homes_btn">
            Se alle boliger
          </Link>
        </div>
      </section>

      <section className="home_news">
        <img className="home_news_img" src={Giant} alt="" />
        <div className="section_wrapper home_news_wrapper">
          <form className="home_news_wrapper_form" onSubmit={handleNewsletterSubmit}>
            <label htmlFor="emailNew">
              Tilmeld dig vores nyhedsbrev og hold dig opdateret på
              boligmarkedet
            </label>
            <div className="home_news_wrapper_form_input">
              <input
                placeholder="indtast din email adresse"
                type="email"
                name="email"
                id="emailNew"
              />
              <button type="submit" className="home_news_wrapper_form_input_btn">
                <img src={Arrow} alt="wqe" />
              </button>
            </div>
          </form>
        </div>
      </section>
      <section className="home_agents">
        <div className="section_wrapper home_agents_wrapper">
          <div className="home_agents_head">
            <h2>Mød vores engagerede medarbejdere</h2>
            <p>
              Din Mægler er garant for altid veluddannet assistance i dit
              boligsalg.
            </p>
            <p>Kontakt en af vores medarbejdere.</p>
          </div>

          <ul className="home_agents_grid">
            {agents.slice(0, 3).map((agent) => (
              <li key={agent.id} className="home_agents_card">
                <figure>
                  <img src={agent.image.url} alt={agent.name} />
                  <figcaption className="home_agents_card_content">
                    <h4>{agent.name}</h4>
                    <p>{agent.title}</p>
                    <ul className="home_agents_card_content_ul">
                      <li>
                        <a href={`mailto:${agent.email}`}>
                          <img src={Mail} alt="" />
                        </a>
                      </li>
                      <li>
                        <img src={Linked} alt="" />
                      </li>
                    </ul>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>

          <Link to="/agents" className="home_agents_btn">
            Se alle mæglere
          </Link>
        </div>
      </section>
      <section className="home_app">
        <figure className="section_wrapper home_app_wrapper">
          <figcaption className="home_app_wrapper_content">
            <h2>Hold dig opdateret på salgsprocessen</h2>
            <p>
              Når du sælger din bolig hos Din Mægler, kommunikerer du nemt med
              den ansvarlige mægler eller butik med vores app. Her kan du også
              se statistik på interessen for din bolig i alle vores
              salgskanaler.
            </p>
            <ul className="home_app_wrapper_content_ul">
              <li>
                <button className="home_app_wrapper_content_ul_btn1">
                  <img src={Store} alt="" />
                  Google Play
                </button>
              </li>
              <li>
                <button className="home_app_wrapper_content_ul_btn2">
                  <img src={Apple} alt="" />
                  Apple Store
                </button>
              </li>
            </ul>
          </figcaption>
          <div className="home_app_wrapper_img">
            <img className="home_app_wrapper_img_img1" src={Phone1} alt="" />
            <img className="home_app_wrapper_img_img2" src={Phone2} alt="" />
          </div>
        </figure>
      </section>
      <Footer />
    </>
  );
}
