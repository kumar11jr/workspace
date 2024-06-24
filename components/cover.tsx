"use client"

import { cn } from "@/lib/utils"
import { ImageIcon, X } from "lucide-react"
import Image from "next/image"
import { Button } from "./ui/button"
import { useCoverImage } from "@/hooks/use-cover-image"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useParams } from "next/navigation"
import { Id } from "@/convex/_generated/dataModel"
import { useEdgeStore } from "@/lib/edgestore"
import { Skeleton } from "./ui/skeleton"

interface CoverProps{
    url?:string,
    isPreview?:boolean  
}

export const Cover = ({url,isPreview}:CoverProps) =>{
    const { edgestore } = useEdgeStore();
    const params = useParams()
    const coverImage = useCoverImage();
    const removeImage = useMutation(api.document.removeCoverImage)


    const onremoveImage = async ()=>{
        if(url){
            await edgestore.publicFiles.delete({
                url:url
            })
        }
        removeImage({id:params.documentId as Id<"documents">})
    }

    return(
        <div className={
            cn(
                "relative w-full h-[50vh] group",
                !url && "h-[10vh]",
                url && "bg-muted"
            )
        } >
            
            {!!url && (
                <Image src={url} fill alt="Cover" className="object-cover" />
            )}

            {url && !isPreview && (
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
                    <Button
                        onClick={coverImage.onOpen}
                        className="text-muted-foreground text-xs"
                        variant="outline"
                        size="sm"
                    >
                        <ImageIcon className="h-4 w-4 mr-2"/>
                        Change Cover
                    </Button>
                    <Button
                        onClick={onremoveImage}
                        className="text-muted-foreground text-xs"
                        variant="outline"
                        size="sm"
                    >
                        <X className="h-4 w-4 mr-2"/>
                        Remove Cover
                    </Button>
                </div>
            )}
        </div>
    )
}


Cover.Skeleton = function CoverSkeleton() {
    return (
        <Skeleton className="w-full h-[12vh]" />
    );
}
