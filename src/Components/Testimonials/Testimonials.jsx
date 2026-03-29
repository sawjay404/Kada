import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: "Sarah J.",
    role: "Homeowner",
    text: "Wavy transformed our green swamp into paradise in 48 hours.",
    stars: 5,
    img: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    name: "Mark T.",
    role: "Prop. Manager",
    text: "Reliable and professional. They handle our entire HOA complex.",
    stars: 5,
    img: "https://i.pravatar.cc/150?u=mark"
  },
  {
    name: "Jessica A.",
    role: "Client",
    text: "The weekly plan is worth every penny. Haven't touched a chemical in months!",
    stars: 5,
    img: "https://i.pravatar.cc/150?u=jess"
  }
];

const Testimonials = () => {
  return (
    <section 
      id="reviews" 
      className="py-16 md:py-32 bg-[#f8fafc] scroll-mt-32"
    >
      <div className="container mx-auto px-4 md:px-16 max-w-7xl">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-28 gap-6 text-center md:text-left">
          <div className="w-full md:w-auto">
            <span className="text-[#06b6d4] font-black uppercase tracking-[0.4em] text-[10px] md:text-sm block mb-3 md:mb-4">
              Real Stories
            </span>
            <h2 className="text-4xl md:text-8xl font-black text-slate-900 uppercase tracking-tighter leading-[0.9] md:leading-[0.85]">
              Trusted by <br /> <span className="text-[#06b6d4]">The Neighbors</span>
            </h2>
          </div>
          
          {/* Rating Badge - Scaled for Mobile */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 md:gap-6 bg-white px-6 py-4 md:px-10 md:py-8 rounded-2xl md:rounded-[3rem] shadow-xl md:shadow-2xl shadow-slate-200/50 border border-slate-100"
          >
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} className="md:w-7 md:h-7" fill="currentColor" />)}
            </div>
            <div className="leading-none border-l border-slate-100 pl-4 md:pl-6">
                <p className="font-black text-slate-900 text-xl md:text-3xl tracking-tighter">4.9/5</p>
                <p className="font-bold text-slate-400 text-[8px] md:text-[10px] uppercase tracking-[0.2em] mt-1">Google Rating</p>
            </div>
          </motion.div>
        </div>

        {/* Reviews Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-12">
          {reviews.map((review, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white p-5 md:p-14 rounded-[2rem] md:rounded-[3.5rem] relative shadow-lg hover:shadow-2xl transition-all group flex flex-col border border-transparent hover:border-slate-100
                ${index === 2 ? 'col-span-2 md:col-span-1' : 'col-span-1'}
              `}
            >
              <Quote 
                className="absolute top-4 right-4 md:top-10 md:right-10 text-slate-50 group-hover:text-cyan-50 transition-colors duration-500 w-8 h-8 md:w-16 md:h-16" 
              />
              
              <div className="flex text-yellow-400 mb-4 md:mb-10">
                {[...Array(review.stars)].map((_, i) => (
                  <Star key={i} size={12} className="md:w-5 md:h-5" fill="currentColor" />
                ))}
              </div>

              <p className="relative z-10 text-slate-800 font-bold text-xs md:text-2xl leading-relaxed mb-6 md:mb-12 italic">
                "{review.text}"
              </p>

              <div className="flex items-center gap-3 md:gap-6 mt-auto">
                <div className="relative shrink-0">
                    <div className="absolute inset-0 bg-[#06b6d4] rounded-lg md:rounded-[1.25rem] rotate-12 group-hover:rotate-0 transition-transform duration-500"></div>
                    <img 
                      src={review.img} 
                      alt={review.name} 
                      className="relative w-10 h-10 md:w-20 md:h-20 rounded-lg md:rounded-[1.25rem] object-cover border-2 md:border-4 border-white shadow-lg"
                    />
                </div>
                <div className="text-left">
                  <h4 className="font-black text-slate-900 uppercase tracking-tighter text-[10px] md:text-xl leading-none">
                    {review.name}
                  </h4>
                  <p className="text-[#06b6d4] font-black text-[7px] md:text-xs uppercase tracking-widest mt-1 md:mt-2">
                    {review.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Verification Footer */}
        <div className="md:hidden mt-10 text-center">
            <p className="font-bold text-slate-400 text-[9px] uppercase tracking-[0.3em]">Verified on Google Reviews</p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;