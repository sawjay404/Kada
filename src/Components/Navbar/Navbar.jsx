import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, Menu, X, Instagram } from 'lucide-react';

const Navbar = ({ setIsFormOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Our Team', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <>
      <header className="fixed top-0 w-full z-[100] transition-all duration-500">
        {/* TOP BAR - High Visibility */}
        <div className="bg-[#9CAF88] py-2 px-6 lg:px-12 flex justify-end items-center gap-6 text-white border-b border-white/10">
          <a href="tel:2012274364" className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest">
            <Phone size={14} strokeWidth={2.5} /> (201) 227-4364
          </a>
          <a href="#gallery" className="hidden sm:flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest border-l border-white/20 pl-6">
            <MapPin size={14} strokeWidth={2.5} /> Jersey City, NJ
          </a>
        </div>

        {/* MAIN NAV */}
        <nav className={`bg-[#F5F5E9]/95 backdrop-blur-md transition-all duration-500 ${scrolled ? 'py-3 shadow-lg' : 'py-6'}`}>
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex justify-between items-center">
            
            <div className="flex flex-col">
              <h1 className="text-3xl font-serif tracking-[0.15em] text-[#004B4D] leading-none">AURORA</h1>
              <p className="text-[10px] tracking-[0.3em] text-[#9CAF88] font-black uppercase mt-1">Studio & Sanctuary</p>
            </div>

            {/* DESKTOP LINKS */}
            <div className="hidden xl:flex items-center gap-10">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#004B4D]/70 hover:text-[#004B4D] transition-colors">
                  {link.name}
                </a>
              ))}
            </div>

            {/* BUTTONS */}
            <div className="flex items-center gap-4">
              <button onClick={() => setIsFormOpen(true)} className="hidden md:block px-8 py-2.5 bg-[#004B4D] text-white text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-[#9CAF88] transition-all shadow-md">
                Book Now
              </button>
              
              {/* HUMBURGER BUTTON */}
              <button 
                className="xl:hidden p-2 text-[#004B4D]" 
                onClick={() => setIsOpen(true)}
              >
                <Menu size={32} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* MOBILE DRAWER OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[1001] overflow-hidden">
            {/* Dark Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#004B4D]/40 backdrop-blur-sm"
            />

            {/* Side Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-[400px] bg-[#F5F5E9] shadow-2xl p-10 flex flex-col justify-between"
            >
              {/* Close Button Inside Drawer */}
              <div className="flex justify-end">
                <button onClick={() => setIsOpen(false)} className="p-2 text-[#004B4D] hover:rotate-90 transition-transform duration-300">
                  <X size={40} strokeWidth={1} />
                </button>
              </div>

              {/* Menu Links */}
              <div className="flex flex-col gap-8 mb-auto mt-12">
                {navLinks.map((link, i) => (
                  <motion.a
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-[#004B4D] font-serif text-5xl italic border-b border-[#004B4D]/5 pb-2 hover:text-[#9CAF88] transition-colors"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              {/* Drawer Footer */}
              <div className="flex flex-col gap-6 pt-10 border-t border-[#004B4D]/10">
                <div className="flex gap-4 text-[#004B4D]">
                  <Instagram size={24} />
                  <span className="text-sm font-bold uppercase tracking-widest leading-6">@aurora.studios</span>
                </div>
                <button 
                  onClick={() => { setIsOpen(false); setIsFormOpen(true); }}
                  className="w-full py-5 bg-[#004B4D] text-white font-bold uppercase tracking-widest text-xs rounded-full shadow-lg"
                >
                  Book Appointment
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;