// Dashboard
import Link from "next/link";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


const Dashboard = async () => {
    const supabase = createServerComponentClient({ cookies });
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Dashboard page here</p>
        </div>
    )
};
export default Dashboard;