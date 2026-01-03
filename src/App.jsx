import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header_1 from "./Componants/1_Header.jsx";
import Hero_2 from "./Componants/2_Hero.jsx";
import Trusted_3 from "./Componants/3_Trusted.jsx";
import Manage_4 from './Componants/4_Manage.jsx'
import Flexible_workforce_5 from './Componants/5_Flexible_workforce.jsx'
import CoopleHelps_6 from "./Componants/CoopleHelps_6.jsx"
import SignUpModal from "./Componants/SignUp_btn";
import WorkerSignUpPage from "./Componants/Sign_up/Worker_signUp.jsx";
import HirerSignUpPage from "./Componants/Sign_up/Hirer_SignUp.jsx";
import Worker_login from "./Componants/Sign_up/Worker_login.jsx"; 
import Hirer_login from "./Componants/Sign_in/Hirer_login.jsx";
import "./App.css";

function HomePage() {
  return (
    <>
      <Hero_2 />
      <Trusted_3 />
      <Manage_4 />
      <Flexible_workforce_5 />
      <CoopleHelps_6 />
    </>
  );
}

function App() {
  return (
    <Router basename="/intern_p2">
      <div className="min-h-screen">
        <Header_1 />

        <main className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpModal />} />
            <Route path="/signup/worker" element={<WorkerSignUpPage />} />
            <Route path="/signup/hirer" element={<HirerSignUpPage />} />
            <Route path="/login/worker" element={<Worker_login />} /> {/* Works now */}
            <Route path="/login/hirer" element={<Hirer_login />} /> 
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
