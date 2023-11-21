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
            <p>All the Rabbit Holes that you belong to here.</p>
            <Link href="/rabbitHole/42">
                RabbitHole
            </Link>
        </div>
    )
};
export default Dashboard;