export const queryKeys = {
    notes: ["notes"] as const,
    note: (slug: string) => ["note", slug] as const,
};
