const items = [
  { value: '6+', label: 'Departments' },
  { value: '50+', label: 'Faculty Members' },
  { value: '3k+', label: 'Students' },
  { value: '120+', label: 'Publications / yr' },
];

const Stats = () => {
  return (
    <section className="relative -mt-20 z-20 pb-20">
      <div className="container-custom">
        <div className="glass rounded-2xl p-8 md:p-12 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100/20">
            {items.map((s, i) => (
              <div key={s.label} className={`text-center ${i % 2 !== 0 ? 'border-l border-gray-100 md:border-none' : ''}`}>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{s.value}</div>
                <div className="text-sm md:text-base text-text-secondary font-medium uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;


