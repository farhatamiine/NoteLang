"use client"

import { Plus } from "lucide-react"

interface FloatingAddButtonProps {
    onClick?: () => void
}

export default function FloatingAddButton({ onClick }: FloatingAddButtonProps) {
    const handleClick = () => {
        if (onClick) {
            onClick()
        } else {
            // Default action - could open a modal or navigate to add page
            console.log("[v0] Add new note clicked")
        }
    }

    return (
        <button
            onClick={handleClick}
            className="fab" aria-label="Add new note"
        >
            <Plus className="fab-icon" />
        </button>
    )
}
