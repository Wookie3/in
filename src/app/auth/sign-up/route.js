import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')
  //const username = formData.get('username')
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  // console.log(formData)

  await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/callbacksignup`,
    },
  })

  return NextResponse.redirect(requestUrl.origin + '/signup/welcome', {
    status: 301,
  })
}


/* export async function POST(request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')
  const username = formData.get('username')
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  const username = formData.get('username')
console.log('username:', username)
  await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,      
      data: {
        username: username,
      },
    },
  })
  // const {
  //     data: { user },
  // } = await supabase.auth.getUser()

  // await supabase
  //   .from('Profile')
  //   .insert({ 
  //     updated_at: new Date().toISOString(),
  //     is_superadmin: false,
  //     is_active: false,
  //     user_id: user.id,
  //     username: username,
  //    })
  // await supabase
  //   .from('Wallet')
  //   .insert({
  //     balance: 0,
  //     user_id: new.id,
  //   })

  return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  })
} */