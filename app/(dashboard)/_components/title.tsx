"use client" 


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { Doc } from "@/convex/_generated/dataModel"
import { useMutation } from "convex/react"
import { useRef, useState } from "react"

interface TitleProps {
    initialData : Doc<"documents">
};

export const Title =({initialData}:TitleProps)=>{
    const inputRef = useRef<HTMLInputElement>(null)
    const update = useMutation(api.document.update)
    const [title,setTitle] = useState(initialData.title || "Untitled")
    const [Editing, setEditing] = useState(false)

    const enableInput = () =>{
        setTitle(initialData.title)
        setEditing(true)
        setTimeout(()=>{
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(0,inputRef.current.value.length)
        },0)
    }

    const disableInput = () =>{
        setEditing(false)
    }

    const onChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setTitle(event.target.value)
        update({
            id:initialData._id,
            title:event.target.value || "Untitled"
        });
    };

    const onkeyDown = (
        event:React.KeyboardEvent<HTMLInputElement>
    )=>{
        if(event.key === "Enter"){
            disableInput()
        }
    }

return(
    <div className="flex items-center gap-x-1">
        {!!initialData.icon && <p>{initialData.icon}</p>}
        {Editing ? (
            <Input
            ref={inputRef}
            onClick={enableInput}
            onBlur={disableInput}
            onKeyDown={onkeyDown}
            value={title}
            onChange={onChange}
            className="h-7 px-2 focus-visible:ring-transparent"/>
        ):(
            <Button
            onClick={enableInput}
            variant="ghost"
            size="sm"
            className="font-normal"
            >
                {initialData?.title}
            </Button>
        )}
    </div>
)
}

Title.Skeleton = function TitleSkeleton(){
    return(
        <Skeleton className="h-9 w-17 rounded-md" />
    )
}