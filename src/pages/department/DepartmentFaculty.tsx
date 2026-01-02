
import { useOutletContext } from 'react-router-dom';
import type { Department } from '../../data/departments';
import { motion } from 'framer-motion';

const DepartmentFaculty = () => {
  const { department } = useOutletContext<{ department: Department }>();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">Our Faculty</h2>
        <p className="text-neutral-500 max-w-2xl mx-auto">
          Meet the dedicated professors, lecturers, and researchers who are driving innovation and mentoring the next generation.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {department.faculty.length > 0 ? (
          department.faculty.map((member) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={member.id} 
              className="bg-white border border-neutral-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-64 overflow-hidden bg-neutral-100">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-neutral-900">{member.name}</h3>
                <p className="text-primary-600 text-sm font-medium mb-3">{member.role}</p>
                <p className="text-neutral-500 text-sm line-clamp-3">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-neutral-400 bg-neutral-50 rounded-lg border border-dashed border-neutral-200">
            <p>Faculty list being updated for the new academic year.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentFaculty;
