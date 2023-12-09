"use client"

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge"


export default async function MembersList() {
  const supabase = createClientComponentClient();
  const path = usePathname();
  const { data: membersData, error: membersError } = await supabase
      .from("Membership")
      .select(`*, Profile (username)`)
      .eq("rabbithole_id", path.split("/")[2])
    if (membersError) {
      console.log("Error getting members data:", membersError);
    }
  const list = membersData.map((member) => (
    <div key={member.membership_id} className="pt-4 hover:bg-orange-50">
      
      <div className="px-1 text-base font-semibold flex justify-center">
        <Badge>{member.Profile.username}</Badge>
      </div>
      <Separator className="mt-4" />
    </div>
  ));
  const noList = <div> No members found.</div>;
  return (
    <ScrollArea className="h-96">
      <div className="p-1">{membersData.length > 0 ? list : noList}</div>
    </ScrollArea>
  );
}
