"use client"

import {usePathname} from "next/navigation"

interface PageConfig {
    title: string
    showBackButton?: boolean
    showSearchButton?: boolean
    showMoreButton?: boolean
    showMenuButton?: boolean
}

type RoutePattern = {
    pattern: RegExp
    config: PageConfig
}

const dynamicRouteConfigs: RoutePattern[] = [
    {
        pattern: /^\/$/,
        config: {
            title: "Home",
            showMenuButton: true,
            showSearchButton: true,
        }
    },
    {
        pattern: /^\/notebook$/,
        config: {
            title: "Notebook",
            showBackButton: false,
            showMoreButton: false,
        }
    },
    {
        pattern: /^\/review$/,
        config: {
            title: "Review",
            showSearchButton: false,
            showMoreButton: false,
        }
    },
    {
        pattern: /^\/profile$/,
        config: {
            title: "Profile",
            showMoreButton: false,
        }
    },
    {
        pattern: /^\/notes$/,
        config: {
            title: "My Notes",
            showSearchButton: true,
            showMoreButton: true,
        }
    },
    {
        pattern: /^\/notes\/editor\/create$/,
        config: {
            title: "Add new Note",
            showBackButton: true,
        }
    },
    {
        pattern: /^\/notes\/editor\/update$/,
        config: {
            title: "Edit my Note",
            showBackButton: true,
        }
    },
    {
        pattern: /^\/notes\/[^/]+$/,
        config: {
            title: "Note Details",
            showBackButton: true,
        }
    }
]

export function usePageTitle() {
    const pathname = usePathname()

    const matchedRoute = dynamicRouteConfigs.find(route =>
        route.pattern.test(pathname)
    )

    return matchedRoute?.config || {
        title: "App",
        showBackButton: true,
    }
}