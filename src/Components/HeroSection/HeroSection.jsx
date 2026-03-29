import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Instagram, Facebook, MessageCircle, Quote } from 'lucide-react';

const HeroSection = () => {
  return (
    <section 
      id="home" 
      className="relative h-[85vh] md:h-[90vh] mt-[90px] lg:mt-[116px] flex items-center overflow-hidden bg-[#F5F5E9]"
    >
      {/* 1. BACKGROUND */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="jersey.png" 
          alt="Aurora Salon Interior"
          className="w-full h-full object-cover object-right md:object-[center_35%]"
        />
        <div className="absolute inset-0 bg-black/30 md:bg-black/20 z-[1]" />
      </motion.div>

      {/* 2. MAIN CONTENT */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 w-full">
        <div className="max-w-3xl text-center md:text-left select-none">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-[clamp(3.2rem,9vw,5.5rem)] font-serif leading-[0.9] mb-4 drop-shadow-2xl"
          >
            Elevate Your <br className="md:hidden" /> Beauty.
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white text-[clamp(1.8rem,4.5vw,3.5rem)] font-serif italic font-light leading-tight mb-8 drop-shadow-xl"
          >
            Transform Your Well-being.
          </motion.h2>
          
          <div className="flex flex-col md:items-start items-center">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white text-[16px] md:text-lg max-w-sm md:max-w-md mb-10 leading-relaxed font-medium drop-shadow-md"
            >
              Discover the 2026 standard in luxury hair care and holistic spa therapies at Aurora.
            </motion.p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-14 py-5 bg-white text-[#004B4D] text-[12px] font-black uppercase tracking-[0.2em] rounded-full shadow-2xl transition-all"
            >
              Explore Services
            </motion.button>
          </div>
        </div>
      </div>

      {/* 3. THE COMMAND CLUSTER - Increased SVG Font Size */}
      <div className="absolute top-12 md:top-auto md:bottom-12 right-0 lg:right-12 z-50 flex flex-col items-center gap-6 md:gap-8 scale-90 md:scale-110">
        <div className="relative w-28 h-28 lg:w-40 lg:h-40 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              <defs>
                <path id="badgePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
              </defs>
              {/* Increased font-size from 7.5px to 9px for better readability */}
              <text className="text-[9px] font-bold uppercase tracking-[0.15em] fill-white drop-shadow-lg">
                <textPath xlinkHref="#badgePath">
                  • Jersey City • New Jersey • EST 2026 • Aurora Salon • 
                </textPath>
              </text>
            </svg>
          </motion.div>
          <div className="w-3 h-3 bg-[#9CAF88] rounded-full shadow-[0_0_15px_#9CAF88]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center gap-7 py-8 px-5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl"
        >
          <a href="#" className="text-white hover:text-[#9CAF88] transition-all hover:scale-125">
            <Instagram size={22} />
          </a>
          <a href="#" className="text-white hover:text-[#9CAF88] transition-all hover:scale-125">
            <Facebook size={22} />
          </a>
          <a href="#" className="text-white hover:text-[#9CAF88] transition-all hover:scale-125">
            <MessageCircle size={22} />
          </a>
        </motion.div>
      </div>

      {/* 4. ENHANCED TRUST BAR - Boosted Font Sizes */}
      <div className="absolute bottom-0 left-0 w-full z-20">
        <div className="max-w-[1440px] mx-auto md:px-6 lg:px-12">
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="bg-white/95 backdrop-blur-md flex flex-col md:flex-row items-stretch px-10 py-10 md:px-14 md:py-0 rounded-t-[3rem] border-t border-white/20 shadow-2xl w-full md:w-fit"
          >
            <div className="hidden sm:flex items-center pr-12 border-b md:border-b-0 md:border-r border-[#004B4D]/10 py-8 md:my-10">
              <div className="mr-5 text-aurora-sage opacity-50">
                <Quote size={24} fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="text-[#004B4D] text-[12px] font-black uppercase tracking-wider leading-none">Spring Curation</span>
                <span className="text-[#9CAF88] text-[11px] font-serif italic mt-2">Sculpting & Solar Tones</span>
              </div>
            </div>

            <div className="flex justify-around md:justify-start items-center gap-10 md:gap-16 md:px-12 py-6 md:py-12">
              <StatCounter label="Master Stylists" target={12} />
              <div className="hidden md:block w-[1px] h-12 bg-[#004B4D]/10" />
              <StatCounter label="Curated Rituals" target={25} />
              <div className="hidden md:block w-[1px] h-12 bg-[#004B4D]/10" />
              <StatCounter label="Studio Awards" target={8} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const StatCounter = ({ label, target }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, target, { duration: 2.5, delay: 1.5, ease: [0.16, 1, 0.3, 1] });
    return controls.stop;
  }, [count, target]);

  return (
    <div className="flex flex-col items-center md:items-start">
      <div className="flex items-baseline">
        <motion.span className="text-[#004B4D] font-serif text-4xl md:text-6xl leading-none tracking-tighter">
          {rounded}
        </motion.span>
        <span className="text-[#004B4D] font-serif text-2xl ml-1 opacity-50">+</span>
      </div>
      <span className="text-[#004B4D] text-[11px] font-black uppercase tracking-[0.1em] mt-3 whitespace-nowrap">
        {label}
      </span>
    </div>
  );
};

export default HeroSection;