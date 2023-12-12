/* Displays all validators for a contribution */


'use client'


import { ScrollArea } from "@/components/ui/scroll-area"


function DisplayValidator(val) {

    return(   
        <div key={val.validation_id}>
            <div className="text-base font-semibold my-3">
                {val.Profile.username}
            </div>
        </div>
    );

}

export default function Validators({validatingusers}) {

    const no_list = <div> No Validators Yet </div>;

    const list = validatingusers.map((data) => DisplayValidator(data));

    
    return (

        <ScrollArea className="h-36 rounded-md border">
            <div className="p-4">
                {validatingusers.length > 0 ? list : no_list}
            </div>
        </ScrollArea>

    );
}