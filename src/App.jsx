import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Components
import Header_1 from "./Componants/1_Header.jsx";
import Hero_2 from "./Componants/2_Hero.jsx";
import Trusted_3 from "./Componants/3_Trusted.jsx";
import Manage_4 from './Componants/4_Manage.jsx';
import Flexible_workforce_5 from './Componants/5_Flexible_workforce.jsx';
import CoopleHelps_6 from "./Componants/6_CoopleHelps.jsx";
import WorkforcePlanning from "./Componants/7_workforce_planning.jsx";
import What_workforce from "./Componants/8_What_workforce.jsx";
import With_Coople from "./Componants/9_With_Coople.jsx";
import Flexible_talent from "./Componants/10_Flexible_talent.jsx";
import Test_Hire from "./Componants/11_Test_Hire.jsx";
import Outsource_admin from "./Componants/12_Outsource_admin.jsx";
import Latest_news from "./Componants/13_Latest_news.jsx";
import SignUpModal from "./Componants/SignUp_btn";

// Sign up / Sign in pages
import WorkerSignUpPage from "./Componants/Sign_up/Worker_signUp.jsx";
import HirerSignUpPage from "./Componants/Sign_up/Hirer_SignUp.jsx";
import Worker_login from "./Componants/Sign_in/Worker_login.jsx";
import Hirer_login from "./Componants/Sign_in/Hirer_login.jsx";

// Other pages
import FindWork from "./pages/FindWork.jsx";
import EmpDashboard from "./pages/EmpDashboard.jsx";
import HirerDashboard from "./pages/HirerDashboard.jsx";
import Feedbacks from "./pages/Feedbacks";
import Followers from "./pages/Followers";
import Following from "./pages/Following";
import WorkHistory from "./pages/WorkHistory";
import EmpWorkHistory from "./pages/EmpWorkHistory";
import EmpProfile from "./pages/EmpProfile";
import HirerProfile from "./pages/HirerProfile";
import Settings from "./pages/Settings";
import Services from "./pages/Services";
import EmpServices from "./pages/EmpServices";
import BottomNavigation from "./Componants/BottomNavigation";
import EmpFindWork from "./pages/EmpFindWork.jsx";
import PostAJob from "./pages/PostAJob.jsx";
import EmpCongratsPage from "./pages/EmpCongratsPage";
import JobDetails from "./pages/JobDetails";


import Messages from "./pages/Messages";
import Spendings from "./pages/Spendings";
import Invoices from "./pages/Invoices";
import Wallet from "./pages/Wallet";
import Resolution from "./pages/Resolution";
import FollowWorkers from "./pages/FollowWorkers";
import FAQs from "./pages/FAQs";
import Support from "./pages/Support";
import About from "./pages/About";
import Invite from "./pages/Invite";
import MyEarnings from "./pages/MyEarnings";
import Sidebar from "./Componants/Sidebar.jsx";

import StripeCard from "./pages/StripeCard.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./stripe";
import Notifications from "./pages/Notifications";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import "./App.css";

/* -----------------------------
   Protected Route Component
   -----------------------------
   This wrapper checks if the user is logged in (has token/user_id)
   If not, it redirects to the home page
----------------------------- */
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Check if user is logged in
  if (!token) {
    return <Navigate to="/" replace />; // Redirect to home page if not logged in
  }
  return children; // Show the protected page if logged in
};

/* -----------------------------
   Home Page Component
   -----------------------------
   This is the landing page of the website
----------------------------- */

function HomePage() {
  return (
    <>
      <Hero_2 />
      <Trusted_3 />
      <Manage_4 />
      <Flexible_workforce_5 />
      <CoopleHelps_6 />
      <WorkforcePlanning />
      <What_workforce />
      <With_Coople />
      <Flexible_talent />
      <Test_Hire />
      <Outsource_admin />
      <Latest_news />
    </>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  /* -----------------------------
     Check if user is logged in on mount
  ----------------------------- */
  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    setIsLoggedIn(!!user_id);
  }, []);

  return (
    <Router>
      <div className="min-h-screen">
        {/* Header */}
        <Header_1 open={profileOpen} setOpen={setProfileOpen} />

        <main className="pt-16">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpModal />} />
            <Route path="/signup/worker" element={<WorkerSignUpPage />} />
            <Route path="/signup/hirer" element={<HirerSignUpPage />} />
            <Route path="/login/worker" element={<Worker_login />} />
            <Route path="/login/hirer" element={<Hirer_login />} />

            <Route path="/emp-find-work" element={<EmpFindWork />} />
            <Route path="/post-job" element={<PostAJob />} />
            <Route path="/emp-dashboard" element={<EmpDashboard />} />
            <Route path="/hirer-dashboard" element={<HirerDashboard />} />
            <Route path="/feedbacks" element={<Feedbacks />} />
            <Route path="/followers" element={<Followers />} />
            <Route path="/following" element={<Following />} />

            <Route path="/emp-profile" element={<EmpProfile />} />
            <Route path="/hirer-profile" element={<HirerProfile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/services" element={<Services />} />

            {/* Protected Routes */}
            <Route path="/emp-dashboard" element={<PrivateRoute><EmpDashboard /></PrivateRoute>} />
            <Route path="/hirer-dashboard" element={<PrivateRoute><HirerDashboard /></PrivateRoute>} />
            <Route path="/feedbacks" element={<PrivateRoute><Feedbacks /></PrivateRoute>} />
            <Route path="/followers" element={<PrivateRoute><Followers /></PrivateRoute>} />
            <Route path="/following" element={<PrivateRoute><Following /></PrivateRoute>} />
            <Route path="/work-history/:type" element={<PrivateRoute><WorkHistory /></PrivateRoute>} />
            <Route path="/emp-work-history/:type" element={<PrivateRoute><EmpWorkHistory /></PrivateRoute>} />

            <Route path="/emp-profile" element={<PrivateRoute><EmpProfile /></PrivateRoute>} />
            <Route path="/hirer-profile" element={<PrivateRoute><HirerProfile /></PrivateRoute>} />
            <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
            <Route path="/employee-services" element={<PrivateRoute><EmpServices /></PrivateRoute>} />
            <Route path="/emp-find-work" element={<PrivateRoute><EmpFindWork /></PrivateRoute>} />
            <Route path="/post-job" element={<PrivateRoute><PostAJob /></PrivateRoute>} />
            <Route path="/sidebar" element={<Sidebar />} />
            <Route path="/find-worker" element={<FindWork />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/spendings" element={<Spendings />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/resolution" element={<Resolution />} />
            <Route path="/follow-workers" element={<FollowWorkers />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/support" element={<Support />} />
            <Route path="/about" element={<About />} />
            <Route path="/invite" element={<Invite />} />
            <Route path="/stripe-card" element={<StripeCard />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/sidebar" element={<PrivateRoute><Sidebar /></PrivateRoute>} />
            <Route path="/find-worker" element={<PrivateRoute><FindWork /></PrivateRoute>} />
            <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
            <Route path="/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />
            <Route path="/my-spendings" element={<PrivateRoute><Spendings /></PrivateRoute>} />
            <Route path="/invoices" element={<PrivateRoute><Invoices /></PrivateRoute>} />
            <Route path="/wallet" element={<PrivateRoute><Wallet /></PrivateRoute>} />
            <Route path="/resolution" element={<PrivateRoute><Resolution /></PrivateRoute>} />
            <Route path="/follow-workers" element={<PrivateRoute><FollowWorkers /></PrivateRoute>} />
            <Route path="/faqs" element={<PrivateRoute><FAQs /></PrivateRoute>} />
            <Route path="/support" element={<PrivateRoute><Support /></PrivateRoute>} />
            <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
            <Route path="/invite" element={<PrivateRoute><Invite /></PrivateRoute>} />
            <Route path="/employer-congrats-page" element={<PrivateRoute><EmpCongratsPage /></PrivateRoute>} />
            <Route path="/job-details/:offerId" element={<PrivateRoute><JobDetails /></PrivateRoute>} />
            <Route path="/earnings" element={<PrivateRoute><MyEarnings /></PrivateRoute>} />
          </Routes>
        </main>

        {/* Bottom Navigation: show only when logged in */}
        {isLoggedIn && <BottomNavigation setProfileOpen={setProfileOpen} />}
      </div>
    </Router>
  );
}

export default App;
