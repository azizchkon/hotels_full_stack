import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import styles from "../styles/register.css";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      password_confirmation: formData.get("password_confirmation"), 
    };

    setIsSubmitting(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.status) {
        router.push("/login");
      } else {
        setError(typeof result.message === "object" ? JSON.stringify(result.message) : result.message || "Erreur lors de l'inscription !");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur !");
    } finally {
      setIsSubmitting(false);
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
              <h3>Inscription</h3>
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <label htmlFor="name">Nom complet <span className="required">*</span></label>
                  <input type="text" name="name" required />
                </div>
                <div className="input-group">
                  <label htmlFor="email">Email <span className="required">*</span></label>
                  <input type="email" name="email" required />
                </div>
                <div className="input-group">
                  <label htmlFor="password">Mot de passe <span className="required">*</span></label>
                  <input type="password" name="password" required />
                </div>
                <div className="input-group">
                  <label htmlFor="password_confirmation">Confirmer le mot de passe <span className="required">*</span></label>
                  <input type="password" name="password_confirmation" required />
                </div>
                <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Chargement..." : "S'inscrire"}
                </button>
              </form>
              {error && <div className="error-message">{error}</div>}
              <div className="pied-lien">
                <Link href="/login">Déjà un compte? Se connecter</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
