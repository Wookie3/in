import Link from 'next/link';
import { Button } from "@/components/ui/button"


const Home = () => {
    return (
        <div>
            Home
            <Link href={'/dashboard'}>
                <Button>
                    Dashboard
                </Button>
            </Link>
            <Link href={'/login'}>
                <Button>
                    Login
                </Button>
            </Link>
        </div>
    )
};

// Login page for the app, landing page.
// import { useState } from 'react';
// import supabase from './utils/supabaseClient.js';
// import Link from 'next/link'

// const Home = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const handelLogin = async (email, password) => {
//         const { data, error } = await supabase.auth.signInWithPassword({
//             email: email,
//             password: password,
//             options: {
//                 redirectTo: '/dashboard'
//             }
//         });
//         console.log(data);
//     };
//     const handelLogout = async () => {
//         const { error } = await supabase.auth.signOut();
//         console.log(error)
//         console.log('logged out')
//     }
//     return (
//         <main className='main'>
//             <div className='desc'>
//                 <h1>Login Page</h1>
//                 <div className='login'>
//                     <input name="email" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//                     <input name="password"
//                         type="text"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         onKeyDown={(e) => { if (e.key == 'Enter') { handelLogin(email, password) } }}
//                     />
//                     <button onClick={() => handelLogin(email, password)}>Login</button>
//                     <Link href="/dashboard">Dashboard</Link>
//                 </div>
//                 <button onClick={() => handelLogout()}>Logout</button>
//             </div>
//         </main>
//     );
// };

export default Home;