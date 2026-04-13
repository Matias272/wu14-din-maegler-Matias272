import { useState } from "react";
import { z } from "zod";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../assets/giant-building.jpg";
import PhoneIcon from "../assets/icons/tlf.svg";
import MailIcon from "../assets/icons/paper-plane.svg";
import LocationIcon from "../assets/icons/location.svg";
import "./Kontakt.scss";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Navn skal være mindst 2 tegn"),
  email: z.string().trim().email("Indtast en gyldig email"),
  subject: z.string().trim().min(3, "Emne skal være mindst 3 tegn"),
  message: z.string().trim().min(10, "Besked skal være mindst 10 tegn"),
});

const INITIAL_ERRORS = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Kontakt() {
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
      subject: formData.get("subject")?.toString() ?? "",
      message: formData.get("message")?.toString() ?? "",
    };

    const result = contactSchema.safeParse(payload);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0] ?? "",
        email: fieldErrors.email?.[0] ?? "",
        subject: fieldErrors.subject?.[0] ?? "",
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
      <main className="kontakt_page">
        <section className="kontakt_page_head">
          <img className="kontakt_page_head_img" src={Banner} alt="" />
          <h1>Kontakt os</h1>
        </section>

        <section className="section_wrapper kontakt_page_body">
          <article className="kontakt_page_intro">
            <h2>Vi sidder klar til at besvare dine spørgsmål</h2>
            <p>
              Det kan opstå tvivl om mange ting, når man gerne vil, eller er i gang
              med at sælge sin bolig.
            </p>
            <p>Vores medarbejdere sidder klar alle ugens dage til at svare på dine spørgsmål.</p>
          </article>

          <div className="kontakt_page_content">
            <section className="kontakt_page_form_card">
              {isSubmitted && (
                <p className="kontakt_page_form_success">Besked sendt</p>
              )}

              <form className="kontakt_page_form" onSubmit={handleSubmit} noValidate>
                <div className="kontakt_page_form_grid">
                  <div>
                    <label htmlFor="name">Navn</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Indtast dit navn"
                      onChange={() => clearFieldError("name")}
                      aria-invalid={Boolean(errors.name)}
                    />
                    {errors.name && <p className="kontakt_page_form_error">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Indtast din email"
                      onChange={() => clearFieldError("email")}
                      aria-invalid={Boolean(errors.email)}
                    />
                    {errors.email && <p className="kontakt_page_form_error">{errors.email}</p>}
                  </div>
                </div>

                <label htmlFor="subject">Emne</label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="Indtast emne"
                  onChange={() => clearFieldError("subject")}
                  aria-invalid={Boolean(errors.subject)}
                />
                {errors.subject && <p className="kontakt_page_form_error">{errors.subject}</p>}

                <label htmlFor="message">Besked</label>
                <textarea
                  id="message"
                  name="message"
                  rows="7"
                  placeholder="Indtast din besked..."
                  onChange={() => clearFieldError("message")}
                  aria-invalid={Boolean(errors.message)}
                />
                {errors.message && <p className="kontakt_page_form_error">{errors.message}</p>}

                <label className="kontakt_page_form_checkbox" htmlFor="newsletter">
                  <input id="newsletter" type="checkbox" name="newsletter" />
                  Ja tak, jeg vil gerne modtage Din Mæglers nyhedsbrev.
                </label>

                <button type="submit">Send besked</button>
              </form>
            </section>

            <aside className="kontakt_page_info">
              <article className="kontakt_page_info_item">
                <div className="kontakt_page_info_icon">
                  <img src={PhoneIcon} alt="Telefon" />
                </div>
                <h3>Ring til os</h3>
                <a href="tel:+4570704000">+45 7070 4000</a>
              </article>

              <article className="kontakt_page_info_item">
                <div className="kontakt_page_info_icon">
                  <img src={MailIcon} alt="Mail" />
                </div>
                <h3>send en mail</h3>
                <a href="mailto:4000@dinmaegler.dk">4000@dinmaegler.dk</a>
              </article>

              <article className="kontakt_page_info_item">
                <div className="kontakt_page_info_icon">
                  <img src={LocationIcon} alt="Lokation" />
                </div>
                <h3>Besøg butikken</h3>
                <p>Stændertorvet 78,</p>
                <p>4000 Roskilde</p>
              </article>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}