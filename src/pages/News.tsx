import { useState } from "react";
import { Button } from "../components/ui/Button";
import { articles } from "../components/appData/appData";

function News() {

  const [selectedFilter, setSelectedFilter] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterClick = (idx: number) => {
    setSelectedFilter(idx);
    setIsDropdownOpen(false);
    setVisibleCount(6); 
    setIsExpanded(false);
  };

  const handleToggleArticles = () => {
    if (isExpanded) {
      setVisibleCount(6);
      setIsExpanded(false);
    } else {
      setVisibleCount(prev => prev + 6);
      setIsExpanded(true);
    }
  };

  const filters = ['All', 'Research', 'Awards', 'Events', 'Student Achievements', 'Academics', 'Alumni', 'Technology', 'Facilities'];

  const filteredArticles = selectedFilter === 0 ? articles : articles.filter(article => article.tag === filters[selectedFilter]);

  const displayedArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  return (
    <main className="flex-1">
      <section className="relative w-full h-[450px] md:h-[550px]">
        <img
          src="src/assets/images/news.jpg"
          alt="SCISA App"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-bg-dark/40" />
        <div className="absolute top-1/2 container-custom -translate-y-1/2 left-6 md:left-16 text-white max-w-xl">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light mb-4">
            News & Events
          </h1>
          <p className="text-sm md:text-base">
            Stay updated with the latest from the College of Science
          </p>
          <Button className="mt-6">Join the Waitlist</Button>
        </div>
      </section>

      <section className="container-custom w-full h-full my-12 lg:my-36 flex flex-col md:flex-row items-center justify-center bg-white">
        <div className="w-full lg:w-1/2">
          <div className="w-full aspect-square">
            <img
              src="src/assets/images/academics.jpg"
              alt="news app"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 md:p-6 lg:p-12 py-6">
          <div className="flex flex-col items-start justify-start w-full gap-6">
            <div className="flex items-center justify-center bg-primary gap-2 px-2 lg:px-3 py-2">
              <span className="">
                <img src="src/assets/svgs/tag.svg" />
              </span>
              <span className="text-white text-xs ">Research</span>
            </div>
            <div className="space-y-4 lg:space-y-6">
              <h3 className="text-2xl lg:text-4xl">KNUST College of Science Researchers Make Breakthrough in Renewable Energy</h3>
              <div className="flex items-center gap-2">
                <span className="size-4"><img src="src/assets/svgs/Icon-calendar.svg" className="invert opacity-50" /></span>
                <span className="text-text-secondary text-xs">October 5, 2025</span>
              </div>
              <p className="text-sm text-text-secondary">A team of researchers from the Department of Chemistry and Physics has developed a new method for improving solar cell efficiency by 35%, marking a significant advancement in renewable energy technology.</p>
              <Button>Read Full Article</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-text-muted/10 h-full py-12">
        <div className="container-custom">
          <div className="lg:hidden relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between bg-white px-4 py-3 rounded-sm text-sm"
            >
              <span>{filters[selectedFilter]}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-sm shadow-lg z-10 max-h-60 overflow-y-auto">
                {filters.map((filter, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleFilterClick(idx)}
                    className={`px-4 py-3 text-sm text-text-secondary cursor-pointer hover:bg-gray-50 ${idx === selectedFilter ? 'bg-primary text-white hover:bg-primary' : ''
                      }`}
                  >
                    {filter}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="hidden lg:flex md:gap-3 lg:gap-5 items-center justify-center">
            {filters.map((filter, idx) => {
              return (
                <span
                  onClick={() => handleFilterClick(idx)}
                  key={idx}
                  className={`flex cursor-pointer shadow-sm text-text-secondary md:px-2 lg:px-3 py-2 duration-300 rounded-sm text-sm ${idx === selectedFilter ? 'bg-primary text-white' : 'bg-white'}`}
                >
                  {filter}
                </span>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-white h-full py-12">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayedArticles.map((filteredArticle, idx) => {
            return (
              <div key={idx} className="cursor-pointer">
                <div className="">
                  <img src={filteredArticle.img} alt={filteredArticle.title} className="w-full aspect-square object-cover" />
                </div>
                <div className="space-y-2 py-3">
                  <div className="flex items-center gap-2 pt-3">
                    <span className="">
                      <img src="src/assets/svgs/tag-2.svg" />
                    </span>
                    <span className="text-primary text-xs">{filteredArticle.tag}</span>
                  </div>
                  <div className="flex flex-col gap-3 md:gap-4">
                    <h3 className="text-xl font-medium">{filteredArticle.title}</h3>
                    <span className="text-xs text-text-secondary">{filteredArticle.date}</span>
                    <p className="text-text-primary/90 text-sm">{filteredArticle.desc}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="w-full flex items-center justify-center mt-12">
          <Button
            onClick={handleToggleArticles}
            className={!hasMore && !isExpanded ? 'opacity-50 cursor-not-allowed' : ''}
          >
            {isExpanded ? 'Show Less' : hasMore ? 'Show More Articles' : 'No More Articles'}
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center w-full my-32">
          <h3 className="text-2xl">Stay informed</h3>
          <p className="text-text-secondary pt-2">Subscribe to our newsletter to receive the latest news and event updates directly in your inbox</p>
         <div className="flex items-center gap-4 mt-10">
          <input type="text" placeholder="Enter your email address" className="w-full h-12 border border-text-muted px-4" />
          <Button className="">Subscribe</Button>
         </div>
        </div>
      </section>
    </main>
  );
}

export default News;