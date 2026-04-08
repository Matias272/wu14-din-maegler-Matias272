import { useState } from "react";
import { useLoaderData } from "react-router";
import { z } from "zod";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../assets/giant-building.jpg";
import MailIcon from "../assets/icons/mail.svg";
import PhoneIcon from "../assets/icons/tlf.svg";
import LinkedIcon from "../assets/icons/linked.svg";
import "./AgentDetails.scss";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Navn skal være mindst 2 tegn"),
  email: z.string().trim().email("Indtast en gyldig email"),
  phone: z
    .string()
    .trim()
    .min(8, "Telefonnummer skal være mindst 8 tegn")
    .regex(/^[+\d\s()-]+$/, "Telefonnummer indeholder ugyldige tegn"),
  message: z.string().trim().min(10, "Besked skal være mindst 10 tegn"),
});

const INITIAL_ERRORS = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function AgentDetails() {
  const { agent } = useLoaderData();
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function clearFieldError(fieldName) {
    setErrors((prev) => ({
      ...prev,
      [fieldName]: "",
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitted(false);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name")?.toString() ?? "",
      email: formData.get("email")?.toString() ?? "",
      phone: formData.get("phone")?.toString() ?? "",
      message: formData.get("message")?.toString() ?? "",
    };

    const result = contactSchema.safeParse(payload);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0] ?? "",
        email: fieldErrors.email?.[0] ?? "",
        phone: fieldErrors.phone?.[0] ?? "",
        message: fieldErrors.message?.[0] ?? "",
      });
      return;
    }

    setErrors(INITIAL_ERRORS);
    setIsSubmitted(true);
    event.currentTarget.reset();

    setTimeout(() => {
      setIsSubmitted(false);
    }, 2500);
  }

  return (
    <>
      <Header />
      <main className="agent_details">
        <section className="agent_details_head">
          <img className="agent_details_head_img" src={Banner} alt="" />
          <h1>Kontakt en medarbejder</h1>
        </section>

        <section className="section_wrapper agent_details_body">
          <article className="agent_details_main">
            <header className="agent_details_profile">
              <img src={agent.image?.url} alt={agent.name} />
              <div className="agent_details_profile_content">
                <h2>{agent.name}</h2>
                <p>{agent.title}</p>
                <ul className="agent_details_profile_links">
                  <li>
                    <a href={`tel:${agent.phone}`}>
                      <img src={PhoneIcon} alt="Telefon" />
                      {agent.phone}
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${agent.email}`}>
                      <img src={MailIcon} alt="Mail" />
                      {agent.email}
                    </a>
                  </li>
                </ul>
                <ul className="agent_details_profile_icons">
                  <li>
                    <a href={`mailto:${agent.email}`} aria-label="Send mail">
                      <img src={MailIcon} alt="Mail" />
                    </a>
                  </li>
                  <li>
                    <a href="#" aria-label="LinkedIn profil">
                      <img src={LinkedIcon} alt="LinkedIn" />
                    </a>
                  </li>
                </ul>
              </div>
            </header>

            <section className="agent_details_about">
              <h3>Om {agent.name}</h3>
              <p>{agent.description}</p>
            </section>

            <section className="agent_details_form_wrap">
              <h3>Kontakt {agent.name}</h3>
              {isSubmitted && (
                <p className="agent_details_form_success">Besked sendt</p>
              )}
              <form className="agent_details_form" onSubmit={handleSubmit} noValidate>
                <label htmlFor="name">Navn</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Indtast navn"
                  onChange={() => clearFieldError("name")}
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && <p className="agent_details_form_error">{errors.name}</p>}

                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Indtast email"
                  onChange={() => clearFieldError("email")}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && (
                  <p className="agent_details_form_error">{errors.email}</p>
                )}

                <label htmlFor="phone">Telefon</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Indtast telefon nummer"
                  onChange={() => clearFieldError("phone")}
                  aria-invalid={Boolean(errors.phone)}
                />
                {errors.phone && (
                  <p className="agent_details_form_error">{errors.phone}</p>
                )}

                <label htmlFor="message">Besked</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Skriv din besked her"
                  onChange={() => clearFieldError("message")}
                  aria-invalid={Boolean(errors.message)}
                />
                {errors.message && (
                  <p className="agent_details_form_error">{errors.message}</p>
                )}

                <button type="submit">Send besked</button>
              </form>
            </section>
          </article>

          <aside className="agent_details_side">
            <div className="agent_details_side_search">
              <h4>Search Property</h4>
              <label htmlFor="searchProperty" className="agent_details_side_search_input">
                <span aria-hidden="true">⌕</span>
                <input
                  id="searchProperty"
                  type="text"
                  name="searchProperty"
                  placeholder="Search"
                />
              </label>
            </div>

            <div className="agent_details_side_call">
              <p>Find The Best Property For Rent Or Buy</p>
              <span>Call Us Now</span>
              <a href="tel:+0123456789">+0 123 456 789</a>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}