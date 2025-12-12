import { cn } from '../../lib/utils';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface ServiceCardProps {
  title: string;
  description: string;
  bgColor?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const ServiceCard = ({
  title,
  description,
  bgColor = 'bg-red-600',
  icon,
  className = ''
}: ServiceCardProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.12 });

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col items-center text-center p-6 transform transition duration-700',
        !isVisible ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0',
        'hover:-translate-y-2',
        className
      )}
    >
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${bgColor}`}>
        {icon ?? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" />
            <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 4v16" />
          </svg>
        )}
      </div>

      <h3 className="text-sm font-semibold text-text-primary mb-2">{title}</h3>

      <p
        className="text-sm text-text-secondary max-w-xs"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}
      >
        {description}
      </p>
    </div>
  );
};

export default ServiceCard;
