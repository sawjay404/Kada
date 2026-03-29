import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import AdminDashboard from './Pages/Admin/Dashboard';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import FormModal from './Components/Form/FormModal';

const App = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [preselectedRituals, setPreselectedRituals] = useState([]);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const location = useLocation();

  // Check for session on load to prevent logout on refresh
  useEffect(() => {
    const token = localStorage.getItem("aurora_token");
    if (token) setIsAuthenticated(true);
    setIsCheckingAuth(false);
  }, []);

  // Hides website components if URL is /login or /admin
  const hideWebsiteLayout = location.pathname === '/login' || location.pathname.startsWith('/admin');

  const openForm = (rituals = []) => {
    setPreselectedRituals(rituals); 
    setShowPopup(true);
  };

  if (isCheckingAuth) return null;

  return (
    // Dynamic theme: Website is bg-black, Admin is bg-white
    <div className={`relative min-h-screen font-sans antialiased ${hideWebsiteLayout ? 'bg-white' : 'bg-black text-white'}`}>
      
      {!hideWebsiteLayout && <Navbar setIsFormOpen={() => openForm()} />}
      
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Home openForm={openForm} />} />
          
          <Route 
            path="/login" 
            element={<Login setIsAuthenticated={setIsAuthenticated} />} 
          />
          
          <Route 
            path="/admin" 
            element={
              isAuthenticated ? (
                <AdminDashboard setIsAuthenticated={setIsAuthenticated} /> 
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
        </Routes>
      </main>

      {!hideWebsiteLayout && <Footer setIsFormOpen={() => openForm()} />}
      
      {!hideWebsiteLayout && (
        <FormModal 
          isOpen={showPopup} 
          setIsOpen={setShowPopup} 
          preselectedService={preselectedRituals} 
        />
      )}
    </div>
  );
}

export default App;