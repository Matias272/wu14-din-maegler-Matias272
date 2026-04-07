import { useState } from "react";
import "./HomeCard.scss";

export default function HomeCard({ home }) {
  const [isFav, setIsFav] = useState(false);
  const energyLabelColors = {
    A: "#10AC84",
    B: "#F2C94C",
    C: "#F2994A",
    D: "#EB5757",
  };
  const labelColor =
    energyLabelColors[home.energylabel?.toUpperCase()] || "#ccc";

  return (
    <figure className="home_card" key={home.id}>
      <img src={home.images[0].url} alt={home.adress1} />
      <figcaption className="home_card_content">
        <h3>{home.adress1}</h3>
        <p className="home_card_city">
          {home.postalcode} {home.city}
        </p>
        <p className="home_card_desc">
          <strong>{home.type}</strong> Ejerudgift: {home.cost}
        </p>
        <hr />
        <div className="home_card_bottom">
          <div className="home_card_bottom_left">
            <span
              style={{ background: labelColor }}
              className="home_card_bottom_energy"
            >
              {home.energylabel}
            </span>
            <p>
              <span className="home_card_bottom_left_room">{home.rooms?.toString().split("/")[0]} værelser</span> {home.livingspace} m²
            </p>
          </div>
          <strong className="home_card_price">Kr. {Number(home.price).toLocaleString("de-DE")}</strong>
        </div>
      </figcaption>
      <button
        onClick={() => setIsFav((prev) => !prev)}
        className="home_card_heart"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill={isFav ? "black" : "none"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.3671 3.84172C16.9415 3.41589 16.4361 3.0781 15.8799 2.84763C15.3237 2.61716 14.7275 2.49854 14.1254 2.49854C13.5234 2.49854 12.9272 2.61716 12.371 2.84763C11.8147 3.0781 11.3094 3.41589 10.8838 3.84172L10.0004 4.72506L9.11709 3.84172C8.25735 2.98198 7.09129 2.49898 5.87542 2.49898C4.65956 2.49898 3.4935 2.98198 2.63376 3.84172C1.77401 4.70147 1.29102 5.86753 1.29102 7.08339C1.29102 8.29925 1.77401 9.46531 2.63376 10.3251L3.51709 11.2084L10.0004 17.6917L16.4838 11.2084L17.3671 10.3251C17.7929 9.89943 18.1307 9.39407 18.3612 8.83785C18.5917 8.28164 18.7103 7.68546 18.7103 7.08339C18.7103 6.48132 18.5917 5.88514 18.3612 5.32893C18.1307 4.77271 17.7929 4.26735 17.3671 3.84172V3.84172Z"
            stroke="#162A41"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </figure>
  );
}
