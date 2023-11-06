'use client'
// import styles from './page.module.css'
import { useState } from 'react';
import supabase from './utils/supabaseClient.js';


// Login page for the app, landing page.
const Home = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handelLogin = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
            options: {
                redirectTo: '/dashboard'
            }
        });
        console.log(data);
    };
    const handelLogout = async () => {
        const { error } = await supabase.auth.signOut();
        console.log(error);
    }
    const getSession = async () => {
        const { data, error } = await supabase.auth.getSession()
        return ("Data: ", data, "Error: ", error)
    }
    return (
        <main className='main'>
            <div className='desc'>
                <h1>Login Page</h1>
                <div className='login'>
                    <input name="email" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input name="password"
                        type="text"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => { if (e.key == 'Enter') { handelLogin(email, password) } }}
                    />
                    <button onClick={() => handelLogin(email, password)}>Login</button>
                </div>
                <button onClick={() => handelLogout()}>Logout</button>
            </div>
        </main>
    );
};

export default Home;