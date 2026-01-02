
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, BookOpen } from 'lucide-react';
import { DEPARTMENTS } from '../data/departments';

const Departments = () => {
  return (
    <div className="w-full flex-grow bg-neutral-50 flex flex-col font-sans text-neutral-900">
      
      {/* Hero Banner */}
      <div className="bg-neutral-900 text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Academic Departments</h1>
            <p className="text-xl text-neutral-300 max-w-2xl font-light leading-relaxed">
              Six world-class departments committed to excellence in scientific education, 
              groundbreaking research, and preparing the next generation of innovators.
            </p>
          </motion.div>
        </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-6 py-16 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">Explore All Departments</h2>
          <p className="text-neutral-500">Click on any department to view detailed information regarding faculty, courses, and research.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DEPARTMENTS.map((dept, index) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden border border-neutral-200 hover:border-primary-600 transition-all duration-300 group flex flex-col"
            >
              <div className="h-48 overflow-hidden relative">
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-bold uppercase tracking-wider text-neutral-800">
                  {dept.id.toUpperCase()}
                </div>
                <img 
                  src={dept.heroImage} 
                  alt={dept.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold font-display text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {dept.name}
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-neutral-500">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{dept.stats.students}+ Students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{dept.stats.faculty} Faculty</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <Link 
                    to={`/departments/${dept.slug}`}
                    className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 hover:gap-2 transition-all"
                  >
                    View Details <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* CTA Section */}
      <div className="bg-white py-20 border-t border-neutral-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-display font-bold text-neutral-900 mb-6">Ready to Begin Your Journey?</h2>
          <p className="text-neutral-500 mb-8 text-lg">
            Join KNUST College of Science and become part of a tradition of excellence in scientific education and research.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="bg-primary-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-black transition-colors w-full sm:w-auto">
              Apply Now
            </button>
            <button className="bg-white text-primary-900 border border-primary-900 px-8 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors w-full sm:w-auto">
              Schedule a Visit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Departments;
