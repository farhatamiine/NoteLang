"use client"

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {BookOpen, Globe, Palette, Plus} from "lucide-react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {useState} from "react";
import {Vault} from "@/lib/types/vault.types";


const ICON_OPTIONS = [
    {value: "book-open", label: "Book", icon: BookOpen},
    {value: "globe", label: "Globe", icon: Globe},
    {value: "palette", label: "Palette", icon: Palette},
]

const COLOR_OPTIONS = [
    {value: "blue", label: "Blue", color: "bg-blue-500"},
    {value: "green", label: "Green", color: "bg-green-500"},
    {value: "purple", label: "Purple", color: "bg-purple-500"},
    {value: "orange", label: "Orange", color: "bg-orange-500"},
    {value: "pink", label: "Pink", color: "bg-pink-500"},
    {value: "teal", label: "Teal", color: "bg-teal-500"},
]


export default function VaultPage() {
    const [vaults, setVaults] = useState<Vault[]>([
        {
            id: "1",
            name: "Spanish Basics",
            target_language: "Spanish",
            native_language: "English",
            icon: "book-open",
            color: "blue",
        },
        {
            id: "2",
            name: "French Vocabulary",
            target_language: "French",
            native_language: "English",
            icon: "globe",
            color: "green",
        },
        {
            id: "3",
            name: "German Grammar",
            target_language: "German",
            native_language: "English",
            icon: "palette",
            color: "purple",
        },
    ])
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const handleCreateVault = () => {
        console.log("Create Vault")
    }


    const getIconComponent = (iconName: string) => {
        const iconOption = ICON_OPTIONS.find((option) => option.value === iconName)
        return iconOption ? iconOption.icon : BookOpen
    }

    const getColorClass = (colorName: string) => {
        const colorOption = COLOR_OPTIONS.find((option) => option.value === colorName)
        return colorOption ? colorOption.color : "bg-blue-500"
    }
    return (
        <div className="min-h-screen bg-background p-4 w-full">
            <div className="">
                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">My Vaults</h1>
                        <p className="text-muted-foreground">Organize your language learning journey</p>
                    </div>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="flex items-center gap-2">
                                <Plus className="h-4 w-4"/>
                                New Vault
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Create New Vault</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">

                            </div>

                            <div className="flex justify-end gap-2">
                                <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={handleCreateVault}>Create Vault</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Vaults Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {vaults.map((vault) => {
                        const IconComponent = getIconComponent(vault.icon)
                        const colorClass = getColorClass(vault.color)

                        return (
                            <Card key={vault.id}
                                  className="group cursor-pointer transition-all hover:shadow-md hover:-translate-y-1">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`flex h-10 w-10 items-center justify-center rounded-lg ${colorClass}`}>
                                            <IconComponent className="h-5 w-5 text-white"/>
                                        </div>
                                        <CardTitle className="text-lg font-semibold">{vault.name}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="space-y-2 text-sm text-muted-foreground">
                                        <div className="flex items-center justify-between">
                                            <span>Target:</span>
                                            <span className="font-medium text-foreground">{vault.target_language}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Native:</span>
                                            <span className="font-medium text-foreground">{vault.native_language}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                {vaults.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="rounded-full bg-muted p-6 mb-4">
                            <BookOpen className="h-8 w-8 text-muted-foreground"/>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">No vaults yet</h3>
                        <p className="text-muted-foreground mb-4">
                            Create your first vault to start organizing your language learning
                        </p>
                        <Button onClick={() => setIsDialogOpen(true)}>
                            <Plus className="h-4 w-4 mr-2"/>
                            Create Your First Vault
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
