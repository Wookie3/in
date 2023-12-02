import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const Nav = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const text = user ? "Sign Out" : "Sign In";

  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="https://media.istockphoto.com/id/484208012/vector/carrot.jpg?s=612x612&w=0&k=20&c=BAtg_jJ0hdoQNoRH8h4C3Vbq0ieIf2oJ2q-tAQQOawc="><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" /></svg>
        <span className="font-semibold text-xl tracking-tight">Incented Protocol</span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="https://media.istockphoto.com/id/484208012/vector/carrot.jpg?s=612x612&w=0&k=20&c=BAtg_jJ0hdoQNoRH8h4C3Vbq0ieIf2oJ2q-tAQQOawc="><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link href='/'>
            <button href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              Home
            </button>
          </Link>


          <Link href='/dashboard'>
            <button href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              Dashboard
            </button>
          </Link>

          <Link href='/login'>
            <button href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              Login
            </button>
          </Link>


          <Link href='/profile'>
            <button href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              Profile
            </button>
          </Link>

        </div>

      </div>
      <form action="/auth/logout" method="post">
        <button type="submit" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          {text}
        </button>
      </form>
    </nav>
  )
};
export default Nav;

// <nav>
//     <Link href='/'>
//         <Button>
//             Home
//         </Button>
//     </Link>
//     <Link href='/dashboard'>
//         <Button>
//             Dashboard
//         </Button>
//     </Link>
//     <Link href='/login'>
//         <Button>
//             Login
//         </Button>
//     </Link>
//     <Link href='/profile'>
//         <Button>
//             Profile
//         </Button>
//     </Link>
//     <form action="/auth/logout" method="post">
//         <Button type="submit">
//             Sign Out
//         </Button>
//     </form>
// </nav>