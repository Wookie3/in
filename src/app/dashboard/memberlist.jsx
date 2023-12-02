/* Scrolling list for 'My Communities' Page Component */


import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"


export default function Memberlist( {members} ) {

    const list = members.map((member) => (
        <>
            <div key={member.membership_id} className="text-base font-semibold">
                {member['Rabbit-hole'].group_name}
            </div>
            <Separator className="my-3" />
        </>
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
