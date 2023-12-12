'use client';

import React from 'react';
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  title: z.string().min(2, {
    title: "Title must be at least 2 characters.",
  }),
  contribution: z.string().min(10, {
    title: "Contribution must be at least 10 characters.",
  }),
 
});

export default function Contributionform( {userprofile, proposal} ) {

  const supabase = createClientComponentClient();

  const [isSubmitted, setisSubmitted] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      contribution: "",
    },
  });


  const onSubmit = async (data) => {
    try {
      console.log('Data before sending to Supabase:', data);
      const { data: newContribution, error } = await supabase
        .from('Contribution')
        .insert([
          {
            title: data.title,
            description: data.contribution,
            proposal_id: proposal.proposal_id,
            profile_id: userprofile.profile_id,
            create_at: new Date().toISOString(),
          },
        ])
        .select()

      if (error) {
        console.error('Error while inserting date into the database:', error);
        return;
      }

      if (isSubmitted === false) {
        setisSubmitted(true);
      }

      // Handle the result as needed
      console.log('New Contribution:', newContribution);

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

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
    <>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6 m-5 border-black">

        <div className="col-span-4">
          <Card className="my-5">
            <CardHeader>
              <CardTitle>{`${proposal.title}`}</CardTitle>
            </CardHeader>

            <CardContent>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              {proposal.description}

            </CardContent>
          </Card>

          <Card className="my-5">

            <CardHeader>
              <CardTitle>Provide a contribution</CardTitle>
            </CardHeader>

            
            <CardContent>
            <Form {...form} >
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Contribution Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contribution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contribution</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter your contribution here" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex place-content-end">
                { isSubmitted ? displaySuccess() : displaySubmitbtn() }
                </div>

              </form>
            </Form>

            </CardContent>
          </Card>
        </div>

        <div className="col-span-2">

          <Card className="my-5">
            <CardContent className="py-4 px-4">

              <h2 className="text-xl font-semibold">Reward</h2>
              <div>
                {proposal.rewards}
              </div>

              <h2 className="text-xl font-semibold mt-4">Deadline</h2>
              <div>
                {/* Additional Information for Deadline */}
                {proposal.deadline}
              </div>

            </CardContent>
          </Card>
        </div>

      </div>

    </>

  );
}


//Old Code 
//return (
//   <Form {...form}>
//     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      
//       <div className="flex space-x-4">
        
//         {/* Left Column */}
//         <div className="flex-1 space-x-4 mt-20">
//         <h1>Task:</h1>
//           {/* Title Section */}
//           <>
         
//             <h2 className="text-xl font-semibold mb-2">{proposal.title}</h2>
//             <FormField
//               control={form.control}
//               name="description"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Description: <br></br><br></br> {proposal.description}</FormLabel>
                 
//                   <h1>New Contribution:</h1>
//                   <FormControl style={{ width: '100%' }}>
//                     <Input placeholder={`Enter your Contribution`} {...field} style={{ height: '200px' }} />
//                   </FormControl>
//                   <FormDescription>
//                     {/* Additional Information */}
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

         
//           </>
//         </div>

//         {/* Right Column */}
//         <div className="flex-1 space-x-4 mt-20">
//           {/* Reward Section */}
//           <div>
//             <h2 className="text-xl font-semibold mb-2">Reward</h2>
//             <div>
//               {/* Additional Information for Rewards */}
//             {proposal.rewards}
//             </div>
//           </div>
          
//           {/* File Section */}
//           <div>
//             <h2 className="text-xl font-semibold mb-2 mt-=10">Attached File</h2>
//             <div>
//               {/* Additional Information for Attached File -- No field in supabase table, will leave out*/}
//             </div>
//           </div>
//              {/* Deadline Section */}
//              <div>
//               <h2 className="text-xl font-semibold mb-2 mt-20">Deadline</h2>
//               <div>
//                 {/* Additional Information for Deadline */}
//                {proposal.deadline}
//               </div>
//             </div>
//         </div>
//       </div>
//       <div className='flex justify-center'>
//         <Button type="submit">Submit</Button>
//       </div>
//     </form>
//   </Form>
// );