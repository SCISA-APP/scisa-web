import { ReactNode } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { cn } from '../../lib/utils';

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  animation?: 'fade-up' | 'fade-left' | 'fade-right' | 'fade-in' | 'scale-up';
  delay?: number;
  className?: string;
  threshold?: number;
}

export const ScrollAnimationWrapper = ({
  children,
  animation = 'fade-up',
  delay = 0,
  className = '',
  threshold = 0.1,
}: ScrollAnimationWrapperProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold });

  const animationClasses = {
    'fade-up': 'translate-y-8 opacity-0',
    'fade-left': 'translate-x-8 opacity-0',
    'fade-right': '-translate-x-8 opacity-0',
    'fade-in': 'opacity-0',
    'scale-up': 'scale-90 opacity-0',
  };

  const activeClasses = 'translate-y-0 translate-x-0 scale-100 opacity-100';

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        isVisible ? activeClasses : animationClasses[animation],
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
