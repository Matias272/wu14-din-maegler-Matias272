import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../assets/giant-building.jpg";
import { useAuth } from "../hooks/useAuth";
import "./Auth.scss";

const loginSchema = z.object({
  identifier: z.string().trim().email("Indtast en gyldig email"),
  password: z.string().min(6, "Kodeord skal være mindst 6 tegn"),
});

const registerSchema = z
  .object({
    username: z.string().trim().min(2, "Navn skal være mindst 2 tegn"),
    email: z.string().trim().email("Indtast en gyldig email"),
    password: z.string().min(6, "Kodeord skal være mindst 6 tegn"),
    confirmPassword: z.string().min(6, "Gentag kodeordet"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Kodeord matcher ikke",
    path: ["confirmPassword"],
  });

const INITIAL_LOGIN_ERRORS = {
  identifier: "",
  password: "",
};

const INITIAL_REGISTER_ERRORS = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Auth() {
  const [activeTab, setActiveTab] = useState("login");
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loginErrors, setLoginErrors] = useState(INITIAL_LOGIN_ERRORS);
  const [registerErrors, setRegisterErrors] = useState(INITIAL_REGISTER_ERRORS);

  const navigate = useNavigate();
  const { isAuthenticated, user, login, register, logout } = useAuth();

  const isLoginTab = useMemo(() => activeTab === "login", [activeTab]);

  const clearFeedback = () => {
    setServerError("");
    setSuccessMessage("");
  };

  const clearLoginError = (field) => {
    setLoginErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const clearRegisterError = (field) => {
    setRegisterErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    clearFeedback();

    const formData = new FormData(event.currentTarget);
    const payload = {
      identifier: formData.get("identifier")?.toString() ?? "",
      password: formData.get("password")?.toString() ?? "",
    };

    const result = loginSchema.safeParse(payload);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setLoginErrors({
        identifier: fieldErrors.identifier?.[0] ?? "",
        password: fieldErrors.password?.[0] ?? "",
      });
      return;
    }

    setLoginErrors(INITIAL_LOGIN_ERRORS);
    setIsSubmitting(true);

    try {
      await login(payload);
      setSuccessMessage("Du er nu logget ind.");
      event.currentTarget.reset();
      navigate("/");
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Kunne ikke logge ind.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    clearFeedback();

    const formData = new FormData(event.currentTarget);
    const payload = {
      username: formData.get("username")?.toString() ?? "",
      email: formData.get("email")?.toString() ?? "",
      password: formData.get("password")?.toString() ?? "",
      confirmPassword: formData.get("confirmPassword")?.toString() ?? "",
    };

    const result = registerSchema.safeParse(payload);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setRegisterErrors({
        username: fieldErrors.username?.[0] ?? "",
        email: fieldErrors.email?.[0] ?? "",
        password: fieldErrors.password?.[0] ?? "",
        confirmPassword: fieldErrors.confirmPassword?.[0] ?? "",
      });
      return;
    }

    setRegisterErrors(INITIAL_REGISTER_ERRORS);
    setIsSubmitting(true);

    try {
      await register({
        username: payload.username,
        email: payload.email,
        password: payload.password,
      });
      setSuccessMessage("Bruger oprettet og logget ind.");
      event.currentTarget.reset();
      navigate("/");
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Kunne ikke oprette bruger.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogoutClick = () => {
    clearFeedback();
    logout();
    setSuccessMessage("Du er nu logget ud.");
  };

  return (
    <>
      <Header />
      <main className="auth_page">
        <section className="auth_page_head">
          <img className="auth_page_head_img" src={Banner} alt="" />
          <h1>Bruger</h1>
        </section>

        <section className="section_wrapper auth_page_body">
          <div className="auth_card">
            <div className="auth_tabs" role="tablist" aria-label="Bruger handlinger">
              <button
                type="button"
                className={isLoginTab ? "is_active" : ""}
                onClick={() => {
                  clearFeedback();
                  setActiveTab("login");
                }}
              >
                Login
              </button>
              <button
                type="button"
                className={!isLoginTab ? "is_active" : ""}
                onClick={() => {
                  clearFeedback();
                  setActiveTab("register");
                }}
              >
                Register
              </button>
            </div>

            {serverError && <p className="auth_feedback auth_feedback_error">{serverError}</p>}
            {successMessage && <p className="auth_feedback auth_feedback_success">{successMessage}</p>}

            {isAuthenticated ? (
              <div className="auth_logged_in">
                <h2>Du er logget ind</h2>
                <p>{user?.username || user?.email}</p>
                <button type="button" onClick={handleLogoutClick}>
                  Log ud
                </button>
              </div>
            ) : (
              <>
                {isLoginTab ? (
                  <form className="auth_form" onSubmit={handleLoginSubmit} noValidate>
                    <label htmlFor="loginIdentifier">Email</label>
                    <input
                      id="loginIdentifier"
                      type="email"
                      name="identifier"
                      placeholder="Indtast din email"
                      onChange={() => clearLoginError("identifier")}
                      aria-invalid={Boolean(loginErrors.identifier)}
                    />
                    {loginErrors.identifier && <p className="auth_form_error">{loginErrors.identifier}</p>}

                    <label htmlFor="loginPassword">Kodeord</label>
                    <input
                      id="loginPassword"
                      type="password"
                      name="password"
                      placeholder="Indtast dit kodeord"
                      onChange={() => clearLoginError("password")}
                      aria-invalid={Boolean(loginErrors.password)}
                    />
                    {loginErrors.password && <p className="auth_form_error">{loginErrors.password}</p>}

                    <button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Logger ind..." : "Log ind"}
                    </button>
                  </form>
                ) : (
                  <form className="auth_form" onSubmit={handleRegisterSubmit} noValidate>
                    <label htmlFor="registerName">Navn</label>
                    <input
                      id="registerName"
                      type="text"
                      name="username"
                      placeholder="Indtast dit navn"
                      onChange={() => clearRegisterError("username")}
                      aria-invalid={Boolean(registerErrors.username)}
                    />
                    {registerErrors.username && <p className="auth_form_error">{registerErrors.username}</p>}

                    <label htmlFor="registerEmail">Email</label>
                    <input
                      id="registerEmail"
                      type="email"
                      name="email"
                      placeholder="Indtast din email"
                      onChange={() => clearRegisterError("email")}
                      aria-invalid={Boolean(registerErrors.email)}
                    />
                    {registerErrors.email && <p className="auth_form_error">{registerErrors.email}</p>}

                    <label htmlFor="registerPassword">Kodeord</label>
                    <input
                      id="registerPassword"
                      type="password"
                      name="password"
                      placeholder="Indtast kodeord"
                      onChange={() => clearRegisterError("password")}
                      aria-invalid={Boolean(registerErrors.password)}
                    />
                    {registerErrors.password && <p className="auth_form_error">{registerErrors.password}</p>}

                    <label htmlFor="registerConfirmPassword">Bekræft kodeord</label>
                    <input
                      id="registerConfirmPassword"
                      type="password"
                      name="confirmPassword"
                      placeholder="Gentag kodeord"
                      onChange={() => clearRegisterError("confirmPassword")}
                      aria-invalid={Boolean(registerErrors.confirmPassword)}
                    />
                    {registerErrors.confirmPassword && (
                      <p className="auth_form_error">{registerErrors.confirmPassword}</p>
                    )}

                    <button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Opretter bruger..." : "Opret bruger"}
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
