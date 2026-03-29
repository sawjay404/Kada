import React from 'react';
import HeroSection from '../Components/HeroSection/HeroSection';
import Services from '../Components/Services/Services';
import Portfolio from '../Components/Portfolio/Portfolio';
import Contact from '../Components/Contact/Contact';
import About from '../Components/About/About';

const Home = ({ openForm }) => {
  return (
    <main>
      <HeroSection setIsFormOpen={openForm} />
      <Services setIsFormOpen={openForm} />
      <Portfolio setIsFormOpen={openForm} />
      <About setIsFormOpen={openForm} />
      
      {/* Passing it to Contact as 'setIsFormOpen' */}
      <Contact setIsFormOpen={openForm} />
    </main>
  );
};

export default Home;