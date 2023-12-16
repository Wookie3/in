"use client";

import { useRouter, usePathname } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import MembersList from "./membersList.jsx";
import SubmitProposal from "./submitProposal.jsx";
import RequesCarrots from "./requestCarrots.jsx";
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
import { useCallback, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const CommunityPage = ({ communityData, user, carrotPotData, profile }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const path = usePathname();
  const rabbitholeId = path.split("/")[2];
  const [proposalArray, setProposalArray] = useState([]);
  const [membersArray, setMembersArray] = useState([]);
  // const [displayJoin, setDisplayJoin] = useState(false);
  // const [displayLeave, setDisplayLeave] = useState(false);
  const { toast } = useToast();

  const getProposalData = useCallback(
    async (rabbitholeId) => {
      const { data: proposalData, error: proposalError } = await supabase
        .from("Proposal")
        .select(`*, Profile (username)`)
        .eq("rabbithole_id", rabbitholeId);

      if (proposalError) {
        console.log("Error fetching proposals: ", proposalError);
      }
      if (proposalData != null) {
        return proposalData;
      }
    },
    [supabase]
  );

  const getMembershipData = useCallback(
    async (rabbitholeId, user) => {
      const { data: membersData, error: membersError } = await supabase
        .from("Membership")
        .select(`*, Profile (user_id)`)
        .eq("rabbithole_id", rabbitholeId)
        .eq("Profile.user_id", user.id);
      if (membersError) {
        console.log("Error getting members data:", membersError);
      }
      if (membersData != null) {
        // console.log("membersData:", membersData);
        return membersData;
      }
    },
    [supabase]
  );

  // const joinGroup = useCallback(async (communityData, profile) => {
  const joinGroup = async () => {
    const { error: joinError } = await supabase.from("Membership").insert({
      is_damsire: false,
      rabbithole_id: communityData.rabbithole_id,
      profile_id: profile.profile_id,
    });
    if (joinError) {
      alert(`There has been an error:\n${error.message}`);
    } else {
      toast({
        title: "Welcome!",
        description: "You have joined the community.",
      });
    }
  };
  const leaveGroup = async () => {
    const { error: leaveError } = await supabase
      .from("Membership")
      .delete()
      .eq("profile_id", profile.profile_id)
      .eq("rabbithole_id", communityData.rabbithole_id);
    if (leaveError) {
      console.log("Error leaving group: ", leaveError);
    }
    toast({
      title: "Goodbye!",
      description: "You have left the community.",
    });
  };

  const isMember = () => {
    const members = membersArray.filter((member) => member.Profile !== null);
    if (members[0]) {
      if (members[0].Profile) {
        return true;
      }
    }
    return false;
  };
  const hideJoin = () => {
    if (isMember()) {
      return "hidden";
    }
    return "";
  };
  const hideLeave = () => {
    if (isMember()) {
      return "";
    }
    return "hidden";
  };
  const adminRequestCarrots = (userId) => {
    if (membersArray) {
      // console.log("membersArray page.jsx:", membersArray);
      const members = membersArray.filter(
        (membership) => membership.Profile?.user_id === user.id
      );
      if (members[0]) {
        return members[0].is_damsire ? (
          <RequesCarrots userid={user.id} />
        ) : (
          console.log("not admin(dam/sire)")
        );
      }
    }
  };

  useEffect(() => {
    getProposalData(rabbitholeId).then((proposal) =>
      setProposalArray(proposal)
    );
  }, [rabbitholeId, getProposalData]);

  useEffect(() => {
    getMembershipData(rabbitholeId, user).then((membersData) =>
      setMembersArray(membersData)
    );
  }, [rabbitholeId, user, getMembershipData]);

  return (
    <div className="flex flex-col p-6 gap-y-6">
      <div className="flex justify-center gap-6">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>{communityData?.group_name}</CardTitle>
              <Badge className="px-6 py-2 text-base gap-1 ">
                Carrot Pot: <Carrot className="w-5 h-5 stroke-0.25" />
                {carrotPotData?.balance}
              </Badge>
            </div>
            <CardDescription>{communityData?.description}</CardDescription>
            <Separator />
          </CardHeader>
          <CardContent className={"flex justify-evenly gap-4"}>
            <div className="gap-4 flex justify-between">
              <SubmitProposal profileId={profile.profile_id} />
              {adminRequestCarrots(user.id)}
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
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-around gap-2 sm: flex-col md:flex-col lg:flex-row xl:flex-row">
        <Card>
          <CardHeader>
            <CardTitle>Proposals</CardTitle>
            <CardDescription>
              All current proposals for {communityData?.group_name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={proposalArray} />
          </CardContent>
        </Card>
        <div className="">
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
                <AlertDialogTrigger>
                  <Button className={hideJoin()} variant="outline">
                    Join Community
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      <p>You are about to join this community.</p>
                      <p>You are agreeing to the terms of this community.</p>
                      <p>{communityData?.group_name} has:</p>
                      <p>
                        Prioritization reward:
                        {communityData?.prioritization_reward}
                      </p>
                      <p>
                        Validation reward: {communityData?.validation_reward}
                      </p>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => joinGroup(profile)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <AlertDialog>
                <AlertDialogTrigger>
                  <Button className={hideLeave()} variant="outline">
                    Leave Community
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      <p>You are about to leave this community.</p>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => leaveGroup()}>
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
