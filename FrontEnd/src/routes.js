import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarDonor from "./components/NavbarDonor";
import NavbarOrphanage from "./components/NavbarOrphanage";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import OrphanageAuth from "./pages/OrphanageAuth";
import DonorAuth from "./pages/DonorAuth";
import DonorList from "./pages/DonorList";
import ProfileDonor from "./pages/ProfileDonor";
import ProfileOrphanage from "./pages/ProfileOrphanage";
import RequestedDonations from "./pages/RequestedDonations";
import RequestDonation from "./pages/RequestDonation";
import DonationsThread from "./pages/DonationsThread";
import DonorProfile from "./pages/DonorProfile";
import TopDonors from "./pages/TopDonors"; // Import TopDonors Page
import ProtectedRoute from "./components/ProtectedRoute";
import About from "./pages/About";
import CompleteDonationPage from "./pages/CompleteDonationPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword"; // Import ResetPassword Page
import WhatsAppNotifications from "./pages/WhatsAppNotifications"; // Add this import

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Home page does not have a Navbar */}
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />
        
        {/* Add WhatsApp Notifications Route */}
        <Route path="/whatsapp-notifications" element={<WhatsAppNotifications />} />

        {/* Auth Pages */}
        <Route path="/orphanage-auth" element={<OrphanageAuth />} />
        <Route path="/donor-auth" element={<DonorAuth />} />

        {/* Donor Pages */}
        <Route
          path="/donor-profile"
          element={
            <ProtectedRoute>
              <NavbarDonor />
              <ProfileDonor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donate"
          element={
            <ProtectedRoute>
              <NavbarDonor />
              <DonorList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/requested-donations"
          element={
            <ProtectedRoute>
              <NavbarDonor />
              <RequestedDonations />
            </ProtectedRoute>
          }
        />

        {/* Orphanage Pages */}
        <Route
          path="/orphanage-profile"
          element={
            <ProtectedRoute>
              <NavbarOrphanage />
              <ProfileOrphanage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donations-thread"
          element={
            <ProtectedRoute>
              <NavbarOrphanage />
              <DonationsThread />
            </ProtectedRoute>
          }
        />
        <Route
          path="/request-donation"
          element={
            <ProtectedRoute>
              <NavbarOrphanage />
              <RequestDonation />
            </ProtectedRoute>
          }
        />

        {/* New Route for Viewing Donor Profile */}
        <Route
          path="/donor-profile/:donorId"
          element={
            <ProtectedRoute>
              <NavbarOrphanage />
              <DonorProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/complete-donation/:donationId"
          element={
            <ProtectedRoute>
              <NavbarOrphanage />
              <CompleteDonationPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reset-password/:token" // Add route for reset password with token parameter
          element={<ResetPassword />}
        />

        <Route
          path="/reset-password" // Add route for reset password with token parameter
          element={<ForgotPassword />}
        />


        {/* New Route for Top Donors Page */}
        <Route path="/top-donors" element={<TopDonors />} />
      </Routes>

      {/* Footer for all routes */}
      <Footer />
    </Router>
  );
}

export default AppRoutes;
