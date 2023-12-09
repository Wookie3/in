"use client";

import { useRouter, usePathname } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import MembersList from "./membersList.jsx";
import SubmitProposal from "./submitProposal.jsx";
import { Carrot, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import DataTable from "./data-table.jsx";
import { columns } from "./columns.jsx";

const CommunityPage = async ({
  communityData,
  user,
  carrotPotData,
  profile,
}) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const path = usePathname();
  const rabbitholeId = path.split("/")[2];
  const { data: proposalData, error: proposalError } = await supabase
    .from("Proposal")
    .select(`*, Profile (username)`)
    .eq("rabbithole_id", rabbitholeId);

  if (proposalError) {
    console.log("Error fetching proposals: ", proposalError);
  }
  const { data: membersData, error: membersError } = await supabase
    .from("Membership")
    .select(`*, Profile (user_id)`)
    .eq("rabbithole_id", rabbitholeId)
    .eq("Profile.user_id", user.id);
  if (membersError) {
    console.log("Error getting members data:", membersError);
  }
  const isMember = () => {
    const members = membersData.filter((member) => member.Profile !== null);
    console.log('members:', members);
    if (members[0]) {
  if (members[0].Profile) {
    console.log("You are a member of this community");
    return ("hidden")
  }}
  return ("")
};
  const joinGroup = async (profileId) => {
    const { error } = await supabase.from("Membership").insert({
      is_damsire: false,
      rabbithole_id: communityData.rabbithole_id,
      profile_id: profile.profile_id,
    });
    if (error) {
      alert(`There has been an error:\n${error.message}`);
    } else {
      alert("Joined Community");
    }
  };
  return (
    <div >
      <Card className="">
        <CardHeader>
          <CardTitle>{communityData?.group_name}</CardTitle>
          <CardDescription>{communityData?.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Badge className="px-4 py-1">Carrot Pot:  <Carrot className="w-5 h-5 stroke-0.25"/> {carrotPotData?.balance} </Badge>

          <TooltipProvider>
            {/* Refresh Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" onClick={() => router.refresh()}>
                  <RefreshCw />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Refresh Page</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardContent>
        <CardFooter>
          {/* <Button
            variant="outline"
            onClick={() => router.push(pathname + "/submitProposal")}
          >
            Submit a Proposal
          </Button> */}
          <SubmitProposal userId={user.id} />
        </CardFooter>
      </Card>
      <div className="flex ustify-between gap-3">
      
      <Card >
        <CardHeader>
          <CardTitle>Proposals</CardTitle>
          <CardDescription>
            All current proposals for {communityData?.group_name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={proposalData} />
        </CardContent>
      </Card>
      <div className="flex justify-self-end">
      <Card>
        <CardHeader>
          <CardTitle>Members</CardTitle>
          <CardDescription>Community Members</CardDescription>
        </CardHeader>
        <CardContent>
          <Separator className="mt-4" />
          <MembersList />
        </CardContent>
        <CardFooter>
          <AlertDialog>
            <AlertDialogTrigger >
              <Button className={isMember()} variant="outline">Join Community</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  <p>You are about to join this community.</p>
                  <p>You are agreeing to the terms of this community.</p>
                  <p>{communityData?.group_name} has:</p>
                  <p>
                    Prioritization reward:{communityData?.prioritization_reward}
                  </p>
                  <p>Validation reward: {communityData?.validation_reward}</p>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => joinGroup()}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
      </div>
      </div>
    </div>
  );
};
export default CommunityPage;
