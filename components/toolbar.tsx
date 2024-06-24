"use client";

import { Doc, Id } from "@/convex/_generated/dataModel";
import { IconPicker } from "./icon-picker";
import { Button } from "./ui/button";
import { ImageIcon, Smile, X } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import TextareaAutosize from "react-textarea-autosize"
import { removeIcon } from "@/convex/document";
import { useCoverImage } from "@/hooks/use-cover-image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SingleImageDropzone } from "./single-image-dropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { useParams } from "next/navigation";


interface ToolbarProps {
  initialData: Doc<"documents">;
  preview?: boolean;
}

export const Toolbar = ({ initialData, preview }: ToolbarProps) => {
    const inputRef = useRef<ElementRef<"textarea">>(null);
    const [isEditing,setIsEditing] = useState(false)
    const [value, setvalue] = useState(initialData.title)

    const update = useMutation(api.document.update);
    const removeIcon = useMutation(api.document.removeIcon);
    const coverImage = useCoverImage();

    const params = useParams()
    const [file, setFile] = useState<File>()
    const [isSubmitting, setisSubmitting] = useState(false)
    const { edgestore } = useEdgeStore();

    const onClose = ()=>{
        setFile(undefined)
        setisSubmitting(false)
        coverImage.onClose()
    }
    

    const onChange = async(file?:File) =>{
        if(file){
            setisSubmitting(true)
            setFile(file)
            const res = await edgestore.publicFiles.upload({
                file
            });

            await update({
                id:params.documentId as Id<"documents">,
                coverImage: res.url
            })

            onClose()

        }
    }

    const enableInput = ()=>{
        if(preview) return;

        setIsEditing(true);
        setTimeout(()=>{
            setvalue(initialData.title)
            inputRef.current?.focus()
        },0)
    }

    const disableInput =()=>setIsEditing(false);

    const onInput = (value:string) =>{
        setvalue(value)
        update({
            id: initialData._id,
            title: value || "Untitled"
        })
    }

    const onKeyDown = (event:React.KeyboardEvent<HTMLTextAreaElement>)=>{
        if(event.key === "Enter"){
            event.preventDefault()
            disableInput()
        }
    }

    const onIconSelect = (icon:string)=>{
      update({
        id:initialData._id,
        icon,
      })
    }


    const onremoveIcon = ()=>{
      removeIcon({
        id:initialData._id,
      })
    }

  return (
    <div className="pl-[54px] group relative">
      {!!initialData && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opacity-75 transition">
              {initialData.icon}
            </p>
          </IconPicker>
          <Button
            onClick={onremoveIcon}
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
            variant="outline"
            size="icon"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!!initialData.icon && preview && (
        <p className="text-6xl ">{initialData.icon}</p>
      )}

      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4 ">
        {!initialData.icon && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              className="text-muted-foreground text-xs "
              variant="outline"
              size="sm"
            >
              <Smile className="h-4 w-4 mr-2" />
              Add Icon
            </Button>
          </IconPicker>
        )}

        {!initialData.coverImage && !preview && (
          <Button
            onClick={coverImage.onOpen}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Add Cover Image
          </Button>
        )}
      </div>
      {isEditing && !preview ?(
        <TextareaAutosize 
            ref = {inputRef} 
            onBlur={disableInput}
            onKeyDown={onKeyDown}
            value={value}
            onChange={(e) => onInput(e.target.value)}
            className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none" 
        />
      ):(
        <div onClick={enableInput} className="pb-[11.5px] text-5xl">
          {initialData.title}
        </div>
      )}
      

      <div>
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
            <DialogContent>
                <DialogHeader>
                    <h2 className="text-center text-lg font-semibold">Cover Image</h2>
                </DialogHeader>
                <SingleImageDropzone
                    className="w-full outline-none"
                    disabled={isSubmitting}
                    onChange={onChange}
                    value={file}
                />

            </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
