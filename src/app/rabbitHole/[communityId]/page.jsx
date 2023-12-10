import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import CommunityPage from "./communityPage.jsx";

const Proposals = async ({ params }) => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }
  // Data fetching:
  const { data: communityData, error: communityError } = await supabase
    .from("Rabbit-hole")
    .select("*")
    .eq("rabbithole_id", params.communityId)
    .single();
  if (communityError) {
    console.log("Error getting community data", communityError);
  }
  const { data: carrotPotData, error: carrotPotError } = await supabase
    .from("Carrot-Pot")
    .select("*")
    .eq("rabbithole_id", params.communityId)
    .single();
  if (carrotPotError) {
    console.log("Error getting carrot pot data:", carrotPotError);
  }
  const { data: profileData, error: profileError } = await supabase
    .from("Profile")
    .select("*")
    .eq("user_id", user.id)
    .single();
  if (profileError) {
    console.log("Error getting profile data", profileError);
  }
  return (
    <div>
      <CommunityPage
        communityData={communityData}
        user={user}
        carrotPotData={carrotPotData}
        profile={profileData}
      />
      <div className="flex items-center flex-col gap-4"></div>
    </div>
  );
};
export default Proposals;