import Hero from "../components/sections/AboutHero";
import aboutstoryImg from "../assets/images/about_story.png";


function About() {
  return (
    <main className="flex-1 ">
      <Hero />
      <div className="flex mt-16 mb-24 px-6 md:px-12 lg:px-24 xl:px-32 2xl:px-48 flex-col md:flex-row md:items-start md:justify-center">
        <div className=" p-8 pr-8 mr-8 gap-4 md:gap-6 bg-[#F9FAFB]">
          <h2 className="text-3xl ">Our Mission</h2>
          <p className="mt-2 text-lg text-gray-600 max-w-md">
            To provide world-class education in the sciences, conduct cutting-edge research that addresses societal challenges, and produce graduates who are critical thinkers, innovative problem-solvers, and ethical leaders in their fields.
          </p>
        </div>

        <div className=" p-8 pr-8 mr-8 gap-4 md:gap-6 bg-[#F9FAFB]">
          <h2 className="text-3xl ">Our Vision</h2>
          <p className="mt-2 text-lg text-gray-600 max-w-md">
            To be the leading center of scientific excellence in Africa, recognized globally for innovative research, quality education, and impactful contributions to sustainable development and technological advancement.          </p>
        </div>
      </div>

      <div className="flex mb-24 px-6 md:px-12 lg:px-24 xl:px-32 2xl:px-48 flex-col md:flex-row md:items-start md:justify-start gap-20">
        <div>
          <h1 className="text-4xl ">Our Story</h1>
          <p className="mt-2 text-lg text-gray-600 max-w-md">
            The College of Science at Kwame Nkrumah University of Science and Technology was established in 1952, making it one of the oldest and most prestigious science colleges in West Africa. 
            Named after Ghana's first president, Dr. Kwame Nkrumah, our institution was founded on the principles of academic excellence and nation-building through science and technology.
          </p>
          <p className="mt-2 text-lg text-gray-600 max-w-md">
            Over the decades, we have evolved from a small college with a handful of students to a thriving community of over 3,000 students and 200 faculty members. 
            Our alumni have gone on to become leaders in academia, industry, government, and entrepreneurship, both in Ghana and around the world.
          </p>
          <p className="mt-2 text-lg text-gray-600 max-w-md">
            Today, the College of Science continues to push boundaries in research and innovation, with six departments offering undergraduate
            and graduate programs in Computer Science, Mathematics, Physics, Chemistry, Biochemistry, and Statistics.
          </p>
        </div>
        <div>
            <img src={aboutstoryImg} alt="Our Story" />
          </div>
      </div>
     
    </main>
  );
}

export default About;


