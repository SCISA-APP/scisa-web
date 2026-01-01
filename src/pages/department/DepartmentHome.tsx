import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Department } from '../../data/departments';
import { ArrowRight, Users, GraduationCap, BookOpen, Clock, MapPin } from 'lucide-react';

const DepartmentHome = () => {
  // Force HMR update
  const { department } = useOutletContext<{ department: Department }>();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 lg:grid-cols-3 gap-12"
    >
      {/* Main Content Column */}
      <div className="lg:col-span-2 space-y-12">
        <section>
          <motion.h2 
            variants={itemVariants}
            className="text-2xl font-bold font-display text-neutral-900 mb-6"
          >
            Welcome to the {department.name}
          </motion.h2>
          <motion.div 
            variants={itemVariants}
            className="prose prose-neutral max-w-none text-neutral-600 leading-relaxed"
          >
            <p className="text-lg">
              {department.description}
            </p>
            <p>
              We are dedicated to fostering an environment of academic excellence and 
              innovative research. Our goal is to equip students with the theoretical 
              knowledge and practical skills necessary to tackle complex challenges 
              in the modern world.
            </p>
            <p>
              Through our rigorous curriculum and state-of-the-art facilities, 
              we provide a platform for students to explore their passions and 
              contribute to scientific advancement.
            </p>
          </motion.div>
        </section>

        {/* Featured Programs Preview */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <motion.h2 variants={itemVariants} className="text-2xl font-bold font-display text-neutral-900">
              Degress & Programmes
            </motion.h2>
            <Link to="programmes" className="text-primary-600 font-medium hover:text-primary-700 flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {department.programmes.slice(0, 2).map((prog) => (
              <motion.div 
                key={prog.id}
                variants={itemVariants} 
                className="bg-white border border-neutral-200 p-6 rounded-lg hover:border-primary-600 transition-colors group cursor-pointer"
              >
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center mb-4 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">{prog.title}</h3>
                <p className="text-neutral-500 text-sm mb-4 line-clamp-2">{prog.description}</p>
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 border border-neutral-200 px-2 py-1 rounded">
                  {prog.level}
                </span>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Sidebar Column */}
      <div className="space-y-8">
        {/* Quick Stats Card */}
        <motion.div variants={itemVariants} className="bg-neutral-900 text-white p-8 rounded-xl">
          <h3 className="font-display font-bold text-xl mb-6">Quick Facts</h3>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">{department.stats.students}+</div>
                <div className="text-neutral-400 text-sm">Enrolled Students</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">{department.stats.faculty}</div>
                <div className="text-neutral-400 text-sm">Faculty Members</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">{department.stats.researchPapers}</div>
                <div className="text-neutral-400 text-sm">Research Papers</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact/Info Card */}
        <motion.div variants={itemVariants} className="bg-white border border-neutral-200 p-6 rounded-lg">
          <h3 className="font-bold text-neutral-900 mb-4">Contact Department</h3>
          <div className="space-y-4 text-sm text-neutral-600">
             <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-neutral-400 mt-0.5" />
              <span>Science Building, Block B<br/>Room 304</span>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-neutral-400 mt-0.5" />
              <span>Mon - Fri: 8:00 AM - 5:00 PM</span>
            </div>
          </div>
          <button className="w-full mt-6 bg-primary-600 text-white py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors">
            Get in Touch
          </button>
        </motion.div>

        {/* HOD Message */}
        <motion.div variants={itemVariants} className="bg-primary-50 p-6 rounded-lg border border-primary-100">
           <div className="flex items-center gap-4 mb-4">
             <img 
               src={department.headOfDepartment.image} 
               alt={department.headOfDepartment.name}
               className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
             />
             <div>
               <div className="text-sm font-bold text-primary-900">{department.headOfDepartment.name}</div>
               <div className="text-xs text-primary-700">Head of Department</div>
             </div>
           </div>
           <p className="text-primary-800 italic text-sm leading-relaxed">
             "{department.headOfDepartment.message}"
           </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DepartmentHome;
