"use client"

import type React from "react"
import {ArrowLeft, Menu, MoreVertical, Search} from "lucide-react"
import {Button} from "@/components/ui/button"
import {cn} from "@/lib/utils"

interface AppNavbarProps {
    title?: string
    showBackButton?: boolean
    showMenuButton?: boolean
    showSearchButton?: boolean
    showMoreButton?: boolean
    onBackClick?: () => void
    onMenuClick?: () => void
    onSearchClick?: () => void
    onMoreClick?: () => void
    rightContent?: React.ReactNode
    className?: string
}

export function AppNavbar({
                              title,
                              showBackButton = false,
                              showMenuButton = false,
                              showSearchButton = false,
                              showMoreButton = false,
                              onBackClick,
                              onMenuClick,
                              onSearchClick,
                              onMoreClick,
                              rightContent,
                              className,
                          }: AppNavbarProps) {
    return (
        <header className={cn("sticky top-0 z-40 bg-background border-b", className)}>
            <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
                <div className="flex items-center gap-2 min-w-0">
                    {showBackButton && (
                        <Button variant="ghost" size="sm" onClick={onBackClick} className="h-8 w-8 p-0">
                            <ArrowLeft className="h-4 w-4"/>
                        </Button>
                    )}
                    {showMenuButton && (
                        <Button variant="ghost" size="sm" onClick={onMenuClick} className="h-8 w-8 p-0">
                            <Menu className="h-4 w-4"/>
                        </Button>
                    )}
                </div>

                {title && <h1 className="text-lg font-semibold truncate flex-1 text-center mx-4">{title}</h1>}

                <div className="flex items-center gap-2 min-w-0">
                    {showSearchButton && (
                        <Button variant="ghost" size="sm" onClick={onSearchClick} className="h-8 w-8 p-0">
                            <Search className="h-4 w-4"/>
                        </Button>
                    )}
                    {showMoreButton && (
                        <Button variant="ghost" size="sm" onClick={onMoreClick} className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4"/>
                        </Button>
                    )}
                    {rightContent}
                </div>
            </div>
        </header>
    )
}
