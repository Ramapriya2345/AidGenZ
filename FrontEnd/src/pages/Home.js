import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/Home.css";  // Create a custom CSS file for the background color

function Home() {
  return (
    <div className="home-container text-center">
      {/* Minimal Navbar with Lavender-Black-White Background */}
      <nav className="navbar navbar-light custom-navbar mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">Donation System</Link>
          <div>
            <Link className="nav-link d-inline mx-2" to="/about">About Us</Link>
            <Link className="nav-link d-inline mx-2" to="/creators">Creators</Link>
            <Link className="nav-link d-inline mx-2" to="/top-donors">Top Donors</Link> {/* New link for Top Donors */}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mt-5">
        <h1>Welcome to the Donation System</h1>
        <p>Connecting donors with orphanages to make a difference.</p>

        <div className="d-flex justify-content-center mt-4">
          <Link to="/donor-auth" className="btn btn-primary mx-2">Login as Donor</Link>
          <Link to="/orphanage-auth" className="btn btn-secondary mx-2">Login as Orphanage</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
