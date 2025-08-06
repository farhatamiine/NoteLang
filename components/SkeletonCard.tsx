import {Skeleton} from "@/components/ui/skeleton";

export function SkeletonCard() {
    return (
        <div className="container p-3 w-full">
            <div className="mb-8">
                <div className="flex flex-col space-y-3" data-testid="skeleton-card">
                    <Skeleton className="h-[125px] w-full rounded-xl"/>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full"/>
                        <Skeleton className="h-4 w-4/5"/>
                    </div>
                </div>
            </div>
        </div>
    );
}
