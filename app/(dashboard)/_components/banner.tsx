"use client"

import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useMutation } from "convex/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"


interface BannerProps{
    documentId: Id<"documents">
}

export const Banner =({
    documentId 
}:BannerProps)=>{
    const router = useRouter()

    const remove = useMutation(api.document.remove)

    const onRemove=()=>{
        const promise = remove({id:documentId})

        toast.promise(promise,{
            loading:"Deleting Note...",
            success:"Note Deleted",
            error:"Failed to delete note",
        })
        router.push("/dash")
    }

    return(
        <div className="w-full bg-red-500 text-center">
        Banner Name
        </div>
    )
}