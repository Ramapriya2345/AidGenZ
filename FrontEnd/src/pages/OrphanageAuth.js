import { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

const OrphanageAuth = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    phoneNo: "",
    profileImage: null,
    proof: null,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const apiUrl = isRegister ? "http://localhost:5000/api/orphanage/register" : "http://localhost:5000/api/orphanage/login";
    let formDataToSend;

    if (isRegister) {
      formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key !== "profileImage" && key !== "proof") {
          formDataToSend.append(key, formData[key]);
        }
      });
      const images = [formData.profileImage, formData.proof];
      images.forEach((image, index) => {
        if (image) {
          formDataToSend.append("images", image);
        }
      });
    } else {
      formDataToSend = {
        email: formData.email,
        password: formData.password,
      };
    }

    try {
      const response = await axios.post(apiUrl, formDataToSend, {
        headers: isRegister
          ? { "Content-Type": "multipart/form-data" }
          : { "Content-Type": "application/json" },
      });
      if (!isRegister) {
        localStorage.setItem("authToken", response.data.token);
      }
      alert(response.data.message);
      navigate("/orphanage-profile");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <div className="p-4 bg-white rounded shadow-sm">
          <h2 className="text-center mb-4">
            {isRegister ? "Orphanage Register" : "Orphanage Login"}
          </h2>
          {error && <p className="text-danger text-center">{error}</p>}
          <form onSubmit={handleSubmit}>
            {isRegister && (
              <div className="mb-3">
                <input type="text" name="name" placeholder="Orphanage Name" value={formData.name} onChange={handleChange} required className="form-control" />
              </div>
            )}
            <div className="mb-3">
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="form-control" />
            </div>
            <div className="mb-3">
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="form-control" />
            </div>
            {!isRegister && (
              <div className="text-center mb-3">
                <NavLink to="/reset-password" className="text-primary">Forgot Password?</NavLink>
              </div>
            )}
            {isRegister && (
              <>
                <div className="mb-3">
                  <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required className="form-control" />
                </div>
                <div className="mb-3">
                  <input type="text" name="phoneNo" placeholder="Phone Number" value={formData.phoneNo} onChange={handleChange} required className="form-control" />
                </div>
                <div className="mb-3">
                  <input type="file" name="profileImage" onChange={handleFileChange} required className="form-control" />
                </div>
                <div className="mb-3">
                  <input type="file" name="proof" onChange={handleFileChange} required className="form-control" />
                </div>
              </>
            )}
            <button type="submit" className="btn btn-primary w-100">
              {isRegister ? "Register" : "Login"}
            </button>
          </form>
          <p className="text-center mt-3">
            {isRegister ? "Already have an account?" : "Don't have an account?"}
            <button onClick={() => setIsRegister(!isRegister)} className="btn btn-link">
              {isRegister ? "Login" : "Register"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrphanageAuth;
