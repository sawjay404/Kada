import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Zap, Star, Crown } from 'lucide-react';

const team = [
  { name: "Jay Benitez", role: "Owner", icon: <Crown size={12} />, image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Sofia Valli", role: "Manager", icon: <ShieldCheck size={12} />, image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Marcus Thorne", role: "Master", icon: <Zap size={12} />, image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Elena Rossi", role: "Colorist", icon: <Star size={12} />, image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=800" },
];

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const xTranslate = useTransform(scrollYProgress, [0, 1], [100, -200]);

  return (
    <section ref={containerRef} id="about" className="relative bg-aurora-cream py-24 lg:py-48 overflow-hidden">
      
      {/* 1. LAYERED BACKGROUND TEXT */}
      <motion.div 
        style={{ x: xTranslate }}
        className="absolute top-24 left-0 whitespace-nowrap opacity-[0.03] pointer-events-none select-none"
      >
        <span className="text-[22vw] font-serif italic text-aurora-forest tracking-tighter">
          The Artisans The Artisans
        </span>
      </motion.div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
        
        {/* 2. MASKED HEADER REVEAL */}
        <div className="mb-16 lg:mb-40">
          <div className="overflow-hidden mb-4">
            <motion.p 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-aurora-sage text-[9px] md:text-[10px] font-black uppercase tracking-[0.6em] md:tracking-[1em]"
            >
              The Collective
            </motion.p>
          </div>
          
          <div className="overflow-hidden">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="text-aurora-forest text-4xl md:text-[clamp(4rem,8vw,8rem)] font-serif leading-[0.9] md:leading-[0.85] tracking-tighter"
            >
              Crafting Your <br />
              <span className="italic font-extralight text-aurora-sage/60">Modern Identity.</span>
            </motion.h2>
          </div>
        </div>

        {/* 3. SNAPPY GRID - Changed to grid-cols-2 for mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {team.map((member, i) => (
            <TeamCard key={i} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

const TeamCard = ({ member, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      viewport={{ once: true }}
      className="group relative"
    >
      {/* IMAGE CONTAINER */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-white border border-white/40 shadow-sm transition-all duration-700 group-hover:shadow-2xl">
        <motion.img 
          src={member.image} 
          alt={member.name}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0"
        />
        
        {/* OVERLAY REVEAL (Hidden on touch devices usually, active on hover) */}
        <div className="absolute inset-0 bg-gradient-to-t from-aurora-forest/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 md:p-8">
            <p className="text-white/80 text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                View Bio
            </p>
            <div className="w-8 md:w-12 h-[1px] bg-white/40 translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-75" />
        </div>
      </div>

      {/* TEXT INFO */}
      <div className="mt-4 md:mt-8 flex flex-col md:flex-row justify-between items-start px-1 md:px-4 gap-2">
        <div className="text-left">
          <div className="flex items-center gap-1.5 text-aurora-sage mb-1 md:mb-2">
            <span className="p-1 md:p-1.5 rounded-full bg-white shadow-sm scale-75 md:scale-100">{member.icon}</span>
            <span className="text-[7px] md:text-[9px] font-black uppercase tracking-widest">{member.role}</span>
          </div>
          <h4 className="text-aurora-forest text-lg md:text-2xl font-serif italic leading-none whitespace-nowrap">
            {member.name.split(' ')[0]} <br className="md:hidden" /> {member.name.split(' ')[1]}
          </h4>
        </div>
        
        <motion.div 
          whileHover={{ rotate: 45, backgroundColor: "#0E2D29", color: "#ffffff" }}
          className="hidden md:flex w-10 h-10 rounded-full border border-aurora-forest/10 items-center justify-center text-aurora-forest transition-all"
        >
          <ArrowUpRight size={18} />
        </motion.div>
      </div>
    </motion.div>
  );
};