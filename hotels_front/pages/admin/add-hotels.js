import { useState } from 'react';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminBar from "../../components/AdminBar";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function AddHotel() {
  const [nomHotel, setNomHotel] = useState('');
  const [location, setLocation] = useState('');
  const [emplacement, setEmplacement] = useState('');
  const [categories, setCategories] = useState('');
  const [description, setDescription] = useState('');
  const [prixNuit, setPrixNuit] = useState('');
  const [imagePrincipale, setImagePrincipale] = useState(null);
  const [imageSecondaire, setImageSecondaire] = useState(null);
  const [imageTroisieme, setImageTroisieme] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); 
    if (!token) {
      alert("Vous devez être connecté !");
      router.push("/login");
      return;
    }

    const formData = new FormData();
    formData.append("nom_hotel", nomHotel);
    formData.append("location", location);
    formData.append("emplacement", emplacement);
    formData.append("categories", categories);
    formData.append("description", description);
    formData.append("prix_nuit", prixNuit);
    formData.append("image_principale", imagePrincipale);
    formData.append("image_secondaire", imageSecondaire);
    formData.append("image_troisieme", imageTroisieme);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/hotels', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert("Hôtel ajouté avec succès !");
        router.push('/admin/hotels');
      } else {
        console.error('Erreur lors de la création de l\'hôtel');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <>
      <AdminBar />
      <section className="image-section">
                <h1>
                   Ajouter un hotel
                </h1>
      </section>
      <div className="form">
      <div className="card">
        <h2>Créer un Nouvel Hôtel</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label>Nom de l'Hôtel:</label>
            <input type="text" value={nomHotel} onChange={(e) => setNomHotel(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Location:</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Emplacement:</label>
            <input type="text" value={emplacement} onChange={(e) => setEmplacement(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Catégories:</label>
            <input type="number" value={categories} onChange={(e) => setCategories(parseInt(e.target.value))} required />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
          </div>
          <div className="form-group">
            <label>Prix par Nuit:</label>
            <input type="number" step="0.01" value={prixNuit} onChange={(e) => setPrixNuit(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Image Principale:</label>
            <input type="file" onChange={(e) => setImagePrincipale(e.target.files[0])} required />
          </div>
          <div className="form-group">
            <label>Image Secondaire:</label>
            <input type="file" onChange={(e) => setImageSecondaire(e.target.files[0])} />
          </div>
          <div className="form-group">
            <label>Image Troisième:</label>
            <input type="file" onChange={(e) => setImageTroisieme(e.target.files[0])} />
          </div>
          <button type="submit" className="submit-btn">Créer l'Hôtel</button>
        </form>
      </div>
    </div>
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
