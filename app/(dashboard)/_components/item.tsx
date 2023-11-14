import { LucideIcon } from 'lucide-react';

interface ItemProps {
  label: string;
  onClick: () => void;
  icon: React.ElementType; // LucideIcon type
}

export const Item = ({ label, onClick, icon: Icon }: ItemProps) => {
  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: '12px' }}
      className="group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium"
    >
      <Icon />
       <span>{label}</span>
    </div>
  );
};
