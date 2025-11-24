import { Button } from '../ui';

const CTA = () => {
  return (
    <section className="py-20 md:py-24 bg-[#101828] text-white">
      <div className="container-custom flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Ready to explore the College of Science?</h2>
          <p className="text-text-light mt-2 max-w-2xl">Discover our programmes, departments and student life opportunities.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="primary" href="/departments" showArrow>Explore Departments</Button>
          <Button variant="secondary" href="/about">About the College</Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;


