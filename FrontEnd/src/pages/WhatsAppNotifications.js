import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Home.css";

const WhatsAppNotifications = () => {
  return (
    <div className="home-container">
      {/* Navigation Bar */}
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
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mt-5 pt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg border-0">
              <div className="card-body p-5">
                <h2 className="text-center mb-4">Register for WhatsApp Notifications</h2>
                <p className="lead mb-4">
                  To receive immediate notifications about donation requests and updates,
                  please register your phone number with our WhatsApp notification system.
                </p>

                <div className="alert alert-info">
                  <strong>Note:</strong> You must complete this step before registering as a donor to receive timely updates.
                </div>

                <h4 className="mt-4">Follow these steps:</h4>
                <ol className="mt-3">
                  <li className="mb-3">
                    <strong>Go to Twilio WhatsApp Sandbox</strong>
                    <p>
                      Visit the Twilio WhatsApp Sandbox by clicking the button below:
                    </p>
                    <a 
                      href="https://www.twilio.com/docs/whatsapp/sandbox" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-primary mb-3"
                    >
                      Open Twilio WhatsApp Sandbox
                    </a>
                  </li>
                  
                  <li className="mb-3">
                    <strong>Follow the registration process on Twilio</strong>
                    <p>
                      Create an account if you don't have one, and register your phone number with Twilio.
                    </p>
                  </li>
                  
                  <li className="mb-3">
                    <strong>Save our WhatsApp number to your contacts</strong>
                    <p>
                      Save this number to your contacts: <strong>+14155238886</strong>
                    </p>
                  </li>
                  
                  <li className="mb-3">
                    <strong>Send the activation message</strong>
                    <p>
                      Open WhatsApp and send the following message to the number you just saved:
                    </p>
                    <div className="bg-light p-3 rounded">
                      <code>imagine-ability</code>
                    </div>
                  </li>
                  
                  <li>
                    <strong>Wait for confirmation</strong>
                    <p>
                      You'll receive a confirmation message once you're successfully registered.
                      After that, you're all set to receive notifications from us!
                    </p>
                  </li>
                </ol>

                <div className="text-center mt-5">
                  <Link to="/donor-auth" className="btn btn-primary btn-lg">
                    Proceed to Donor Registration
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppNotifications;
