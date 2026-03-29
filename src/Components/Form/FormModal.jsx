import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Loader2, Sparkles, ChevronRight } from 'lucide-react';

const FormModal = ({ isOpen, setIsOpen }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '', phone: '', email: '',
    serviceType: 'Sculpted Cut',
    preferredDay: '', preferredTime: 'Morning (9AM - 12PM)',
    notes: ''
  });

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz2hyprIowwG9xQkFaLO0wNmfjz1flHVgyGEuJYyeSixsSDX5ZmbamO28GPmJI5NqQX/exec";

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
      console.error("Submission error:", error);
      alert("System busy. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ 
        name: '', phone: '', email: '', 
        serviceType: 'Sculpted Cut', preferredDay: '', 
        preferredTime: 'Morning (9AM - 12PM)', notes: '' 
      });
    }, 400); 
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 overflow-hidden"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop: Clear Black Overlay with Heavy Blur */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={handleClose} 
            className="absolute inset-0 bg-black/70 backdrop-blur-xl" 
          />

          {/* Modal Container: Aurora Cream Base */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 50 }} 
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full max-w-xl bg-aurora-cream border border-aurora-sage/30 rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-y-auto max-h-[90vh] no-scrollbar"
          >
            <button 
              onClick={handleClose} 
              className="absolute top-8 right-8 text-aurora-forest/30 hover:text-aurora-forest transition-colors z-50 p-2"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {!isSubmitted ? (
              <>
                <header className="mb-12 text-center">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex justify-center mb-6 text-aurora-sage"
                  >
                    <Sparkles size={32} strokeWidth={1.5} />
                  </motion.div>
                  <h2 className="text-4xl md:text-5xl font-serif text-aurora-forest mb-3 tracking-tighter text-balance">
                    Secure Your <span className="italic font-extralight text-aurora-sage">Ritual</span>
                  </h2>
                  <p className="text-aurora-sage text-[10px] font-black tracking-[0.6em] uppercase opacity-80">
                    Bespoke Artistry Awaits
                  </p>
                </header>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-aurora-forest/60 block ml-1">Full Name</label>
                    <input 
                      required 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      type="text" 
                      placeholder="Full Name" 
                      className="w-full bg-white/70 border border-aurora-sage/30 rounded-2xl px-6 py-4 text-aurora-forest placeholder:text-aurora-forest/50 outline-none focus:border-aurora-forest focus:bg-white transition-all font-medium" 
                    />
                  </div>

                  {/* Contact Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-aurora-forest/60 block ml-1">Phone</label>
                      <input 
                        required 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        type="tel" 
                        placeholder="Phone Number" 
                        className="w-full bg-white/70 border border-aurora-sage/30 rounded-2xl px-6 py-4 text-aurora-forest placeholder:text-aurora-forest/50 outline-none focus:border-aurora-forest focus:bg-white transition-all font-medium" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-aurora-forest/60 block ml-1">Email</label>
                      <input 
                        required 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        type="email" 
                        placeholder="Email Address" 
                        className="w-full bg-white/70 border border-aurora-sage/30 rounded-2xl px-6 py-4 text-aurora-forest placeholder:text-aurora-forest/50 outline-none focus:border-aurora-forest focus:bg-white transition-all font-medium" 
                      />
                    </div>
                  </div>

                  {/* Date & Time Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-aurora-forest/60 block ml-1">Preferred Date</label>
                      <input 
                        required name="preferredDay" 
                        value={formData.preferredDay} 
                        onChange={handleChange} 
                        type="date" 
                        min={today}
                        className="w-full bg-white/70 border border-aurora-sage/30 rounded-2xl px-6 py-4 text-aurora-forest outline-none focus:border-aurora-forest focus:bg-white transition-all font-medium appearance-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-aurora-forest/60 block ml-1">Preferred Time</label>
                      <div className="relative">
                        <select 
                          name="preferredTime" 
                          value={formData.preferredTime} 
                          onChange={handleChange} 
                          className="w-full bg-white/70 border border-aurora-sage/30 rounded-2xl px-6 py-4 text-aurora-forest outline-none focus:border-aurora-forest focus:bg-white transition-all font-medium cursor-pointer appearance-none"
                        >
                          <option value="Morning (9AM - 12PM)">Morning</option>
                          <option value="Afternoon (12PM - 5PM)">Afternoon</option>
                          <option value="Evening (5PM - 8PM)">Evening</option>
                        </select>
                        <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-aurora-sage pointer-events-none" size={16} />
                      </div>
                    </div>
                  </div>

                  {/* Ritual Selection */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-aurora-forest/60 block ml-1">Select Ritual</label>
                    <div className="relative">
                      <select 
                        name="serviceType" 
                        value={formData.serviceType} 
                        onChange={handleChange} 
                        className="w-full bg-white/70 border border-aurora-sage/30 rounded-2xl px-6 py-4 text-aurora-forest outline-none focus:border-aurora-forest focus:bg-white transition-all font-medium cursor-pointer appearance-none"
                      >
                        <option>Sculpted Cut</option>
                        <option>Bespoke Color / Balayage</option>
                        <option>Dimensional Highlights</option>
                        <option>Silk Keratin Treatment</option>
                        <option>Aurora Bridal Edit</option>
                      </select>
                      <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-aurora-sage pointer-events-none" size={16} />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading} 
                    className="w-full py-5 bg-aurora-forest text-white rounded-2xl font-black uppercase tracking-[0.4em] text-[11px] hover:bg-aurora-sage transition-all duration-500 flex items-center justify-center gap-3 mt-4 disabled:bg-aurora-sage/30 active:scale-[0.98] group shadow-xl shadow-aurora-forest/10"
                  >
                    {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
                      <>Request Appointment <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </button>
                </form>
              </>
            ) : (
              /* --- SUCCESS STATE --- */
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="py-16 text-center"
              >
                <div className="flex justify-center mb-8">
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15, stiffness: 200 }}
                    className="w-24 h-24 border border-aurora-sage/30 rounded-full flex items-center justify-center text-aurora-sage bg-white shadow-inner"
                  >
                    <CheckCircle2 size={48} strokeWidth={1} />
                  </motion.div>
                </div>

                <h2 className="text-4xl font-serif text-aurora-forest mb-4 tracking-tighter">
                  Request <span className="italic font-extralight text-aurora-sage">Submitted.</span>
                </h2>

                <p className="text-aurora-forest/60 font-medium text-[15px] mb-12 max-w-sm mx-auto leading-relaxed px-4">
                  We’ve received your request for a ritual. Our team will contact you shortly to 
                  <span className="text-aurora-forest font-bold"> finalize your session</span>.
                </p>

                <button 
                  onClick={handleClose} 
                  className="px-12 py-4 bg-transparent border border-aurora-forest/20 text-aurora-forest rounded-full font-black uppercase tracking-[0.4em] text-[10px] hover:bg-aurora-forest hover:text-white transition-all active:scale-95"
                >
                  Return to Studio
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FormModal;