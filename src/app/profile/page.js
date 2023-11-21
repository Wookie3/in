import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ProfilePage from '@/components/pages/profile.js';


const Profile = async () => {
    const supabase = createServerComponentClient({ cookies });
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }
    const { data: profileData, error: profileError} = await supabase
        .from('Profile')
        .select('*')
        .eq('user_id', user.id)
        .single();

    if (profileError) {
        console.error('Error fetching profile:', profileError);
    }

    const { data: walletData, error: walletError } = await supabase
        .from('Wallet')
        .select('balance')
        .eq('wallet_id', profileData.wallet_id)
        .single();

    if (walletError) {
        console.error('Error fetching wallet:', walletError);
    }
    const walletTotal = walletData ? walletData.balance : 0;
    return (
        <div>
            <ProfilePage profileData={profileData} walletData={walletData} />
        </div>
    );
};
export default Profile;