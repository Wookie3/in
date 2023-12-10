import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const supabase = createServerComponentClient({ cookies });

const getMembership = async (communityId, userId) => {
  const { data: membershipData, error: membershipError } = await supabase
    .from("Membership")
    .select(`*, Profile (user_id)`)
    .eq("rabbithole_id", communityId)
    .eq("profile_id", 2)
  if (membershipError) {
    console.log("Error getting membership data", membershipError);
  }
  return membershipData;
};

const getProposals = async (communityId) => {
    const { data: proposalData, error: proposalError } = await supabase
      .from('Proposal')
      .select(`*, Profile (username)`)
      .eq('rabbithole_id', communityId)

    if (proposalError) {
      console.log('Error fetching proposals: ', proposalError);
    }
    return proposalData;
  }

const getCommunity = async (communityId) => {
  const { data: communityData, error: communityError } = await supabase
    .from("Rabbit-hole")
    .select("*")
    .eq("rabbithole_id", communityId)
    .single();
    if (communityError) {
        console.log('Error getting community data', communityError)
    }
    return communityData
}
const getCarrotPot = async (communityId) => {
  const { data: carrotPotData, error: carrotPotError } = await supabase
    .from("Carrot-Pot")
    .select("*")
    .eq("rabbithole_id", communityId)
    .single();
  if (carrotPotError) {
    console.log("Error getting carrot pot data:", carrotPotError)
  }
    return carrotPotData
}

const getProfile = async (userId) => {
  const { data: profileData, error: profileError } = await supabase
    .from("Profile")
    .select("*")
    .eq("user_id", userId)
    .single();
  if (profileError) {
    console.log("Error getting profile data", profileError);
  }
  return profileData;
};
export { getProposals, getCommunity, getCarrotPot, getMembership, getProfile};

// const { data: profileData, error: profileError } = await supabase
//       .from("Profile")
//       .select(`
//       user_id,
//       Membership (*)`)
//       .eq("user_id", userid)
//     if (profileError) {
//       console.log("Error getting profile data", profileError);
//     }
//     if (profileData) {
//       console.log("profile data:", profileData);
//     }