import { NavLink, Link } from "react-router";
import Logo from "../assets/logo.svg";
import Plane from "../assets/icons/paper-plane.svg";
import Tlf from "../assets/icons/tlf.svg";
import User from "../assets/icons/user.svg";
import "./Header.scss";
export default function Header() {
  return (
    <>
      <section className="header_top_back">
        <div className="section_wrapper header_top">
          <ul className="header_top_ul">
            <li>
              <img src={Plane} alt="" />
              <a href="#">4000@dinmaegler.com</a>
            </li>
            <li>
              <img src={Tlf} alt="" />
              <a href="#">+45 7070 4000</a>
            </li>
            <li>
              <img src={User} alt="" />
              <a href="#">Log ind</a>
            </li>
          </ul>
        </div>
      </section>
      <section>
        <header className=" section_wrapper header">
          <Link to={"/"}>
            <img src={Logo} alt="" />
          </Link>
          <nav className="header_nav">
            <ul className="header_nav_ul">
              <li>
                <NavLink to={"/properties"}>Boliger til salg</NavLink>
              </li>
              <li>
                <NavLink to="/agents">Mæglere</NavLink>
              </li>
              <li>
                <NavLink>Mine favoritter</NavLink>
              </li>
              <li>
                <NavLink>Kontakt</NavLink>
              </li>
            </ul>
          </nav>
        </header>
      </section>
    </>
  );
}
