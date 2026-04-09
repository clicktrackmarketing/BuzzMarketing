interface GoldCornerFrameProps {
  children: React.ReactNode;
  className?: string;
}

export function GoldCornerFrame({ children, className = "" }: GoldCornerFrameProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-buzz-gold pointer-events-none z-10" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-buzz-gold pointer-events-none z-10" />
      {children}
    </div>
  );
}
