"use client";

import { Doc } from "@/convex/_generated/dataModel";

import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import { useOrigin } from "@/hooks/use-origin";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { constants } from "buffer";
import { useState } from "react";
import { set } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Check, Copy, Globe } from "lucide-react";

interface PublishProps {
  initialData: Doc<"documents">;
}

export default function Publish({ initialData }: PublishProps) {
  const origin = useOrigin();
  const update = useMutation(api.document.update);
  const [copied, isCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => {
      setIsSubmitting(false);
    });

    toast.promise(promise, {
      loading: "Publishing...",
      success: "Published",
      error: "Failed to publish",
    });
  };

  const onUnPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => {
      setIsSubmitting(false);
    });

    toast.promise(promise, {
      loading: "UnPublishing...",
      success: "UnPublished",
      error: "Failed to Unpublish",
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    isCopied(true);
    setTimeout(() => {
      isCopied(false);
    }, 2000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost">
          Publish
          {initialData.isPublished && (
            <Globe className="text-red-500 w-4 h-4 ml-2 " />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60" align="end" alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className="space-y-4">
          <div className="flex items-center gap-x-2">
            <Globe className="h-4 w-4 animate-pulse text-sky-500" />
            <p className="text-xs font-medium text-sky-500">
              This note is live on web.
            </p>
          </div>
          <div className="flex items-center">
            <input
              value={url}
              className="h-8 flex-1 truncate rounded-l-md border bg-muted px-2 text-xs"
              disabled
            />
            <Button
              onClick={onCopy}
              disabled={copied}
              className="h-8 rounded-l-none"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Button
            size="sm"
            className="w-full text-xs"
            disabled={isSubmitting}
            onClick={onUnPublish}
          >
            Unpublish
          </Button>
        </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe className="mb-2 h-8 w-8 text-muted-foreground" />
            <p className="mb-2 text-sm font-medium">Publish this note</p>
            <span className="mb-4 text-xs text-muted-foreground">
              Share your work with others.
            </span>
            <Button
              disabled={isSubmitting}
              onClick={onPublish}
              className="w-full text-xs"
              size="sm"
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
