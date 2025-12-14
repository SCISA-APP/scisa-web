import { ExecutiveCard } from '../components/ui/ExecutiveCard';
import { ServiceCard } from '../components/ui/ServiceCard';
import { Button } from '../components/ui/Button';
import scisaAppImg from '../assets/images/scisa-app.jpg';

function ExecutivesPage() {
  const executives = [
    {
      name: 'Jane Doe',
      title: 'President',
      department: 'Biological Sciences',
      image: scisaAppImg,
      quote: "I'm committed to representing student voices and creating opportunities for collaboration across departments.",
      linkedin: 'https://www.linkedin.com',
      email: 'jane.doe@example.com'
    },
    {
      name: 'John Smith',
      title: "Vice President",
      department: 'Mathematics',
      image: scisaAppImg,
      quote: "I focus on academic excellence and student support initiatives to improve retention and outcomes.",
      linkedin: 'https://www.linkedin.com',
      email: 'john.smith@example.com'
    },
    {
      name: 'Mary Johnson',
      title: "Secretary",
      department: 'Chemistry',
      image: scisaAppImg,
      quote: "Communication and transparency are at the heart of what I do for our student body.",
      linkedin: 'https://www.linkedin.com',
      email: 'mary.johnson@example.com'
    },
    {
      name: 'Samuel Lee',
      title: "Treasurer",
      department: 'Physics',
      image: scisaAppImg,
      quote: "I manage our resources carefully so we can deliver high-impact events and services.",
      linkedin: 'https://www.linkedin.com',
      email: 'samuel.lee@example.com'
    },
    {
      name: 'Aisha Mensah',
      title: "Welfare Officer",
      department: 'Environmental Science',
      image: scisaAppImg,
      quote: "I advocate for student wellbeing and coordinate support programs across the college.",
      linkedin: 'https://www.linkedin.com',
      email: 'aisha.mensah@example.com'
    },
    {
      name: 'Kwame Opoku',
      title: "Events Coordinator",
      department: 'Computer Science',
      image: scisaAppImg,
      quote: "I plan and execute engaging events that bring our community together and showcase student talent.",
      linkedin: 'https://www.linkedin.com',
      email: 'kwame.opoku@example.com'
    }
  ];

  return (
    <main className="flex-1 ">
      <div className="relative w-full h-[640px] md:h-[720px] mb-20">
        <img
          src={scisaAppImg}
          alt="SCISA App"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute top-1/2 -translate-y-1/2 left-6 md:left-16 text-white ">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light mb-4">
            SCISA Executive Council
          </h1>
          <p className="text-sm md:text-base">
            Meet the dedicated student leaders serving the College of Science
          </p>
         
        </div>
      </div>

      <div className='px-6 md:px-16 py-8 text-text-secondary text-center mt-10 text-2xl mb-20 '>
        <p className=''>The Science Students' Association (SCISA) Executive Council is comprised of dedicated student leaders elected to represent and serve the interests of all students in the College of Science. Our executives work tirelessly to enhance the student experience, organize academic and social events, and serve as a bridge between students and faculty.</p>
      </div>

      <section className="px-6 md:px-16 pb-16 bg-[#FAFAFA] mb-20">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-8">
          {executives.map((ex) => (
            <ExecutiveCard
              key={ex.email}
              image={ex.image}
              name={ex.name}
              title={ex.title}
              department={ex.department}
              quote={ex.quote}
              linkedin={ex.linkedin}
              email={ex.email}
            />
          ))}
        </div>
      </section>

      <section className="px-6 md:px-16 pb-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">What We Do</h2>
          <p className="text-text-secondary mb-6">
            The SCISA Executive Council works to enhance student life across multiple areas
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <ServiceCard
              title="Academic Support"
              description="Organizing study groups, tutoring sessions, and academic workshops to help students excel"
              bgColor="bg-red-700"
              icon={(
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                  <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 3v13"/>
                  <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M4 6.5A2.5 2.5 0 0 1 6.5 4H20"/>
                </svg>
              )}
            />

            <ServiceCard
              title="Student Welfare"
              description="Advocacy and wellbeing programs that support students' health, safety and campus life."
              bgColor="bg-[#00808E]"
              icon={(
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 21s-8-4.5-8-10a4 4 0 1 1 8 0 4 4 0 1 1 8 0c0 5.5-8 10-8 10z" />
                </svg>
              )}
            />

            <ServiceCard
              title="Events & Outreach"
              description="Planning campus events, workshops and partnerships to increase engagement and visibility."
              bgColor="bg-blue-600"
              icon={(
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a3 3 0 0 0 3.22 0L22 8" />
                  <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M5 19h14a2 2 0 0 0 2-2V7" />
                </svg>
              )}
            />
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 pb-16 bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Get Involved</h2>   
          <p className="text-text-secondary mb-6">
            Interested in joining the SCISA team or have questions? We'd love to hear from you!
          </p>
           <Button variant="primary" href="/contact" className="bg-transparent border text-white bg-primary px-8 py-4 text-lg">
                      Contact Us
            </Button>
         
        </div>
      </section>
      
    </main>
  );
}

export default ExecutivesPage;


