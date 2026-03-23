import { Link, NavLink } from "react-router";
import Logo from "../assets/logo.svg";
import Location from "../assets/icons/location.svg";
import Tlf from "../assets/icons/tlf.svg";
import Plane from "../assets/icons/paper-plane.svg";
import "./Footer.scss";
export default function Footer() {
  return (
    <>
      <div className="footer-back">
        <footer className="section_wrapper footer">
          <div className="footer_brand">
            <Link to={"/"}>
              <img src={Logo} alt="Din Mægler logo" className="footer_brand_logo" />
            </Link>
            <p className="footer_brand_description">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words.
            </p>
          </div>
          <div className="footer_content">
            <div className="footer_contact">
              <ul className="footer_contact_ul">
                <li>
                  <figure className="footer_contact_fig">
                    <div className="footer_contact_fig_img">
                      <img src={Tlf} alt="" />
                    </div>
                    <figcaption className="footer_contact_fig_info">
                      <p className="footer_contact_fig_info_p1">Ring til os</p>
                      <p className="footer_contact_fig_info_p2">
                        +45 7070 4000
                      </p>
                    </figcaption>
                  </figure>
                </li>
                <li>
                  <figure className="footer_contact_fig">
                    <div className="footer_contact_fig_img">
                      <img src={Plane} alt="" />
                    </div>
                    <figcaption className="footer_contact_fig_info">
                      <p className="footer_contact_fig_info_p1">Send en mail</p>
                      <p className="footer_contact_fig_info_p2">
                        4000@dinmaegler.com
                      </p>
                    </figcaption>
                  </figure>
                </li>
                <li>
                  <figure className="footer_contact_fig">
                    <div className="footer_contact_fig_img">
                      <img src={Location} alt="" />
                    </div>
                    <figcaption className="footer_contact_fig_info">
                      <p className="footer_contact_fig_info_p1">Butik</p>
                      <p className="footer_contact_fig_info_p2">
                        Stændertorvet 78, 4000 Roskilde
                      </p>
                    </figcaption>
                  </figure>
                </li>
              </ul>
              <p>Din Mægler Roskilde, er din boligibutik i lokalområdet.</p>
            </div>

            <aside className="footer_links">
              <nav className="footer_nav">
                <h3>Quick Links</h3>
                <ul>
                  <li>
                    <NavLink to={"/"}>Boliger til salg</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/"}>Mæglere</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/"}>Kontakt os</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/"}>Log ind / bliv bruger</NavLink>
                  </li>
                </ul>
              </nav>

              <div className="footer_membership">
                <p className="footer_membership_label">Medlem af</p>
                <p className="footer_membership_name">DMS</p>
                <p className="footer_membership_text">
                  Dansk Mægler Sammenslutning
                </p>
              </div>
            </aside>
          </div>
        </footer>
      </div>
      <div className="footer_bottom">layout by jit banik 2020</div>
    </>
  );
}
