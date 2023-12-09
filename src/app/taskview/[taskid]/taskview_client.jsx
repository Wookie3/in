/* Client Side for Taskview Page*/

'use client'

import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

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

import Contributionlist from './contributionlist.jsx';
import Contributors from "./contributors.jsx";
import Prioritizationform from "./Prioritization/prioritizationform.jsx"
import { useEffect, useCallback, useState } from 'react'


const Taskview_clientside = ({ userProfile, task, task_contributions }) => {

    const supabase = createClientComponentClient();

    const [proposer, setproposer] = useState();

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
    }, []);

    useEffect(() => {
        getProposer(task.profile_id, setproposer())
      }, [task.profile_id, getProposer])


    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6 m-5 border-black">

                <div className="col-span-4">
                    <Card className="my-5">
                        <CardHeader>
                            <CardTitle>{`${task.title}`}</CardTitle>

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
                            <Link href={`/contribution`}>
                            <Button> Submit a Contribution </Button>
                            </Link>
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

                    <Prioritizationform userProfile={userProfile} proposerid={task.proposal_id}/>

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