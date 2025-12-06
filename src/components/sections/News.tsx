import { Button } from '../ui';

const items = [
  {
    image: 'https://images.unsplash.com/photo-1529101091764-c3526daf38fe?w=600&q=80',
    category: 'Research',
    title: 'New Grant Awarded to COS Research Team',
    date: 'Oct 12, 2025',
    href: '/news/grant-awarded',
  },
  {
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
    category: 'Event',
    title: 'Annual Science Fair Highlights Innovations',
    date: 'Sep 30, 2025',
    href: '/news/science-fair',
  },
  {
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&q=80',
    category: 'Student Life',
    title: 'Freshers Welcome Week Announced',
    date: 'Sep 15, 2025',
    href: '/news/freshers-welcome',
  },
];

const News = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="flex justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h4 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">Latest Updates</h4>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">News & Events</h2>
          </div>
          <Button variant="secondary" href="/news" className="hidden md:flex">View All News</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((n) => (
            <a key={n.title} href={n.href} className="group block">
              <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/3]">
                <img 
                  src={n.image} 
                  alt={n.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary uppercase tracking-wide">
                  {n.category}
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-sm text-text-muted flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  {n.date}
                </div>
                <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors leading-tight">
                  {n.title}
                </h3>
                <div className="flex items-center text-sm font-medium text-text-secondary group-hover:text-primary transition-colors">
                  Read Article 
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
           <Button variant="secondary" href="/news">View All News</Button>
        </div>
      </div>
    </section>
  );
};

export default News;


