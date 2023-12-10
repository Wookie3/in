'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

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
import { useState } from "react"

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


export default function Validationform({userprofile, contributionid}) {

  const supabase = createClientComponentClient();

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

    if ((validate.is_for === true || validate.is_for === false) && validate.stake_amount > 0) {
        
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
    
    }
    else {
        console.log('Double Check your Entries')
        setInValid(true);
    }

  }


  function displaySubmitbtn() {

    return(
      <Button onClick={handleValidate}>Submit</Button>
    );  
  }

  function displaySuccess() {
    return(
      <span className="font-semibold">Successfully Created!</span>
    );
  }

    return (
      <Dialog>
        
        <DialogTrigger asChild>
          <Button variant="outline">+ Submit a Validation</Button>
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
            <Textarea id="review" placeholder="Type a small review here." onChange={(e) => set_review(e.target.value)} />
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <Foragainstbtn isforstate={isforstate} set_isforstate={set_isforstate}/>   
          </div>

          <div className="grid gap-2">
            <Label htmlFor="stake">Stake</Label>
            <Input id="stake" type="number" placeholder="Amount" onChange={(e) => set_stake(e.target.value)} />
          </div>
          </div>

          
          <DialogFooter> 
            {isInvalid === true &&  <Label htmlFor="errorMessage" className="text-xs text-red-500 mb-2">Double Check your Entries</Label> }
            { isSubmitted ? displaySuccess() : displaySubmitbtn() }
          </DialogFooter>         
        </DialogContent>
      </Dialog>
    );
}