import homeImg from '../../assets/images/home_img.jpg';
import { Button } from '../ui';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={homeImg} 
          alt="KNUST Campus" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      <div className="container-custom relative z-10 pt-20 pb-20 md:pb-32">
        <div className="max-w-3xl text-white">
          <div className="inline-block px-3 py-1 mb-6 border border-white/30 rounded-full backdrop-blur-md bg-white/10">
            <span className="text-sm font-medium tracking-wide uppercase">Welcome to SCISA</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-8">
            Discover Science. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Transform Your Future.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed max-w-2xl font-light">
            The College of Science at KNUST is Ghana's premier institution for scientific excellence, innovation, and discovery.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5">
            <Button variant="primary" href="/about" className="px-8 py-4 text-lg">
              Explore Departments
            </Button>
            <Button variant="secondary" href="/app" className="px-8 py-4 text-lg bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white">
              Join the Waitlist
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


