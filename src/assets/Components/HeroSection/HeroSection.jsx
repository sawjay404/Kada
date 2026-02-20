import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Hammer, Wrench, Paintbrush, Lightbulb, 
  ArrowRight, Menu, X, Star, Send, Instagram, Phone
} from "lucide-react";

export default function Home({ setIsFormOpen }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    { name: "Plumbing", icon: <Wrench size={28} /> },
    { name: "Electrical", icon: <Lightbulb size={28} /> },
    { name: "Painting", icon: <Paintbrush size={28} /> },
    { name: "Carpentry", icon: <Hammer size={28} /> },
  ];

  const handleOpenForm = () => {
    setShowPopup(true);
    setMobileMenuOpen(false);
    if (setIsFormOpen) setIsFormOpen(true);
  };

  return (
    <main className="relative min-h-screen bg-slate-50 flex flex-col justify-center overflow-hidden">
      
      {/* --- POPUP FORM MODAL --- */}
<AnimatePresence>
  {showPopup && (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 lg:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowPopup(false)}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-lg bg-white rounded-[3rem] p-8 lg:p-12 shadow-2xl"
      >
        <button 
          onClick={() => setShowPopup(false)}
          className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition-colors"
        >
          <X size={28} />
        </button>

        <h2 className="text-3xl font-black tracking-tighter text-slate-900 uppercase mb-2">
          Get Your <span className="text-orange-500">Quote</span>
        </h2>
        <p className="text-slate-500 font-medium mb-8">Fill in the details for your NJ home project.</p>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Name</label>
            <input type="text" placeholder="John Doe" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-900 font-bold" />
          </div>
          
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Email Address</label>
            <input type="email" placeholder="john@example.com" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-900 font-bold" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Location</label>
              <input type="text" placeholder="Jersey City" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-900 font-bold" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Address</label>
              <input type="text" placeholder="123 Main St" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-900 font-bold" />
            </div>
          </div>

          <button className="w-full py-5 bg-orange-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 shadow-xl shadow-orange-200 transition-all flex items-center justify-center gap-3 mt-4 active:scale-95">
            Send Quote Request <Send size={18} />
          </button>
        </form>
      </motion.div>
    </div>
  )}
</AnimatePresence>

      {/* --- SEO HEADER / NAVBAR --- */}
      <header>
        <nav 
          className={`fixed top-0 w-full z-[100] transition-all duration-300 px-6 py-5 ${
            isScrolled ? "bg-white/90 backdrop-blur-xl shadow-xl py-4" : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* LOGO (LEFT) */}
            <a href="/" className="flex items-center gap-3 cursor-pointer group">
              <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform">
                <Hammer size={26} fill="currentColor" />
              </div>
              <span className="text-3xl font-black tracking-tighter text-slate-900 uppercase">
                FixIt<span className="text-orange-500">Pro</span>
              </span>
            </a>

            {/* DESKTOP LINKS (CENTER) */}
            <ul className="hidden lg:flex items-center gap-10">
              {['Services', 'howitworks', 'Testimonials', 'About'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 hover:text-orange-600 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            {/* DESKTOP CTA (RIGHT) */}
            <div className="hidden lg:flex items-center gap-8">
              <div className="flex flex-col items-end border-r border-slate-200 pr-8">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">NJ Local Pro</p>
                <a href="tel:5550003494" className="text-lg font-black text-slate-900 tracking-tight hover:text-orange-500 transition-colors leading-none">
                  (555) 000-FIXIT
                </a>
              </div>
              <button 
                onClick={handleOpenForm}
                className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 hover:scale-105 transition-all active:scale-95 shadow-xl shadow-slate-300"
              >
                Book Now
              </button>
            </div>

            {/* MOBILE TOGGLE */}
            <button className="lg:hidden text-slate-900 p-2" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={32} />
            </button>
          </div>
        </nav>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-24 lg:pt-0 lg:pb-0 px-6 flex items-center min-h-[90vh]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-50 border border-orange-100 rounded-full mb-6">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
                </span>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-orange-600">Top Rated Handyman in New Jersey</span>
              </div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85] mb-8 uppercase">
                Premium Home <br />
                Repair <span className="text-orange-500 italic">Expertise.</span>
              </h1>
              
              <p className="text-slate-500 text-lg md:text-xl font-medium max-w-xl leading-relaxed mb-10">
                Providing reliable, professional handyman solutions for New Jersey homeowners. Specializing in plumbing, electrical, and master carpentry.
              </p>

              <div className="flex flex-wrap gap-6">
                <button onClick={handleOpenForm} className="px-12 py-6 bg-orange-500 text-white rounded-3xl font-black uppercase tracking-widest text-sm hover:bg-orange-600 shadow-2xl shadow-orange-200 transition-all flex items-center gap-4">
                  Request a Free Quote <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Side Cards */}
          <div className="lg:col-span-5 relative">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="grid grid-cols-2 gap-4 lg:gap-6">
              <div className="col-span-2 relative h-[350px] lg:h-[400px] rounded-[3rem] lg:rounded-[4rem] overflow-hidden shadow-2xl group">
                <img src="/fixitpro.png" alt="Handyman" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent" />
                <div className="absolute bottom-10 left-10 text-white">
                   <h2 className="text-3xl lg:text-4xl font-black tracking-tighter uppercase leading-none">Smart Home <br/> Restoration</h2>
                   <p className="text-orange-400 font-bold uppercase tracking-widest text-[10px] mt-4">Quality Guaranteed</p>
                </div>
              </div>

              {services.map((service, idx) => (
                <div key={idx} className="bg-white p-6 lg:p-8 rounded-[2.5rem] lg:rounded-[3rem] border border-slate-100 shadow-xl flex flex-col items-center justify-center text-center group hover:bg-slate-900 transition-all duration-500 cursor-pointer">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-4 lg:mb-6 group-hover:bg-white/10 transition-all">
                    {service.icon}
                  </div>
                  <h3 className="text-[10px] lg:text-xs font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-white transition-colors">{service.name}</h3>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- ELITE DARK MOBILE MENU --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.aside 
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} 
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[1000] bg-slate-950 p-8 flex flex-col justify-between"
          >
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png')` }} />
            
            <div>
              <div className="flex justify-between items-center mb-16">
                <span className="text-2xl font-black tracking-tighter uppercase text-white">FixIt<span className="text-orange-500">Pro</span></span>
                <button onClick={() => setMobileMenuOpen(false)} className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white border border-slate-800">
                  <X size={24} />
                </button>
              </div>
              <ul className="flex flex-col gap-6">
                {['Services', 'Howitworks', 'Testimonials', 'About'].map((item) => (
                  <li key={item}><a href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-5xl font-black tracking-tighter text-white uppercase hover:text-orange-500 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <a href="tel:5550003494" className="flex items-center gap-4 text-white">
                 <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center"><Phone size={18} /></div>
                 <span className="font-black tracking-widest uppercase text-sm">(555) 000-FIXIT</span>
              </a>
              <button onClick={handleOpenForm} className="w-full py-6 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-widest text-xs">Book Appointment</button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </main>
  );
}