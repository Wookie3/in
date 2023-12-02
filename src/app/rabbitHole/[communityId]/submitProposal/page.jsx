import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProposalForm from "./proposalForm";
import Link from "next/link";


const SubmitProposal = async ({ params }) => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }
  
  const rabbitHoleId = params.communityId;
  const link = `/rabbitHole/${rabbitHoleId}`;
  const { data: rabbitHoleData, error: rabbitHoleError } = await supabase
    .from("Rabbit-hole")
    .select("group_name")
    .eq("rabbithole_id", rabbitHoleId)
    .single();
  if (rabbitHoleError) {
    console.log('Error fetching eata:',rabbitHoleError);
  }
  const communityTitle = rabbitHoleData.group_name;
  return (
    <div className="flex flex-col items-center">
      <p>Propose a Task for the {communityTitle} community to complete.</p>
      <Link href={link}>Back to community</Link>
      <div>
        <ProposalForm user={user} rabbitHoleId={rabbitHoleId} />
      </div>
    </div>
  );
};
export default SubmitProposal;
