import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "./res.css";

export default function NewReservation() {
  const router = useRouter();
  const { hotel_id } = router.query;
  const [hotel, setHotel] = useState(null);
  const [form, setForm] = useState({
    nb_personne: 1,
    date_debut: "",
    date_fin: "",
    option: "",
    prix_total: 0,
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    if (hotel_id) {
      fetch(`http://127.0.0.1:8000/api/hotels/${hotel_id}`)
        .then((res) => res.json())
        .then((data) => setHotel(data))
        .catch((err) => console.error("Erreur de récupération de l'hôtel", err));
    }
  }, [hotel_id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (form.date_debut && form.date_fin && hotel) {
      const startDate = new Date(form.date_debut);
      const endDate = new Date(form.date_fin);
      const diffInDays = Math.max((endDate - startDate) / (1000 * 3600 * 24), 0);
      setForm((prev) => ({ ...prev, prix_total: diffInDays * hotel.prix_par_nuit }));
    }
  }, [form.date_debut, form.date_fin, hotel]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    if (!form.date_debut || !form.date_fin || form.nb_personne < 1) {
      setMessage("Veuillez remplir tous les champs correctement.");
      return;
    }

    const reservationData = {
      hotel_id,
      nb_personne: form.nb_personne,
      date_debut: form.date_debut,
      date_fin: form.date_fin,
      option: form.option,
      prix_total: form.prix_total,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reservationData),
      });
      setMessage("Réservation effectuée avec succès !");
      router.push("/hotels");
    } catch (error) {
      console.error("Erreur lors de la réservation :", error);
      setMessage("Une erreur est survenue lors de la réservation.");
    }
  };
  
    
  

  return (
    <>
      <Navbar />
      <div className="c">
      {hotel ? (
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">{hotel.nom_hotel}</h2>
            <p className="card-text">Prix par nuit : {hotel.prix} DT</p>

            <form onSubmit={handleSubmit}>
              <label htmlFor="nb_personne">Nombre de personnes :</label>
              <input type="number"  name="nb_personne" id="nb_personne" value={form.nb_personne} onChange={handleChange}  min="1"
                required
              />

              <label htmlFor="date_debut">Date de début :</label>
              <input type="date" name="date_debut"  id="date_debut" value={form.date_debut}onChange={handleChange}
                required
              />

              <label htmlFor="date_fin">Date de fin :</label>
              <input type="date"  name="date_fin"  id="date_fin"value={form.date_fin} onChange={handleChange}
                required
              />

              <label htmlFor="option">arrangement :</label>
              <select name="option" id="option" value={form.option} onChange={handleChange}
              >
                <option value="">Sélectionnez une arrangement</option>
                <option value="Petit-déjeuner">Petit-déjeuner</option>
                <option value="Demi-pension">Demi-pension</option>
                <option value="Pension complète">Pension complète</option>
              </select>

              <button type="submit">Réserver</button>
            </form>
          </div>
        </div>
      ) : (
        <p>Chargement de l'hôtel...</p>
      )}
    </div>
    </>
  );
}
