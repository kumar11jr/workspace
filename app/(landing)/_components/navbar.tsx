"use client"

import { ModeToggle } from "@/components/toggle-mode"
import { Logo } from "./logo"
import { useConvexAuth } from "convex/react"
import { SignInButton, UserButton } from "@clerk/clerk-react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/spinner"
import Link from "next/link"

export const Navbar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth()
    return (
        <div className="z-50 bg-background fixed top-0 flex items-center w-full p-6">
            <Logo />
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-3">
                {isLoading && (
                    <Spinner />
                )}
                {!isAuthenticated && !isLoading && (
                    <>
                        <SignInButton mode="modal">
                            <Button variant="destructive" size="sm">
                                Log in
                            </Button>
                        </SignInButton>
                        <SignInButton mode="modal">
                            <Button size="sm">
                                Get WorkSpace free
                            </Button>
                        </SignInButton>
                    </>
                )}
                {isAuthenticated && !isLoading && (
                    <>
                        <Button variant="destructive" size="sm" asChild>
                            <Link href="/dash">
                                Enter WorkSpace
                            </Link>
                        </Button>
                        <UserButton
                            afterSignOutUrl="/"
                        />
                    </>
                )}
                <ModeToggle />
            </div>
        </div>
    )
}