import { ExecutiveCard, SectionTitle, Button } from '../ui';

const members = [
  { image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=300&q=80', name: 'Kofi Mensah', title: 'President' },
  { image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80', name: 'Akua Boatemaa', title: 'Vice President' },
  { image: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=300&q=80', name: 'Kwame Owusu', title: 'Treasurer' },
];

const Executives = () => {
  return (
    <section className="py-20 md:py-24">
      <div className="container-custom">
        <SectionTitle
          title="Meet Our SCISA Executives"
          description="Dedicated student leaders committed to serving the College of Science community"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-10 justify-items-center">
          {members.map((m) => (
            <ExecutiveCard key={m.name} {...m} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button variant="primary" href="/executives" showArrow>
            View All Executives
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Executives;


