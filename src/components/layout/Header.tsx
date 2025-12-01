import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { siteConfig } from '../../config/site.config';
import { mainNavigation } from '../../config/navigation';
import { Button } from '../ui';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Determine header style based on scroll and page
  const headerClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrolled || !isHome 
      ? 'bg-white/80 backdrop-blur-md border-b border-gray-200/50 py-3 shadow-sm' 
      : 'bg-transparent py-5'
  }`;

  const textClass = scrolled || !isHome ? 'text-text-primary' : 'text-white';
  const logoClass = scrolled || !isHome ? 'text-primary' : 'text-white';

  return (
    <header className={headerClass}>
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex flex-col gap-0 group">
          <h1 className={`text-lg md:text-xl font-bold font-sans leading-tight transition-colors ${logoClass}`}>
            {siteConfig.name}
          </h1>
          <p className={`text-[10px] uppercase tracking-widest font-medium opacity-80 transition-colors ${textClass}`}>
            {siteConfig.college}
          </p>
        </NavLink>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {mainNavigation.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-all duration-200 hover:opacity-100 relative group ${
                      isActive ? 'opacity-100 font-semibold' : 'opacity-70'
                    } ${textClass}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.name}
                      <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
          
          <Button 
            href="/app" 
            variant={scrolled || !isHome ? 'primary' : 'secondary'}
            className={!scrolled && isHome ? 'bg-white text-primary hover:bg-gray-100 border-none' : ''}
          >
            Join Waitlist
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className={`md:hidden p-2 ${textClass}`}
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

        {/* Mobile Menu */}
        <div className={`absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <nav className="flex flex-col p-6 gap-4">
            {mainNavigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `text-base font-medium py-2 border-b border-gray-50 ${isActive ? 'text-primary' : 'text-text-secondary'}`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
            <Button href="/app" className="mt-2 w-full justify-center">Join Waitlist</Button>
          </nav>
        </div>
      </div>
    </header>
  );
};