'use client'

interface NavbarProps{
    isCollapsed: boolean;
    onresetwidth:()=>void
}

export const Navbar =({
    isCollapsed,onresetwidth
}:NavbarProps)=>{
    return(
        <>
            Navbar!
        </>
    )
}