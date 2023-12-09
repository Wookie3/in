import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request) {
    const requestUrl = new URL(request.url)
    const formData = await request.formData()
    const email = formData.get('email')
    const password = formData.get('password')
    const uname = formData.get('username')
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    console.log(formData)

    await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${requestUrl.origin}/auth/callback`,
        },
    })



    return NextResponse.redirect(requestUrl.origin + '/tasks', {
        status: 301,
    })
}


// await supabase.auth.signUp({
//     email,
//     password,
//     data: {
//         confirmation_sent_at: Date.now(),
//     },
//     options: {
//       emailRedirectTo: `${requestUrl.origin}/auth/callback`,
//     },
//   })