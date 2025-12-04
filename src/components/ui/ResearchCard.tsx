import { cn } from '../../lib/utils';

interface ResearchCardProps {
  image: string;
  title: string;
  description: string;
  className?: string;
}

export const ResearchCard = ({
  image,
  title,
  description,
  className = ''
}: ResearchCardProps) => {
  return (
    <div className={cn("bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md", className)}>
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-text-primary mb-3 font-sans leading-7">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};
