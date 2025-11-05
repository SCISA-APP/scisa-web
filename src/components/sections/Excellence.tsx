import { Button } from '../ui';

const Excellence = () => {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary">Excellence in Science Education</h2>
          <p className="text-sm md:text-base text-text-secondary mt-4 leading-relaxed">
            The College of Science at Kwame Nkrumah University of Science and Technology (KNUST) has been at the forefront of scientific education and research in Ghana since its establishment. Our commitment to academic excellence and innovation has produced generations of scientists, researchers, and industry leaders.
          </p>
          <p className="text-sm md:text-base text-text-secondary mt-4 leading-relaxed">
            With state-of-the-art facilities, world-class faculty, and a vibrant research ecosystem, we provide students with the tools and opportunities to explore, discover, and innovate.
          </p>
          <div className="mt-6">
            <Button variant="primary" href="/about" showArrow>
              Read More About Us
            </Button>
          </div>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=1200&q=80"
            alt="Science Lab"
            className="w-full h-[320px] md:h-[360px] object-cover rounded-md"
          />
        </div>
      </div>
    </section>
  );
};

export default Excellence;


