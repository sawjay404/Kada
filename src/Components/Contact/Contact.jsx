import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, Send, CheckCircle2, Loader2, MapPin, Calendar } from 'lucide-react';

const Contact = ({ setIsFormOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '',
    serviceType: 'Haircut & Styling',
    preferredDay: '', preferredTime: 'Morning (9AM - 12PM)',
    notes: ''
  });

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz7trtXSK4sR3RBT2kVPsKOpUdYYyN4j4cLnpAqM34eTngzwlYdwCRYUs2BJ6ChQl1u/exec";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setIsSubmitted(true);
    } catch (error) {
      alert("System busy. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="relative z-[40] bg-aurora-cream py-24 lg:py-40 overflow-hidden">
      
      {/* 1. SECTION HEADER (Clean & Airy) */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-20 lg:mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-center md:text-left"
        >
          <p className="text-aurora-sage text-[11px] font-black uppercase tracking-[1em] mb-4">Concierge</p>
          <h2 className="text-5xl md:text-8xl font-serif text-aurora-forest leading-none">
            Secure Your <span className="italic text-aurora-sage font-extralight">Moment</span>
          </h2>
          
          {/* MOBILE BUTTON (Aurora Styled) */}
          <div className="md:hidden mt-12">
             <button 
              onClick={setIsFormOpen}
              className="flex items-center justify-center gap-3 w-full bg-aurora-forest text-white px-10 py-5 rounded-full font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl active:scale-95 transition-all"
            >
              <Calendar size={16} />
              Book Ritual
            </button>
          </div>
        </motion.div>
      </div>

      {/* 2. DESKTOP LAYOUT */}
      <div className="hidden md:block max-w-[1440px] mx-auto px-6 lg:px-12 relative z-20">
        <div className="flex flex-col lg:flex-row gap-24 items-start">
          
          {/* Left: Studio Details */}
          <div className="w-full lg:w-4/12 space-y-16">
            <div className="space-y-6">
              <h3 className="text-aurora-forest text-4xl font-serif italic border-b border-aurora-sage/20 pb-6">The Sanctuary</h3>
              <p className="text-aurora-forest/60 text-lg font-light leading-relaxed">
                Located in the heart of General Trias. <br/>A private experience by appointment only.
              </p>
            </div>
            
            <div className="space-y-10">
              <ContactDetail label="The Address" value="General Trias, Cavite" icon={<MapPin size={20}/>} />
              <ContactDetail label="Direct Concierge" value="+63 (000) 000-0000" icon={<Phone size={20}/>} />
              <ContactDetail label="Digital Inquiries" value="hello@aurora.studios" icon={<Mail size={20}/>} />
            </div>
          </div>

          {/* Right: The Booking Form (Glassmorphism White) */}
          <motion.div className="w-full lg:w-8/12">
            <div className="bg-white/60 border border-white p-12 lg:p-16 rounded-[3rem] backdrop-blur-xl shadow-[0_30px_100px_rgba(0,0,0,0.05)] relative overflow-hidden">
              
              {/* Decorative Background Icon */}
              <div className="absolute -top-10 -right-10 text-aurora-sage/5 rotate-12 pointer-events-none">
                <Calendar size={300} strokeWidth={1} />
              </div>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <AuroraInput label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="JAY BENITEZ" required />
                      <AuroraInput label="Mobile Number" name="phone" value={formData.phone} onChange={handleChange} placeholder="09XX XXX XXXX" required />
                    </div>
                    
                    <AuroraInput label="Email Address" name="email" value={formData.email} onChange={handleChange} placeholder="YOUR@EMAIL.COM" type="email" required />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <AuroraInput label="Preferred Date" name="preferredDay" value={formData.preferredDay} onChange={handleChange} type="date" min={today} required />
                      
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-aurora-sage block ml-1">Preferred Time</label>
                        <select name="preferredTime" value={formData.preferredTime} onChange={handleChange} className="w-full bg-aurora-cream/40 border-b border-aurora-sage/20 py-4 text-aurora-forest outline-none focus:border-aurora-forest transition-all font-serif italic text-xl appearance-none cursor-pointer">
                          <option>Morning (9AM - 12PM)</option>
                          <option>Afternoon (12PM - 5PM)</option>
                          <option>Evening (5PM - 8PM)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-aurora-sage block ml-1">Select Ritual</label>
                      <select name="serviceType" value={formData.serviceType} onChange={handleChange} className="w-full bg-aurora-cream/40 border-b border-aurora-sage/20 py-4 text-aurora-forest outline-none focus:border-aurora-forest transition-all font-serif italic text-xl appearance-none cursor-pointer">
                        <option>Haircut & Styling</option>
                        <option>Full Color / Balayage</option>
                        <option>Signature Highlights</option>
                        <option>Luxury Keratin Ritual</option>
                        <option>The Full Aurora Experience</option>
                      </select>
                    </div>

                    <div className="space-y-3 pt-4">
                      <button 
                        disabled={isLoading} 
                        className="w-full py-6 bg-aurora-forest text-white rounded-2xl font-black uppercase tracking-[0.5em] text-[11px] hover:bg-aurora-sage transition-all duration-500 flex items-center justify-center gap-4 disabled:bg-zinc-300 shadow-xl"
                      >
                        {isLoading ? <Loader2 className="animate-spin" size={24} /> : <>Request Appointment <Send size={16} /></>}
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20 space-y-8">
                    <div className="w-24 h-24 bg-aurora-sage/10 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 size={48} className="text-aurora-sage" strokeWidth={1} />
                    </div>
                    <div>
                      <h3 className="text-aurora-forest text-5xl font-serif italic mb-4">Confirmed.</h3>
                      <p className="text-aurora-forest/60 max-w-sm mx-auto font-light">Your ritual request has been received. Our concierge will reach out to confirm your slot.</p>
                    </div>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="text-aurora-sage text-[10px] font-black uppercase tracking-widest border-b border-aurora-sage/20 pb-2 hover:text-aurora-forest hover:border-aurora-forest transition-all"
                    >
                      Submit another inquiry
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ContactDetail = ({ label, value, icon }) => (
  <div className="flex gap-6 items-start group">
    <div className="w-12 h-12 rounded-full border border-aurora-sage/20 flex items-center justify-center text-aurora-sage group-hover:bg-aurora-sage group-hover:text-white transition-all duration-500">
      {icon}
    </div>
    <div>
      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-aurora-sage/60 block mb-1">{label}</span>
      <p className="text-aurora-forest font-serif italic text-2xl">{value}</p>
    </div>
  </div>
);

const AuroraInput = ({ label, type = "text", ...props }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-aurora-sage block ml-1">{label}</label>
    <input 
      {...props} 
      type={type} 
      className="w-full bg-transparent border-b border-aurora-sage/20 py-4 text-aurora-forest placeholder:text-aurora-forest/20 outline-none focus:border-aurora-forest transition-all font-serif italic text-xl" 
    />
  </div>
);

export default Contact;