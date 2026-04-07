import { useState } from "react";
import { useLoaderData } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HomeCard from "../components/HomeCard";
import Backi from "../assets/backi.jpg";
import "./PropertyList.scss";

const RANGE_MIN = 0;
const RANGE_MAX = 12000000;
const RANGE_STEP = 50000;

function parsePrice(value) {
  const parsed = Number(String(value ?? "").replace(/\D/g, ""));
  return Number.isNaN(parsed) ? 0 : parsed;
}

function formatDkk(value) {
  return `${Number(value).toLocaleString("da-DK")} kr.`;
}

export default function PropertyList() {
  const { homes } = useLoaderData();
  const [filters, setFilters] = useState({
    type: "",
    minPrice: RANGE_MIN,
    maxPrice: RANGE_MAX,
  });

  const minPercent =
    ((filters.minPrice - RANGE_MIN) / (RANGE_MAX - RANGE_MIN)) * 100;
  const maxPercent =
    ((filters.maxPrice - RANGE_MIN) / (RANGE_MAX - RANGE_MIN)) * 100;

  const filteredHomes = homes.filter((home) => {
    const homePrice = parsePrice(home.price);

    if (
      filters.type &&
      !home.type.toLowerCase().includes(filters.type.toLowerCase())
    ) {
      return false;
    }

    if (homePrice < Number(filters.minPrice)) {
      return false;
    }

    if (homePrice > Number(filters.maxPrice)) {
      return false;
    }

    return true;
  });

  function handleTypeChange(e) {
    const { value } = e.target;
    setFilters((prev) => ({
      ...prev,
      type: value,
    }));
  }

  function handleMinPriceChange(e) {
    const value = Number(e.target.value);
    setFilters((prev) => ({
      ...prev,
      minPrice: Math.min(value, prev.maxPrice - RANGE_STEP),
    }));
  }

  function handleMaxPriceChange(e) {
    const value = Number(e.target.value);
    setFilters((prev) => ({
      ...prev,
      maxPrice: Math.max(value, prev.minPrice + RANGE_STEP),
    }));
  }

  return (
    <>
      <Header />
      <div className="property_list">
        <section className="property_list_head">
          <h1>Søg efter alle boligerne</h1>
          <img className="property_list_head_img" src={Backi} alt="" />
        </section>
        <section className="section_wrapper property_list_filters">
          <h2>Søg efter dit drømmehus</h2>
          <div className="property_list_filters_wrapper">
            <label className="property_list_type_filter">
              Ejendomstype
              <select
                name="type"
                value={filters.type}
                onChange={handleTypeChange}
              >
                <option value="">Alle typer</option>
                <option value="Villa">Villa</option>
                <option value="Lejlighed">Lejlighed</option>
                <option value="Hus">Hus</option>
                <option value="Etageejenddom">Etageejenddom</option>
              </select>
            </label>

            <label className="property_list_price_filter">
              Pris-interval
              <div className="property_list_price_slider">
                <div className="property_list_price_slider_track" />
                <div
                  className="property_list_price_slider_range"
                  style={{
                    left: `${minPercent}%`,
                    right: `${100 - maxPercent}%`,
                  }}
                />

                <input
                  type="range"
                  min={RANGE_MIN}
                  max={RANGE_MAX}
                  step={RANGE_STEP}
                  value={filters.minPrice}
                  onChange={handleMinPriceChange}
                  aria-label="Minimum pris"
                />
                <input
                  type="range"
                  min={RANGE_MIN}
                  max={RANGE_MAX}
                  step={RANGE_STEP}
                  value={filters.maxPrice}
                  onChange={handleMaxPriceChange}
                  aria-label="Maksimum pris"
                />
              </div>
              <div className="property_list_price_values">
                <span>{formatDkk(filters.minPrice)}</span>
                <span>{formatDkk(filters.maxPrice)}</span>
              </div>
            </label>
          </div>
        </section>

        <section className=" section_wrapper property_list_wrapper">
          {filteredHomes.length === 0 ? (
            <p className="property_list_empty">
              Ingen boliger matcher dine filtre. Prøv at justere
              søgekriterierne.
            </p>
          ) : (
            <ul className="property_list_grid">
              {filteredHomes.map((home) => (
                <li key={home.id}>
                  <HomeCard home={home} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
}
