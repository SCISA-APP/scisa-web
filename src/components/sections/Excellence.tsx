import { Button } from '../ui';

const Excellence = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">
          <div className="w-full md:w-1/2 relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl" />
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=1200&q=80"
                alt="Science Lab"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl text-white">
                  <p className="font-semibold text-sm">World-Class Research Facilities</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <h4 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">About The College</h4>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6 leading-tight">
              Excellence in <span className="text-primary">Science</span> Education & Research
            </h2>
            
            <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
              <p>
                The College of Science at Kwame Nkrumah University of Science and Technology (KNUST) has been at the forefront of scientific education and research in Ghana since its establishment.
              </p>
              <p>
                Our commitment to academic excellence and innovation has produced generations of scientists, researchers, and industry leaders who are making a global impact.
              </p>
              <p>
                With state-of-the-art facilities, world-class faculty, and a vibrant research ecosystem, we provide students with the tools and opportunities to explore, discover, and innovate.
              </p>
            </div>

            <div className="mt-10 flex gap-4">
              <Button variant="primary" href="/about" showArrow className="px-8 py-4 text-base">
                Read More About Us
              </Button>
              <Button variant="secondary" href="/research" className="px-8 py-4 text-base">
                Our Research
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Excellence;


