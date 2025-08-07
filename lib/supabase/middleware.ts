import {createServerClient} from "@supabase/ssr";
import {type NextRequest, NextResponse} from "next/server";
import {hasEnvVars} from "../utils";

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    });

    if (!hasEnvVars) {
        return supabaseResponse;
    }

    // With Fluid compute, don't put this client in a global environment
    // variable. Always create a new one on each request.
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({name, value}) =>
                        request.cookies.set(name, value),
                    );
                    supabaseResponse = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({name, value, options}) =>
                        supabaseResponse.cookies.set(name, value, options),
                    );
                },
            },
        },
    );

    const {data} = await supabase.auth.getClaims();
    const user = data?.claims;

    const PUBLIC_PATHS = ['/login', '/auth'] as const;
    const LOGIN_REDIRECT_PATH = '/auth/login' as const;

    function requiresAuthentication(pathname: string, user: unknown): boolean {
        const isPublicPath = PUBLIC_PATHS.some(path =>
            pathname.startsWith(path)
        );

        return !user && !isPublicPath;
    }


    if (requiresAuthentication(request.nextUrl.pathname, user)) {
        const url = request.nextUrl.clone();
        url.pathname = LOGIN_REDIRECT_PATH;
        return NextResponse.redirect(url);
    }


    return supabaseResponse;
}
