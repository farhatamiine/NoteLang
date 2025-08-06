"use client"

import type React from "react"
import {useRouter} from "next/navigation"
import {AppNavbar} from "@/components/AppNavbar";
import {BottomNavigation} from "@/components/BottomNavigation";
import {usePageTitle} from "@/lib/hooks/usePageTitle";

interface MobileLayoutProps {
    children: React.ReactNode
    navbarProps?: Partial<React.ComponentProps<typeof AppNavbar>>
}

export function MobileLayout({children, navbarProps = {}}: MobileLayoutProps) {
    const router = useRouter()
    const pageConfig = usePageTitle()

    const handleBackClick = () => {
        router.back()
    }

    const handleMenuClick = () => {
        console.log("Menu clicked")
    }

    const handleSearchClick = () => {
        router.push("/search")
    }

    const handleMoreClick = () => {
        console.log("More options clicked")
    }

    const finalNavbarProps = {
        ...pageConfig,
        onBackClick: handleBackClick,
        onMenuClick: handleMenuClick,
        onSearchClick: handleSearchClick,
        onMoreClick: handleMoreClick,
        ...navbarProps,
    }

    return (
        <div className="flex flex-col min-h-svh">
            <AppNavbar {...finalNavbarProps} />
            <div className="flex-grow overflow-y-auto">
                <div className="max-w-md mx-auto">{children}</div>
            </div>
            <BottomNavigation/>
        </div>
    )
}
