import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header_1 from "./Componants/Header_1.jsx";
import Hero_2 from "./Componants/Hero_2.jsx";
import Trusted_3 from "./Componants/Trusted_3.jsx";
import Manage_4 from './Componants/Manage_4.jsx'
import "./App.css";

function HomePage() {
  return (
    <>
      <Hero_2 />
      <Trusted_3 />
      <Manage_4 />
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
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
