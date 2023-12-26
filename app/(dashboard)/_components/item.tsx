import { ConfirmModal } from "@/components/modal/confirm-delete";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { ChevronDown, LucideIcon, ChevronRight, Plus, Trash } from "lucide-react";
import { useRouter } from "next/router";
import { eventNames } from "process";
import { toast } from "sonner";
import { DocumentList } from "./documentlist";

interface ItemProps {
  label: string;
  onClick: () => void;
  icon: React.ElementType;
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
}

export const Item = ({
  label,
  onClick,
  icon: Icon,
  id,
  active,
  documentIcon,
  isSearch,
  level = 0,
  onExpand,
  expanded,
}: ItemProps) => {

  // const router = useRouter()
  const create = useMutation(api.document.create)
  const remove = useMutation(api.document.remove)

  const handleExpand = (event:React.MouseEvent<HTMLDivElement,MouseEvent>) => {
    event.stopPropagation()
    onExpand?.()
  }


  const onCreate = (event:React.MouseEvent<HTMLDivElement,MouseEvent>) =>{
    event.stopPropagation()
    if (!id) return
    const promise = create({title:"Untitled",parentDocument:id}).then((documentId)=>{
      if (!expanded) {
        onExpand?.()
      }
      // router.push(`/document/${documentId}`)
    })
    toast.promise(promise,{
      loading:"Creating a new Note...",
      success:"New note created",
      error:"Failed to create a new note"
    })
  }

  const onDelete = (event:React.MouseEvent<HTMLDivElement,MouseEvent>) => {
    event.stopPropagation();

    if (!id) return;

    const promise = remove({ id });
    toast.promise(promise, {
        loading: "Deleting Note...",
        success: "Deleted Successfully",
        error: "Failed to delete"
    });
};



  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  return (
    <div
      onClick={onClick}
      role="button"
      style={{
        paddingLeft: level ? `${level * 12 + 12}` : "12px",
      }}
      className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
        active && "bg-primary/5 text-primary"
      )}
    >
      {!!id && (
        <div
          role="button"
          onClick={handleExpand}
          className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1"
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}
      {documentIcon ? <div>{documentIcon}</div> : <Icon />}
      <span>{label}</span>
      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">CTRL</span>k
        </kbd>
      )}

      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          {/* <ConfirmModal onConfirm={()=>{onDelete(documents._id)}}> */}
          <div role="button" onClick={onDelete} className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:bg-neutral-600">
            <Trash className="h-4 w-4 text-muted-foreground"/>
          </div>
          {/* </ConfirmModal> */}
          <div role="button" onClick={onCreate} className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:bg-neutral-600">
            <Plus className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};
 
Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 25}px` : "12px",
      }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};
