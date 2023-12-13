/* Client Side for Taskview Page*/

'use client'

import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from "next/navigation";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@radix-ui/react-dropdown-menu";
import { useToast } from "@/components/ui/use-toast"


import Contributionlist from './contributionlist.jsx';
import Contributors from "./contributors.jsx";
import Prioritizationform from "./Prioritization/prioritizationform.jsx"
import { useEffect, useCallback, useState } from 'react'


const checkusercontribution = (usercontribution, set_hasusercontributed) => {
    
    if (usercontribution.length > 0) {
        set_hasusercontributed(true);
    }
    else {
        set_hasusercontributed(false)
    }
}

const isUser_Proposer = (user_profileid, task, toast, router) => {

    if (user_profileid === task.profile_id) {
        
        return(
            toast({
                title: "Uh oh! Something went wrong.",
                description: "Your cannot submit a contribution to a proposal you created",
              })
        );
    }

    return router.push(`/taskview/${task.proposal_id}/contribution`);
}



const Taskview_clientside = ({ userProfile, task, task_contributions, usercontribution, userpriorize }) => {

    const supabase = createClientComponentClient();
    const router = useRouter();
    const { toast } = useToast();

    const [proposer, setproposer] = useState();
    const [has_usercontributed, set_hasusercontributed] = useState(false);
    //const [has_userprioritized, set_userprioritized] = useState(false);

    useEffect(() => {
        checkusercontribution(usercontribution, set_hasusercontributed);
      }, [usercontribution, checkusercontribution])

 

   // console.log(has_userprioritized)
    const getProposer = useCallback(async (profileid) => {
        const { data: proposerData, error: proposerError } = await supabase
        .from('Profile')
        .select('username')
        .eq('profile_id', profileid)
        .single()
    
        if (proposerError) {
            console.error(proposerError)
        }
    
        if (proposerData) {
            setproposer(proposerData.username)
          }  
    }, [supabase]);

    useEffect(() => {
        getProposer(task.profile_id, setproposer())
      }, [task.profile_id, getProposer])


    function displaySubmitbtn() {
     
        return (
            <Button onClick={() => isUser_Proposer(userProfile.profile_id, task, toast, router)}> Submit a Contribution </Button>
        );
    }

    function displayViewbtn() {
     
        return (
            <>
                <Link href={`/contributionview/${usercontribution[0].contribution_id}`}>
                    <Button> View your Contribution </Button>
                </Link> 
            </>
        );
    }


    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6 m-5 border-black">

                <div className="col-span-4">
                    <Card className="my-5">
                        <CardHeader>
                            <div className="flex flex-row justify-between items-center">
                                <CardTitle>{`${task.title}`}</CardTitle>

                                <Link href={`/rabbitHole/${task.rabbithole_id}`}>
                                    <Button variant="ghost"> Back to Rabbit-hole</Button>
                                </Link>
                            </div>

                            <div className="flex flex-row items-center gap-x-10">
                                <CardDescription>
                                    <span className="italic pr-2">Proposer: </span> {`${proposer}`}
                                </CardDescription>
                                <Badge className="my-1">Status: <span className="italic pl-2"> {`${task.status}`}</span> </Badge>
                            </div>
                        </CardHeader>

                        <CardContent>                     
                            <dl className="divide-y divide-gray-100">
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-base font-medium leading-6 text-gray-900">Description</dt>
                                    <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                                        {`${task.description}`}
                                    </dd>
                                </div>

                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-base font-medium leading-6 text-gray-900">Deadline</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{`${task.deadline}`}</dd>
                                </div>

                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-base font-medium leading-6 text-gray-900">Effort</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{`${task.effort}`}</dd>
                                </div> 

                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-base font-medium leading-6 text-gray-900">Rewards</dt>
                                    <dd className="mt-1 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{`${task.rewards} Carrots`}</dd>
                                </div>
                            </dl>
                        </CardContent>

                        <CardFooter className="flex justify-center">
                            {has_usercontributed ? displayViewbtn() : displaySubmitbtn() }
                        </CardFooter>
                    </Card>

                    <Card className="my-5">
                        <CardHeader>
                            <CardTitle>Contribution List</CardTitle>
                        </CardHeader>

                        <CardContent className="h-96">

                            <Contributionlist contributions={task_contributions}/>
                        </CardContent>
                    </Card>

                </div>

                <div className="col-span-2">

                    <Prioritizationform userProfile={userProfile} proposerid={task.proposal_id} userpriorize={userpriorize} />
{/*                     has_userprioritized={has_userprioritized} */}
                    <Card className="my-5">
                        <CardHeader>
                            <CardTitle>Contributors</CardTitle>
                        </CardHeader>

                        <CardContent className="pl-4">
                            {/* <Contributors contributors={contributors}/> */}
                            <Contributors contributinguser={task_contributions}/>
                        </CardContent>
                    </Card>

                </div>

            </div>
        </>
    );

}
export default Taskview_clientside;

{/* <div className="mb-5">
<h2 className="text-lg font-semibold tracking-tight mb-1"> Description </h2>

<p>
    The World Wide Fund for Nature (WWF) is an international organization working on issues
    regarding the conservation, research and restoration
    of the environment, formerly named the World Wildlife Fund. WWF was founded in 1961.
</p>
</div>

<div>



</div>

<div className="flex flex-row items-baseline gap-5">
<h2 className="text-lg font-semibold tracking-tight mb-1"> Deadline: </h2>
Deadline:
</div>

<div className="flex flex-row items-baseline gap-5">
<h2 className="text-lg font-semibold tracking-tight mb-1"> Effort: </h2>
Effort:
</div>

<div className="flex flex-row items-baseline gap-5">
<h2 className="text-lg font-semibold tracking-tight mb-1"> Rewards: </h2>
Rewards:
</div> */}
