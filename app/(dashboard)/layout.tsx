"use client"

import { Spinner } from "@/components/spinner"
import { useConvexAuth } from "convex/react"
import { redirect } from "next/navigation"

const DashboardLayout = ({
    children
}:{
    children:React.ReactNode
})=>{
    const {isAuthenticated,isLoading} = useConvexAuth()

    if(isLoading){
        return(
            <div className="h-full flex items-center justify-center">
                <Spinner size={"lg"}/>
            </div>
        )
    }

    if(!isAuthenticated){
        return redirect('/')
    }
    return(
        <div className="h-full flex dark:bg[#1F1F1F]">
            <main>
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout