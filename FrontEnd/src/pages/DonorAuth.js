import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DonorAuth = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
    phoneNo: '', // Add phoneNo field here
    profileImage: null,
  });
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(true); // True for register, False for login
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profileImage: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegistering) {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('phoneNo', formData.phoneNo); // Add phoneNo field here
      formDataToSend.append('profileImage', formData.profileImage);

      try {
        const response = await axios.post('http://localhost:5000/api/donor/register', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert(response.data.message);
        navigate('/donor-profile'); // Redirect after successful registration
      } catch (error) {
        setError(error.response?.data?.message || 'Something went wrong');
      }
    } else {
      try {
        const response = await axios.post('http://localhost:5000/api/donor/login', {
          email: formData.email,
          password: formData.password,
        });
        alert(response.data.message);
        
        // Save the JWT token in localStorage for further authenticated requests
        localStorage.setItem('authToken', response.data.token);
        
        // Redirect after successful login
        navigate('/donor-profile');
      } catch (error) {
        setError(error.response?.data?.message || 'Something went wrong');
      }
    }
  };

  const handleForgotPassword = () => {
    // Navigate to the Forgot Password page
    navigate('/reset-password');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <div className="p-4 bg-white rounded shadow-sm">
          <h2 className="text-center mb-4">{isRegistering ? 'Donor Register' : 'Donor Login'}</h2>
          {error && <p className="text-danger text-center">{error}</p>}
          <form onSubmit={handleSubmit}>
            {isRegistering && (
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
            )}
            <div className="mb-3">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            {isRegistering && (
              <>
                <div className="mb-3">
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="phoneNo"
                    placeholder="Phone Number"
                    value={formData.phoneNo}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="file"
                    name="profileImage"
                    onChange={handleFileChange}
                    required
                    className="form-control"
                  />
                </div>
              </>
            )}

            <button type="submit" className="btn btn-primary w-100">
              {isRegistering ? 'Register' : 'Login'}
            </button>
          </form>

          <p className="text-center mt-3">
            {isRegistering ? 'Already have an account?' : 'Don\'t have an account?'}
            <button onClick={() => setIsRegistering(!isRegistering)} className="btn btn-link">
              {isRegistering ? 'Login here' : 'Register here'}
            </button>
          </p>

          {/* Forgot Password button */}
          {!isRegistering && (
            <div className="text-center">
              <button onClick={handleForgotPassword} className="btn btn-link">
                Forgot Password?
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonorAuth;
