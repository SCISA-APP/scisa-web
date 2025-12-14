import { SectionTitle, Button } from '../ui';

const list = [
  {
    image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=800&q=80',
    title: 'Computer Science',
    description: 'Advancing computational thinking, software engineering, and technological innovation.',
    href: '/departments/computer-science',
  },
  {
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80',
    title: 'Chemistry',
    description: 'Exploring molecular structures, chemical reactions, and material properties.',
    href: '/departments/chemistry',
  },
  {
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
    title: 'Physics',
    description: 'Understanding the fundamental laws of nature, from quantum mechanics to astrophysics.',
    href: '/departments/physics',
  },
  {
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80',
    title: 'Mathematics',
    description: 'Building analytical skills and solving complex problems through mathematical modeling.',
    href: '/departments/mathematics',
  },
];

const Departments = () => {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <SectionTitle
              title="Academic Departments"
              description="Explore our diverse range of departments, each dedicated to pushing the boundaries of scientific knowledge and research."
              centered={false}
            />
          </div>
          <Button variant="secondary" href="/departments" className="hidden md:flex">
            View All Departments
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {list.map((d) => (
            <a 
              key={d.title} 
              href={d.href}
              className="group bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={d.image} 
                  alt={d.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {d.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
                  {d.description}
                </p>
                <div className="flex items-center text-primary font-medium text-sm mt-auto">
                  Explore Department
                  <svg className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 md:hidden text-center">
           <Button variant="secondary" href="/departments">
            View All Departments
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Departments;
