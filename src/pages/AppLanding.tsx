import { useState } from "react";
import { resources, needs, faqs } from "../components/appData/appData";
import { Button } from "../components/ui";
import scisaAppMockup from "../assets/images/scisa-app-mockup.png";
import scisaAppImg from "../assets/images/scisa-app.jpg";

function AppLanding() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <main className="flex-1 bg-white overflow-hidden">
      
      {/* Hero Section - Clean & Minimal */}
      <section className="relative pt-24 pb-20 md:pt-32 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-gray-600 tracking-wide uppercase">Launching Soon</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-gray-900">
              Meet the <span className="text-primary">SCISA App</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              Your ultimate companion for academic excellence. Manage courses, connect with peers, and stay on top of everything at KNUST College of Science.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button className="px-8 py-4 text-lg bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all duration-300">
                Join Waitlist Now
              </Button>
              <button className="px-8 py-4 text-lg font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-all duration-300">
                Watch Demo
              </button>
            </div>

            {/* App Preview Mockup */}
            <div className="relative mt-12">
              <div className="relative max-w-5xl mx-auto">
                <img 
                  src={scisaAppMockup} 
                  alt="SCISA App Preview" 
                  className="w-full drop-shadow-2xl rounded-t-3xl border border-gray-200 border-b-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-gray-50 border-y border-gray-200">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-200/50">
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-1">10K+</div>
              <div className="text-gray-500 text-sm uppercase tracking-wider">Students Ready</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-1">50+</div>
              <div className="text-gray-500 text-sm uppercase tracking-wider">Features</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-1">24/7</div>
              <div className="text-gray-500 text-sm uppercase tracking-wider">Access</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-1">100%</div>
              <div className="text-gray-500 text-sm uppercase tracking-wider">Free</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to excel in your academic journey, all in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map(({ title, desc, icon }) => (
              <div 
                key={title} 
                className="group p-8 rounded-2xl bg-white border border-gray-100 hover:border-primary/20 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
                  <img src={icon} alt={title} className="w-7 h-7 brightness-0 invert" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Showcase Section */}
      <section className="py-16 md:py-24 bg-gray-50 overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/5 rounded-3xl transform rotate-3" />
                <img
                  src={scisaAppImg}
                  className="relative rounded-3xl shadow-xl w-full border border-gray-200"
                  alt="App Interface"
                />
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 mb-6">
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">Student First</span>
              </div>
              
              <h2 className="text-4xl font-bold mb-6 text-gray-900 leading-tight">
                Built by Students,<br />
                For Students
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We understand your challenges because we face them too. The SCISA app is designed with real student needs in mind.
              </p>

              <div className="space-y-6">
                {needs.map(({ title, desc }) => (
                  <div key={title} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 mb-1">{title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto bg-gray-900 rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            {/* Background Decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-lg bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Get Early Access
              </h2>
              <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Join thousands of students on the waitlist. Be the first to experience the future of student life at KNUST.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <a 
                  href="https://tally.so" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-10 py-5 text-lg font-bold bg-primary text-white rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25 transform hover:-translate-y-1"
                >
                  Join the Waitlist
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-8 text-gray-500 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>No spam, ever</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Free forever</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Priority access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Got Questions?</h2>
            <p className="text-lg text-gray-600">We've got answers</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map(({ q, a }, index) => (
              <div 
                key={q} 
                className={`group rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                  openFaqIndex === index 
                    ? 'bg-white border-primary/50 shadow-md' 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => toggleFaq(index)}
              >
                <div className="p-6 flex justify-between items-center">
                  <h3 className={`font-semibold text-lg transition-colors ${
                    openFaqIndex === index ? 'text-primary' : 'text-gray-900'
                  }`}>
                    {q}
                  </h3>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    openFaqIndex === index 
                      ? 'bg-primary/10 text-primary rotate-180' 
                      : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                  }`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <div className={`px-6 text-gray-600 leading-relaxed overflow-hidden transition-all duration-300 ease-in-out ${
                  openFaqIndex === index ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  {a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Ready to Transform Your Student Life?
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Join the waitlist today and be part of the future of student experience at KNUST.
          </p>
          <Button className="px-10 py-5 text-lg bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 transform hover:-translate-y-1 transition-all duration-300">
            Join the Waitlist
          </Button>
        </div>
      </section>
    </main>
  );
}

export default AppLanding;
