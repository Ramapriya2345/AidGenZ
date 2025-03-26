import React, { useEffect } from "react";

const About = () => {
  useEffect(() => {
    // Trigger the animation once the component is mounted
    const elements = document.querySelectorAll('.animate__fadeInUp');
    elements.forEach((element, index) => {
      element.classList.add('animate__animated');
      setTimeout(() => {
        element.classList.add('animate__fadeInUp');
      }, index * 300); // Adding a delay to make them appear one after another
    });
  }, []);

  return (
    <div className="bg-primary text-white py-5">
      <div className="container text-center">
        <h1 className="display-4 mb-4 animate__fadeInUp">
          About Us
        </h1>
        <p className="lead mb-5 animate__fadeInUp">
          Our mission is to create a world where generosity thrives, and every orphanage has the resources they need.
        </p>

        {/* Main Info Section */}
        <div className="row justify-content-center">
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 rounded-lg overflow-hidden animate__fadeInUp">
              <div className="card-body text-center">
                <h5 className="card-title text-primary">Our Mission</h5>
                <p className="card-text">
                  We aim to bridge the gap between generous donors and orphanages in need, ensuring that the resources reach the right hands.
                </p>
                <a href="/mission-1" className="btn btn-primary mt-3">Learn More</a>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 rounded-lg overflow-hidden animate__fadeInUp">
              <div className="card-body text-center">
                <h5 className="card-title text-primary">Our Vision</h5>
                <p className="card-text">
                  We envision a world where no orphanage is left behind, and where people come together to support children in need through simple, effective donations.
                </p>
                <a href="/vision" className="btn btn-primary mt-3">Learn More</a>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 rounded-lg overflow-hidden animate__fadeInUp">
              <div className="card-body text-center">
                <h5 className="card-title text-primary">Our Values</h5>
                <p className="card-text">
                  We believe in transparency, trust, and the power of collective action. Every donation counts, and every child deserves a brighter future.
                </p>
                <a href="/values" className="btn btn-primary mt-3">Learn More</a>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-5">
          <h2 className="display-4 mb-4 animate__fadeInUp">
            Join Us in Making a Difference
          </h2>
          <p className="lead text-light mb-5 animate__fadeInUp">
            Together, we can create lasting change in the lives of orphaned children. Get involved today and help us support orphanages across the world.
          </p>
          <a
            href="/donor-auth"
            className="btn btn-light btn-lg text-primary animate__fadeInUp"
          >
            Donate Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
