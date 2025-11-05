import ExecutivesSection from '../components/sections/Executives';

function ExecutivesPage() {
  return (
    <main className="flex-1 py-16">
      <div className="container-custom">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">Executives</h1>
        <p className="text-text-secondary max-w-3xl">Meet our leadership team and their roles.</p>
      </div>
      <ExecutivesSection />
    </main>
  );
}

export default ExecutivesPage;


