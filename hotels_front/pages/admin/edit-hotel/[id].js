import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminBar from "../../../components/AdminBar";

export default function EditHotel() {
  const [hotel, setHotel] = useState(null);
  const [nomHotel, setNomHotel] = useState('');
  const [location, setLocation] = useState('');
  const [emplacement, setEmplacement] = useState('');
  const [categories, setCategories] = useState('');
  const [prixNuit, setPrixNuit] = useState('');
  const router = useRouter();
  const { id } = router.query; 

  useEffect(() => {
    if (id) {
      fetch(`http://127.0.0.1:8000/api/hotels/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setHotel(data);
          setNomHotel(data.nom_hotel);
          setLocation(data.location);
          setEmplacement(data.emplacement);
          setCategories(data.categories);
          setPrixNuit(data.prix_nuit);
        })
        .catch((error) => console.error('Erreur de récupération de l\'hôtel:', error));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedHotel = {
      nom_hotel: nomHotel,
      location,
      emplacement,
      categories,
      prix_nuit: prixNuit,
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/hotels/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedHotel),
      });

      if (response.ok) {
        router.push('/admin/hotels'); 
      } else {
        console.error('Erreur lors de la mise à jour de l\'hôtel');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  if (!hotel) {
    return <p>Chargement de l'hôtel...</p>;
  }

  return (
    <>
     <AdminBar />
          <section className="image-section">
                    <h1>
                       Modifier  un hotel
                    </h1>
          </section>
    <div className="form">
      <div className="card">
        <h2>Modifier l'Hôtel</h2>
        <form onSubmit={handleSubmit}>
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
            <input type="text" value={categories} onChange={(e) => setCategories(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Prix par Nuit:</label>
            <input type="number" value={prixNuit} onChange={(e) => setPrixNuit(e.target.value)} required />
          </div>
          <button type="submit" className="submit-btn">Mettre à Jour l'Hôtel</button>
        </form>
      </div>
      </div>
    </>
  );
}
