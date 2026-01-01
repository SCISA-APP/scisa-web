import React from 'react';
import { useParams, Outlet, NavLink, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DEPARTMENTS } from '../../data/departments';

const DepartmentLayout = () => {
  const { slug } = useParams<{ slug: string }>();
  const department = DEPARTMENTS.find(d => d.slug === slug);

  if (!department) {
    return <Navigate to="/departments" replace />;
  }

  const tabs = [
    { label: 'Overview', path: '' },
    { label: 'Faculty', path: 'faculty' },
    { label: 'Programmes', path: 'programmes' },
    { label: 'Research', path: 'research' },
  ];

  return (
    <div className="w-full flex-grow bg-neutral-50 flex flex-col font-sans text-neutral-900">
      
      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-neutral-900/60 z-10" />
        <img 
          src={department.heroImage} 
          alt={department.name} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 bg-primary-600/90 text-white text-xs font-bold uppercase tracking-wider mb-4 rounded-sm backdrop-blur-sm">
              Department
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              {department.name}
            </h1>
            <p className="text-lg md:text-xl text-neutral-200 max-w-2xl font-light leading-relaxed">
              {department.description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Sticky Navigation */}
      <div className="sticky top-0 z-30 bg-white border-b border-neutral-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <NavLink
                key={tab.path}
                to={tab.path}
                end={tab.path === ''}
                className={({ isActive }) => `
                  whitespace-nowrap py-4 text-sm font-medium border-b-2 transition-colors duration-200
                  ${isActive 
                    ? 'border-primary-600 text-primary-600' 
                    : 'border-transparent text-neutral-500 hover:text-neutral-900 hover:border-neutral-300'}
                `}
              >
                {tab.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">
        <Outlet context={{ department }} />
      </main>

    </div>
  );
};

export default DepartmentLayout;
