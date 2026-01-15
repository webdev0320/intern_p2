import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header_1 from "./Componants/1_Header.jsx";
import Hero_2 from "./Componants/2_Hero.jsx";
import Trusted_3 from "./Componants/3_Trusted.jsx";
import Manage_4 from './Componants/4_Manage.jsx';
import Flexible_workforce_5 from './Componants/5_Flexible_workforce.jsx';
import CoopleHelps_6 from "./Componants/6_CoopleHelps.jsx";
import WorkforcePlanning from "./Componants/7_workforce_planning.jsx";

import SignUpModal from "./Componants/SignUp_btn";
      // Sign_up Btn
import WorkerSignUpPage from "./Componants/Sign_up/Worker_signUp.jsx";
import HirerSignUpPage from "./Componants/Sign_up/Hirer_SignUp.jsx";
    // Sign_in / Login Btn
import Worker_login from "./Componants/Sign_in/Worker_login.jsx"; 
import Hirer_login from "./Componants/Sign_in/Hirer_login.jsx";
import FindWork from "./pages/FindWork.jsx";
import EmpDashboard from "./pages/EmpDashboard.jsx";
import HirerDashboard from "./pages/HirerDashboard.jsx";
import Feedbacks from "./pages/Feedbacks";
import Followers from "./pages/Followers";
import Following from "./pages/Following";
import WorkHistory from "./pages/WorkHistory";
import EmpProfile from "./pages/EmpProfile";
import HirerProfile from "./pages/HirerProfile";
import Settings from "./pages/Settings";
import Services from "./pages/Services";
import EmpServices from "./pages/EmpServices";
import BottomNavigation from "./Componants/BottomNavigation";
import EmpFindWork from "./pages/EmpFindWork.jsx"
import PostAJob from "./pages/PostAJob.jsx";
import "./App.css";


function HomePage() {
  return (
    <>
      <Hero_2 />
      <Trusted_3 />
      <Manage_4 />
      <Flexible_workforce_5 />
      <CoopleHelps_6 />
      <WorkforcePlanning />
    </>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    setIsLoggedIn(!!user_id);
  }, []);

  return (
    <Router basename="/intern_p2">
      <div className="min-h-screen">
        <Header_1 open={profileOpen} setOpen={setProfileOpen} />

        <main className="pt-16">
          <Routes>
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
            <Route path="/work-history" element={<WorkHistory />} />
            <Route path="/emp-profile" element={<EmpProfile />} />
            <Route path="/hirer-profile" element={<HirerProfile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/services" element={<Services />} />
            <Route path="/employee-services" element={<EmpServices />} />
          </Routes>
        </main>

        {/* show only when logged in */}
        {isLoggedIn && <BottomNavigation setProfileOpen={setProfileOpen} />}
      </div>
    </Router>
  );
}

export default App;
