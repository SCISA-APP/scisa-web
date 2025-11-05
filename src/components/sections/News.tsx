import { NewsCard, SectionTitle, Button } from '../ui';

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
    <section className="py-20 md:py-24 bg-gray-50">
      <div className="container-custom">
        <SectionTitle
          title="Latest News & Events"
          description="Stay updated with the latest from the College of Science"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-10">
          {items.map((n) => (
            <NewsCard key={n.title} {...n} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button variant="primary" href="/news" showArrow>
            View All News
          </Button>
        </div>
      </div>
    </section>
  );
};

export default News;


