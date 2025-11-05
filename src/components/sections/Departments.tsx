import { DepartmentCard, SectionTitle, Button } from '../ui';

const list = [
  {
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&q=80',
    title: 'Computer Science',
    description: 'Advancing computational thinking and innovation',
    href: '/departments/computer-science',
  },
  {
    image: 'https://images.unsplash.com/photo-1581092921461-1f84a5dcae0e?w=600&q=80',
    title: 'Chemistry',
    description: 'Exploring molecules, structures and reactions',
    href: '/departments/chemistry',
  },
  {
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981d?w=600&q=80',
    title: 'Physics',
    description: 'Understanding the fundamental laws of nature',
    href: '/departments/physics',
  },
  {
    image: 'https://images.unsplash.com/photo-1509223197845-458d87318791?w=600&q=80',
    title: 'Mathematics',
    description: 'Building analytical and problem-solving skills',
    href: '/departments/mathematics',
  },
];

const Departments = () => {
  return (
    <section className="py-20 md:py-24">
      <div className="container-custom">
        <SectionTitle
          title="Our Departments"
          description="Explore our diverse range of departments, each dedicated to pushing the boundaries of scientific knowledge"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
          {list.map((d) => (
            <DepartmentCard key={d.title} {...d} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button variant="secondary" href="/departments">View All Departments</Button>
        </div>
      </div>
    </section>
  );
};

export default Departments;


