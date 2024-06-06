import React from "react";
import Nav from "./partials/Nav";
import Hero from "./partials/Hero";
import About from "./partials/About";
import Tech from "./partials/Tech";
import Documentation from "./partials/Documentation";
import HompageFooter from "./partials/HompageFooter";

const Home = () => {
  return (
    <div className='min.w-[100vw] min-h-[100vh] bg-zinc-950'>
      <Nav />

      <div className='mt-16'>
        <Hero />
        <About />
        <Tech />
        <Documentation />
        <HompageFooter />
      </div>
    </div>
  );
};

export default Home;
