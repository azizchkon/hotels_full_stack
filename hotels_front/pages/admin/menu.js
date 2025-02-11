import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminBar from "../../components/AdminBar";
import styles from "../../styles/admin.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Menu() {
    const [reservations, setReservations] = useState([]);
    const [hotels, setHotels] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/reservations', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            const data = await response.json();
            setReservations(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const confirmReservation = (id) => {
        alert('Confirmer la réservation avec l\'ID : ' + id);
    };

    const rejectReservation = async (id) => {
        if (!confirm("Voulez-vous vraiment supprimer cette réservation ?")) return;
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/reservations/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            });
    
            const responseData = await response.json();
    
            if (response.ok) {
                fetchReservations();
            } else {
                setError(responseData.message || 'Échec de la suppression');
            }
        } catch (err) {
            setError('Erreur lors de la suppression de la réservation');
        }
    };
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', options); 
    };

    return (
        <>
            <AdminBar />
            <section className="image-section">
                <h1>
                    Bienvenue sur <span className="text-success">service</span>
                    <span className="text-danger">technique</span>
                </h1>
            </section>
            <div className="cantainer">
            {!loading && reservations.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>nombre personne</th>
                            <th>Option</th>
                            <th>Date de début</th>
                            <th>Date de fin</th>
                            <th>Prix total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((reservation) => (
                            <tr key={reservation.id}>
                                <td>{reservation.nb_personne}</td>
                                <td>{reservation.option}</td>
                                <td>{formatDate(reservation.date_debut)}</td>
                                <td>{formatDate(reservation.date_fin)}</td>
                                <td>{reservation.prix_total} DT</td>
                                <td>
                                    <button 
                                        className="btn btn-success" 
                                        onClick={() => confirmReservation(reservation.id)}
                                    >
                                        Confirmer
                                    </button>
                                    <button 
                                        className="btn btn-danger" 
                                        onClick={() => rejectReservation(reservation.id)}
                                    >
                                        Rejeter
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
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
