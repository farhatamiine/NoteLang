export interface Profile {
    id: string;
    firstName: string;
    lastName: string;
    nativeLanguage: string;
    targetLanguage: string;
    createdAt: string;
    updatedAt: string;
    noteCount?: number;
}

export interface ProfileStats {
    noteCount: number;
    totalReviews: number;
    streakDays: number;
    lastActiveAt: string | null;
}

export interface ProfileWithStats extends Profile {
    stats: ProfileStats;
}
