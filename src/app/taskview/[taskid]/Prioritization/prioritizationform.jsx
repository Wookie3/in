
'use client'

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import Foragainstbtn from "@/components/for_againstbutton";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"


 


export default function Prioritizationform( {userProfile, proposerid}) {

    const supabase = createClientComponentClient();
    const [isforstate, set_isforstate] = useState();
    const [stake, set_stake] = useState();

    const [isInvalid, setInValid] = useState(false);


  const handlePrioritize = async () => {
    let prioritize = {
      is_for: isforstate,
      stake_amount: stake,
      prioritizer: userProfile.profile_id,
      proposal: proposerid
    }

    let timestamp = new Date().toISOString();

    if ((prioritize.is_for === true || prioritize.is_for === false) && prioritize.stake_amount > 0) {

      const { data: newPrioritize, error: newPrioritizeError } = await supabase
        .from('Prioritization')
        .insert({
          is_for: prioritize.is_for,
          stake_amount: prioritize.stake_amount,
          proposal_id: prioritize.proposal,
          profile_id: prioritize.prioritizer,
          create_at: timestamp
        })
        .select()

      if (newPrioritizeError) {
        console.error(newPrioritizeError)
        throw newPrioritizeError;
      }

      console.log(newPrioritize);
      setInValid(false);

    }
    else {
      console.log('Double Check your Entries')
      setInValid(true);
    }
  }

    return (
      <Card className="my-5">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Prioritize </CardTitle>
          <CardDescription>
            Submit a stake for/against this proposal
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <Foragainstbtn isforstate={isforstate} set_isforstate={set_isforstate}/>   
          </div>

          <div className="grid gap-2">
            <Label htmlFor="stake">Stake</Label>
            <Input id="stake" type="number" placeholder="Amount" onChange={(e) => set_stake(e.target.value)} />
          </div>

        </CardContent>

        <CardFooter className="flex flex-col">
          {isInvalid === true &&  <Label htmlFor="errorMessage" className="text-xs text-red-500 mb-2">Double Check your Entries</Label> }
          <Button className="w-full" onClick={handlePrioritize}>Prioritize</Button>
        </CardFooter>
      </Card>
    )
  }


//   <Button variant="outline">
//   <Icons.gitHub className="mr-2 h-4 w-4" />
//   For
// </Button>
// <Button variant="outline">
//   <Icons.google className="mr-2 h-4 w-4" />
//   Against
// </Button>

