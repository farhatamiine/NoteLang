// app/api/profile/route.ts
import {NextResponse} from "next/server";
import {createClient} from "@/lib/supabase/server"; // server-side supabase client

export async function GET() {
    const supabase = await createClient();
    const {
        data: {user},
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json({error: "Not authenticated"}, {status: 401});
    }

    const {data, error} = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (error) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

    return NextResponse.json(data, {status: 200});
}
