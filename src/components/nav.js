import Link from 'next/link';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Carrot } from 'lucide-react';

const Nav = async () => {
  const supabase = createServerComponentClient({ cookies });
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  const session = sessionData.session;
  const hideIfPublic = session ? "lg:inline-block" : "hidden";
  const inOutButton = (session) => {
    return (session ?
      <form action="/auth/logout" method="post">
        <button type="submit" className="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-400 mr-4">
          Sign Out
        </button>
      </form>
      :
      <Link href='/login'>
        <button href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-400 mr-4">
          Sign In
        </button>
      </Link>
    )
  }

  return (
    <nav className="flex items-center justify-between p-6 w-full bottom-0 bg-gray-700 dark:bg-gray-800 text-gray-100">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        {/* <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="https://media.istockphoto.com/id/484208012/vector/carrot.jpg?s=612x612&w=0&k=20&c=BAtg_jJ0hdoQNoRH8h4C3Vbq0ieIf2oJ2q-tAQQOawc="><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" /></svg> */}
        <Carrot size={34}/>
        <Link href='/'>
          <span className="font-semibold text-xl tracking-tight px-2">Incented Protocol</span>
        </Link>
      </div>
      {/* <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded border-black-400 hover:text-white hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="https://media.istockphoto.com/id/484208012/vector/carrot.jpg?s=612x612&w=0&k=20&c=BAtg_jJ0hdoQNoRH8h4C3Vbq0ieIf2oJ2q-tAQQOawc="><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
        </button>
      </div> */}
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link href='/dashboard'>
            <button href="#responsive-header" className={`block mt-4 ${hideIfPublic} lg:mt-0 hover:text-gray-400 mr-4`}>
              Dashboard
            </button>
          </Link>
          <Link href='/profile'>
            <button href="#responsive-header" className={`block mt-4 ${hideIfPublic} lg:mt-0 hover:text-gray-400 mr-4`}>
              Profile
            </button>
          </Link>
        </div>
      </div>
      {inOutButton(session)}
    </nav>
  )
};
export default Nav;