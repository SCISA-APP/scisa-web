import { cn } from '../../lib/utils';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface ExecutiveCardProps {
  image: string;
  name: string;
  title: string;
  department?: string;
  quote?: string;
  linkedin?: string;
  email?: string;
  className?: string;
}

export const ExecutiveCard = ({
  image,
  name,
  title,
  department,
  quote,
  linkedin,
  email,
  className = ''
}: ExecutiveCardProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.12 });

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-sm transform transition duration-700 will-change-transform',
        // initial state
        !isVisible ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0',
        // hover lift
        'hover:-translate-y-2 hover:shadow-lg',
        className
      )}
    >
      <div className="w-44 h-44 rounded-full overflow-hidden mb-4 border-4 border-primary shadow-lg">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col gap-1 mb-2">
        <h3 className="text-base font-semibold text-text-primary font-sans leading-6">{name}</h3>
        <p className="text-sm font-normal text-text-secondary font-sans leading-5">{title}</p>
        {department && (
          <p className="text-xs text-text-secondary/80">{department}</p>
        )}
      </div>

      {quote && (
        <p
          className="text-sm text-text-secondary mb-3 overflow-hidden"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {quote}
        </p>
      )}

      {(linkedin || email) && (
        <div className="flex items-center gap-4 mt-2">
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} LinkedIn`}
              className="text-primary hover:opacity-80"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.79-1.75-1.763 0-.973.784-1.762 1.75-1.762s1.75.789 1.75 1.762c0 .973-.784 1.763-1.75 1.763zm13.5 11.268h-3v-5.604c0-1.337-.027-3.059-1.865-3.059-1.866 0-2.152 1.459-2.152 2.968v5.695h-3v-10h2.879v1.367h.041c.401-.759 1.379-1.56 2.839-1.56 3.038 0 3.6 2.001 3.6 4.6v5.593z" />
              </svg>
            </a>
          )}

          {email && (
            <a
              href={`mailto:${email}`}
              aria-label={`Email ${name}`}
              className="text-text-secondary hover:opacity-80"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 13.065l-11.99-7.407v11.342c0 1.65 1.351 3 3.001 3h17.977c1.65 0 3-1.35 3-3v-11.335l-11.988 7.405zm11.99-9.065h-23.98c-1.104 0-2 .896-2 2v.568l12 7.407 12-7.407v-.568c0-1.104-.896-2-2-2z"/>
              </svg>
            </a>
          )}
        </div>
      )}
    </div>
  );
};