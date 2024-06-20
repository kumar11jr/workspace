"use client"

import { Spinner } from "@/components/spinner"
import { Button } from "@/components/ui/button"
import { SignInButton } from "@clerk/clerk-react"
import { useConvexAuth } from "convex/react"
import { ArrowRight } from "lucide-react"
import { Island_Moments } from "next/font/google"
import Link from "next/link"

export default function Heading (){
    const {isAuthenticated,isLoading} = useConvexAuth()
    return(
        <div className="max-w-3xl space-y-4" >
            <h1 className="text-3xl sm:text-5xl md:text:6xl font-bold" >Your Ideas,Documents & Plans. Unified. Welcome to  
            <span className="underline">Workspace</span></h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                It is a connected Workspace where <br /> better ,faster work happens.
            </h3><br />
            {isLoading && (
                <Button variant={"default"}>
                    <Spinner/>
                </Button>
            )}
            {isAuthenticated && !isLoading && (
                <>
                    <Link href="/dash">
                    <Button variant={"default"} >
                        
                        Enter WorkSpace
                        <ArrowRight className="w-3 h-3 ml-2" />
                        
                    </Button>
                    </Link>
                    
                </>
            )}
            {!isAuthenticated &&  !isLoading &&(
                <SignInButton>
                    <Button variant={"default"}>
                Join Now
                <ArrowRight className="w-3 h-3 ml-2" />
                </Button>
                </SignInButton>
            )}
        </div>
    )
}