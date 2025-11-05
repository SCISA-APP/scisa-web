import { Button } from '../ui';

const AppPromo = () => {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
        <div>
          <img
            src="https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=1200&q=80"
            alt="Graduation"
            className="w-full h-[280px] md:h-[360px] object-cover rounded-none border border-gray-200"
          />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-text-primary">Introducing the SCISA Multipurpose App</h3>
          <p className="text-sm md:text-base text-text-secondary mt-3 leading-relaxed">
            Connect with the College of Science community through our SCISA app. Access academic resources, join groups, connect with peers, and stay updated on the latest news and events.
          </p>
          <ul className="text-sm text-text-secondary mt-4 space-y-2 list-disc list-inside">
            <li>Access course materials and academic resources</li>
            <li>Connect with students and faculty</li>
            <li>Track your academic progress</li>
          </ul>
          <div className="mt-6">
            <Button variant="primary" href="/app">Learn More & Join Waitlist</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPromo;


