"use client"

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {BookOpen, Globe, Palette, Plus} from "lucide-react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {useEffect, useState} from "react";
import {useVaultStore} from "@/lib/stores/use-vault-store";
import {useAuthStore} from "@/lib/stores/use-auth-store";
import {useRouter} from "next/navigation";
import {useCreateVault, useGetVaultByUserId} from "@/lib/queries/vault";
import {toast} from "sonner";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";


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
    const user = useAuthStore((s) => s.user)!;
    const { vaults, setVaults } = useVaultStore();
    const { data: queryVault, isLoading, error } = useGetVaultByUserId(user.id);
    const { mutate: createVault, isPending } = useCreateVault();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [name, setName] = useState("");
    const [nativeLanguage, setNativeLanguage] = useState("");
    const [targetLanguage, setTargetLanguage] = useState("");
    const [icon, setIcon] = useState("book-open");
    const [color, setColor] = useState("blue");


    useEffect(() => {
        if (queryVault) setVaults(queryVault);
    }, [queryVault, setVaults]);


    const handleCreateVault = () => {
        if (!user) return;

        createVault(
            {
                userId: user.id,
                name: name.trim(),
                nativeLanguage,
                targetLanguage,
                icon,
                color,
            },
            {
                onSuccess: (created) => {
                    setVaults([...(vaults || []), created]);
                    toast.success("Vault created!");
                    setIsDialogOpen(false);
                    setName("");
                    setNativeLanguage("");
                    setTargetLanguage("");
                },
                onError: (err) => {
                    toast.error(err.message);
                },
            }
        );
    };

    const getIconComponent = (iconName: string) => {
        return ICON_OPTIONS.find((o) => o.value === iconName)?.icon || BookOpen;
    };

    const getColorClass = (colorName: string) => {
        return COLOR_OPTIONS.find((o) => o.value === colorName)?.color || "bg-blue-500";
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="min-h-screen bg-background p-4 w-full">
            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">My Vaults</h1>
                    <p className="text-muted-foreground">Organize your language learning journey</p>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            New Vault
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Create New Vault</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Vault Name" />
                            <Input value={nativeLanguage} onChange={(e) => setNativeLanguage(e.target.value)} placeholder="Native Language" />
                            <Input value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)} placeholder="Target Language" />
                            <div className={"grid grid-cols-2 gap-4"}>
                                <Select value={icon} onValueChange={setIcon}>
                                    <SelectTrigger className={"w-full"}>
                                        <SelectValue placeholder="Select Icon" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ICON_OPTIONS.map((opt) => (
                                            <SelectItem key={opt.value} value={opt.value}>
                                                <div className="flex items-center gap-2">
                                                    <opt.icon className="w-4 h-4" />
                                                    {opt.label}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select value={color} onValueChange={setColor} >
                                    <SelectTrigger className={"w-full"}>
                                        <SelectValue  placeholder="Select Color" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {COLOR_OPTIONS.map((opt) => (
                                            <SelectItem key={opt.value} value={opt.value}>
                                                <div className="flex items-center gap-2">
                                                    <div className={`h-4 w-4 rounded-full ${opt.color}`} />
                                                    {opt.label}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleCreateVault} disabled={isPending}>
                                {isPending ? "Creating..." : "Create Vault"}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Vaults Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {vaults?.map((vault) => {
                    const IconComponent = getIconComponent(vault.icon!);
                    const colorClass = getColorClass(vault.color!);

                    return (
                        <Card key={vault.id} className="group cursor-pointer transition-all hover:shadow-md hover:-translate-y-1">
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-3">
                                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colorClass}`}>
                                        <IconComponent className="h-5 w-5 text-white" />
                                    </div>
                                    <CardTitle className="text-lg font-semibold">{vault.name}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <div className="flex items-center justify-between">
                                        <span>Target:</span>
                                        <span className="font-medium text-foreground">{vault.targetLanguage}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Native:</span>
                                        <span className="font-medium text-foreground">{vault.nativeLanguage}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {vaults?.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-muted p-6 mb-4">
                        <BookOpen className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No vaults yet</h3>
                    <p className="text-muted-foreground mb-4">
                        Create your first vault to start organizing your language learning
                    </p>
                    <Button onClick={() => setIsDialogOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Your First Vault
                    </Button>
                </div>
            )}
        </div>
    );
}
