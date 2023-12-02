// import { createClient } from '@supabase/supabase-js';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const getData = async (id) => {
  //     const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  //     const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  //     const supabase = createClient(URL, KEY);
  const supabase = createServerComponentClient({ cookies });
  const { data: proposalData, error: proposalError } = await supabase
    .from('Proposal')
    .select('*')
    .eq('rabbithole_id', id)

  if (proposalError) {
    console.log('Error fetching proposals: ', proposalError);
  }
  // console.log('PROPOSAL DATA:  ', proposalData)
  // proposalData.forEach(
  //   async (proposal) => {
  //     const { data: userData, error: userError } = await supabase
  //       .from("Profile")
  //       .select("*")
  //       .eq("user_id", proposal.user_id)
  //       .single();
  //     if (userError) {
  //       console.log("error getting user data:", userError);
  //     }
  //     proposal.user_id = userData?.username;
  //   }
  // );
  return proposalData;
};
export const getUsername = async (userId) => {
  const { data: userData, error: userError } = await supabase
    .from("profile")
    .select("username")
    .eq("user_id", userId)
    .single();
  if (userError) {
    console.log("error getting user data:", userError);
    return userData;
  }
}
export default getData;