/* Displays list of validations for a contribution */

'use client'

//import Link from 'next/link'

import { ScrollArea } from "@/components/ui/scroll-area"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"



function DisplayValidations(val) {

    return (
        <AccordionItem value={val.validation_id} key={val.validation_id}>
            <AccordionTrigger>
                <p className="text-base leading-6">
                    {`${val.review}`}
                </p>
            </AccordionTrigger>

            <AccordionContent className="flex justify-between gap-x-6">
                <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                        <p className="text-sm leading-6">
                            <span className="font-semibold">Validator: </span> {`@${val.Profile.username}`}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{`Created: ${val.create_at}`}</p>
                    </div>
                </div>

                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm font-semibold leading-6">{`${val.stake_amount} Carrots`}</p>
                </div>

            </AccordionContent>
        </AccordionItem>
    );

}



export default function Validationlist( {validations}) {

    const list = validations.map((data) => DisplayValidations(data));

    const no_list = <div> No Validations Made Yet </div>;

    return(
        <ScrollArea className="h-80 rounded-md border p-4">

            <Accordion type="single" collapsible className="w-full">
                {validations.length > 0 ? list : no_list}
            </Accordion>

        </ScrollArea>
    );
}