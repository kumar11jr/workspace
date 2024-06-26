"use client"

import { Id } from "@/convex/_generated/dataModel"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface MenuProps{
    documentId:Id<"documents">;
}

export const Menu=({documentId}:MenuProps)=>{
    const router = useRouter()
    const {user} = useUser()
    const remove = useMutation(api.document.remove)

    const OnRemove = ()=>{
        const promise = remove({id:documentId}).then(()=>{
            router.push("/dash")
        })

        toast.promise(promise,{
            loading:"Moving to trash...",
            success:"Note moved to trash",
            error:"Note deleted"
        })
        router.push("/dash")
    }

    return(
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button size="sm" variant="ghost">
                    <MoreHorizontal className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60" align="end" alignOffset={8} forceMount>
                <DropdownMenuItem onClick={OnRemove}>
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="test-xs text-muted-foreground p-2">
                    Last edited by: {user?.firstName}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


Menu.Skeleton = function MenuSkeleton(){
    return(
        <Skeleton className="h-10 w-10"/>
    )
}