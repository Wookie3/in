import Link from 'next/link';

export default function Login() {
    return (
      <div className="flex items-center justify-center h-screen">
      
  <form action="/auth/login" method="post" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
  <h1 className="text-2xl font-bold mb-4">Login</h1>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
        Email
      </label>
      <input
        className="border border-black w-full py-2 px-3 leading-tight focus:outline-none focus:border-teal-500"
        name="email"
        type="text"
        placeholder="Email"
      />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Password
      </label>
      <input
        className="border border-black w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:border-teal-500"
        name="password"
        type="password"
        placeholder="Password"
      />
    </div>
    <div className="flex items-center justify-between">
      <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded" type="submit">
        Sign In
      </button>
      <Link href='/signup'>
      <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
        Sign Up
      </button>
      </Link>
      <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded" formAction="/auth/logout" type="submit">
        Sign Out
      </button>
    </div>
  </form>
</div>
      // <div>
      // <form action="/auth/login" method="post">
      //   <label htmlFor="email">Email</label>
      //   <input name="email" />
      //   <label htmlFor="password">Password</label>
      //   <input type="password" name="password" />
      //   <button>Sign In</button>
      //   <button formAction="/auth/sign-up">Sign Up</button>
      //   <button formAction="/auth/logout">Sign Out</button>
      // </form>
      // </div>
    )
  }
  



  // OLD LOGIN FORM
  // const LoginForm = () => {
  //   return (
  //     <form action="/auth/login" method="post" className="flex w-full max-w-sm items-center space-x-2">
  //       <Input type="email" placeholder="Email" />
  //       <Input type="password" placeholder="Password" />
  //       <Button type="submit">Sign In</Button>
  //       <Button formAction="/auth/sign-up" type="submit">Sign Up</Button>
  //       <Button  formAction="/auth/logout" type="submit" >Sign Out</Button>
  //     </form>
  //   )
  // }
  