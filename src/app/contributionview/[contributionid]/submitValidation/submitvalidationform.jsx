'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import Foragainstbtn from '@/components/for_againstbutton'

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import * as z from "zod"

// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"

// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
//   } from "@/components/ui/card"



const checkuservalidation = (uservalidate, set_hasuservalidated, set_isforstate, set_stake, set_review) => {
    
  if (uservalidate.length > 0) {
      set_hasuservalidated(true);

      set_isforstate(uservalidate[0].is_for);
      set_stake(uservalidate[0].stake_amount);
      set_review(uservalidate[0].review);
  }
  else {
      set_hasuservalidated(false);

      set_isforstate();
      set_stake();

  }
}


export default function Validationform({userprofile, contributionid, uservalidate}) {

  const supabase = createClientComponentClient();
  const router = useRouter();

  const [has_uservalidated, set_hasuservalidated] = useState(false);

  useEffect(() => {
    checkuservalidation(uservalidate, set_hasuservalidated, set_isforstate, set_stake, set_review);
  }, [uservalidate, checkuservalidation])   

  const [isforstate, set_isforstate] = useState();
  const [stake, set_stake] = useState();
  const [review, set_review] = useState();

  const [isSubmitted, setisSubmitted] = useState(false);
  const [isInvalid, setInValid] = useState(false);

  const handleValidate = async () => {
    let validate = {
      is_for: isforstate,
      stake_amount: stake,
      userreview: review
    }

    let timestamp = new Date().toISOString();
    let profileid = userprofile.profile_id
    
    let reviewsize = (validate.userreview).length;


    if ((validate.is_for === true || validate.is_for === false) && validate.stake_amount > 0 && reviewsize > 0 && isSubmitted === false) {
        
        const { data: newValidation, error: newValidationError } = await supabase
        .from('Validation')
        .insert( { 
          review: validate.userreview,
          stake_amount: validate.stake_amount,
          contribution_id: contributionid,
          profile_id: profileid,
          create_at: timestamp,
          is_for: validate.is_for
        })

        if (newValidationError) {
            console.error(newValidationError)
            throw newValidationError;
        }

        if (isSubmitted === false) {
            setisSubmitted(true);
            setInValid(false);
        }

        router.refresh();
    
    }
    else {
        console.log('Double Check your Entries')
        setInValid(true);
    }

  }

  const handleUpdateValidate = async () => {
    let val_update = {
      is_for: isforstate,
      stake_amount: stake,
      userreview: review,
      id: uservalidate[0].validation_id
    }

    let reviewsize = (val_update.userreview).length;

    if ((val_update.is_for === true || val_update.is_for === false) && val_update.stake_amount > 0 && reviewsize > 0) {

      const { data: updateValidate, error: updateValidateError } = await supabase
        .from('Validation')
        .update({
          is_for: val_update.is_for,
          stake_amount: val_update.stake_amount,
          review: val_update.userreview
        })
        .eq('validation_id', val_update.id)
        .select()

      if (updateValidateError) {
        console.error(updateValidateError)
        throw updateValidateError;
      }

      setInValid(false);
      setisSubmitted(true);

      router.refresh();

    }
    else {
      setInValid(true);
    }
  }

  const handleRemoveValidate = async () => {

    const { error: deleteValidateError } = await supabase
        .from('Validation')
        .delete()
        .eq('validation_id', uservalidate[0].validation_id)

    if (deleteValidateError) {
      console.error(deleteValidateError)
      throw deleteValidateError;
    }

    setInValid(false);
    setisSubmitted(true);

  }


  function displaySubmitbtn() {

    return(
      <Button onClick={handleValidate}>Submit</Button>
    );  
  }

  function displayUpdate_Removebtn() {
    return(
      <div className="w-full flex justify-between">
        <Button variant="outline" onClick={handleRemoveValidate}>Delete</Button>
        <Button onClick={handleUpdateValidate}>Update</Button>      
      </div>
    );
  }

  function displaySuccess() {
    return(
      <div className="font-semibold">Success!</div>
    );
  }

    return (
      <Dialog>
        
        <DialogTrigger asChild>
          <Button>    
            {has_uservalidated === true ? "+ Update your Validation" : "+ Submit a Validation"}
          </Button>
        </DialogTrigger>
        
        <DialogContent className="md:max-w-[640px] max-h-80%">
          
          <DialogHeader>
            <DialogTitle>Submit a Validation</DialogTitle>
            <DialogDescription>
              Enter a review and stake an amount for or against this contribution. Click Submit when you're done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">

          <div className="grid gap-2">
            <Label htmlFor="review">Review</Label>
            <Textarea id="review" placeholder="Type a small review here." defaultValue={review} onChange={(e) => set_review(e.target.value)} />
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <Foragainstbtn isforstate={isforstate} set_isforstate={set_isforstate}/>   
          </div>

          <div className="grid gap-2">
            <Label htmlFor="stake">Stake</Label>
            <Input id="stake" type="number" placeholder="Amount" defaultValue={stake} onChange={(e) => set_stake(e.target.value)} />
          </div>
          </div>

          
          <DialogFooter className="flex flex-col"> 
            {isInvalid === true &&  <Label htmlFor="errorMessage" className="text-xs text-red-500 mb-2">Double Check your Entries</Label> }
            
            {has_uservalidated === true ? displayUpdate_Removebtn() : displaySubmitbtn()}

            {isSubmitted === true && displaySuccess() }
          </DialogFooter>         
        </DialogContent>
      </Dialog>
    );
}