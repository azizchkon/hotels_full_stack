import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import styles from "../styles/register.css";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.status) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);

        router.push(data.user.role === "admin" ? "/admin/menu" : "/hotels");
      } else {
        setError("Identifiants incorrects !");
      }
    } catch (err) {
      setError("Erreur de connexion !");
    }
  }

  return (
    <>
      <Navbar />
      <section className="register_login center-content">
        <div className="card">
          <div className="row">
            <div className="image-container">
              <img className="responsive-img" src="/images/tt.jpg" alt="Illustration" />
            </div>
            <div className="form-container">
              <h3>Connexion</h3>
              {error && <div className="error-message">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <label htmlFor="email">Email <span className="required">*</span></label>
                  <input type="email" name="email" id="email" required />
                </div>
                <div className="input-group">
                  <label htmlFor="password">Mot de passe <span className="required">*</span></label>
                  <input type="password" name="password" id="password" required />
                </div>
                <button className="btn btn-primary" type="submit">
                  Se connecter
                </button>
              </form>
              <div className="footer-link">
                <Link href="/register">Créer un compte</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}