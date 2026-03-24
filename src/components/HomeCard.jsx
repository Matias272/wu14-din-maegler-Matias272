import "./HomeCard.scss";
export default function HomeCard({ home }) {
    console.log(home);
    
  return (
    <figure className="home_homes_card" key={home.id}>
      <img src={home.images[0].url} alt={home.adress1} />
      <figcaption className="home_homes_card_content">
        <h3>{home.adress1}</h3>
        <p className="home_homes_card_city">
          {home.postalcode} {home.city}
        </p>
        <p className="home_homes_card_desc">{home.type}</p>
        <p>{home.cost}</p>
        <hr />
        <div>
            <span>{home.energylabel}</span>
            <p>{home.rooms} {home.livingspace}</p>
          <p className="home_homes_card_price">{home.price}</p>
        </div>
      </figcaption>
    </figure>
  );
}
