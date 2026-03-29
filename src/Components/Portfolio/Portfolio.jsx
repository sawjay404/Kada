import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const items = [
  { id: 1, url: '/image4.jpg', category: 'Color Theory', title: 'Nordic Ice' },
  { id: 2, url: 'https://images.pexels.com/photos/3746226/pexels-photo-3746226.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'Bespoke Tints', title: 'Sunset Copper' },
  { id: 3, url: 'https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'Architecture', title: 'The Lounge' },
  { id: 4, url: 'https://images.pexels.com/photos/973401/pexels-photo-973401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'Signature Blend', title: 'Aurora Glow' },
  { id: 5, url: 'https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'Sculpting', title: 'Silk Waves' },
];

const Portfolio = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // UseSpring adds a premium, weighted feel to the scroll transition
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Updated 'x' range to ensure a smoother start and full visibility of card #5
  const x = useTransform(smoothProgress, [0, 1], ["5%", "-72%"]);
  const textX = useTransform(smoothProgress, [0, 1], ["0%", "15%"]);

  return (
    <section 
      ref={targetRef} 
      id="gallery" 
      className="relative h-[300vh] bg-aurora-cream"
    > 
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* 1. GIANT WATERMARK TEXT */}
        <motion.div 
          style={{ x: textX }}
          className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap pointer-events-none z-0"
        >
          <span className="text-[18vw] font-serif italic text-aurora-forest/[0.03] leading-none select-none">
            Aurora Studio Archives — 
          </span>
        </motion.div>

        {/* 2. SECTION HEADER */}
        <div className="absolute top-24 left-12 lg:left-24 z-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-aurora-sage text-[10px] font-black uppercase tracking-[0.8em] mb-4">
              The Gallery
            </p>
            <h2 className="text-aurora-forest text-6xl lg:text-8xl font-serif leading-none font-light tracking-tighter">
              Selected <br/>
              <span className="italic font-extralight text-aurora-sage/60">Masterpieces</span>
            </h2>
          </motion.div>
        </div>

        {/* 3. HORIZONTAL TRACK */}
        <motion.div style={{ x }} className="flex gap-16 lg:gap-24 px-12 z-10">
          {items.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </motion.div>

        {/* 4. PROGRESS INDICATOR */}
        <div className="absolute bottom-16 left-12 lg:left-24 flex items-center gap-6 z-20">
            <span className="text-aurora-forest text-[10px] font-black uppercase tracking-widest">01</span>
            <div className="w-32 h-[1px] bg-aurora-forest/10 relative">
                <motion.div 
                    style={{ scaleX: smoothProgress }} 
                    className="absolute inset-0 bg-aurora-sage origin-left" 
                />
            </div>
            <span className="text-aurora-forest text-[10px] font-black uppercase tracking-widest">
              0{items.length}
            </span>
        </div>
      </div>
    </section>
  );
};

const PortfolioCard = ({ item }) => {
  return (
    <div className="relative shrink-0 w-[400px] lg:w-[600px] group">
      {/* Image Wrap */}
      <div className="relative aspect-[3/4.5] overflow-hidden rounded-sm bg-aurora-forest/5 shadow-2xl transition-all duration-1000">
        <img 
          src={item.url} 
          alt={item.title}
          className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-[1.5s] ease-out group-hover:scale-105"
        />
        
        {/* High-End Hover Label */}
        <div className="absolute top-8 left-8">
            <span className="bg-white/90 backdrop-blur-md px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] text-aurora-forest rounded-full shadow-sm border border-aurora-cream">
                {item.category}
            </span>
        </div>
      </div>

      {/* Editorial Text Wrap */}
      <div className="mt-10 border-l border-aurora-sage/30 pl-8">
        <h3 className="text-aurora-forest text-4xl lg:text-5xl font-serif italic font-light tracking-tight leading-none">
          {item.title}
        </h3>
        <button className="mt-5 text-[10px] font-black uppercase tracking-[0.4em] text-aurora-sage flex items-center gap-3 group/btn hover:text-aurora-forest transition-colors">
            View Concept
            <div className="w-8 group-hover/btn:w-16 h-[1px] bg-aurora-sage transition-all duration-500" />
        </button>
      </div>
    </div>
  );
};

export default Portfolio;