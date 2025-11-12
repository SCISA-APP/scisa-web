import aboutImg from '../../assets/images/about_img.png';


const Hero = () => {
  return (
    <section
      className="relative bg-cover bg-center text-white min-h-screen flex items-start"
      style={{ backgroundImage: `url(${aboutImg})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="w-full pl-4 md:pl-6 pt-24 md:pt-44 pb-20 relative z-10">
        <div className="flex flex-col items-start text-left gap-6 md:gap-8 mt-20 md:mt-24">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight max-w-4xl">About the College of Science</h1>
          <p className="text-xl md:text-2xl text-[#D1D5DC] leading-relaxed ">
            Leading scientific education and research in Ghana for over 70 years
          </p>
      
        </div>
      </div>
    </section>
  );
};

export default Hero;


