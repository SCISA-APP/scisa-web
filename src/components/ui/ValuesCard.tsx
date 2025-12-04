import { cn } from '../../lib/utils';

interface ValuesCardProps {
  icon: string;  
  title: string;
  description: string;
  className?: string;
}

export const ValuesCard = ({ 
  icon, 
  title,
  description,
  className = ''
}: ValuesCardProps) => {
  return (
    <div className={cn("bg-white rounded-none overflow-hidden border shadow-sm transition-all duration-200 p-6", className)}>
         <div className='rounded-full bg-primary w-16 h-16 mx-auto flex items-center justify-center'>
            {icon && <img src={icon} alt={title} className="w-8 h-8 object-contain" />}
         </div>
         <h3 className="text-lg font-semibold text-text-primary mb-2 font-sans leading-7 mt-4">{title}</h3>
         <p className=''>{description}</p>
    </div>)}