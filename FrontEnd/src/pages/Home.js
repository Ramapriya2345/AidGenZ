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
                <Link className="nav-link whatsapp-notification-link" to="/whatsapp-notifications">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                  </svg>
                  WhatsApp Notifications
                </Link>
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
