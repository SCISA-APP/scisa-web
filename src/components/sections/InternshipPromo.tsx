import { useState, useEffect } from "react";
import { Button } from "../ui";
import { fetchListings } from "../../api/internship";
import type { Listing } from "../../types/Internship";
import { Briefcase, ArrowRight, Smartphone, MapPin, Clock, Building2 } from "lucide-react";
import internImage from "../../assets/Internship-bro.png"
const TYPE_BADGE: Record<string, string> = {
  Internship: "bg-blue-50 text-blue-700 border-blue-100",
  Job: "bg-green-50 text-green-700 border-green-100",
  NSS: "bg-purple-50 text-purple-700 border-purple-100",
};

function ListingPreviewCard({ listing }: { listing: Listing }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/15 transition-colors duration-200">
      {listing.logo ? (
        <img
          src={listing.logo}
          alt={`${listing.company} logo`}
          className="w-10 h-10 rounded-xl object-contain bg-white p-1 shrink-0"
        />
      ) : (
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
          <Building2 className="w-5 h-5 text-white" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="font-bold text-white text-sm truncate">{listing.role}</p>
        <p className="text-white/70 text-xs truncate">{listing.company}</p>
        <div className="flex items-center gap-3 mt-1 text-white/60 text-xs">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {listing.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {listing.duration}
          </span>
        </div>
      </div>
      <span
        className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-full border ${
          TYPE_BADGE[listing.type] || "bg-white/20 text-white border-white/20"
        }`}
      >
        {listing.type}
      </span>
    </div>
  );
}

const InternshipPromo = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListings()
      .then((data) => {
        const active = data.filter((l) => new Date(l.deadline) >= new Date());
        setListings(active.slice(0, 3));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: image with floating listing cards */}
          <div className="relative order-2 lg:order-1">
            {/* Decorative blobs */}
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative rounded-2xl overflow-hidden transform md:-rotate-1 hover:rotate-0 transition-transform duration-500">
              <img
                src={internImage}
                alt="Internship opportunities"
                className="w-full h-[340px] md:h-[460px] lg:h-[520px] object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 " />

      
            </div>
          </div>

          {/* Right: CTA copy */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-gray-200 rounded-full bg-gray-50 shadow-sm">
              <Smartphone className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Available on the SCISA App</span>
            </div>

            <h4 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">
              Internship Opportunities
            </h4>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6 leading-tight">
              Your Next Career Move <br />
              <span className="text-primary">Starts Here.</span>
            </h2>

            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              SCISA connects College of Science students with curated internships, jobs, and NSS
              placements — matched to your department. Browse, apply, and kickstart your career,
              all from the SCISA mobile app.
            </p>

            <ul className="space-y-3 mb-10">
              {[
                "Opportunities matched to your department",
                "Real-time deadline reminders",
                "Direct company contact information",
                "Stipend details and duration upfront",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-text-secondary">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <Button
              variant="primary"
              href="/app"
              className="px-8 py-4 text-lg shadow-lg shadow-primary/20 rounded-xl"
            >
              <span className="flex items-center gap-2">
                Download the App
                <ArrowRight className="w-5 h-5" />
              </span>
            </Button>

            <p className="mt-4 text-xs text-text-muted">
              Free to download · Exclusive to KNUST College of Science students
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default InternshipPromo;
