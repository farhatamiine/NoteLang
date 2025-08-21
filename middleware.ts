import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
    matcher: [
        // Skip all internal paths (_next, api, etc.) and PWA files
        '/((?!_next/static|_next/image|api|manifest|sw|workbox|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|json)$).*)',
        // Include API routes if you need auth middleware there
        '/api/(.*)'
    ],
};
