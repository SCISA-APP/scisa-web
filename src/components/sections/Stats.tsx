const items = [
  { value: '6+', label: 'Departments' },
  { value: '50+', label: 'Faculty Members' },
  { value: '3k+', label: 'Students' },
  { value: '120+', label: 'Publications / yr' },
];

const Stats = () => {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-8">
        {items.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary">{s.value}</div>
            <div className="text-sm md:text-base text-text-secondary mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;


