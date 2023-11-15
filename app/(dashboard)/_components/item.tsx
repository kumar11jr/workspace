import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { ChevronDown, LucideIcon, ChevronRight } from 'lucide-react';

interface ItemProps {
  label: string;
  onClick: () => void;
  icon: React.ElementType; // LucideIcon type
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?:()=> void;
}

export const Item = ({ label, onClick, icon: Icon,id,active,documentIcon,isSearch,level=0,onExpand,expanded }: ItemProps) => {
  const ChevronIcon = expanded? ChevronDown : ChevronRight



  return (
    <div
      onClick={onClick}
      role="button"
      style={{
        paddingLeft: level? `${(level * 12)+12}`:"12px"
      }}
      className={cn("group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
      active && "bg-primary/5 text-primary")
    }
    >
      {!!id && (

        <div role='button' onClick={()=>{}} className='h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1'>
        
          <ChevronIcon className='h-4 w-4 shrink-0 text-muted-foreground/50' />
        </div>
      )}
      {documentIcon ? (
        <div>
          {documentIcon}
        </div>
      ):(
      <Icon />
      )}
       <span>{label}</span>
       {isSearch && (
        <kbd>
          <span></span>
        </kbd>
       )}
    </div>
  );
};
