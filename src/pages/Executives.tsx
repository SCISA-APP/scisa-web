import { ExecutiveCard } from '../components/ui/ExecutiveCard';
import { ServiceCard } from '../components/ui/ServiceCard';
import { Button } from '../components/ui/Button';
import { useSiteExecutives } from '../hooks/useSiteExecutives';

function ExecutivesPage() {
  const { executives, loading } = useSiteExecutives();

  return (
    <main className="flex-1">
      {/* Hero */}
      <div className="relative w-full h-[500px] md:h-[600px]">
        <img
          src="/execs.JPG"
          alt="SCISA Executives"
          className="w-full h-full object-cover object-[center_15%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom text-white">
            <div className="inline-block px-3 py-1 mb-4 border border-white/30 rounded-full backdrop-blur-md bg-white/10">
              <span className="text-sm font-medium tracking-wide uppercase">Leadership</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              SCISA Executive Council
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-xl">
              Meet the dedicated student leaders serving the College of Science
            </p>
          </div>
        </div>
      </div>

      {/* Intro */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom max-w-3xl text-center mx-auto">
          <h4 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">Who We Are</h4>
          <p className="text-text-secondary text-lg leading-relaxed">
            The Science Students' Association (SCISA) Executive Council is comprised of dedicated student
            leaders elected to represent and serve the interests of all students in the College of Science.
            Our executives work tirelessly to enhance the student experience, organise academic and social
            events, and serve as a bridge between students and faculty.
          </p>
        </div>
      </section>

      {/* Executives grid */}
      <section className="pb-20 bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">Your Executives</h2>
            <p className="text-text-secondary mt-3">
              Elected to represent and serve every student in the College of Science
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex flex-col items-center gap-3 w-full max-w-[240px]">
                  <div className="w-44 h-44 rounded-full bg-gray-100 animate-pulse" />
                  <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
                  <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Row 1 — top 3 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
                {executives.slice(0, 3).map((ex) => (
                  <ExecutiveCard
                    key={ex.id}
                    image={ex.image}
                    name={ex.name}
                    title={ex.position}
                  />
                ))}
              </div>

              {/* Row 2 — bottom 3, centered */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center mt-8 md:max-w-3xl md:mx-auto">
                {executives.slice(3).map((ex) => (
                  <ExecutiveCard
                    key={ex.id}
                    image={ex.image}
                    name={ex.name}
                    title={ex.position}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* What we do */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h4 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">Our Work</h4>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">What We Do</h2>
            <p className="text-text-secondary mt-3 max-w-xl mx-auto">
              The SCISA Executive Council works to enhance student life across multiple areas
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <ServiceCard
              title="Academic Support"
              description="Organising study groups, tutoring sessions, and academic workshops to help students excel"
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
              description="Advocacy and wellbeing programs that support students' health, safety, and campus life."
              bgColor="bg-[#00808E]"
              icon={(
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 21s-8-4.5-8-10a4 4 0 1 1 8 0 4 4 0 1 1 8 0c0 5.5-8 10-8 10z" />
                </svg>
              )}
            />
            <ServiceCard
              title="Events & Outreach"
              description="Planning campus events, workshops, and partnerships to increase engagement and visibility."
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

      {/* Get involved */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container-custom text-center max-w-2xl mx-auto">
          <h4 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">Get Involved</h4>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Questions or Want to Connect?
          </h2>
          <p className="text-text-secondary mb-8">
            Interested in joining the SCISA team or have questions? We'd love to hear from you.
          </p>
          <Button variant="primary" href="/contact" className="px-8 py-4 text-lg rounded-xl">
            Contact Us
          </Button>
        </div>
      </section>
    </main>
  );
}

export default ExecutivesPage;
