import { Button } from "@/components/ui/button"
import { Logo } from "./logo"

export const Footer = () =>{
    return(
        <div className="flex items-center w-full bg-background z-50" >
            <Logo />
            <div className="md:ml-auto w-full gap-x-2 justify-between md:justify-end flex items-center ">
                <Button size="sm">
                    Privacy Policy
                </Button>
                <Button size="sm">
                    Terms & Conditions
                </Button>
            </div>
        </div>
    )
}