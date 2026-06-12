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
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsMobileMenuOpen(false), [location.pathname]);

  const isIsland = scrolled;

  return (
    <>
      {/*
        Key trick for smooth transition:
        The outer wrapper is always fixed, full-width, top-0.
        We only animate padding (to create the "shrink inward" effect)
        and the inner pill's border-radius + background.
        No position property changes = no layout jitter.
      */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.34,1.20,0.64,1)] ${
          isIsland ? 'px-6 pt-3 pb-0' : 'px-0 pt-0 pb-0'
        }`}
      >
        {/* Inner pill — this is what animates shape + background */}
        <div
          className={`transition-all duration-500 ease-[cubic-bezier(0.34,1.20,0.64,1)] ${
            isIsland
              ? 'bg-white/85 backdrop-blur-2xl border border-white/50 shadow-[0_4px_24px_rgba(0,0,0,0.10),0_1px_4px_rgba(0,0,0,0.06)] rounded-2xl px-4 py-2'
              : 'bg-transparent rounded-none px-6 py-5 border-transparent shadow-none'
          }`}
        >
          <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-4">

            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-2.5 shrink-0 group">
              <img
                src="/logo.jpeg"
                alt="SCISA logo"
                className={`rounded-full object-cover transition-all duration-500 ${
                  isIsland ? 'w-7 h-7' : 'w-10 h-10'
                }`}
              />
              <div className="flex flex-col leading-none overflow-hidden">
                <span
                  className={`font-bold font-sans whitespace-nowrap transition-all duration-500 ${
                    isIsland
                      ? 'text-sm text-text-primary'
                      : isHome
                      ? 'text-base text-white'
                      : 'text-base text-primary'
                  }`}
                >
                  {siteConfig.name}
                </span>
                {/* College subtitle — fade out & collapse in island mode */}
                <span
                  className={`text-[9px] uppercase tracking-widest font-medium whitespace-nowrap transition-all duration-500 overflow-hidden ${
                    isIsland
                      ? 'max-h-0 opacity-0'
                      : isHome
                      ? 'max-h-4 opacity-70 text-white/70'
                      : 'max-h-4 opacity-70 text-text-secondary'
                  }`}
                >
                  {siteConfig.college}
                </span>
              </div>
            </NavLink>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0.5">
              {mainNavigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `relative px-3.5 py-1.5 text-sm font-medium rounded-xl transition-all duration-200 group ${
                      isActive
                        ? isIsland
                          ? 'text-primary bg-primary/8 font-semibold'
                          : isHome
                          ? 'text-white font-semibold'
                          : 'text-primary font-semibold'
                        : isIsland
                        ? 'text-text-secondary hover:text-text-primary hover:bg-gray-100/80'
                        : isHome
                        ? 'text-white/75 hover:text-white'
                        : 'text-text-secondary hover:text-text-primary'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.name}
                      {isIsland && isActive && (
                        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                      )}
                      {!isIsland && (
                        <span
                          className={`absolute -bottom-1 left-3.5 right-3.5 h-0.5 bg-primary transform origin-left transition-transform duration-300 ${
                            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                          }`}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:block shrink-0">
              <Button
                href="/app"
                variant="primary"
                className={`transition-all duration-500 ${
                  isIsland
                    ? 'rounded-xl px-4 py-1.5 text-sm'
                    : isHome
                    ? 'bg-white text-primary hover:bg-gray-100 border-none rounded-lg px-5 py-2.5'
                    : 'rounded-xl px-5 py-2.5'
                }`}
              >
                {isIsland ? 'Join Waitlist' : 'Join Waitlist'}
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              className={`md:hidden p-1.5 rounded-xl transition-colors ${
                isIsland
                  ? 'text-text-primary hover:bg-gray-100'
                  : isHome
                  ? 'text-white'
                  : 'text-text-primary'
              }`}
              onClick={() => setIsMobileMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>

          </div>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <div
        className={`fixed inset-x-4 top-[4.5rem] z-40 md:hidden bg-white/95 backdrop-blur-xl border border-gray-200/80 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.34,1.20,0.64,1)] ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col p-3 gap-0.5">
          {mainNavigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary/8 text-primary font-semibold'
                    : 'text-text-secondary hover:bg-gray-50 hover:text-text-primary'
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}
          <div className="pt-2 mt-1 border-t border-gray-100">
            <Button href="/app" className="w-full justify-center rounded-xl">
              Join Waitlist
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};
