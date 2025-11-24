import aboutImg from '../../assets/images/about_img.png';


const Hero = () => {
  return (
    <section
      className="relative bg-cover bg-center text-white min-h-screen flex items-center"
      style={{ backgroundImage: `url(${aboutImg})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="w-full px-6 md:px-12 lg:px-24 xl:px-32 2xl:px-48 py-20 relative z-10">
        <div className="flex flex-col items-start text-left gap-8 md:gap-10 mt-32 md:mt-40">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight max-w-5xl">About the College of Science</h1>
          <p className="text-2xl md:text-3xl lg:text-4xl text-[#D1D5DC] leading-relaxed max-w-4xl">
            Leading scientific education and research in Ghana for over 70 years
          </p>

        </div>
      </div>
    </section>
  );
};

export default Hero;


