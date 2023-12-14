
'use client'

import { useState, useEffect, useCallback } from 'react';
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
import { useToast } from "@/components/ui/use-toast"


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

  

//Checks for user's priorization and fills data
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

//Calculates new balance of user's wallet
const calculateBalance = (balanceDetails, newStake) => {

  return balanceDetails.userwalletbalance + balanceDetails.prevStake - newStake;

}

//Updates user's wallet balance
const updateWalletbalance = async (balanceDetails, newStake, supabase) => {

  let newbalance = calculateBalance(balanceDetails, newStake);

  const { data: updateWallet, error: updateWalletError } = await supabase
  .from('Wallet')
  .update({
    balance: newbalance,
  })
  .eq('wallet_id', balanceDetails.userwalletid)
  .select()

  if (updateWalletError) {
  console.error(updateWalletError)
  throw updateWalletError;
  }
}



export default function Prioritizationform( {userProfile, proposerid, userpriorize}) {

    const supabase = createClientComponentClient();
    const router = useRouter();
    const { toast } = useToast();

    const [has_userprioritized, set_userprioritized] = useState(false);

    useEffect(() => {
      checkuserprioritization(userpriorize, set_userprioritized, set_isforstate, set_stake);
    }, [userpriorize, checkuserprioritization])  
  
    const [isforstate, set_isforstate] = useState();
    const [stake, set_stake] = useState();

    const [isInvalid, setInValid] = useState(false);
    const [isSubmitted, set_isSubmitted] = useState(false);

    //console.log(userProfile)
    //console.log(userProfile.Wallet[0])
    //console.log(userpriorize)


  const handlePrioritize = async () => {
    let prioritize = {
      is_for: isforstate,
      stake_amount: stake,
      prioritizer: userProfile.profile_id,
      proposal: proposerid
    }

    let timestamp = new Date().toISOString();

    let balanceDetails = {
      userwalletid: userProfile.Wallet[0].wallet_id,
      userwalletbalance: userProfile.Wallet[0].balance,
      prevStake: 0,
    }

    if (prioritize.stake_amount > balanceDetails.userwalletbalance) {

      insufficientBalance(balanceDetails.userwalletbalance);

    }
    else {

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

        updateWalletbalance(balanceDetails, prioritize.stake_amount, supabase);

        setInValid(false);
        set_isSubmitted(true);

        router.refresh();

      }
      else {
        setInValid(true);
      }
    }
  }

  const handleUpdatePrioritize = async () => {
    let update = {
      is_for: isforstate,
      stake_amount: stake,
      id: userpriorize[0].prioritization_id
    }
    
    let balanceDetails = {
      userwalletid: userProfile.Wallet[0].wallet_id,
      userwalletbalance: userProfile.Wallet[0].balance,
      prevStake: userpriorize[0].stake_amount, 
    }

    if (update.stake_amount > balanceDetails.userwalletbalance) {

      insufficientBalance(balanceDetails.userwalletbalance);

    }
    else {

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

        updateWalletbalance(balanceDetails, update.stake_amount, supabase);
        displaySuccess();
        setInValid(false);
        set_isSubmitted(true);

      }
      else {
        setInValid(true);
      }

      router.refresh();

    }
  }


  const handleRemovePrioritize = async () => {

    let balanceDetails = {
      userwalletid: userProfile.Wallet[0].wallet_id,
      userwalletbalance: userProfile.Wallet[0].balance,
      prevStake: userpriorize[0].stake_amount,
    }

    const addedStake = 0;

    const { error: deletePrioritizeError } = await supabase
        .from('Prioritization')
        .delete()
        .eq('prioritization_id', userpriorize[0].prioritization_id)

    if (deletePrioritizeError) {
      console.error(deletePrioritizeError)
      throw deletePrioritizeError;
    }

    updateWalletbalance(balanceDetails, addedStake, supabase);

    setInValid(false);
    set_isSubmitted(true);

    router.refresh();
  }

  function insufficientBalance(available_funds) {
    return(
      toast({
        variant: "destructive",
        title: "Insufficient funds in your wallet.",
        description: `Current balance: ${available_funds} Carrots` 
      })
    );
  }


  function displaySubmitbtn() {
    return(
      <Button className="w-full" onClick={handlePrioritize}>Prioritize</Button>
    );
  }

  function displayUpdate_Removebtn() {
    return(
      <div className="w-full flex justify-between">
        <Button onClick={() => handleUpdatePrioritize()}>Update</Button>      
        <Button variant="outline" onClick={handleRemovePrioritize}>Delete</Button>
      </div>
    );
  }

  function displaySuccess() {
    return (
      // <span className="font-semibold mt-2">Success!</span>

      toast({
        description: `Success!` 
      })
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

          {has_userprioritized === true ? displayUpdate_Removebtn() : displaySubmitbtn()}

          {/* {isSubmitted === true && displaySuccess()} */}
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

