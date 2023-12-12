

import Link from "next/link";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server'

import React from 'react';
//import { useRouter } from 'next/navigation';

import Contributionform from './contributionform.jsx'

const getProfile = async (user, supabase) => {
    const { data: profileData, error: profileError } = await supabase
    .from('Profile')
    .select(`profile_id, username`)
    .eq('user_id', user.id)
    .single()

    if (profileError) {
        //console.error(profileError)
        throw profileError;
    }

    return profileData;
}


const getProposal = async (supabase, task_id) => {

    const { data: proposal, error: proposalError } = await supabase
        .from('Proposal')
        .select(`proposal_id, create_at, update_at, description, deadline, rewards, title, effort, status, profile_id`)
        .eq('proposal_id', task_id)
        .single()

    if (proposalError) {
        console.error(proposalError);
        throw proposalError
    }

    if (proposal != null || proposal != undefined) {
        return proposal;
    }
   
}

export default async function Contributionsubmitpage({params}) {
    // const router = useRouter();
     //console.log('Router:', router);
     const supabase = createServerComponentClient({ cookies });
     const {
         data: { user },
     } = await supabase.auth.getUser();
   
     if (!user) {
         redirect('/login');
     }

     //console.log(user)

     const task_id = params.taskid;
     //console.log(params)

     const selectedproposal = await getProposal(supabase, task_id);
     //console.log(selectedproposal)

    const userprofile = await getProfile(user, supabase); //returns object with profile_id & username. 
    //console.log(userprofile)


    return (
        <>
             <Contributionform userprofile={userprofile} proposal={selectedproposal}/>

        </>


    );

}
   