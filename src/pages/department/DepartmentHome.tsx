
import { useOutletContext, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Department } from '../../data/departments';
import { ArrowRight, Users, GraduationCap, BookOpen, Clock, MapPin, ChevronDown, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

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
      className="grid grid-cols-1 lg:grid-cols-3 gap-8"
    >
      {/* Main Content Column */}
      <div className="lg:col-span-2 space-y-8">
        <section>
          <motion.h2 
            variants={itemVariants}
            className="text-2xl font-bold font-display text-neutral-900 mb-4"
          >
            Welcome to the {department.name}
          </motion.h2>
          <motion.div 
            variants={itemVariants}
            className="prose prose-neutral max-w-none text-neutral-600 leading-relaxed"
          >
            <p className="text-xl font-light text-neutral-800 mb-8 border-l-4 border-primary-500 pl-6 italic">
              {department.description}
            </p>
            {department.about?.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </motion.div>
          
          {/* Spotlight Section */}
          {department.spotlight && (
            <motion.div variants={itemVariants} className="mt-8 bg-neutral-900 rounded-xl p-8 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                 <Quote className="w-32 h-32 text-white" />
               </div>
               <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start">
                 <img 
                   src={department.spotlight.image} 
                   alt={department.spotlight.name}
                   className="w-20 h-20 rounded-full object-cover border-2 border-primary-500"
                 />
                 <div>
                   <div className="inline-block px-3 py-1 bg-primary-600 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                     Spotlight
                   </div>
                   <blockquote className="text-xl font-display font-medium leading-relaxed mb-4">
                     "{department.spotlight.quote}"
                   </blockquote>
                   <div>
                     <div className="font-bold">{department.spotlight.name}</div>
                     <div className="text-neutral-400 text-sm">{department.spotlight.role}</div>
                   </div>
                 </div>
               </div>
            </motion.div>
          )}

          {/* Our Vision */}
          {department.vision && (
             <motion.div
              variants={itemVariants}
              className="mt-6 border-l-4 border-primary-600 pl-6 py-2 bg-neutral-50"
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
             <h2 className="text-xl font-bold font-display text-neutral-900 mb-4">Research Areas</h2>
             <div className="grid sm:grid-cols-2 gap-3">
               {department.researchAreas.map((area, idx) => (
                 <div key={idx} className="flex items-center gap-3 p-3 border border-neutral-100 rounded-lg hover:border-primary-200 transition-colors bg-white">
                   <div className="w-2 h-2 rounded-full bg-primary-500" />
                   <span className="font-medium text-neutral-700">{area}</span>
                 </div>
               ))}
             </div>
          </section>
        )}



        
        {/* Gallery Section */}
        {department.gallery && department.gallery.length > 0 && (
          <section>
            <h2 className="text-xl font-bold font-display text-neutral-900 mb-4">Life at {department.name.replace('Department of ', '')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
               {department.gallery.map((img, idx) => (
                 <div key={idx} className={`rounded-lg overflow-hidden group relative h-48 ${idx === 0 ? 'col-span-2 md:col-span-2 row-span-2 h-full' : ''}`}>
                    <img 
                      src={img} 
                      alt="Department Life" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                 </div>
               ))}
            </div>
          </section>
        )}

        {/* Featured Programs Preview */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <motion.h2 variants={itemVariants} className="text-xl font-bold font-display text-neutral-900">
              Degrees & Programmes
            </motion.h2>
            <Link to="programmes" className="text-primary-600 font-medium hover:text-primary-700 flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {department.programmes.slice(0, 3).map((prog) => (
              <ProgrammeAccordionItem key={prog.id} prog={prog} />
            ))}
          </div>
        </section>
      </div>

      {/* Sidebar Column */}
      <div className="space-y-6">
        {/* Quick Stats Card */}
        <motion.div variants={itemVariants} className="bg-neutral-900 text-white p-8 rounded-xl">
          <h3 className="font-display font-bold text-xl mb-6">Quick Facts</h3>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  <Counter value={department.stats.students} />+
                </div>
                <div className="text-neutral-400 text-sm">Enrolled Students</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  <Counter value={department.stats.faculty} />
                </div>
                <div className="text-neutral-400 text-sm">Faculty Members</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  <Counter value={department.stats.researchPapers} />
                </div>
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

const Counter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}</span>;
}

export default DepartmentHome;
