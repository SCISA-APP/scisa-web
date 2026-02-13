import { useState } from "react";
import { Button } from "../components/ui/Button";

function News() {

  const [selectedFilter, setSelectedFilter] = useState(0);

  const handleFilterClick = (idx: number) => {
    setSelectedFilter(idx);
  };

  const filters = ['All', 'Research', 'Awards', 'Event', 'Students Achievement', 'Academics', 'Alumni', 'Technology', 'Facilities'];

  return (
    <main className="flex-1">
      <section className="relative w-full h-[450px] md:h-[550px]">
        <img
          src="src/assets/images/news.jpg"
          alt="SCISA App"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-bg-dark/40" />

        <div className="absolute top-1/2 -translate-y-1/2 left-6 md:left-16 text-white max-w-xl">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light mb-4">
            News & Events
          </h1>
          <p className="text-sm md:text-base">
            Stay updated with the latest from the College of Science
          </p>
          <Button className="mt-6">Join the Waitlist</Button>
        </div>
      </section>

      <section className="container-custom w-full h-full my-36 flex flex-col md:flex-row items-center justify-center bg-white">
        <div className="w-full md:w-1/2">
          <div className="w-full aspect-square">
            <img
              src="src/assets/images/academics.jpg"
              alt="news app"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 md:p-12 py-6">
          <div className="flex flex-col items-start justify-start w-full gap-6">
            <div className="flex items-center justify-center bg-primary gap-2 px-3 py-2">
              <span className="">
                <img src="src/assets/svgs/tag.svg" />
              </span>
              <span className="text-white">Research</span>
            </div>
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-2xl md:text-4xl">KNUST College of Science Researchers Make Breakthrough in Renewable Energy</h3>
              <div className="flex items-center gap-2">
                <span className="size-5"><img src="src/assets/svgs/Icon-calendar.svg" className="invert opacity-50" /></span>
                <span className="text-text-secondary">October 5, 2025</span>
              </div>
              <p>A team of researchers from the Department of Chemistry and Physics has developed a new method for improving solar cell efficiency by 35%, marking a significant advancement in renewable energy technology.</p>
              <Button>Read Full Article</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-text-muted/10 h-full py-12">
        <div className=" container-custom flex gap-5 items-center justify-center">
          {filters.map((filter, idx) => {
            return (
              <span onClick={() => handleFilterClick(idx)} key={idx} className={`flex px-3 py-2 duration-300 rounded-sm text-sm ${idx === selectedFilter ? 'bg-primary text-white' : ''}`}>{filter}</span>
            )
          })}
        </div>
      </section>
    </main>
  );
}

export default News;
