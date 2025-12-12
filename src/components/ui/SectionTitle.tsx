import { cn } from '../../lib/utils';

interface SectionTitleProps {
  title: string;
  description?: string;
  className?: string;
  centered?: boolean;
}

export const SectionTitle = ({ 
  title, 
  description,
  className = '',
  centered = true
}: SectionTitleProps) => {
  return (
    <div className={cn(centered ? "text-center" : "text-left", "mb-12", className)}>
      <h2 className="text-4xl font-bold text-text-primary mb-4 font-sans leading-11">{title}</h2>
      {description && (
        <p className="text-base font-normal text-text-secondary max-w-2xl mx-auto font-sans leading-6">{description}</p>
      )}
    </div>
  );
};