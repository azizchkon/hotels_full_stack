import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from  "../styles/navbar.css";
export default function adminBar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); 
  }, []);

  const handleHotelsClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault(); 
      router.push("/login"); 
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
    window.location.reload();
  };

  return (
    <header>
      <div className="logo">
        <Link href="/admin/menu">
          <span className="text-success">Tunisie</span>
          <span className="text-danger">Booking</span>
        </Link>
      </div>

      <ul className="nav nav-tabs d-flex gap-3">
      <li className="nav-item">
          <Link className="nav-link" href="/admin/menu" onClick={handleHotelsClick}>
            liste des réservations
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="/admin/hotels" onClick={handleHotelsClick}>
            Hotels
          </Link>
        </li>

        {!isLoggedIn ? (
          <>
            <li className="nav-item">
              <Link className="nav-link" href="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/register">Register</Link>
            </li>
          </>
        ) : (
          <li className="nav-item">
            <button className="nav-link btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </header>
  );
}