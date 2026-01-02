
import { useOutletContext, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Department } from '../../data/departments';
import { ArrowRight, Users, GraduationCap, BookOpen, Clock, MapPin, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const DepartmentHome = () => {

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
          
          {/* Our Vision */}
          {department.vision && (
             <motion.div
              variants={itemVariants}
              className="mt-8 border-l-4 border-primary-600 pl-6 py-2 bg-neutral-50"
            >
              <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-2">Our Vision</h3>
              <p className="text-lg font-medium text-neutral-900 italic">
                "{department.vision}"
              </p>
            </motion.div>
          )}
        </section>

        {/* Research Areas */}
        {department.researchAreas && department.researchAreas.length > 0 && (
          <section>
             <h2 className="text-2xl font-bold font-display text-neutral-900 mb-6">Research Areas</h2>
             <div className="grid sm:grid-cols-2 gap-4">
               {department.researchAreas.map((area, idx) => (
                 <div key={idx} className="flex items-center gap-3 p-4 border border-neutral-100 rounded-lg hover:border-primary-200 transition-colors bg-white">
                   <div className="w-2 h-2 rounded-full bg-primary-500" />
                   <span className="font-medium text-neutral-700">{area}</span>
                 </div>
               ))}
             </div>
          </section>
        )}

        {/* Why Choose Us */}
        {department.whyChoose && department.whyChoose.length > 0 && (
          <section className="py-2">
            <h2 className="text-2xl font-bold font-display text-neutral-900 mb-6">Why Choose {department.name.replace('Department of ', '')}?</h2>
            <div className="space-y-5">
              {department.whyChoose.map((reason, idx) => (
                <div key={idx} className="flex items-start gap-4">
                   <div className="mt-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                   </div>
                   <p className="text-neutral-700 text-lg leading-relaxed">{reason}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Featured Programs Preview */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <motion.h2 variants={itemVariants} className="text-2xl font-bold font-display text-neutral-900">
              Degrees & Programmes
            </motion.h2>
            <Link to="programmes" className="text-primary-600 font-medium hover:text-primary-700 flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {department.programmes.slice(0, 3).map((prog) => (
              <ProgrammeAccordionItem key={prog.id} prog={prog} />
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
        <div className="bg-white border border-neutral-200 p-6 rounded-lg">
          <h3 className="font-bold text-neutral-900 mb-4">Contact Department</h3>
          <div className="space-y-4 text-sm text-neutral-600">
             <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-neutral-400 mt-0.5" />
              <span>{department.contact?.location || 'Science Building'}</span>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-neutral-400 mt-0.5" />
              <span>Mon - Fri: 8:00 AM - 5:00 PM</span>
            </div>
            {department.contact?.email && (
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-neutral-400 mt-0.5" />
                <span>{department.contact.email}</span>
              </div>
            )}
             {department.contact?.phone && (
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-neutral-400 mt-0.5" />
                <span>{department.contact.phone}</span>
              </div>
            )}
          </div>
          <button className="w-full mt-6 bg-primary-900 text-white py-2.5 rounded-lg font-medium hover:bg-black transition-colors">
            Get in Touch
          </button>
        </div>

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


const ProgrammeAccordionItem = ({ prog }: { prog: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="bg-white border border-neutral-200 rounded-lg overflow-hidden hover:border-primary-600 transition-colors"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${isOpen ? 'bg-primary-600 text-white' : 'bg-primary-50 text-primary-600'}`}>
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-neutral-900">{prog.title}</h3>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              {prog.level}
            </span>
          </div>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-neutral-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="p-4 pt-0 text-neutral-600 text-sm leading-relaxed border-t border-neutral-100 mt-2">
          {prog.description}
        </div>
      </motion.div>
    </div>
  );
};

export default DepartmentHome;
