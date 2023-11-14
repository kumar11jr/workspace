import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

export const Logo = () =>{
    return(
        <div className="hidden md:flex items-center gap-x-2" >
            {/* <Image src="/logo.svg" height={40} width={40} alt="logo" /> */}
            <p className="font-semibold">WorkSpace</p>
        </div>
    )
}