import React from "react";
import { 
  Phone, 
  Mail, 
  Sparkles, 
  Instagram, 
  Facebook, 
  ArrowUpRight,
  Award,
  Scissors,
  MapPin
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  // Updated mapSrc to a functional Google Maps embed for Jersey City
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48389.78330045!2d-74.104212!3d40.717754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c250d225bf7623%3A0x456156ef19841f40!2sJersey%20City%2C%20NJ!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus";

  return (
    <footer className="relative">
      {/* --- SECTION 1: DEEP HUNTER GREEN --- */}
      <div className="bg-[#091413] pt-24 pb-16 px-6 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
            {/* Brand Column */}
            <div className="lg:col-span-5 space-y-10">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
                  <Sparkles size={28} className="text-[#091413]" />
                </div>
                <div className="leading-none text-left">
                  <h1 className="text-4xl font-serif italic text-white tracking-tighter">Aurora</h1>
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50 mt-2">Private Studio</p>
                </div>
              </div>

              {/* Updated text from Cavite to Jersey City */}
              <p className="text-white font-serif italic text-2xl leading-relaxed max-w-sm">
                "Where hair artistry meets quiet ritual. A bespoke sanctuary in Jersey City."
              </p>

              <div className="space-y-6 pt-4">
                <ContactItem icon={<Phone size={18}/>} label="The Line" value="(201) 227-4364" />
                <ContactItem icon={<Mail size={18}/>} label="Direct" value="hello@aurora.xyz" />
              </div>
            </div>

            {/* Clean Map Container */}
            <div className="lg:col-span-7 w-full h-[350px] lg:h-[450px] rounded-[2rem] overflow-hidden border border-white/20 relative bg-[#041a14]">
              <iframe
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(140deg) brightness(0.8) contrast(1.2)' }}
                allowFullScreen=""
                loading="lazy"
                title="Aurora Location"
                className="relative z-0 opacity-80"
              />
              <div className="absolute bottom-6 left-6 z-10 bg-[#062C22] border border-white/20 px-5 py-3 rounded-xl flex items-center gap-3 shadow-2xl">
                  <MapPin size={14} className="text-white" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">Jersey City, NJ</span>
              </div>
            </div>
          </div>

          {/* Nav Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-12 border-t border-white/10">
            <LinkGroup title="Navigation" items={['Home', 'Rituals', 'Gallery', 'Journal']} />
            <LinkGroup title="Our Services" items={['Bespoke Color', 'Sculpted Cut', 'Silk Ritual']} isSerif />
            
            <div className="space-y-6">
              <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Connect</h4>
              <div className="flex gap-4">
                {[Instagram, Facebook].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 border border-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white hover:text-[#062C22] transition-all">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-6 text-left">
              <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Status</h4>
              <div className="flex flex-col gap-4">
                  <AccoladeItem icon={<Award size={16}/>} text="Master Stylist 2026" />
                  <AccoladeItem icon={<Scissors size={16}/>} text="Luxe Certified" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- SECTION 2: SOLID STONE --- */}
      <div className="bg-[#F1F0E8] py-10 px-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-[#062C22]/40 uppercase tracking-[0.5em]">
            © {currentYear} AURORA STUDIOS — BY JAY BENITEZ
          </p>
          <div className="flex gap-12">
            <a href="#" className="text-[10px] font-black text-[#062C22]/60 uppercase tracking-[0.3em] hover:text-[#062C22] transition-colors">Privacy</a>
            <a href="#" className="text-[10px] font-black text-[#062C22]/60 uppercase tracking-[0.3em] hover:text-[#062C22] transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const ContactItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-5 group cursor-default">
    <div className="text-white/60 group-hover:text-white transition-colors">
      {icon}
    </div>
    <div className="flex flex-col text-left">
      <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">{label}</span>
      <span className="font-serif italic text-xl text-white group-hover:underline decoration-white/20 transition-all">{value}</span>
    </div>
  </div>
);

const LinkGroup = ({ title, items, isSerif }) => (
  <div className="space-y-6 text-left">
    <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">{title}</h4>
    <ul className="space-y-3">
      {items.map(item => (
        <li key={item}>
          <a href="#" className={`${isSerif ? 'font-serif italic text-lg text-white' : 'text-[10px] font-black uppercase tracking-widest text-white/60'} hover:text-white transition-all flex items-center gap-2 group`}>
            {item} {!isSerif && <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all" />}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const AccoladeItem = ({ icon, text }) => (
  <div className="flex items-center gap-3 text-white/40">
    <div className="text-white">{icon}</div>
    <span className="text-[9px] font-black uppercase tracking-[0.1em] text-white/80">{text}</span>
  </div>
);