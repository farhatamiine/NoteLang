import {Card, CardContent, CardHeader} from "@/components/ui/card"
import {Skeleton} from "@/components/ui/skeleton"

export function NoteDetailSkeleton() {
    return (
        <div className="min-h-screen bg-background">
            <div className="p-4 space-y-4">
                {/* Main Note Card Skeleton */}
                <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                        <div className="text-center space-y-4">
                            <div className="space-y-2">
                                <Skeleton className="h-10 w-32 mx-auto"/>
                                <Skeleton className="h-8 w-28 mx-auto"/>
                            </div>

                            <div className="flex items-center justify-center gap-3">
                                <Skeleton className="h-6 w-40"/>
                                <Skeleton className="h-12 w-12 rounded-full"/>
                            </div>

                            <div className="flex justify-center">
                                <Skeleton className="h-6 w-20"/>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Stats Skeleton */}
                <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="text-center">
                            <CardContent className="p-4">
                                <Skeleton className="h-8 w-8 mx-auto mb-2"/>
                                <Skeleton className="h-3 w-12 mx-auto"/>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Progress Card Skeleton */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-5 w-5"/>
                            <Skeleton className="h-6 w-32"/>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Skeleton className="h-4 w-20"/>
                                <Skeleton className="h-4 w-8"/>
                            </div>
                            <Skeleton className="h-3 w-full"/>
                        </div>
                    </CardContent>
                </Card>

                {/* Review Schedule Skeleton */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-5 w-5"/>
                            <Skeleton className="h-6 w-28"/>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-3">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Skeleton className="h-4 w-4"/>
                                        <Skeleton className="h-4 w-24"/>
                                    </div>
                                    <Skeleton className="h-4 w-16"/>
                                </div>
                            ))}
                        </div>
                        <Skeleton className="h-12 w-full"/>
                    </CardContent>
                </Card>

                {/* Examples Skeleton */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-5 w-5"/>
                            <Skeleton className="h-6 w-20"/>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[1, 2].map((i) => (
                            <div key={i} className="space-y-3 p-4 bg-muted/30 rounded-lg">
                                <div className="space-y-2">
                                    <Skeleton className="h-5 w-full"/>
                                    <Skeleton className="h-4 w-4/5"/>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Skeleton className="h-4 w-32"/>
                                    <Skeleton className="h-8 w-8"/>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Tags Skeleton */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-5 w-5"/>
                            <Skeleton className="h-6 w-12"/>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {[1, 2, 3].map((i) => (
                                <Skeleton key={i} className="h-6 w-16"/>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Bottom spacing */}
                <div className="h-20"/>
            </div>
        </div>
    )
}
