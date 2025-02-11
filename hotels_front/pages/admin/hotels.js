import { useEffect, useState } from "react";
import Link from "next/link";
import AdminBar from "../../components/AdminBar";
import { useRouter } from "next/router";
import styles from "../../styles/admin.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    
    fetch("http://127.0.0.1:8000/api/hotels", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            router.push("/login");
          }
        }
        return response.json();
      })
      .then((data) => setHotels(data))
      .catch((error) => {
        console.error("Erreur :", error);
        setError("Impossible de récupérer les hôtels.");
      });
  }, [router]);
  const handleDelete = (id) => {
    if (!confirm("Voulez-vous vraiment supprimer cet hôtel ?")) return;
    fetch(`http://127.0.0.1:8000/api/hotels/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then(() => {
        setHotels(hotels.filter((hotel) => hotel.id !== id));
      })
      .catch((error) => console.error("Erreur de suppression:", error));
  };

  return (
    <>
      <AdminBar />
      <section class="image-section text-center">
        <h1>
         liste des hotels<br/>
         <button className="btn btn-primary" onClick={() => router.push("/admin/add-hotels")}>Créer un hôtel</button>
        </h1>
      </section>

      <div class="hotels">
      {error ? (
        <p class="error-message">{error}</p>
      ) : hotels.length === 0 ? (
        <p class="no-hotels">Aucun hôtel trouvé.</p>
      ) : (
        <div class="hotels-grid">
          {hotels.map((hotel) => (
            <div class="hotel-card" key={hotel.id}>
              <img
                src={`http://127.0.0.1:8000/storage/${hotel.image_principale}`}
                class="hotel-image"
              />
              <div class="hotel-info">
                <h5 class="hotel-title">{hotel.nom_hotel}</h5>
                <div class="stars">
                  {[...Array(hotel.categories)].map((_, i) => (
                    <i key={i} className="star">★</i>
                  ))}
                </div>
                <p class="hotel-price">{hotel.prix_nuit} DT / nuit</p>
                <p class="hotel-location">{hotel.location}</p>
                <button className="details-button"  data-bs-toggle="modal"
                data-bs-target={`#hotelModal${hotel.id}`}>Détails</button>
                <button className="btn btn-warning" onClick={() => router.push(`/admin/edit-hotel/${hotel.id}`)}>Modifier</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(hotel.id)}>Supprimer</button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>

      {hotels.map((hotel) => (
       <div className="modal fade" id={`hotelModal${hotel.id}`} tabIndex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">{hotel.nom_hotel}</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body text-center">
                <img
                  src={`http://127.0.0.1:8000/storage/${hotel.image_principale}`}
                  alt={hotel.nom_hotel}
                  class="img-fluid mb-3"
                />
                <p>{hotel.description}</p>
                <p><strong>Localisation:</strong> {hotel.location}</p>
                <p><strong>Prix par nuit:</strong> {hotel.prix_nuit} DT</p>
                {[...Array(Number(hotel.categories))].map((_, i) => (
                <i key={i} className="fa fa-star text-warning"></i>
))}
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

<footer>
  <div className="container">
    <div className="footer-item">
      <i className="fas fa-phone"></i>
      <p>Besoin d'aide ? <br />71 124 124</p>
    </div>
    <div className="footer-item">
      <i className="fas fa-tag"></i>
      <p>Meilleur Prix<br />GARANTI</p>
    </div>
    <div className="footer-item">
      <i className="fas fa-store"></i>
      <p>34 Agences en<br />Tunisie</p>
    </div>
    <div className="footer-item">
      <i className="fas fa-credit-card"></i>
      <p>Paiement 100%<br />sécurisé</p>
    </div>
    <div className="footer-item">
      <i className="far fa-smile"></i>
      <p>+ 200000 Clients<br />Satisfaits</p>
    </div>
  </div>
  <div className="container">
    <div className="social-media">
      <a href="#"><i className="fab fa-facebook-f"></i></a>
      <a href="#"><i className="fab fa-twitter"></i></a>
      <a href="#"><i className="fab fa-instagram"></i></a>
      <a href="#"><i className="fab fa-youtube"></i></a>
    </div>
  </div>
</footer> 
    </>
  );
}
