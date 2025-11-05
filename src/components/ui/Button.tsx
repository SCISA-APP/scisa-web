import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  showArrow?: boolean;
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  showArrow = false, 
  className = '', 
  onClick,
  href,
  type = 'button'
}: ButtonProps) => {
  const baseClasses = "inline-flex items-center gap-2 px-6 py-3 text-sm font-medium font-sans rounded-none cursor-pointer transition-all border";
  
  const variantClasses = {
    primary: "bg-primary text-white border-primary hover:bg-red-800 hover:border-red-800",
    secondary: "bg-white text-text-primary border-text-primary hover:bg-gray-50"
  };

  const buttonClass = cn(baseClasses, variantClasses[variant], className);

  const isExternal = (url: string) => {
    return /^(https?:\/\/|\/\/|mailto:|tel:)/i.test(url);
  };

  const content = (
    <>
      {children}
      {showArrow && (
        <svg className="flex-shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      )}
    </>
  );

  if (href) {
    if (isExternal(href)) {
      return (
        <a href={href} className={buttonClass} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }
    return (
      <Link to={href} className={buttonClass}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={buttonClass} onClick={onClick}>
      {content}
    </button>
  );
};