/* Scrolling list for 'My Communities' Page Component */

import Link from 'next/link'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"


export default function Memberlist( {members} ) {
    console.log(members);

    const list = members.map((member) => (
        <div key={member.membership_id} >
            <div className="text-base font-semibold">
                <Link href={`/rabbitHole/${member['Rabbit-hole'].rabbithole_id}`}>{member['Rabbit-hole'].group_name} </Link>
            </div>
            <Separator className="my-3" />
        </div>
    ));

    const no_list = <div> No Memberships </div>;

    
    return (

        <ScrollArea className="h-36 rounded-md border">
            <div className="p-4">
                {members.length > 0 ? list : no_list}
            </div>
        </ScrollArea>

    );
}
