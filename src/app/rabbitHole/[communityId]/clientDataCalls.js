import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient();

const getProfile = async (userId) => {
    const { data: profileData, error: profileError } = await supabase
      .from("Profile")
      .select("*")
      .eq("user_id", userId)
      .single();
    if (profileError) {
      console.log("Error getting profile data:", profileError);
    }
    return profileData;
  };

const reportProposal = async (proposalId) => {
    const { data: flagData, error: flagError } = await supabase
        .from("Proposal")
        .update({ status: "reported" })
        .eq("id", proposalId);
    if (flagError) {
        console.log("Error reporting proposal[",proposalId, "]: ", flagError)
    }
    return flagData
    }
    export { reportProposal, getProfile };