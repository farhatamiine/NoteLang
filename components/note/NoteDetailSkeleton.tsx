export function NoteDetailSkeleton() {
    return (
        <div className="w-full mx-auto bg-white  border-gray-100 overflow-hidden">
            {/* Header Skeleton */}
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                    <div className="h-6 bg-gray-200 rounded-lg w-24 animate-pulse"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
                <div className="space-y-3">
                    <div className="h-8 bg-gray-200 rounded-lg w-3/4 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded-lg w-1/2 animate-pulse"></div>
                </div>
                <div className="flex items-center gap-4 mt-4">
                    <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="flex gap-2">
                        <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse"></div>
                        <div className="h-6 bg-gray-200 rounded-full w-12 animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Content Skeleton */}
            <div className=" space-y-6">
                {/* Stats Section */}
                <div className="flex justify-between items-center p-4 bg-gray-50">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="h-5 bg-gray-200 rounded w-16 animate-pulse"></div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
                    </div>
                </div>

                {/* Examples Section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                        <div className="h-8 bg-gray-200 rounded-lg w-20 animate-pulse"></div>
                    </div>

                    {/* Example Cards */}
                    {[1].map((index) => (
                        <div key={index} className="border border-gray-200 rounded-xl p-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
                                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                            </div>
                            <div className="flex gap-2">
                                <div className="h-5 bg-gray-200 rounded-full w-16 animate-pulse"></div>
                                <div className="h-5 bg-gray-200 rounded-full w-12 animate-pulse"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
