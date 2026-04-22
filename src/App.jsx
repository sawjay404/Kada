import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { supabase } from "./Lib/SupabaseClient"

// Pages - Admin
import AdminLogin from './Pages/Admin/Adminlogin';
import AdminDashboard from './Pages/Admin/Dashboard';

// Pages - User
import UserRegister from './Pages/User/UserRegister';
import UserLogin from './Pages/User/UserLogin';
import UserDashboard from './Pages/User/Dashboardpages/UserDashboard';

// Pages - User Dashboard Sub-pages
import ProfilePage from './Pages/User/Dashboardpages/ProfilePage';
import BookingsPage from './Pages/User/Dashboardpages/BookingsPage';
import WalletPage from './Pages/User/Dashboardpages/WalletPage';
import OrdersPage from './Pages/User/Dashboardpages/OrdersPage';
import AddressesPage from './Pages/User/Dashboardpages/AddressesPage';
import SubscriptionsPage from './Pages/User/Dashboardpages/SubscriptionsPage';
import AccountPage from './Pages/User/Dashboardpages/AccountPage';

// Pages - General
import Home from './Pages/Home';

// Components
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import FormModal from './Components/Form/FormModal';

const App = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [preselectedRituals, setPreselectedRituals] = useState([]);
  
  // Auth states
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [session, setSession] = useState(null); 
  const [loading, setLoading] = useState(true); 

  const location = useLocation();

  useEffect(() => {
    const checkSession = async () => {
      const timeout = new Promise((resolve) => setTimeout(resolve, 3000));
      const getSession = supabase.auth.getSession();
      const result = await Promise.race([getSession, timeout]);
      
      if (result && result.data) {
        setSession(result.data.session);
      }
      setLoading(false);
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    const adminToken = localStorage.getItem("aurora_admin_token");
    if (adminToken) setIsAdminAuthenticated(true);

    return () => subscription.unsubscribe();
  }, []);

  const hideWebsiteLayout = location.pathname.startsWith('/admin') || 
                            location.pathname.startsWith('/user-dashboard') || 
                            location.pathname === '/login' || 
                            location.pathname === '/user-login' ||
                            location.pathname === '/register';

  const openForm = (rituals = []) => {
    setPreselectedRituals(rituals); 
    setShowPopup(true);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      Loading...
    </div>
  );

  return (
    <div className={`relative min-h-screen font-sans antialiased ${hideWebsiteLayout ? 'bg-white' : 'bg-black text-white'}`}>
      
      {!hideWebsiteLayout && <Navbar setIsFormOpen={() => openForm()} />}
      
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Home openForm={openForm} />} />
          
          <Route 
            path="/register" 
            element={session ? <Navigate to="/user-dashboard" /> : <UserRegister />} 
          />
          <Route 
            path="/user-login" 
            element={session ? <Navigate to="/user-dashboard" /> : <UserLogin />} 
          />
          
          {/* NESTED DASHBOARD ROUTES */}
          <Route 
            path="/user-dashboard" 
            element={session ? <UserDashboard /> : <Navigate to="/user-login" />} 
          >
            <Route index element={<div className="p-6 text-gray-500">Welcome to your dashboard. Select an option from the menu.</div>} />
            
            {/* Sub-pages */}
            <Route path="profile" element={<ProfilePage />} />
            <Route path="bookings" element={<BookingsPage />} />
            <Route path="wallet" element={<WalletPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="addresses" element={<AddressesPage />} />
            <Route path="subscriptions" element={<SubscriptionsPage />} />
            <Route path="account" element={<AccountPage />} />
          </Route>
          
          <Route path="/login" element={<AdminLogin setIsAuthenticated={setIsAdminAuthenticated} />} />
          <Route 
            path="/admin" 
            element={isAdminAuthenticated ? <AdminDashboard setIsAuthenticated={setIsAdminAuthenticated} /> : <Navigate to="/login" />} 
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