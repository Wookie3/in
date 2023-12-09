'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

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

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"


const formSchema = z.object({
    username: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }).max(50),
    wallet_amount: z.number().min(0.00, {
      message: "Must include a monetary value"
    }),
    
})

export default function Createprofileform( {user} ) {

    const supabase = createClientComponentClient();
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          wallet_amount: 0,
        },
      })


    async function onSubmit(formdata) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        console.log(formdata);
        const timestamp = new Date().toISOString();

        const { data: newProfile, error: newProfileError } = await supabase
        .from('Profile')
        .insert( { 
          username: formdata.username, 
          is_superadmin: false, 
          is_active: true,
          created_at: timestamp,
          updated_at: timestamp,
          user_id: user
        })
        .select()

        if (newProfileError) {
            console.error(newProfileError)
            throw newProfileError;
        }

        const { data: wallet, error: newWalletError } = await supabase
        .from('Wallet')
        .insert( {
          balance: formdata.wallet_amount,
          profile_id: newProfile[0].profile_id
        })
    
        if (newWalletError) {
          console.error(newWalletError)
          throw newWalletError;
        }

    }

    return(
        <Card className="mx-5 my-5">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl"> Setup Incented Profile </CardTitle>
          <CardDescription>
            Define your username & add funds
          </CardDescription>
        </CardHeader>

        <Form {...form} >

            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-1">

            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Provide a username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="wallet_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wallet</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder="0.00" {...field} onChange={(e) => { field.onChange(e.target.valueAsNumber)}} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <Button type="submit" className="w-full" onClick={() => router.push('/tasks')} >Setup</Button>

            </CardContent>
            
            {/* <CardFooter className="flex flex-col">
                <Button type="submit" className="w-full">Setup</Button>
            </CardFooter> */}

            </form>
          </Form>

        </Card> 
    
    );

}