import { siteConfig } from '../../config/site.config';
import { Link } from 'react-router-dom';
import { Button } from '../ui';

export const Footer = () => {
  return (
    <footer className="bg-[#0f1115] text-gray-400 py-20 border-t border-white/5">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{siteConfig.name}</h3>
              <p className="text-sm uppercase tracking-wider opacity-70">{siteConfig.college}</p>
            </div>
            <p className="leading-relaxed max-w-md">
              Empowering the next generation of scientists and innovators through excellence in education and research.
            </p>
            
            <div className="mt-4">
              <h4 className="text-white font-medium mb-3">Subscribe to our newsletter</h4>
              <form className="flex gap-2 max-w-md" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                />
                <Button className="whitespace-nowrap">Subscribe</Button>
              </form>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div className="flex flex-col gap-4">
              <h3 className="text-white font-semibold">Quick Links</h3>
              <ul className="flex flex-col gap-3">
                <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link to="/departments" className="hover:text-primary transition-colors">Departments</Link></li>
                <li><Link to="/faculties" className="hover:text-primary transition-colors">Faculties</Link></li>
                <li><Link to="/news" className="hover:text-primary transition-colors">News & Events</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="flex flex-col gap-4">
              <h3 className="text-white font-semibold">Resources</h3>
              <ul className="flex flex-col gap-3">
                <li><Link to="/app" className="hover:text-primary transition-colors">Student App</Link></li>
                <li><Link to="/library" className="hover:text-primary transition-colors">Library</Link></li>
                <li><Link to="/research" className="hover:text-primary transition-colors">Research Portal</Link></li>
                <li><Link to="/alumni" className="hover:text-primary transition-colors">Alumni Network</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-4">
              <h3 className="text-white font-semibold">Contact</h3>
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{siteConfig.contact.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{siteConfig.contact.phone}</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{siteConfig.contact.email}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-60">© {new Date().getFullYear()} KNUST College of Science. All rights reserved.</p>
          
          <div className="flex gap-6">
            {[
              { icon: "facebook", href: siteConfig.social.facebook },
              { icon: "twitter", href: siteConfig.social.twitter },
              { icon: "instagram", href: siteConfig.social.instagram },
              { icon: "linkedin", href: siteConfig.social.linkedin }
            ].map((social) => (
              <a 
                key={social.icon} 
                href={social.href} 
                className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"
                aria-label={social.icon}
              >
                {/* Simple Social Icons */}
                <div className="w-5 h-5 bg-current rounded-full opacity-20 hover:opacity-100" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};