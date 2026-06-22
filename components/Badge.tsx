type BadgeProps = {
  text: string;
  variant?: 'popular' | 'bestSeller' | 'discount6Meses';
  className?: string;
};

export default function Badge({ text, variant = 'popular', className = '' }: BadgeProps) {
  const base =
    'px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full whitespace-nowrap';

  const styles = {
    popular: 'text-purple-950 bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.6)]',
    bestSeller: 'text-orange-950 bg-gradient-to-r from-orange-600 via-orange-500 to-pink-500 shadow-[0_0_20px_rgba(239,68,68,0.6)]',
    discount6Meses: 'text-red-950 bg-gradient-to-r from-red-600 via-red-500 to-red-600 shadow-[0_0_20px_rgba(239,68,68,0.6)]',
  };

  return (
    <span className={`${base} ${styles[variant]} ${className}`}>
      {text}
    </span>
  );
}
