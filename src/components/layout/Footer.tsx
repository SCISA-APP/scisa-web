import { siteConfig } from '../../config/site.config';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-[#101828] text-text-light py-12">
      <div className="container-custom">
        {/* Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* College Info */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-semibold text-white">College of Science</h3>
            <p className="text-sm text-text-muted leading-relaxed">Kwame Nkrumah University of Science and Technology</p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-semibold text-white">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              <li><Link to="/about" className="text-sm text-text-muted hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/departments" className="text-sm text-text-muted hover:text-white transition-colors">Departments</Link></li>
              <li><Link to="/faculties" className="text-sm text-text-muted hover:text-white transition-colors">Faculties</Link></li>
              <li><Link to="/news" className="text-sm text-text-muted hover:text-white transition-colors">News & Events</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-semibold text-white">Programs</h3>
            <ul className="flex flex-col gap-3">
              <li><Link to="/programs/undergraduate" className="text-sm text-text-muted hover:text-white transition-colors">Undergraduate</Link></li>
              <li><Link to="/programs/graduate" className="text-sm text-text-muted hover:text-white transition-colors">Graduate</Link></li>
              <li><Link to="/programs/teaching" className="text-sm text-text-muted hover:text-white transition-colors">Teaching</Link></li>
              <li><Link to="/programs/online" className="text-sm text-text-muted hover:text-white transition-colors">Online Programs</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-semibold text-white">Contact</h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2 text-sm text-text-muted">
                <svg className="flex-shrink-0 text-text-muted" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{siteConfig.contact.address}</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-text-muted">
                <svg className="flex-shrink-0 text-text-muted" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>{siteConfig.contact.phone}</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-text-muted">
                <svg className="flex-shrink-0 text-text-muted" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>{siteConfig.contact.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 border-t border-gray-600 gap-4">
          <p className="text-sm text-text-muted">© 2025 KNUST College of Science. All rights reserved.</p>
          <div className="flex gap-4">
            <a href={siteConfig.social.facebook} className="text-white hover:opacity-70 transition-opacity" aria-label="Facebook">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-3h4z"/>
              </svg>
            </a>
            <a href={siteConfig.social.twitter} className="text-white hover:opacity-70 transition-opacity" aria-label="Twitter">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
              </svg>
            </a>
            <a href={siteConfig.social.instagram} className="text-white hover:opacity-70 transition-opacity" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href={siteConfig.social.linkedin} className="text-white hover:opacity-70 transition-opacity" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};