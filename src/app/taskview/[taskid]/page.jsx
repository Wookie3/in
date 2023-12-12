/* -- Taskview Page - Server-Side -- */

import Link from "next/link";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server'

import Taskview_clientside from "./taskview_client";


//Gets profile data for user
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

const getContributions = async (supabase, task_id) => {
    
    const { data: contributionStat, error: contributionError } = await supabase
    .from('Contribution')
    .select(`contribution_id, create_at, title, profile_id, Validation(count)`)
    .eq('proposal_id', task_id)

    if (contributionError) {
        console.error(contributionError)
        throw contributionError;
    }

    return contributionStat;
}

const getContribution_byuser = async (user, task_id, supabase) => {

    const { data: contributed, error: contributedError } = await supabase
    .from('Contribution')
    .select(`contribution_id`)
    .eq('profile_id', user.profile_id)
    .eq('proposal_id', task_id)
    .limit(1)

    if (contributedError) {
        console.error(contributedError)
        throw contributedError;
    }

    return contributed;

}

const getPrioritization_byuser = async (user, task_id, supabase) => {

    const { data: prioritized, error: prioritizedError } = await supabase
    .from('Prioritization')
    .select(`*`)
    .eq('profile_id', user.profile_id)
    .eq('proposal_id', task_id)
    .limit(1)

    if (prioritizedError) {
        console.error(prioritizedError)
        throw prioritizedError;
    }

    return prioritized;
}



const Taskview = async ({ params }) => {
    const supabase = createServerComponentClient({ cookies });
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const task_id = params.taskid;
    //check taskid exists in db 

    const selectedproposal = await getProposal(supabase, task_id);
    //console.log(selectedproposal);

    const task_contributions = await getContributions(supabase, task_id);
    //console.log(task_contributions);

    const userProfile = await getProfile(user, supabase);
   // console.log(userProfile);

    const usercontribution = await getContribution_byuser(userProfile, task_id, supabase);
   // console.log(usercontribution);

    const userpriorize = await getPrioritization_byuser(userProfile, task_id, supabase);
    //console.log(userpriorize);

    return (

        <>
            <Taskview_clientside 
            userProfile={userProfile} 
            task={selectedproposal} 
            task_contributions={task_contributions} 
            usercontribution={usercontribution}
            userpriorize={userpriorize}
            />
        </>
        
    )
};
export default Taskview;
