"use client"

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge"
import { useCallback, useEffect, useState } from "react";


export default function MembersList() {
  const supabase = createClientComponentClient();
  const path = usePathname();
  const [members, setMembers] = useState([]);

const getMembershipData = useCallback(async (path) => {
  const { data: membersData, error: membersError } = await supabase
      .from("Membership")
      .select(`*, Profile (username)`)
      .eq("rabbithole_id", path.split("/")[2])
    if (membersError) {
      console.log("Error getting members data:", membersError);
    }
    if (membersData != null) {
      return membersData
  }}, [supabase])

  useEffect(() => {
    getMembershipData(path).then(membersData => setMembers(membersData))
}, [path, getMembershipData])
  const list = members.map((member) => (
    <div key={member.membership_id} className="pt-4 hover:bg-orange-50">
      
      <div className="px-1 text-base font-semibold flex justify-center">
        <Badge className={"px-5 py-1 text-sm"}>{member.Profile.username}</Badge>
      </div>
      <Separator className="mt-4" />
    </div>
  ));
  const noList = <div> No members found.</div>;
  return (
    <ScrollArea className="h-96">
      <div className="p-1">{members.length > 0 ? list : noList}</div>
    </ScrollArea>
  );
}

// 
// "use client";

// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { usePathname } from "next/navigation";
// import { Badge } from "@/components/ui/badge";
// import { useCallback, useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { useToast } from "@/components/ui/use-toast"


// const MembersList = (communityData, profileId) => {
//   const { toast } = useToast()
//   const supabase = createClientComponentClient();
//   const path = usePathname();
//   const [membersArray, setMembers] = useState([]);
//   const isMember = () => {
//     const members = membersArray.filter((member) => member.Profile !== null);
//     if (members[0]) {
//       if (members[0].Profile) {
//         return "hidden";
//       }
//     }
//     return "";
//   };

//   const getMembershipData = useCallback(
//     async (path) => {
//       const { data: membersData, error: membersError } = await supabase
//         .from("Membership")
//         .select(`*, Profile (username)`)
//         .eq("rabbithole_id", path.split("/")[2]);
//       if (membersError) {
//         console.log("Error getting members data:", membersError);
//       }
//       if (membersData != null) {
//         return membersData;
//       }
//     },
//     [supabase]
//   );

//   useEffect(() => {
//     getMembershipData(path).then((membersData) => setMembers(membersData));
//   }, [path, getMembershipData]);

//   const displayMembers = () => {
//   const list = membersArray.map((member) => (
//     <div key={member.membership_id} className="pt-4 hover:bg-orange-50">
//       <div className="px-1 text-base font-semibold flex justify-center">
//         <Badge className={"px-6 py-2 text-base"}>
//           {member.Profile.username}
//         </Badge>
//       </div>
//       <Separator className="mt-4" />
//     </div>
//   ));
//   const noList = <div> No members found.</div>;
//   return (
//     <ScrollArea className="h-96">
//       <div className="p-1">{membersArray.length > 0 ? list : noList}</div>
//     </ScrollArea>
//   );
// };
// const joinGroup = async (profileId) => {
//   const { error: joinError } = await supabase
//     .from("Membership")
//     .insert({
//     is_damsire: false,
//     rabbithole_id: communityData.rabbithole_id,
//     profile_id: profileId,
//   })
//   if (joinError) {
//     console.log("Error joining group: ", joinError);
//     alert(`There has been an error:\n${joinError.message}`);
//   }
//   toast({
//     title: "Welcome!",
//     description: "You are now a member of this community.",
//   })
//   // router.replace(`/rabbitHole/${rabbitholeId}`);
  
// };
// return (
// <Card>
//   <CardHeader>
//     <CardTitle>Members</CardTitle>
//     <CardDescription>Community Members</CardDescription>
//   </CardHeader>
//   <CardContent>
//     <Separator className="mt-4" />
//     {displayMembers()}
//   </CardContent>
//   <CardFooter>
//     <AlertDialog>
//       <AlertDialogTrigger>
//         <Button className={isMember()} variant="outline">
//           Join Community
//         </Button>
//       </AlertDialogTrigger>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//           <AlertDialogDescription>
//             <p>You are about to join this community.</p>
//             <p>You are agreeing to the terms of this community.</p>
//             <p>{communityData?.group_name} has:</p>
//             <p>
//               Prioritization reward:
//               {communityData?.prioritization_reward}
//             </p>
//             <p>Validation reward: {communityData?.validation_reward}</p>
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel>Cancel</AlertDialogCancel>
//           <AlertDialogAction onClick={() => joinGroup(profileId)}>
//             Continue
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   </CardFooter>
// </Card>
// )};
// export default MembersList;