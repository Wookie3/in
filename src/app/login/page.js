import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Login() {
    return (
      <div>
      <form action="/auth/login" method="post">
        <label htmlFor="email">Email</label>
        <input name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        <button>Sign In</button>
        <button formAction="/auth/sign-up">Sign Up</button>
        <button formAction="/auth/logout">Sign Out</button>
      </form>
      </div>
    )
  }
  
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
  