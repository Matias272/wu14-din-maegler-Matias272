import { useState } from "react";
import "./Search.scss";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();

    const nextSearch = searchText.trim();

    if (!nextSearch) {
      setIsOverlayOpen(false);
      setResults([]);
      return;
    }

    setIsOverlayOpen(true);
    setIsLoading(true);
    setActiveSearch(nextSearch);

    try {
      const homesUrl = new URL("https://dinmaegler.onrender.com/homes");
      homesUrl.searchParams.set("_q", nextSearch);
      const response = await fetch(homesUrl.toString());
      const data = await response.json();
      setResults(Array.isArray(data) ? data.slice(0, 10) : []);
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleInputChange(event) {
    const value = event.target.value;
    setSearchText(value);
    if (value.trim() === "") {
      setIsOverlayOpen(false);
    }
  }

  return (
      <div className="search">
        <h3>Søg blandt boliger til salg</h3>
        <p>Hvad skal din næste bolig indeholde</p>
        <form className="search_form" onSubmit={handleSubmit}>
          <input
            placeholder="Søg på fx. glaskeramisk komfur, bryggers, kælder eller lignende"
            type="text"
            name="search"
            id="search"
            value={searchText}
            onChange={handleInputChange}
          />
          <button type="submit">Søg</button>
        </form>
        {isOverlayOpen && (
          <div
            className="search_overlay"
            onClick={() => setIsOverlayOpen(false)}
          >
            <div
              className="search_overlay_panel"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="search_overlay_head">
                <h3>Resultater for "{activeSearch}"</h3>
              </div>

              {isLoading ? (
                <p className="search_overlay_empty">Søger boliger...</p>
              ) : results.length === 0 ? (
                <p className="search_overlay_empty">
                  Ingen boliger matcher din søgning.
                </p>
              ) : (
                <ul className="search_overlay_list">
                  {results.map((home) => (
                    <li key={home.id} className="search_overlay_item">
                      <img src={home.images[0]?.url} alt={home.adress1} />
                      <div>
                        <h4>{home.adress1}</h4>
                        <p>
                          {home.postalcode} {home.city}
                        </p>
                        <strong>
                          Kr. {Number(home.price).toLocaleString("de-DE")}
                        </strong>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
  );
}
