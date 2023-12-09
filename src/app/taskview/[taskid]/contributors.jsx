
'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"


function DisplayContributor(con) {

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
    
    }, [supabase]);

    useEffect(() => {
        getContributor(con.profile_id, setcontributor())
      }, [con.profile_id, getContributor])

    return(   
        <div key={con.contribution_id}>
            <div className="text-base font-semibold">
                {contributor}
            </div>
            <Separator className="my-3" />

        </div>
    );

}

export default function Contributors({contributinguser}) {

    const no_list = <div> No Contributors Yet </div>;

    const list = contributinguser.map((data) => DisplayContributor(data));

    
    return (

        <ScrollArea className="h-36 rounded-md border">
            <div className="p-4">
                {contributinguser.length > 0 ? list : no_list}
            </div>
        </ScrollArea>

    );
}