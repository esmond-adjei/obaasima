import { cn } from '@/lib/utils';

export default function CardFrame({ children, className='', ...props }) {
  return (
    <div className={
      cn(
        `bg-white max-w-7xl mx-auto p-4 lg:p-6 rounded-lg shadow-xl overflow-hidden *:rounded`, 
        className
      )
    }
    {...props}
    >
      {children}
    </div>
  );
}