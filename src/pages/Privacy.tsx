import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <main className="flex-1 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <section className="bg-white border-b border-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
        <div className="container-custom py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-400 mt-4 uppercase tracking-wider font-semibold">
              Last Updated: December 8, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 bg-white relative z-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto animate-fade-in-up animation-delay-200">
            
            <div className="prose prose-lg prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-a:text-primary max-w-none">
              
              <div className="space-y-12">
                <PolicySection 
                  title="1. Student Information We Collect" 
                  icon={
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  }
                >
                  <p>To provide authorized access to student services, we collect specific academic information:</p>
                  <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-primary">
                    <li><strong>Student Identity:</strong> Your Name, Student index number, and Reference number for authentication and verification purposes.</li>
                    <li><strong>Academic Details:</strong> Your Department, Program of study, and Year level to serve relevant course materials and announcements.</li>
                    <li><strong>Contact Info:</strong> Your student email address and phone number for critical association updates.</li>
                  </ul>
                </PolicySection>

                <PolicySection 
                  title="2. Purpose of Data Collection"
                  icon={
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  }
                >
                  <p>We use your data solely to enhance your life on campus:</p>
                  <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-primary">
                    <li><strong>Academic Resources:</strong> To display the correct lecture schedules, slides, and past questions relevant to your specific course.</li>
                    <li><strong>SCISA Services:</strong> To facilitate dues payments, welfare requests, and souvenir redemption.</li>
                    <li><strong>Communication:</strong> To send push notifications regarding emergency announcements, event changes, or academic deadlines.</li>
                  </ul>
                </PolicySection>

                <PolicySection 
                  title="3. Data Protection & Security"
                  icon={
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  }
                >
                  <p>
                    Your student data is treated with strict confidentiality. It is securely stored using industry-standard encryption 
                    and is only accessible by authorized SCISA executives and technical administrators for administrative purposes. 
                    We do not sell your personal data to third parties.
                  </p>
                </PolicySection>

                <PolicySection 
                  title="4. Third-Party Integration"
                  icon={
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  }
                >
                   <p>
                    The app integrates with trusted third-party services to function correctly:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-primary">
                    <li><strong>Supabase:</strong> Used for secure database hosting and user authentication.</li>
                    <li><strong>Payment Gateways:</strong> External processors used for secure transaction of dues and purchases. We do not store your full credit card or mobile money PINs.</li>
                  </ul>
                </PolicySection>

                <PolicySection 
                  title="5. Your Rights as a Student"
                  icon={
                     <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  }
                >
                  <p>
                    You have the right to:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-primary">
                    <li>Access the personal information we hold about you via your profile settings.</li>
                    <li>Request corrections to any inaccurate academic or personal data.</li>
                    <li>Request account deletion upon graduation or withdrawal from the college.</li>
                  </ul>
                </PolicySection>

                <PolicySection 
                  title="6. Changes to This Policy"
                  icon={
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  }
                >
                  <p>
                    We may update our Privacy Policy to reflect changes in university regulations or app features. 
                    We will notify you of any significant changes through an in-app announcement.
                  </p>
                </PolicySection>

                <PolicySection 
                  title="7. Contact Us"
                  icon={
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                >
                  <p>
                    If you have concerns about your data or privacy, please contact the SCISA Publicity or Technical committee:
                  </p>
                  <p className="mt-2 font-medium text-gray-900 flex items-center gap-2">
                    Email: <a href="mailto:support@scisa.knust.edu.gh" className="text-primary hover:underline font-bold">support@scisa.knust.edu.gh</a>
                  </p>
                </PolicySection>
              </div>

              <div className="mt-16 pt-8 border-t border-gray-100 flex justify-center">
                 <Button 
                  onClick={() => navigate("/")}
                  className="px-10 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-semibold"
                >
                  Return to Home
                </Button>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const PolicySection = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
  <div className="group">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h2 className="text-2xl font-bold text-gray-900 m-0 group-hover:text-primary transition-colors">{title}</h2>
    </div>
    <div className="pl-[4rem] text-gray-600 leading-relaxed text-lg">
      {children}
    </div>
  </div>
);

export default Privacy;
