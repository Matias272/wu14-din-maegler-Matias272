import { NavLink, Link } from "react-router";
import Logo from "../assets/logo.svg";
import "./Header.scss";
export default function Header() {
  return (
    <div>
      <header className=" section_wrapper header">
        <Link to={"/"}>
          <img src={Logo} alt="" />
        </Link>
        <nav className="header_nav">
          <ul className="header_nav_ul">
            <li>
              <NavLink>Boliger til salg</NavLink>
            </li>
            <li>
              <NavLink>Mæglere</NavLink>
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
    </div>
  );
}
