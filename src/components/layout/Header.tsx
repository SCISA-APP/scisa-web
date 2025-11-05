import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { siteConfig } from '../../config/site.config';
import { mainNavigation } from '../../config/navigation';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white text-text-primary py-1 sticky top-0 z-50 shadow-md">
      <div className="container-custom grid grid-cols-3 items-center pl-4 md:pl-6">
        <div className="flex flex-col gap-0 col-start-1 justify-self-start">
          <h1 className="text-base md:text-lg font-semibold font-sans text-primary leading-tight">{siteConfig.name}</h1>
          <p className="text-[10px] text-[#101828] font-sans uppercase tracking-wide opacity-80 md:opacity-100">{siteConfig.college}</p>
        </div>
        
        <button 
          className="md:hidden bg-transparent border-none text-text-primary cursor-pointer p-2 col-start-3 justify-self-end"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isMobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>

        <nav className={`md:flex ${isMobileMenuOpen ? 'absolute top-full left-0 right-0 bg-white max-h-96 overflow-hidden transition-all duration-300' : 'hidden'} md:static md:col-start-2 md:justify-center md:justify-self-center`}>
          <ul className="md:flex md:items-center md:gap-8 md:flex-row md:justify-center flex-col p-4 md:p-0 gap-2">
            {mainNavigation.map((item) => (
              <li key={item.name} className="md:flex md:items-center">
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `text-text-primary text-sm font-sans font-normal transition-colors hover:text-primary md:hover:text-primary ${isActive ? 'text-primary' : ''} md:block block py-1.5 md:py-0 border-b border-gray-200 md:border-none whitespace-nowrap`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};