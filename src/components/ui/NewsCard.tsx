import { cn } from '../../lib/utils';

interface NewsCardProps {
  image: string;
  category: string;
  title: string;
  date: string;
  href?: string;
  className?: string;
}

export const NewsCard = ({ 
  image, 
  category, 
  title, 
  date,
  href = "#",
  className = '' 
}: NewsCardProps) => {
  return (
    <div className={cn("bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 relative", className)}>
      <div className="w-full h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-6 pr-12">
        <span className="inline-block text-xs font-medium text-primary bg-red-50 px-3 py-1 rounded mb-3 font-sans leading-4">{category}</span>
        <h3 className="text-lg font-semibold text-text-primary mb-2 font-sans leading-7 break-words">{title}</h3>
        <p className="text-sm font-normal text-text-secondary font-sans leading-5">{date}</p>
      </div>
      <a href={href} className="absolute bottom-6 right-6 flex items-center justify-center w-10 h-10 bg-primary rounded-full text-white hover:bg-red-800 hover:scale-110 transition-all duration-200" aria-label={`Read ${title}`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 16 16 12 12 8"></polyline>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
      </a>
    </div>
  );
};