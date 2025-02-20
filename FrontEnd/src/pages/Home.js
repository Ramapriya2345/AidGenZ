import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/Home.css";
import { useEffect, useState } from 'react';

function Home() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const wordsToRotate = [
    "Support Children's Dreams",
    "Make a Difference Today",
    "Change Lives Forever",
    "Be the Change"
  ];

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, typingSpeed);

    return () => clearInterval(ticker);
  }, [text, isDeleting]);

  const tick = () => {
    let i = loopNum % wordsToRotate.length;
    let fullText = wordsToRotate[i];
    let updatedText = isDeleting 
      ? fullText.substring(0, text.length - 1) 
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setTypingSpeed(prevSpeed => prevSpeed / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setTypingSpeed(150);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setTypingSpeed(150);
    }
  };

  return (
    <div className="home-container">
      {/* Modern Navbar */}
      <nav className="navbar navbar-expand-lg fixed-top custom-navbar">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            <span className="brand-text">Aid</span>
            <span className="brand-text-highlight">GenZ</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/about">About Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/impact">Our Impact</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/top-donors">Top Donors</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link highlight-btn" to="/donor-auth">Donate Now</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section with Animated Text */}
      <section className="hero-section text-center">
        <div className="container">
          <h1 className="display-4 fw-bold mb-4">
            <span className="static-text">Together We Can </span>
            <span className="animated-text">{text}</span>
            <span className="cursor">|</span>
          </h1>
          <p className="lead mb-5 hero-description">Join us in supporting orphanages and creating positive change in children's lives</p>
          <div className="cta-buttons">
            <Link to="/donor-auth" className="btn btn-primary btn-lg mx-2 mb-3 glow-button">Start Donating</Link>
            <Link to="/orphanage-auth" className="btn btn-outline-light btn-lg mx-2 mb-3">Orphanage Portal</Link>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="impact-section py-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="impact-card">
                <h3 className="display-4 fw-bold text-primary">1000+</h3>
                <p className="lead">Children Helped</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="impact-card">
                <h3 className="display-4 fw-bold text-primary">50+</h3>
                <p className="lead">Partner Orphanages</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="impact-card">
                <h3 className="display-4 fw-bold text-primary">5000+</h3>
                <p className="lead">Successful Donations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="categories-section py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">What You Can Donate</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="category-card">
                <i className="fas fa-tshirt mb-3"></i>
                <h4>Clothes</h4>
                <p>Provide warmth and comfort to children in need</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="category-card">
                <i className="fas fa-book mb-3"></i>
                <h4>Books</h4>
                <p>Support education and learning</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="category-card">
                <i className="fas fa-basketball-ball mb-3"></i>
                <h4>Toys</h4>
                <p>Bring joy and play into children's lives</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section text-center py-5">
        <div className="container">
          <h2 className="mb-4">Ready to Make a Difference?</h2>
          <p className="lead mb-4">Your donation can change a child's life today.</p>
          <Link to="/donor-auth" className="btn btn-primary btn-lg">Start Donating Now</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
