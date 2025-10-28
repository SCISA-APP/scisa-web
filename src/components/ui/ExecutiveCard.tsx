import { cn } from '../../lib/utils';

interface ExecutiveCardProps {
  image: string;
  name: string;
  title: string;
  className?: string;
}

export const ExecutiveCard = ({ 
  image, 
  name, 
  title,
  className = '' 
}: ExecutiveCardProps) => {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-primary shadow-lg">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold text-text-primary font-sans leading-6">{name}</h3>
        <p className="text-sm font-normal text-text-secondary font-sans leading-5">{title}</p>
      </div>
    </div>
  );
};