import { SectionTitle, Button } from '../ui';

const list = [
  {
    image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&q=80',
    title: 'Physics',
    description: 'Exploring the fundamental laws of nature, from quantum mechanics to astrophysics.',
    href: '/departments/physics',
  },
  {
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80',
    title: 'Chemistry',
    description: 'Investigating molecular structures, chemical reactions, and material properties.',
    href: '/departments/chemistry',
  },
  {
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&q=80',
    title: 'Biological Science',
    description: 'Studying life in all its forms, from cells to complex ecosystems.',
    href: '/departments/biological-science',
  },
  {
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80',
    title: 'Biochemistry',
    description: 'Bridging biology and chemistry to understand life at the molecular level.',
    href: '/departments/biochemistry',
  },
  {
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80',
    title: 'Mathematics',
    description: 'Building analytical skills and solving complex problems through mathematical modelling.',
    href: '/departments/mathematics',
  },
  {
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    title: 'Actuarial Science',
    description: 'Applying mathematics and statistics to assess and manage financial risk.',
    href: '/departments/actuarial-science',
  },
  {
    image: 'https://images.unsplash.com/photo-1504608524841-42584120d693?w=800&q=80',
    title: 'Meteorology & Climate Science',
    description: 'Understanding atmospheric processes and predicting weather and climate change.',
    href: '/departments/meteorology-and-climate-science',
  },
  {
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&q=80',
    title: 'Optometry',
    description: 'Training eye care professionals to diagnose and treat visual disorders.',
    href: '/departments/optometry',
  },
  {
    image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=800&q=80',
    title: 'Computer Science',
    description: 'Advancing software engineering, AI, cybersecurity, and data science.',
    href: '/departments/computer-science',
  },
  {
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
    title: 'Food Science',
    description: 'Applying science to ensure safe, nutritious, and sustainable food systems.',
    href: '/departments/food-science',
  },
  {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    title: 'Statistics',
    description: 'Transforming data into insight through probabilistic modelling and inference.',
    href: '/departments/statistics',
  },
  {
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
    title: 'Environmental Science',
    description: 'Studying human–environment interactions to build a sustainable future.',
    href: '/departments/environmental-science',
  },
];

const Departments = () => {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <SectionTitle
              title="Academic Departments"
              description="Explore our 12 departments, each dedicated to pushing the boundaries of scientific knowledge and research."
              centered={false}
            />
          </div>
          <Button variant="secondary" href="/departments" className="hidden md:flex rounded-lg">
            View All Departments
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {list.slice(0, 3).map((d) => (
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
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors leading-snug">
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
          <Button variant="secondary" href="/departments">View All Departments</Button>
        </div>
      </div>
    </section>
  );
};

export default Departments;
