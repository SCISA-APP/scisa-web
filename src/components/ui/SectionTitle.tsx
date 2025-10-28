import { cn } from '../../lib/utils';

interface SectionTitleProps {
  title: string;
  description?: string;
  className?: string;
}

export const SectionTitle = ({ 
  title, 
  description,
  className = '' 
}: SectionTitleProps) => {
  return (
    <div className={cn("text-center mb-12", className)}>
      <h2 className="text-4xl font-bold text-text-primary mb-4 font-sans leading-11">{title}</h2>
      {description && (
        <p className="text-base font-normal text-text-secondary max-w-2xl mx-auto font-sans leading-6">{description}</p>
      )}
    </div>
  );
};