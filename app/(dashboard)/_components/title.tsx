"use client" 

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

    const onchange = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setTitle(event.target.value)
        update({
            id:initialData._id,
            title:event.target.value || "Untitled"
        });
    };

return(
    <div className="flex items-center gap-x-1">
        {!!initialData.icon && <p>{initialData.icon}</p>}
        {}
    </div>
)
}
