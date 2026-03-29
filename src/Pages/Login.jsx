import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycbz7trtXSK4sR3RBT2kVPsKOpUdYYyN4j4cLnpAqM34eTngzwlYdwCRYUs2BJ6ChQl1u/exec", {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ action: "LOGIN", email, password })
      });
      const data = await res.json();
      if (data.result === "success") {
        localStorage.setItem("aurora_token", data.token);
        setIsAuthenticated(true);
        navigate('/admin');
      } else {
        alert("Invalid Login");
      }
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <form onSubmit={handleLogin} className="w-full max-w-sm bg-black border border-white/10 p-10 rounded-[2rem]">
        <h1 className="text-white text-3xl font-serif italic mb-8">Admin Access</h1>
        <input type="email" placeholder="Email" className="w-full bg-zinc-900 text-white p-4 rounded-xl mb-4" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full bg-zinc-900 text-white p-4 rounded-xl mb-8" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="w-full bg-white text-black py-4 rounded-xl font-bold uppercase tracking-widest">{loading ? "Authenticating..." : "Login"}</button>
      </form>
    </div>
  );
};

export default Login;