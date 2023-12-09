/* Scrolling Area for 'Contribution List' Page Component */

'use client'

import Link from 'next/link'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"



function displayContribution(con) {

    const supabase = createClientComponentClient();

    const [contributor, setcontributor] = useState(null);

    const getContributor = useCallback(async (profileid) => {

        const { data: contributorData, error: contributorError } = await supabase
        .from('Profile')
        .select('username')
        .eq('profile_id', profileid)
        .single()
    
        if (contributorError) {
            console.error(contributorError)
        }
    
        setcontributor(contributorData.username);
    
    }, []);

    useEffect(() => {
        getContributor(con.profile_id, setcontributor())
      }, [con.profile_id, getContributor])

    return (
        <AccordionItem value={con.contribution_id} key={con.contribution_id}>
            <AccordionTrigger>{con.title}</AccordionTrigger>
            <AccordionContent className="flex justify-between gap-x-6">
                <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6">{`Contribution ID-${con.contribution_id}`}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{`Contributor: @${contributor}`}</p>
                    </div>
                </div>

                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6">{`${con.Validation[0].count} Validators`}</p>

                    <p className="mt-1 text-xs leading-5 text-gray-500"> {`Created: ${con.create_at}`} </p>

                </div>

                <Link href={`/contributionview/${con.contribution_id}`}>
                    <Button>View</Button>
                </Link>

            </AccordionContent>
        </AccordionItem>
    );

}



export default function Contributionlist( {contributions}) {

    const list = contributions.map((data) => displayContribution(data));

    const no_list = <div> No Contributions Made Yet </div>;

    return(
        <ScrollArea className="h-80 rounded-md border p-4">

            <Accordion type="single" collapsible className="w-full">
                {contributions.length > 0 ? list : no_list}
            </Accordion>

        </ScrollArea>
    );
}


{/* <AccordionItem value="item-1">
<AccordionTrigger>Contribution Title</AccordionTrigger>
<AccordionContent className="flex justify-between gap-x-6">
    <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6">Contribution ID</p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">Contributor: Username</p>
        </div>
    </div>

    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6">3 Validators</p>

        <p className="mt-1 text-xs leading-5 text-gray-500"> Created: fdsafdsafdas </p>

    </div>

    <Button>View</Button>
</AccordionContent>
</AccordionItem> */}


{/* <AccordionContent className="flex flex-row justify-between items-center">
<div className="flex flex-row">
    <div className="flex">
        <span> Contribution ID: </span>
        <span> Username: </span>
    </div>

    <div>Validators: </div>
</div>

<Button>View</Button>
</AccordionContent> */}