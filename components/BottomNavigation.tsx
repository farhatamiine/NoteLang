"use client"

import {usePathname, useRouter} from "next/navigation"
import {BookOpen, Brain, Home, User} from "lucide-react"
import {cn} from "@/lib/utils"
import {ComponentType} from "react";
import Link from "next/link";

interface NavItem {
    id: string
    label: string
    icon: ComponentType<{ className?: string }>
    href: string
}

const navItems: NavItem[] = [
    {
        id: "home",
        label: "Home",
        icon: Home,
        href: "/",
    },
    {
        id: "notebook",
        label: "Notebook",
        icon: BookOpen,
        href: "/notebook",
    },
    {
        id: "review",
        label: "Review",
        icon: Brain,
        href: "/review",
    },
    {
        id: "profile",
        label: "Profile",
        icon: User,
        href: "/profile",
    },
]

export function BottomNavigation() {
    const router = useRouter()
    const pathname = usePathname()

    const handleNavigation = (href: string, targetIndex: number) => {
        const currentIndex = navItems.findIndex((item) => item.href === pathname)
        const direction = targetIndex > currentIndex ? "left" : "right"

        sessionStorage.setItem("transitionDirection", direction)
        router.push(href)
    }

    return (
        <>
            {navItems.map((item) => (
                <Link
                    key={`prefetch-${item.id}`}
                    href={item.href}
                    prefetch
                    className="hidden"
                    aria-hidden="true"
                />
            ))}
            <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
                <div className="flex items-center justify-around px-2 py-2 max-w-md mx-auto">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href || (item.href === "/notes" && pathname.startsWith("/notes"))

                        return (
                            <button
                                key={item.id}
                                onClick={() =>
                                    handleNavigation(
                                        item.href,
                                        navItems.findIndex((nav) => nav.id === item.id),
                                    )
                                }
                                className={cn(
                                    "flex flex-col items-center justify-center min-w-0 flex-1 px-2 py-2 rounded-lg",
                                    isActive && "text-primary",
                                )}
                            >
                                <Icon className={cn("h-5 w-5 mb-1", isActive && "scale-110")}/>
                                <span
                                    className={cn("text-xs font-medium", isActive ? "text-primary" : "text-muted-foreground")}>
                {item.label}
              </span>
                            </button>
                        )
                    })}
                </div>
            </nav>
        </>
    )
}
