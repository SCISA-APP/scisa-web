import homeImg from '../../assets/images/home_img.jpg';
import { Button } from '../ui';

const Hero = () => {
  return (
    <section
      className="relative bg-cover bg-center text-white min-h-screen flex items-start"
      style={{ backgroundImage: `url(${homeImg})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="w-full pl-4 md:pl-6 pt-24 md:pt-44 pb-20 relative z-10">
        <div className="flex flex-col items-start text-left gap-6 md:gap-8">
          <h1 className="text-6xl md:text-7xl font-bold leading-tight tracking-tight max-w-4xl">Discover Science. Transform Your Future.</h1>
          <p className="text-xl md:text-2xl max-w-2xl leading-relaxed opacity-95">
            The College of Science at KNUST is Ghana's premier institution for scientific excellence, innovation, and discovery.
          </p>
          <div className="flex gap-4 md:gap-5 mt-2 md:mt-4 flex-wrap justify-start">
            <Button variant="primary" href="/about">Learn More</Button>
            <Button variant="secondary" href="/app">Join the Waitlist</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


