/* Form for Creating a New Rabbit Hole */

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
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

 
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }).max(50),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }).max(50),
  priort_reward: z.number().min(0.01, {
    message: "Must be greater than 0% value",
  }).max(100, {
    message: "Cannot be greater than 100%",
  }),
  val_reward: z.number().min(0.01, {
    message: "Must be greater than 0% value",
  }).max(100, {
    message: "Cannot be greater than 100%",
  }),
  proto_fee: z.string().min(1, {
    message: "Must include a monetary value"
  }),
  
})

//("proto_fee", { valueAsNumber: true })
//message: "Must include a monetary value >= 1.00",

  // proto_fee: z.number().min(1, {
  //   message: "Must include a monetary value",
  // }),

  // proto_fee: z.string().min(1, {
  //   message: "Must include a monetary value",
  // }),

  


export default function CreateRabbitholeForm({userid}) {

  const supabase = createClientComponentClient();

  const [isSubmitted, setisSubmitted] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      priort_reward: 0.00,
      val_reward: 0.00,
      proto_fee: 0.00,
    },
  })

  async function onSubmit(formdata) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const protofee = parseFloat(formdata.proto_fee);
    const timestamp = new Date().toISOString();

    const { data: newRabbithole, error: newRabbitholeError } = await supabase
        .from('Rabbit-hole')
        .insert( { 
          group_name: formdata.name, 
          description: formdata.description, 
          prioritization_reward: (formdata.priort_reward / 100),
          validation_reward: (formdata.val_reward / 100),
          protocol_fee: protofee,
          is_active: true,
          create_at: timestamp
        })
        .select()

    if (newRabbitholeError) {
      console.error(newRabbitholeError)
    }

    const { error: newMembershipError } = await supabase
        .from('Membership')
        .insert( {
          is_damsire: true,
          rabbithole_id: newRabbithole[0].rabbithole_id,
          user_id: userid
        })
    
    if (newMembershipError) {
      console.error(newMembershipError)
    }

    if (isSubmitted === false) {
      setisSubmitted(true);
    }

  }


  function displaySubmitbtn() {

    return(
      <Button type="submit">Submit</Button>
    );  
  }

  function displaySuccess() {
    return(
      <span className="font-semibold">Successfully Created!</span>
    );
  }

    return (
      <Dialog >
        
        <DialogTrigger asChild>
          <Button variant="outline">+ Create Rabbit-Hole</Button>
        </DialogTrigger>
        
        <DialogContent className="md:max-w-[640px] max-h-80%">
          
          <DialogHeader>
            <DialogTitle>Create Rabbit-Hole</DialogTitle>
            <DialogDescription>
              Enter info to setup a new rabbit hole. Click Submit when you're done.
            </DialogDescription>
          </DialogHeader>

          <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Rabbit-Hole Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Give a short summary about the rabbit-hole
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-2 grid-cols-3">

                <FormField
                  control={form.control}
                  name="priort_reward"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prioritization Reward</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0.0 %" onChange={(e) => { field.onChange(e.target.valueAsNumber)}} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  className="grid gap-2"
                />

                <FormField
                  control={form.control}
                  name="val_reward"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Validation Reward</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0.0 %" onChange={(e) => { field.onChange(e.target.valueAsNumber)}} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  className="grid gap-2"
                />

                <FormField
                  control={form.control}
                  name="proto_fee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Protocol Fee</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0.00" {...field}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  className="grid gap-2"
                />

              </div>

              <DialogFooter>
                { isSubmitted ? displaySuccess() : displaySubmitbtn() }
              </DialogFooter>


            </form>
          </Form>
          
        </DialogContent>
      </Dialog>
    );
}


{/* <Button type="submit">Submit</Button>

<DialogClose asChild>
  <Button type="submit">Submit</Button>
</DialogClose>

            {submitflag ? displaySubmit() : displayClose()}*/}


{/* 
className="space-y-8"

<div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="Name">Name</Label>
              <Input id="name" placeholder="Title" onChange={setname}/>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="Description">Description</Label>
              <Input id="description" />
            </div>

            <div className="grid gap-2 grid-cols-3">
              <div className="grid gap-2">
                <Label htmlFor="Description" className="">Prioritization Reward </Label>
                <Input id="priort_reward" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="Description">Validation Reward </Label>
                <Input id="val_reward" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="Description">Protocol Fee </Label>
                <Input id="proto_fee" />
              </div>
            </div>
          </div> */}