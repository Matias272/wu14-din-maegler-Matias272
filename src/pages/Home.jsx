import Footer from "../components/Footer";
import Header from "../components/Header";
import Search from "../components/Search";
import House from "../assets/icons/house-hand.svg";
import HomeIc from "../assets/icons/home.svg";
import Property from "../assets/icons/property.svg";
import Hero from "../assets/hero.jpg";
import Family from "../assets/family.jpg";
import "./Home.scss";
export default function Home() {
  return (
    <>
      <Header />
      <section className="home_hero">
        <img className="home_hero_img" src={Hero} alt="" />
        <div className="home_hero_content">
          <h2>Søg efter din drømmebolig</h2>
          <Search />
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
          </ul>
        </div>
      </section>
      <Footer />
    </>
  );
}
