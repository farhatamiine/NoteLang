import {Skeleton} from "@/components/ui/skeleton"
import {Card, CardContent} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"

export default function ProfileSkeleton() {
    return (
        <div className="max-w-md mx-auto p-6 space-y-6">
            {/* Avatar and Name Section */}
            <div className="flex flex-col items-center space-y-4">
                <Skeleton className="h-16 w-16 rounded-full"/>
                <Skeleton className="h-6 w-32"/>
            </div>

            <Separator/>

            {/* Language Information */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-24"/>
                    <Skeleton className="h-4 w-16"/>
                </div>
                <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-28"/>
                    <Skeleton className="h-4 w-20"/>
                </div>
            </div>

            <Separator/>

            {/* Notes Section */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-4"/>
                    <Skeleton className="h-4 w-24"/>
                </div>
                <Skeleton className="h-6 w-6"/>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
                <Skeleton className="h-10 flex-1"/>
                <Skeleton className="h-10 flex-1"/>
            </div>

            {/* Settings Section */}
            <Card>
                <CardContent className="p-4 space-y-4">
                    <div className="flex items-center space-x-2">
                        <Skeleton className="h-4 w-4"/>
                        <Skeleton className="h-4 w-16"/>
                    </div>

                    <div className="flex justify-between items-center">
                        <Skeleton className="h-4 w-20"/>
                        <Skeleton className="h-5 w-9 rounded-full"/>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                        <Skeleton className="h-4 w-4"/>
                        <Skeleton className="h-4 w-32"/>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
