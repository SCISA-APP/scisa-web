import { Button } from '../ui';

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
      
      <div className="container-custom relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Ready to Transform Your Future?
        </h2>
        <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Join a community of innovators, researchers, and leaders at the College of Science. Your journey to excellence starts here.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="secondary" href="/programs" className="bg-white text-primary hover:bg-gray-100 border-none px-8 py-4 text-lg shadow-lg">
            Explore Programs
          </Button>
          <Button variant="secondary" href="/contact" className="bg-transparent border border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;


