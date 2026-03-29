import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Receipt } from 'lucide-react';

const Services = ({ setIsFormOpen }) => {
  const [selectedServices, setSelectedServices] = useState([]);

  const services = [
    { id: '01', title: 'Precision Sculpting', price: 125, description: 'Tailored dry-cutting or wet-sculpting.', image: '/Image2.jpg' },
    { id: '02', title: 'Aurora Color', price: 240, description: 'Hand-painted balayage or precision foiling.', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1000' },
    { id: '03', title: 'Molecular Repair', price: 85, description: 'Deep-tissue hair repair technology.', image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?q=80&w=1000' },
    { id: '04', title: 'Editorial Blowout', price: 75, description: 'High-glamour blowout for events.', image: '/image3.jpg' }
  ];

  const toggleService = (service) => {
    setSelectedServices(prev => 
      prev.find(s => s.id === service.id) 
        ? prev.filter(s => s.id !== service.id) 
        : [...prev, service]
    );
  };

  const totalPrice = selectedServices.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <section id="services" className="relative z-[100] bg-aurora-cream py-24 lg:py-40 overflow-hidden">
      
      {/* 1. CINEMATIC WATERMARK BACKGROUND */}
      <div className="absolute top-20 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03] select-none">
        <motion.h2 
          initial={{ x: '10%' }}
          whileInView={{ x: '-10%' }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
          className="text-[15rem] md:text-[25rem] font-serif italic text-aurora-forest whitespace-nowrap"
        >
          Aurora Rituals Aurora Rituals
        </motion.h2>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
        
        {/* 2. THE EDITORIAL BANNER */}
        <div className="mb-16 lg:mb-32">
          <motion.div 
            initial={{ opacity: 0, tracking: "0.2em" }}
            whileInView={{ opacity: 1, tracking: "0.8em" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-aurora-sage text-[clamp(10px,1.2vw,14px)] font-black uppercase mb-6"
          >
            Investment Menu
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-aurora-forest text-[clamp(3rem,10vw,9rem)] font-serif leading-[0.85]"
            >
              Our <span className="italic font-light">Services</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="max-w-xs text-aurora-sage font-medium text-xs md:text-sm leading-relaxed border-l border-aurora-sage/30 pl-6 mb-4"
            >
              A curated collection of bespoke hair therapies designed for the modern aesthetic.
            </motion.p>
          </div>
        </div>

        {/* 3. STAGGERED SERVICES GRID - Adjusted for 2 cols on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
          {services.map((service, index) => {
            const isSelected = selectedServices.find(s => s.id === service.id);
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                /* Keeps staggered look on desktop, removes it on mobile for clean 2x2 */
                className={`flex flex-col group cursor-pointer ${index % 2 !== 0 ? 'lg:mt-16' : ''}`}
                transition={{ delay: index * 0.1 }}
                onClick={() => toggleService(service)}
              >
                <motion.div
                  whileHover={{ y: -10 }}
                  className={`relative transition-all duration-700 p-3 md:p-5 rounded-t-[2rem] md:rounded-t-[3rem] rounded-b-[4rem] md:rounded-b-[7rem] border-2 
                    ${isSelected ? 'bg-aurora-forest border-aurora-forest shadow-2xl' : 'bg-white/50 border-transparent hover:bg-white/80 shadow-xl'}`}
                >
                  {/* Image Container */}
                  <div className="aspect-[4/5] overflow-hidden rounded-t-[1.5rem] md:rounded-t-[2.5rem] rounded-b-[3.5rem] md:rounded-b-[6.5rem] mb-4 md:mb-8 shadow-lg">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className={`w-full h-full object-cover transition-all duration-1000 
                        ${isSelected ? 'grayscale-0 scale-110' : 'grayscale-[80%] group-hover:grayscale-0 group-hover:scale-105'}`}
                    />
                  </div>

                  {/* Content */}
                  <div className="text-center px-1 pb-6 md:pb-10">
                    <h3 className={`font-serif text-lg md:text-2xl mb-1 transition-colors duration-500 ${isSelected ? 'text-white' : 'text-aurora-forest'}`}>
                      {service.title.split(' ')[0]} <br className="md:hidden" /> {service.title.split(' ')[1]}
                    </h3>
                    <p className={`text-[9px] md:text-[11px] uppercase tracking-[0.1em] md:tracking-[0.2em] font-bold mb-4 md:mb-8 transition-colors duration-500 ${isSelected ? 'text-white/60' : 'text-aurora-sage'}`}>
                      ${service.price}
                    </p>
                    
                    <div className={`mx-auto w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-700 shadow-lg
                      ${isSelected ? 'bg-white text-aurora-forest rotate-[135deg]' : 'bg-aurora-forest text-white group-hover:bg-aurora-sage'}`}
                    >
                      <Plus size={16} />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* 4. REFINED ESTIMATE CALCULATOR */}
        <AnimatePresence>
          {selectedServices.length > 0 && (
            <motion.div 
              initial={{ y: 100, x: "-50%", opacity: 0 }}
              animate={{ y: 0, x: "-50%", opacity: 1 }}
              exit={{ y: 100, x: "-50%", opacity: 0 }}
              className="fixed bottom-6 md:bottom-10 left-1/2 z-[200] w-[95%] max-w-md"
            >
              <div className="bg-aurora-forest/95 backdrop-blur-2xl text-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-2xl border border-white/10">
                <div className="flex justify-between items-center mb-4 md:mb-6 border-b border-white/10 pb-4 md:pb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <Receipt size={16} className="text-aurora-sage" />
                    </div>
                    <div>
                      <span className="block font-black uppercase tracking-[0.2em] text-[8px] md:text-[10px]">Your Selections</span>
                      <span className="text-[9px] md:text-[10px] text-white/40">{selectedServices.length} Rituals Added</span>
                    </div>
                  </div>
                  <button onClick={() => setSelectedServices([])} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <X size={18} />
                  </button>
                </div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[8px] md:text-[10px] text-white/50 uppercase font-black tracking-widest mb-1 md:mb-2">Total Investment</p>
                    <p className="text-2xl md:text-4xl font-serif">${totalPrice}</p>
                  </div>
                  <button 
                    onClick={() => setIsFormOpen(selectedServices)}
                    className="bg-white text-aurora-forest px-6 md:px-10 py-3 md:py-5 rounded-full font-black uppercase text-[9px] md:text-[11px] tracking-[0.15em] md:tracking-[0.2em] hover:bg-aurora-sage hover:text-white transition-all"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Services;