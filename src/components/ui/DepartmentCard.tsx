import { cn } from '../../lib/utils';

interface DepartmentCardProps {
  image: string;
  title: string;
  description: string;
  href?: string;
  className?: string;
}

export const DepartmentCard = ({ 
  image, 
  title, 
  description, 
  href = "#",
  className = '' 
}: DepartmentCardProps) => {
  return (
    <div className={cn("bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200", className)}>
      <div className="w-full h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-6">
        <h3 className="text-base font-normal text-text-primary mb-2 font-sans leading-6">{title}</h3>
        <p className="text-sm font-normal text-text-secondary mb-4 font-sans leading-5">{description}</p>
        <a href={href} className="inline-flex items-center gap-2 text-sm font-normal text-primary hover:opacity-80 transition-opacity font-sans leading-5">
          Learn More
          <svg className="flex-shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </div>
  );
};