import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import type { Department } from '../../data/departments';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const DepartmentProgrammes = () => {
  const { department } = useOutletContext<{ department: Department }>();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl font-display font-bold text-neutral-900 mb-6">Academic Programmes</h2>
        <p className="text-neutral-600 text-lg leading-relaxed">
          The {department.name} offers a range of undergraduate and graduate programs designed to prepare students for successful careers in academia and industry.
        </p>
      </div>

      <div className="space-y-8">
        {department.programmes.length > 0 ? (
          department.programmes.map((prog, index) => (
            <motion.div 
              key={prog.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-neutral-200 rounded-xl p-8 hover:border-primary-200 transition-colors shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-neutral-100 text-neutral-600 text-xs font-bold uppercase tracking-wider rounded-sm">
                      {prog.level}
                    </span>
                    <h3 className="text-xl font-bold text-neutral-900">{prog.title}</h3>
                  </div>
                  <p className="text-neutral-600 max-w-2xl">
                    {prog.description}
                  </p>
                </div>
                <Link 
                  to="#" 
                  className="flex items-center font-medium text-primary-600 hover:text-primary-700 whitespace-nowrap"
                >
                  View Details
                </Link>
              </div>
              
              <div className="border-t border-neutral-100 pt-6 mt-6">
                <h4 className="text-sm font-semibold text-neutral-900 mb-3">Key Highlights:</h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-neutral-500">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span>Curriculum feature {i}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="py-12 text-center text-neutral-400 bg-neutral-50 rounded-lg border border-dashed border-neutral-200">
            <p>Program details coming soon.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentProgrammes;
