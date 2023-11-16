"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"


export const DocumentList = ()=>{
    const params = useParams()
    const router = useRouter()
    const [expanded, setexpanded] = useState({})

    return(
        <div>
            Document List
        </div>
    )
}