import React from "react";
import Nav from "./partials/Nav";
import Hero from "./partials/Hero";
import About from "./partials/About";

const Home = () => {
  return (
    <div className='min.w-[100vw] min-h-[100vh] bg-zinc-950'>
      <Nav />
      <div className='mt-16'>
        <Hero />
        <About />
      </div>
    </div>
  );
};

export default Home;
