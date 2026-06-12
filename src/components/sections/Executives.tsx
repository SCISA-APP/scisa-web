import { ExecutiveCard, SectionTitle, Button } from '../ui';
import { useSiteExecutives } from '../../hooks/useSiteExecutives';

const Executives = () => {
  const { executives, loading } = useSiteExecutives();

  return (
    <section className="py-20 md:py-24">
      <div className="container-custom">
        <SectionTitle
          title="Meet Our SCISA Executives"
          description="Dedicated student leaders committed to serving the College of Science community"
        />

        {loading ? (
          // Skeleton
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-10 justify-items-center">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center gap-3 w-full max-w-[220px]">
                <div className="w-44 h-44 rounded-full bg-gray-100 animate-pulse" />
                <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
                <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Top row: first 3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-10 justify-items-center">
              {executives.slice(0, 3).map((m) => (
                <ExecutiveCard key={m.id} image={m.image} name={m.name} title={m.position} />
              ))}
            </div>
            {/* Bottom row: remaining 3, centered */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-10 justify-items-center md:max-w-3xl md:mx-auto">
              {executives.slice(3).map((m) => (
                <ExecutiveCard key={m.id} image={m.image} name={m.name} title={m.position} />
              ))}
            </div>
          </>
        )}

        <div className="text-center mt-12">
          <Button variant="primary" href="/executives" className="rounded-lg" showArrow>
            View All Executives
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Executives;
