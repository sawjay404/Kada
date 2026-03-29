import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Calendar, LogOut, Search, Loader2, 
  Clock, Trash2, CheckCircle2, Edit3, Save, X, Phone, Mail, FileText, History
} from 'lucide-react';

const AdminDashboard = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null); 
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState('client-inbox'); 
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz7trtXSK4sR3RBT2kVPsKOpUdYYyN4j4cLnpAqM34eTngzwlYdwCRYUs2BJ6ChQl1u/exec";

  const formatScheduleDate = (dateString) => {
    if (!dateString || dateString === "N/A" || dateString === "Any Day") return { day: '--', month: '---', weekday: 'Any' };
    const date = new Date(dateString);
    if (isNaN(date)) return { day: '??', month: 'Date', weekday: '---' }; 
    return {
      day: date.getDate(),
      month: date.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
      weekday: date.toLocaleString('en-US', { weekday: 'short' })
    };
  };

  const getTimeAgo = (timestamp) => {
    if (!timestamp) return "N/A";
    const now = new Date();
    const bookedAt = new Date(timestamp);
    const diffInSeconds = Math.floor((now - bookedAt) / 1000);
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const fetchBookings = async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    try {
      const response = await fetch(SCRIPT_URL);
      const data = await response.json();
      setBookings(data); // Raw data from script
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    const interval = setInterval(() => fetchBookings(true), 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("aurora_token");
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleUpdateData = async (rowIndex) => {
    setActionLoading(rowIndex);
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          action: "UPDATE",
          rowIndex: rowIndex,
          service: editFormData.service,
          preferredDay: editFormData.preferredDay,
          preferredTime: editFormData.preferredTime,
          notes: editFormData.notes
        })
      });
      setBookings(prev => prev.map(b => b.rowIndex === rowIndex ? { ...editFormData } : b));
      setEditingId(null);
    } finally { setActionLoading(null); }
  };

  const handleConfirm = async (rowIndex) => {
    setActionLoading(rowIndex);
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ action: "UPDATE", rowIndex: rowIndex, status: "CONFIRMED ✅" })
      });
      setBookings(prev => prev.map(b => b.rowIndex === rowIndex ? { ...b, status: "CONFIRMED ✅" } : b));
    } finally { setActionLoading(null); }
  };

  const handleDelete = async (rowIndex) => {
    if (!window.confirm("Delete lead?")) return;
    setActionLoading(rowIndex);
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ action: "DELETE", rowIndex: rowIndex })
      });
      setBookings(prev => prev.filter(b => b.rowIndex !== rowIndex));
    } finally { setActionLoading(null); }
  };

  // --- SORTING & FILTERING LOGIC ---
  const processedBookings = [...bookings]
    .filter(b => {
      const searchStr = `${b.name} ${b.email} ${b.phone} ${b.service}`.toLowerCase();
      const matchesSearch = searchStr.includes(searchTerm.toLowerCase());
      const isConfirmed = b.status && b.status.includes("CONFIRMED");
      return currentView === 'lead-inbox' ? (matchesSearch && isConfirmed) : (matchesSearch && !isConfirmed);
    })
    .sort((a, b) => {
      // For Client Inbox: Newest leads first (by timestamp)
      if (currentView === 'client-inbox') {
        return new Date(b.timestamp) - new Date(a.timestamp);
      }
      // For Lead Inbox: Sort by Appointment Date (Closest first)
      const dateA = new Date(a.preferredDay);
      const dateB = new Date(b.preferredDay);
      
      // Handle "Any Day" or invalid dates (push to bottom)
      const isValidA = !isNaN(dateA.getTime());
      const isValidB = !isNaN(dateB.getTime());
      
      if (!isValidA && isValidB) return 1;
      if (isValidA && !isValidB) return -1;
      if (!isValidA && !isValidB) return 0;
      
      return dateA - dateB; 
    });

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-900 text-sm">
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen">
        <div className="p-8 font-black text-xl italic text-slate-900 uppercase tracking-tighter tracking-widest">
          AURORA <span className="text-cyan-600">STUDIOS</span>
        </div>
        <nav className="flex-1 px-6 space-y-2">
          <button onClick={() => setCurrentView('client-inbox')} className={`flex items-center gap-4 w-full p-4 rounded-2xl font-bold transition ${currentView === 'client-inbox' ? 'bg-cyan-50 text-cyan-600' : 'text-slate-400 hover:bg-slate-50'}`}>
            <LayoutDashboard size={20} /> Client Inbox
          </button>
          <button onClick={() => setCurrentView('lead-inbox')} className={`flex items-center gap-4 w-full p-4 rounded-2xl font-bold transition ${currentView === 'lead-inbox' ? 'bg-cyan-50 text-cyan-600' : 'text-slate-400 hover:bg-slate-50'}`}>
            <Calendar size={20} /> Lead Inbox
          </button>
        </nav>
        <div className="p-6">
          <button onClick={handleSignOut} className="flex items-center gap-3 w-full p-4 text-red-500 hover:bg-red-50 rounded-2xl font-bold transition">
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 capitalize tracking-tight">{currentView.replace('-', ' ')}</h1>
            <p className="text-slate-500 font-medium tracking-tight">
              {currentView === 'lead-inbox' ? "Viewing upcoming confirmed appointments" : "Reviewing new booking requests"}
            </p>
          </div>
          <button onClick={() => fetchBookings()} className="bg-white border border-slate-200 p-3 rounded-xl shadow-sm hover:shadow-md transition-all">
            <Loader2 size={20} className={loading ? "animate-spin text-cyan-600" : "text-slate-400"} />
          </button>
        </header>

        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8 border-b flex justify-between items-center bg-white">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-2.5 text-slate-300" size={18} />
              <input type="text" placeholder="Search name, service, or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-cyan-500/10 transition-all" />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-100">
                <tr>
                  <th className="p-6">Client Info</th>
                  <th className="p-6">Booked At</th>
                  <th className="p-6">Service</th>
                  <th className="p-6">Appointment Schedule</th>
                  <th className="p-6">Notes</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {processedBookings.map((b) => {
                  const sched = formatScheduleDate(b.preferredDay);
                  return (
                    <tr key={b.rowIndex} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="p-6">
                        <div className="font-bold text-slate-900 text-base leading-tight">{b.name}</div>
                        <div className="flex flex-col gap-1 mt-1 text-slate-400 text-xs font-medium">
                          <span className="flex items-center gap-1.5"><Phone size={12} className="text-cyan-500/50"/> {b.phone}</span>
                          <span className="flex items-center gap-1.5"><Mail size={12} className="text-cyan-500/50"/> {b.email}</span>
                        </div>
                      </td>

                      <td className="p-6">
                        <span className="flex items-center gap-1.5 text-emerald-600 font-black text-[10px] bg-emerald-50 px-2 py-1 rounded-md w-fit uppercase">
                          <History size={12}/> {getTimeAgo(b.timestamp)}
                        </span>
                      </td>

                      <td className="p-6">
                        <span className="px-3 py-1 bg-slate-900 text-white rounded-lg font-bold text-[10px] uppercase tracking-tighter">
                          {b.service}
                        </span>
                      </td>

                      <td className="p-6">
                        {editingId === b.rowIndex ? (
                          <div className="flex flex-col gap-1">
                            <input className="border rounded px-2 py-1 text-xs outline-cyan-500" value={editFormData.preferredDay} onChange={e => setEditFormData({...editFormData, preferredDay: e.target.value})} />
                            <input className="border rounded px-2 py-1 text-xs outline-cyan-500" value={editFormData.preferredTime} onChange={e => setEditFormData({...editFormData, preferredTime: e.target.value})} />
                          </div>
                        ) : (
                          <div className="flex items-center gap-4">
                            <div className="flex flex-col items-center justify-center min-w-[50px] bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                              <div className="bg-cyan-600 w-full text-center text-[9px] font-black text-white py-0.5">{sched.month}</div>
                              <div className="text-lg font-black text-slate-900 leading-tight py-1">{sched.day}</div>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-slate-400 text-[10px] font-black uppercase tracking-tight">{sched.weekday}</span>
                              <div className="flex items-center gap-1.5 text-slate-700 font-bold text-xs bg-slate-100 px-2 py-1 rounded-lg mt-1">
                                <Clock size={12} className="text-cyan-600" /> {b.preferredTime}
                              </div>
                            </div>
                          </div>
                        )}
                      </td>

                      <td className="p-6 max-w-[200px]">
                        {editingId === b.rowIndex ? (
                          <textarea className="border rounded px-2 py-1 text-xs w-full h-16 outline-cyan-500 font-sans" value={editFormData.notes} onChange={e => setEditFormData({...editFormData, notes: e.target.value})} />
                        ) : (
                          <div className="text-slate-500 text-xs italic leading-relaxed border-l-2 border-slate-200 pl-3">
                            {b.notes || "No extra instructions."}
                          </div>
                        )}
                      </td>

                      <td className="p-6 text-right">
                        <div className="flex justify-end gap-2">
                          {editingId === b.rowIndex ? (
                            <>
                              <button onClick={() => handleUpdateData(b.rowIndex)} className="text-emerald-600 p-2 hover:bg-emerald-50 rounded-lg">
                                {actionLoading === b.rowIndex ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>}
                              </button>
                              <button onClick={() => setEditingId(null)} className="text-slate-400 p-2 hover:bg-slate-50 rounded-lg"><X size={18}/></button>
                            </>
                          ) : (
                            <>
                              {currentView === 'client-inbox' && (
                                <button onClick={() => handleConfirm(b.rowIndex)} className="bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white px-4 py-2 rounded-xl font-black text-[11px] uppercase transition-all shadow-sm">
                                  {actionLoading === b.rowIndex ? "..." : "Confirm"}
                                </button>
                              )}
                              <button onClick={() => { setEditingId(b.rowIndex); setEditFormData(b); }} className="p-2 text-slate-300 hover:text-cyan-600 transition-all"><Edit3 size={18}/></button>
                              <button onClick={() => handleDelete(b.rowIndex)} className="p-2 text-slate-300 hover:text-red-500 transition-all"><Trash2 size={18}/></button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;