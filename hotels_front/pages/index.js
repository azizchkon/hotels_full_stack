import { useEffect } from "react";
import Link from "next/link";
import styles from  "../styles/index.css";
import Navbar from '../components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css"; 

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone ,faSmile} from '@fortawesome/free-solid-svg-icons';
import { faWallet, faHeadset, faLock, faStore } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
export default function Home() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <>
      <Navbar/>

      <section id="slider">
  <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img src="/images/35440.jpg" className="d-block w-100" />
        <div className="carousel-caption d-none d-md-block">
          <div className="caption-content">
            <h5>omra</h5>
            <p>Découvrez les PRIX OMRA TUNISIE 2025, profitez des Offres TunisieBooking avec facilité de paiement. Service VIP, Conseil & Assistance au long de Sejou..</p>
          </div>
        </div>
      </div>
      <div className="carousel-item">
        <img src="/images/R.jpg" className="d-block w-100"/>
        <div className="carousel-caption d-none d-md-block">
          <div className="caption-content">
            <h5>sud tunisie</h5>
            <p>Admirez la splendeur de l’Oasis du Sahara tunisien avec Sud Tunisie. des excursions & des circuits a carte pas cher.</p>
          </div>
        </div>
      </div>
      <div className="carousel-item">
        <img src="/images/chebika-tozeur.jpg" className="d-block w-100"  />
        <div className="carousel-caption d-none d-md-block">
          <div className="caption-content">
            <h5>Sahara douz</h5>
            <p>Réservez Sahara Douz, Douz. Sans frais de réservation. Réservez votre Last Minute Hôtel en ligne. Réservez en ligne, payez à l'hôtel.</p>
          </div>
        </div>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
</section>
<section className="reasons">
  <h2>Les Bonnes Raisons de faire appel à nous</h2>
  <div className="reason">
    <FontAwesomeIcon icon={faWallet} className="icon" />
    <h3>Meilleur Prix Garanti</h3>
    <p>Hôtel, voyage, billet d'avion...</p>
  </div>
  <div className="reason">
    <FontAwesomeIcon icon={faHeadset} className="icon" />
    <h3>Service Clients</h3>
    <p>à votre écoute 7j/7</p>
  </div>
  <div className="reason">
    <FontAwesomeIcon icon={faLock} className="icon" />
    <h3>Paiement Sécurisé</h3>
    <p>Réservations faciles et 100% sécurisées</p>
  </div>
  <div className="reason">
    <FontAwesomeIcon icon={faStore} className="icon" />
    <h3>34 Agences</h3>
    <p>à travers la Tunisie</p>
  </div>
</section>
      <div className="container text-center my-4">
  <h2>Découvrir nos Villes</h2>
</div>

<div id="carouselExampleControls" className="carousel carousel-dark slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <div className="card-wrapper container-sm d-flex justify-content-around">
      
        <div className="card" style={{ width: '18rem' }}>
          <img
            src="/images/OSK.jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Djerba</h5>
            <p className="card-text">L’île Djerba est l’une des destinations touristiques les plus prisées de la Tunisie. Elle est située au Sud du pays, dans le golfe de Gabès.</p>
            <a href="#" className="btn btn-primary">Découvrir</a>
          </div>
        </div>
        <div className="card" style={{ width: '18rem' }}>
          <img
            src="/images/tunis.webp"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">tunis</h5>
            <p className="card-text">Tunis est la capitale de la Tunisie et la plus grande ville du pays. Elle est située sur le golfe de Tunis, dans la mer Méditerranée, et est considérée comme le centre culturel, politique et économique de la Tunisie.</p>
            <a href="#" className="btn btn-primary">Découvrir</a>
          </div>
        </div>
        <div className="card" style={{ width: '18rem' }}>
          <img
            src="/images/sousse.jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">sousse</h5>
            <p className="card-text">Sousse est une ville portuaire de l'Est de la Tunisie, située à 143 kilomètres au sud de Tunis, et ouverte sur le golfe d'Hammamet (mer Méditerranée). Capitale du Sahel tunisien </p>
            <a href="#" className="btn btn-primary">Découvrir</a>
          </div>
        </div>
      </div>
    </div>
    <div className="carousel-item">
      <div className="card-wrapper container-sm d-flex justify-content-around">
        <div className="card" style={{ width: '18rem' }}>
          <img src="/images/OIP.jpg" className="card-img-top"/>
          <div className="card-body">
            <h5 className="card-title">Monastir</h5>
            <p className="card-text">Monastir est une ville côtière du Sahel tunisien, au centre-est de la Tunisie, située sur une presqu'île au sud-est du golfe d'Hammamet, à une vingtaine de kilomètres à l'est de Sousse et à 162</p>
            <a href="#" className="btn btn-primary">Découvrir</a>
          </div>
        </div>
        <div className="card" style={{ width: '18rem' }}>
          <img
            src="/images/h.jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Hammamet</h5>
            <p className="card-text">Hammamet est une ville tunisienne située au nord-est, sur la côte sud-est du cap Bon, à une soixantaine de kilomètres au sud de Tunis. Rattachée au gouvernorat de Nabeul</p>
            <a href="#" className="btn btn-primary">Découvrir</a>
          </div>
        </div>
        <div className="card" style={{ width: '18rem' }}>
          <img
            src="images/Zarzis.jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">zarzis</h5>
            <p className="card-text">Découvrez Zarzis, une ville riche en histoire, culture et paysages. Visitez ses musées, ses plages, ses monuments et ses marchés, et profitez de ses activités nautiques et de ses spécialités locales.</p>
            <a href="#" className="btn btn-primary">Découvrir</a>
          </div>
        </div>
      </div>
    </div>
</div>
  <button
    className="carousel-control-prev"
    type="button"
    data-bs-target="#carouselExampleControls"
    data-bs-slide="prev"
  >
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button
    className="carousel-control-next"
    type="button"
    data-bs-target="#carouselExampleControls"
    data-bs-slide="next"
  >
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
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



  );

    </>
  );
}