import {updateSession} from "@/lib/supabase/middleware";
import {type NextRequest} from "next/server";

export async function middleware(request: NextRequest) {
    return await updateSession(request);
}

export const config = {
    matcher: [
        // Exclude _next, api, manifest, screenshots, sw.js, favicon, and static assets
        '/((?!_next|api|manifest\\.json|screenshots.*|icons.*|sw\\.js|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
    ],
};
