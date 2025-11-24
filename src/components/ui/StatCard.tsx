import { useCountUp } from '../../hooks/useCountUp';

interface StatCardProps {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}

export const StatCard = ({ value, label, suffix = '+', delay = 0 }: StatCardProps) => {
  const { count, ref } = useCountUp(value, 2000, delay);

  return (
    <div ref={ref} className="text-center animate-count-up transform transition-all duration-300 hover:scale-110" style={{ animationDelay: `${delay}ms` }}>
      <div className="text-3xl md:text-4xl font-bold text-white">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm md:text-base text-gray-400 mt-1">{label}</div>
    </div>
  );
};
