import { ExecutiveCard, SectionTitle, Button } from '../ui';

const members = [
  { image: "/president.JPG", name: 'Nana Agyekum Boateng', title: 'President' },
  { image: "/vp.jpeg", name: 'Derrick Kello Junior', title: 'Vice President' },
  { image: "/gensec.JPG", name: 'Lily Tugbah', title: 'General Secretaty' },
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
            <ExecutiveCard key={m.name} image={m.image} name={m.name}  title={m.title}/>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button variant="primary" href="/executives" className='rounded-lg' showArrow>
            View All Executives
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Executives;


