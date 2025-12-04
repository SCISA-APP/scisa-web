import Hero from "../components/sections/AboutHero";
import aboutstoryImg from "../assets/images/about_story.png";
import researchClimateImg from "../assets/images/research-climate.jpg";
import researchDataImg from "../assets/images/research-data.jpg";
import researchMaterialsImg from "../assets/images/research-materials.jpg";
import excellenceIcon from "../assets/images/excellence.png";
import impactIcon from "../assets/images/impact.png";
import innovationIcon from "../assets/images/innovation.png";
import integrityIcon from "../assets/images/integrity.png";
import { ValuesCard } from "../components/ui/ValuesCard";
import { ResearchCard } from "../components/ui/ResearchCard";
import { StatCard } from "../components/ui/StatCard";
import { ScrollAnimationWrapper } from "../components/ui/ScrollAnimationWrapper";


function About() {
  return (
    <main className="flex-1 ">
      <Hero />
      <div className="flex mt-16 mb-24 px-6 md:px-12 lg:px-24 xl:px-32 2xl:px-48 flex-col md:flex-row md:items-start md:justify-center gap-8">
        <ScrollAnimationWrapper animation="fade-up" delay={0} className="flex-1">
          <div className="p-8 gap-4 md:gap-6 bg-[#F9FAFB] transform transition-all duration-500 hover:scale-105 hover:shadow-lg">
            <h1 className="text-3xl">Our Mission</h1>
            <p className="mt-2 text-lg text-gray-600">
              To provide world-class education in the sciences, conduct cutting-edge research that addresses societal challenges, and produce graduates who are critical thinkers, innovative problem-solvers, and ethical leaders in their fields.
            </p>
          </div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper animation="fade-up" delay={200} className="flex-1">
          <div className="p-8 gap-4 md:gap-6 bg-[#F9FAFB] transform transition-all duration-500 hover:scale-105 hover:shadow-lg">
            <h1 className="text-3xl">Our Vision</h1>
            <p className="mt-2 text-lg text-gray-600">
              To be the leading center of scientific excellence in Africa, recognized globally for innovative research, quality education, and impactful contributions to sustainable development and technological advancement.          </p>
          </div>
        </ScrollAnimationWrapper>
      </div>

      <div className="flex mb-24 px-6 md:px-12 lg:px-24 xl:px-32 2xl:px-48 flex-col md:flex-row md:items-start md:justify-start gap-20">
        <ScrollAnimationWrapper animation="fade-right" delay={0} className="flex-1 md:flex-[1.5]">
          <div>
            <h1 className="text-4xl">Our Story</h1>
            <p className="mt-2 text-lg text-gray-600 max-w-2xl">
              The College of Science at Kwame Nkrumah University of Science and Technology was established in 1952, making it one of the oldest and most prestigious science colleges in West Africa.
              Named after Ghana's first president, Dr. Kwame Nkrumah, our institution was founded on the principles of academic excellence and nation-building through science and technology.
            </p>
            <p className="mt-2 text-lg text-gray-600 max-w-2xl">
              Over the decades, we have evolved from a small college with a handful of students to a thriving community of over 3,000 students and 200 faculty members.
              Our alumni have gone on to become leaders in academia, industry, government, and entrepreneurship, both in Ghana and around the world.
            </p>
            <p className="mt-2 text-lg text-gray-600 max-w-2xl">
              Today, the College of Science continues to push boundaries in research and innovation, with six departments offering undergraduate
              and graduate programs in Computer Science, Mathematics, Physics, Chemistry, Biochemistry, and Statistics.
            </p>
          </div>
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper animation="fade-left" delay={200} className="flex-1">
          <div>
            <img src={aboutstoryImg} alt="Our Story" className="transition-transform duration-500 hover:scale-105" />
          </div>
        </ScrollAnimationWrapper>

      </div>


      <div className="mt-16 mb-24 px-6 md:px-12 lg:px-24 xl:px-32 2xl:px-48 bg-[#F9FAFB]">
        <ScrollAnimationWrapper animation="fade-up" delay={0}>
          <div className="mb-12 text-center mt-32">
            <h1 className="text-4xl">Our Core Values</h1>
            <p className="mt-2 text-lg text-gray-600 text-center">The principles that guide everything we do</p>
          </div>
        </ScrollAnimationWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ScrollAnimationWrapper animation="scale-up" delay={100}>
            <ValuesCard
              icon={excellenceIcon}
              title="Excellence"
              description="We strive for the highest standards in teaching, research, and service"
              className="text-center"
            />
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper animation="scale-up" delay={200}>
            <ValuesCard
              icon={innovationIcon}
              title="Innovation"
              description="We foster creativity and embrace new ideas, technologies."
              className="text-center"
            />
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper animation="scale-up" delay={300}>
            <ValuesCard
              icon={integrityIcon}
              title="Integrity"
              description="We uphold honesty, transparency, and ethical conduct in all we do."
              className="text-center"
            />
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper animation="scale-up" delay={400}>
            <ValuesCard
              icon={impactIcon}
              title="Impact"
              description="We create knowledge that transforms lives and communities"
              className="text-center"
            />
          </ScrollAnimationWrapper>
        </div>
      </div> 

      <div className="mb-24 px-6 md:px-12 lg:px-24 xl:px-32 2xl:px-48">
        <ScrollAnimationWrapper animation="fade-up" delay={0}>
          <div className="mb-12 text-center mt-32">
            <h1 className="text-4xl">Our Journey</h1>
            <p className="mt-2 text-lg text-gray-600 text-center">Key milestones in our history</p>
          </div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper animation="fade-right" delay={100}>
          <div className="flex flex-col md:flex-row md:items-start md:justify-start gap-20 mb-12">
            <h1 className="text-primary text-4xl min-w-[120px]">1952</h1>
            <div className="">
              <h3 className="text-3xl mb-4">College Established</h3>
              <p className="text-gray-600">Founded as part of KNUST with a vision for scientific excellence</p>
            </div>
          </div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper animation="fade-right" delay={200}>
          <div className="flex flex-col md:flex-row md:items-start md:justify-start gap-20 mb-12">
            <h1 className="text-primary text-4xl min-w-[120px]">1975</h1>
            <div className="">
              <h3 className="text-3xl mb-4">Research Center Launch</h3>
              <p className="text-gray-600">Opened state-of-the-art research facilities</p>
            </div>
          </div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper animation="fade-right" delay={300}>
          <div className="flex flex-col md:flex-row md:items-start md:justify-start gap-20 mb-12">
            <h1 className="text-primary text-4xl min-w-[120px]">1995</h1>
            <div className="">
              <h3 className="text-3xl mb-4">International Recognition</h3>
              <p className="text-gray-600">Ranked #1 Science College in Ghana</p>
            </div>
          </div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper animation="fade-right" delay={400}>
          <div className="flex flex-col md:flex-row md:items-start md:justify-start gap-20 mb-12">
            <h1 className="text-primary text-4xl min-w-[120px]">2020</h1>
            <div className="">
              <h3 className="text-3xl mb-4">Innovation Hub</h3>
              <p className="text-gray-600">Launched technology and innovation incubator</p>
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>

      <div className="bg-black py-20 md:py-24">
        <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCard value={3000} label="Students" delay={100} />
          <StatCard value={200} label="Faculty Members" delay={200} />
          <StatCard value={50} label="Research Labs" delay={300} />
          <StatCard value={15000} label="Alumni Worldwide" delay={400} />
        </div>
      </div>

      <div className="mb-24 px-6 md:px-12 lg:px-24 xl:px-32 2xl:px-48">
        <ScrollAnimationWrapper animation="fade-up" delay={0}>
          <div className="mb-12">
            <h1 className="text-4xl text-center mb-6 mt-32">Research Focus Areas</h1>
            <p className="mt-2 text-lg text-gray-600 text-center">
              We are advancing knowledge in critical areas that shape our future
            </p>
          </div>
        </ScrollAnimationWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ScrollAnimationWrapper animation="fade-up" delay={100}>
            <ResearchCard
              image={researchClimateImg}
              title="Climate & Environmental Science"
              description="Researching sustainable solutions for environmental challenges in Ghana and Africa"
            />
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper animation="fade-up" delay={200}>
            <ResearchCard
              image={researchDataImg}
              title="Data Science & AI"
              description="Developing intelligent systems and analyzing data to solve complex problems"
            />
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper animation="fade-up" delay={300}>
            <ResearchCard
              image={researchMaterialsImg}
              title="Materials & Nanotechnology"
              description="Innovating new materials for industrial and medical applications"
            />
          </ScrollAnimationWrapper>
        </div>
      </div>
     
    </main>
  );
}

export default About;


