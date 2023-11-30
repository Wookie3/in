import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProposalForm from "./proposalForm";

// Submit a task to the database.

const SubmitProposal = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }
  const { data: rabbitHole, error: rabbitHoleError } = await supabase
    .from("Rabbit-hole")
    .select("*")
    .eq("rabbithole_id", 1)
    .single();
  if (rabbitHoleError) {
    console.log(rabbitHoleError);
  }
  // const { data: taskData, error: taskError} = await supabase
  // .from('Proposal')
  // .select('*')
  // .eq('proposal_id', 1)
  // .single();
  // console.log(taskData);

  return (
    <div>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <ProposalForm user={user} rabbitHole={rabbitHole} />
      </div>
      <h1>Propose a Task to your group to complete.</h1>
    </div>
  );
};
export default SubmitProposal;
