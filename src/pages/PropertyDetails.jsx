import { useLoaderData } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LocationIcon from "../assets/icons/location.svg";
import UserIcon from "../assets/icons/user.svg";
import HeartIcon from "../assets/icons/heart.svg";
import MailIcon from "../assets/icons/mail.svg";
import PhoneIcon from "../assets/icons/tlf.svg";
import LinkedIcon from "../assets/icons/linked.svg";
import "./PropertyDetails.scss";

function formatMoney(value) {
  return `Kr. ${Number(value ?? 0).toLocaleString("da-DK")}`;
}

function toText(value, suffix = "") {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  return `${value}${suffix}`;
}

export default function PropertyDetails() {
  const { home } = useLoaderData();

  return (
    <>
      <Header />
      <main className="property_details">
        <figure className="property_details_hero">
          <img src={home.images?.[0]?.url} alt={home.adress1} />
        </figure>

        <section className="section_wrapper property_details_top">
          <div className="property_details_address">
            <h1>{home.adress1}</h1>
            <p>
              {home.postalcode} {home.city}
            </p>
          </div>
          <div className="property_details_price">
            {formatMoney(home.price)}
          </div>
        </section>

        <section className="section_wrapper property_details_meta">
          <ul>
            <li>
              <span>Sagsnummer:</span>
              <strong>{toText(home.id)}</strong>
            </li>
            <li>
              <span>Boligareal:</span>
              <strong>{toText(home.livingspace, " m²")}</strong>
            </li>
            <li>
              <span>Grundareal:</span>
              <strong>{toText(home.lotsize, " m²")}</strong>
            </li>
            <li>
              <span>Rum/værelser:</span>
              <strong>{toText(home.rooms)}</strong>
            </li>
            <li>
              <span>Antal Plan:</span>
              <strong>{toText(home.floorplan)}</strong>
            </li>
          </ul>

          <ul>
            <li>
              <span>Kælder:</span>
              <strong>{toText(home.basementsize, " m²")}</strong>
            </li>
            <li>
              <span>Byggeår:</span>
              <strong>{toText(home.built)}</strong>
            </li>
            <li>
              <span>Ombygget:</span>
              <strong>{toText(home.remodel)}</strong>
            </li>
            <li>
              <span>Energimærke:</span>
              <strong>{toText(home.energylabel)}</strong>
            </li>
            <li>
              <span>Type:</span>
              <strong>{toText(home.type)}</strong>
            </li>
          </ul>

          <ul>
            <li>
              <span>Udbetaling:</span>
              <strong>{formatMoney(home.payment)}</strong>
            </li>
            <li>
              <span>Brutto ex ejerudgift:</span>
              <strong>{formatMoney(home.gross)}</strong>
            </li>
            <li>
              <span>Netto ex ejerudgift:</span>
              <strong>{formatMoney(home.netto)}</strong>
            </li>
            <li>
              <span>Ejerudgift:</span>
              <strong>{formatMoney(home.cost)}</strong>
            </li>
          </ul>
        </section>

        <section className="section_wrapper property_details_content">
          <article>
            <h2>Beskrivelse</h2>
            <p>{home.description}</p>
          </article>

          <aside className="property_details_agent">
            <h3>Ansvarlig mægler</h3>
            <div className="property_details_agent_card">
              <img src={home.agent?.image?.url} alt={home.agent?.name} />
              <div>
                <h4>{home.agent.name}</h4>
                <p>{home.agent?.title}</p>
                <a href={`tel:${home.agent?.phone}`}>
                  <img src={PhoneIcon} alt="Telefon" />
                  {home.agent?.phone}
                </a>
                <a href={`mailto:${home.agent?.email}`}>
                  <img src={MailIcon} alt="Mail" />
                  {home.agent?.email}
                </a>
                <a href="#" aria-label="LinkedIn">
                  <img src={LinkedIcon} alt="LinkedIn" />
                </a>
              </div>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}
