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

    return (
        <>
            <Link href="/tasks">
                <Card className="flex justify-between items-center h-16 my-5 p-2 border-none shadow-none hover:bg-orange-50" key={data.Name}>
                    <CardHeader className="flex flex-col">
                        <CardTitle className="text-lg" >{data.Name}</CardTitle>
                        <CardDescription>{data.Descript}</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Badge> {`${data.members} members`} </Badge>
                    </CardContent>

                </Card>
            </Link>
            <Separator className="my-1" />
        </>
    );
}



export default function Rabbitholelist( {testdata} ) {

    const datalist = testdata.map(data => rabbitholeitem(data));
    const no_communities = <div> No Rabbit-Holes Yet </div>;

    return(
        <ScrollArea className="h-72 rounded-md border my-5 p-2">

            {testdata.length > 0 ? datalist : no_communities}
       
        </ScrollArea>
    ); 
}