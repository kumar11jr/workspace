"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Heading (){
    return(
        <div className="max-w-3xl space-y-4" >
            <h1 className="text-3xl sm:text-5xl md:text:6xl font-bold" >Your Ideas,Documents & Plans. Unified. Welcome to
            <span className="underline">Workspace</span></h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                It is a connected Workspace where <br /> better ,faster work happens.
            </h3>
            <Button variant={"default"}>
                Join Now
                <ArrowRight className="w-3 h-3 ml-2" />
            </Button>
        </div>
    )
}