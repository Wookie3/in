/* Scrolling list for 'Joint A Rabbit-Hole' Page Component */

import Link from 'next/link'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

function rabbitholeitem(data) {

    const rabbitholeid = data.rabbithole_id;

    return (
        <>
            <Link href={`/profile/${rabbitholeid}`}>
                <Card className="flex justify-between items-center h-16 my-5 p-2 border-none shadow-none hover:bg-orange-50" key={data.rabbithole_id}>
                    <CardHeader className="flex flex-col">
                        <CardTitle className="text-lg" >{data.group_name}</CardTitle>
                        <CardDescription>{data.description}</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Badge> {`${data.Membership[0].count} members`} </Badge>
                    </CardContent>

                </Card>
            </Link>
            <Separator className="my-1" />
        </>
    );
}



export default function Rabbitholelist( {rabbitholedata} ) {


    const datalist = rabbitholedata.map(data => rabbitholeitem(data));
    
    const no_communities = <div> No Rabbit-Holes Yet </div>;

    return(
        <ScrollArea className="h-72 rounded-md border my-5 p-2">

            {rabbitholedata.length > 0 ? datalist : no_communities}
       
        </ScrollArea>
    ); 
}