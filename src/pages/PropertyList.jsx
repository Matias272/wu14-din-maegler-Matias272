import { useState } from "react";
import { useLoaderData } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HomeCard from "../components/HomeCard";
import "./PropertyList.scss";

export default function PropertyList() {
  const { homes } = useLoaderData();
  const [filters, setFilters] = useState({
    type: "",
    minPrice: "",
    maxPrice: "",
  });

  const filteredHomes = homes.filter((home) => {
    if (
      filters.type &&
      !home.type.toLowerCase().includes(filters.type.toLowerCase())
    ) {
      return false;
    }
    if (filters.minPrice && Number(home.price) < Number(filters.minPrice)) {
      return false;
    }
    if (filters.maxPrice && Number(home.price) > Number(filters.maxPrice)) {
      return false;
    }
    return true;
  });

  function handleFilterChange(e) {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <>
      <Header />
      <div className="property_list">
        <section className="property_list_head">
          <h1>Søg efter alle boligerne</h1>
          <p>Gennemse alle {homes.length} boliger til salg</p>
        </section>

        <section className="property_list_filters">
          <label>
            Boligtype
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
            >
              <option value="">Alle typer</option>
              <option value="Villa">Villa</option>
              <option value="Lejlighed">Lejlighed</option>
              <option value="Hus">Hus</option>
              <option value="Etageejenddom">Etageejenddom</option>
            </select>
          </label>

          <label>
            Min pris
            <input
              type="number"
              name="minPrice"
              placeholder="Min pris"
              value={filters.minPrice}
              onChange={handleFilterChange}
            />
          </label>

          <label>
            Max pris
            <input
              type="number"
              name="maxPrice"
              placeholder="Max pris"
              value={filters.maxPrice}
              onChange={handleFilterChange}
            />
          </label>
        </section>

        <section className="property_list_wrapper">
          {filteredHomes.length === 0 ? (
            <p className="property_list_empty">
              Ingen boliger matcher dine filtre. Prøv at justere søgekriterierne.
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