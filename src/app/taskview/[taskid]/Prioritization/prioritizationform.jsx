
'use client'

import { useState, useEffect } from 'react';
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


const checkuserprioritization = (userpriorize, set_userprioritized, set_isforstate, set_stake) => {
    
    if (userpriorize.length > 0) {
        set_userprioritized(true);

        set_isforstate(userpriorize[0].is_for);
        set_stake(userpriorize[0].stake_amount);
    }
    else {
        set_userprioritized(false);

        set_isforstate();
        set_stake();

    }
}


export default function Prioritizationform( {userProfile, proposerid, userpriorize}) {

    const supabase = createClientComponentClient();
    const router = useRouter();

    const [has_userprioritized, set_userprioritized] = useState(false);

    useEffect(() => {
      checkuserprioritization(userpriorize, set_userprioritized, set_isforstate, set_stake);
    }, [userpriorize, checkuserprioritization])   

    const [isforstate, set_isforstate] = useState();
    const [stake, set_stake] = useState();

    const [isInvalid, setInValid] = useState(false);
    const [isSubmitted, set_isSubmitted] = useState(false);

  const handlePrioritize = async () => {
    let prioritize = {
      is_for: isforstate,
      stake_amount: stake,
      prioritizer: userProfile.profile_id,
      proposal: proposerid
    }

    let timestamp = new Date().toISOString();

    if ((prioritize.is_for === true || prioritize.is_for === false) && prioritize.stake_amount > 0 && isSubmitted === false) {

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

      setInValid(false);
      set_isSubmitted(true);

      router.refresh();

    }
    else {
      setInValid(true);
    }
  }

  const handleUpdatePrioritize = async () => {
    let update = {
      is_for: isforstate,
      stake_amount: stake,
      id: userpriorize[0].prioritization_id
    }

    if ((update.is_for === true || update.is_for === false) && update.stake_amount > 0) {

      const { data: updatePrioritize, error: updatePrioritizeError } = await supabase
        .from('Prioritization')
        .update({
          is_for: update.is_for,
          stake_amount: update.stake_amount,
        })
        .eq('prioritization_id', update.id)
        .select()

      if (updatePrioritizeError) {
        console.error(updatePrioritizeError)
        throw updatePrioritizeError;
      }

      setInValid(false);
      set_isSubmitted(true);

    }
    else {
      setInValid(true);
    }
  }


  const handleRemovePrioritize = async () => {

    const { error: deletePrioritizeError } = await supabase
        .from('Prioritization')
        .delete()
        .eq('prioritization_id', userpriorize[0].prioritization_id)

    if (deletePrioritizeError) {
      console.error(deletePrioritizeError)
      throw deletePrioritizeError;
    }

    setInValid(false);
    set_isSubmitted(true);
  }


  function displaySubmitbtn() {
    return(
      <Button className="w-full" onClick={handlePrioritize}>Prioritize</Button>
    );
  }

  function displayUpdate_Removebtn() {
    return(
      <div className="w-full flex justify-between">
        <Button onClick={handleUpdatePrioritize}>Update</Button>      
        <Button variant="outline" onClick={handleRemovePrioritize}>Delete</Button>
      </div>
    );
  }

  function displaySuccess() {
    return(
      <span className="font-semibold mt-2">Success!</span>
    );
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
            <Input id="stake" type="number" placeholder="Amount" defaultValue={stake} onChange={(e) => set_stake(e.target.value)} />
          </div>

        </CardContent>

        <CardFooter className="flex flex-col">
          {isInvalid === true &&  <Label htmlFor="errorMessage" className="text-xs text-red-500 mb-2">Double Check your Entries</Label> }
          {/* <Button className="w-full" onClick={handlePrioritize}>Prioritize</Button> */}

          {has_userprioritized === true ? displayUpdate_Removebtn() : displaySubmitbtn()}

          {isSubmitted === true && displaySuccess()}
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

