import { resources, needs, faqs } from "../components/appData/appData";
import { Button } from "../components/ui";

function AppLanding() {

  return (
    <main className="flex-1">

      <div className="relative w-full h-[450px] md:h-[550px]">
        <img
          src="src/assets/images/scisa-app.jpg"
          alt="SCISA App"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-bg-dark/40" />

        <div className="absolute top-1/2 -translate-y-1/2 left-6 md:left-16 text-white max-w-xl">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light mb-4">
            The SCISA App
          </h1>
          <p className="text-sm md:text-base">
            Your all-in-one platform for academic success and student life at the College of Science.
          </p>
          <Button className="mt-6">Join the Waitlist</Button>
        </div>
      </div>

      <section className="container-custom my-20 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium">See the SCISA App in Action</h2>
        <p className="py-2 text-text-secondary">Watch how the SCISA app will transform your student experience</p>

        <div className="w-full h-[300px] md:h-[500px] lg:h-[700px] bg-text-primary flex items-center justify-center mt-8 rounded-md">
          <div className="bg-primary size-20 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition">
            <img src="src/assets/svgs/play-button.svg" className="size-12" />
          </div>
        </div>
      </section>

      <section className="container-custom text-center my-16">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium">Everything You Need</h2>
        <p className="py-4 text-text-secondary">The SCISA app brings together all the tools and resources you need to succeed</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {resources.map(({ title, desc, icon }) => (
            <div key={title} className="bg-gray-50 py-6 px-8 rounded-md flex flex-col gap-3 text-left">
              <div className="bg-primary/80 size-10 p-2 rounded-md flex items-center justify-center">
                <img src={icon} alt={title} className="size-6" />
              </div>
              <h3 className="font-medium">{title}</h3>
              <p className="text-sm text-text-secondary">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-custom my-28 flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium">Built by Students, for Students</h3>
          <p className="py-5 text-text-secondary">
            The SCISA app was developed by the Science Students' Association to address real needs faced by students. 
            We've listened to your feedback and created a platform that truly serves our community.
          </p>

          {needs.map(({ title, desc, icon }) => (
            <div key={title} className="flex gap-4 mb-5">
              <img src={icon} className="size-5 mt-1" />
              <div>
                <h4 className="font-medium">{title}</h4>
                <p className="text-text-secondary text-sm">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-1/2 h-[350px] md:h-[450px]">
          <img
            src="src/assets/images/scisa-app.jpg"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </section>

      <section className="bg-bg-dark text-text-light py-20 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-medium">Join the Waitlist</h2>
        <p className="mt-4 max-w-lg mx-auto">
          Be among the first to experience the SCISA app when it launches. Sign up now and get exclusive early access.
        </p>

        <form className="max-w-xl mx-auto mt-10 flex flex-col gap-6 text-start">
          <div>
            <label className="text-sm block mb-1">Full Name</label>
            <input type="text" className="w-full p-3 rounded bg-text-light text-black outline-none" placeholder="Enter your full name" />
          </div>

          <div>
            <label className="text-sm block mb-1">Email Address</label>
            <input type="email" className="w-full p-3 rounded bg-text-light text-black outline-none" placeholder="your.email@knust.edu.gh" />
          </div>

          <div>
            <label className="text-sm block mb-1">Department</label>
            <input type="text" className="w-full p-3 rounded bg-text-light text-black outline-none" placeholder="Department" />
          </div>

          <Button className="w-full">Join the Waitlist</Button>
        </form>

        <p className="text-xs mt-4 opacity-70">
          We’ll notify you when the app is ready to launch. Your information is kept private and secure.
        </p>
      </section>

      <section className="container-custom py-20">
        <h2 className="text-center text-2xl md:text-3xl font-medium mb-10">Frequently Asked Questions</h2>

        <div className="max-w-3xl mx-auto flex flex-col gap-10">
          {faqs.map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-medium text-lg mb-2">{q}</h3>
              <p className="text-text-secondary">{a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default AppLanding;
