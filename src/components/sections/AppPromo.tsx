import { Button } from '../ui';
import scisaAppMockup from '../../assets/images/scisa-app-mockup.png';

const AppPromo = () => {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="order-2 lg:order-1">
          <div className="relative">
            <div className="absolute inset-0 bg-gray-100 rounded-full transform scale-90 translate-y-10 -z-10" />
            <img
              src={scisaAppMockup}
              alt="SCISA App Mockup"
              className="relative z-10 w-full max-w-md mx-auto transform hover:scale-[1.02] transition-transform duration-500 drop-shadow-xl"
            />
          </div>
        </div>
        
        <div className="order-1 lg:order-2">
          <div className="inline-block px-3 py-1 mb-6 border border-gray-200 rounded-full bg-gray-50">
            <span className="text-sm font-medium text-primary">Coming Soon</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
            Your Campus Life, <br />
            <span className="text-primary">Reimagined.</span>
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Connect with the College of Science community through our SCISA app. Access academic resources, join groups, connect with peers, and stay updated on the latest news and events.
          </p>
          
          <ul className="space-y-4 mb-10">
            {[
              "Access course materials and academic resources",
              "Connect with students and faculty",
              "Track your academic progress"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-700">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {item}
              </li>
            ))}
          </ul>
          
          <Button variant="primary" href="/app" className="px-8 py-4 text-lg shadow-lg shadow-primary/20">
            Learn More & Join Waitlist
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AppPromo;


