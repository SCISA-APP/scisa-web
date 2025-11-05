import Hero from "../components/sections/Hero";
import Stats from "../components/sections/Stats";
import Excellence from "../components/sections/Excellence";
import AppPromo from "../components/sections/AppPromo";
import Departments from "../components/sections/Departments";
import News from "../components/sections/News";
import Executives from "../components/sections/Executives";
import CTA from "../components/sections/CTA";

function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Stats />
      <Excellence />
      <Departments />
      <AppPromo />   
      <Executives />
      <News />
      <CTA />
    </main>
  );
}

export default Home;


