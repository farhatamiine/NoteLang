// lib/mappers/note.ts
import type {Note} from "@/lib/types";

export function toDomainNote(row: any): Note {
    return {
        id: row.id,
        user_id: row.user_id,
        nativeText: row.native_text,
        learningText: row.learning_text,
        pronunciation: row.pronunciation ?? undefined,
        noteType: row.note_type,
        category: row.category,
        tags: row.tags ?? [],
        difficulty: row.difficulty ?? undefined,
        reviewCount: row.review_count ?? 0,
        ease: row.ease ?? undefined,
        lastReviewedAt: row.last_reviewed_at ?? undefined,
        nextReviewAt: row.next_review_at ?? undefined,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        slug: row.slug,
    };
}
