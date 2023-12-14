/* Client Side for Contribution View Page*/



// Import necessary libraries and components

"use client";

import Link from 'next/link'

import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
//import ScrollableContainer from './ScrollableContainer';

import { useEffect, useCallback, useState } from 'react'

import Validationlist from './validationlist.jsx';
import Validators from './validators.jsx';
import Validationform from './submitValidation/submitvalidationform.jsx'


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



// Main component for the Contribution View page
export default function Contributionview({contribution, validations, userprofile, uservalidate}) {  // Change the component name to MyRenamedComponent
  
  // Create a Supabase client instance
  const supabase = createClientComponentClient();

  const [User_isContributor, set_UserisContributor] = useState();

  //Check if user created contributor so they cannot validate it as well
  useEffect(() => {
      if (userprofile.profile_id === contribution.Profile.profile_id) {
        set_UserisContributor(true);
      }
      else
      {
        set_UserisContributor(false);
      }
  },[])


  return (

    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6 m-5 border-black">

        <div className="col-span-4">
          <Card className="my-5">
            <CardHeader>
              <div className="flex flex-row justify-between items-center">
                <CardTitle>{`${contribution.title}`}</CardTitle>

                <Link href={`/taskview/${contribution.Proposal.proposal_id}`}>
                  <Button variant="ghost"> Back to Proposal</Button>
                </Link>
              </div>

              <div className="flex flex-row items-center gap-x-10">
                <CardDescription>
                  <span className="italic pr-2">Contributor: </span> {`${contribution.Profile.username}`}
                </CardDescription>
                {/* <Badge className="my-1">Status: <span className="italic pl-2"> test </span> </Badge> */}
              </div>
            </CardHeader>

            <CardContent>
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-base font-medium leading-6 text-gray-900">Description</dt>
                  <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                    {`${contribution.description}`}
                  </dd>
                </div>

                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-base font-medium leading-6 text-gray-900">Created</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{`${contribution.create_at}`}</dd>
                </div>

                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-base font-medium leading-6 text-gray-900">Proposal</dt>
                  <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                    {`${contribution.Proposal.title}`}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card className="my-5">
            <CardHeader>
              <CardTitle>Validations</CardTitle>
            </CardHeader>

            <CardContent className="h-96">
              <Validationlist validations={validations} />
            </CardContent>
          </Card>

        </div>


        <div className="col-span-2">

          {!User_isContributor &&
            <div className="my-5">
              <Validationform userprofile={userprofile} contributionid={contribution.contribution_id} uservalidate={uservalidate} />
            </div>
          }

          <Card className="my-5">
            <CardHeader>
              <CardTitle>Validators</CardTitle>
            </CardHeader>

            <CardContent className="pl-4">
              <Validators validatingusers={validations} />
            </CardContent>
          </Card>

        </div>

      </div>
    </>
  );
}


// // Define the schema for form validation
// const formSchema = z.object({
//   description: z.string().min(2, {
//     message: "Description must be at least 2 characters.",
//   }),
// });


// // Set up form validation using react-hook-form
// const form = useForm({
//   resolver: zodResolver(formSchema),
// });

// console.log(contribution);

// // Handle form submission
// const onSubmit = async (data) => {
//   try {
//     // Logic to handle form submission and Supabase interaction
//     console.log('Data before sending to Supabase:', data);
//     const { data: newContribution, error } = await supabase
//       .from('Contribution')
//       .insert({
//         description: data.description,
//         created_at: new Date().toISOString(),
//       });

//     if (error) {
//       console.error('Error while inserting data into the database:', error);
//       return;
//     }

//     // Handle the result as needed
//     console.log('New Contribution:', newContribution);

//   } catch (error) {
//     console.error('Error submitting form:', error);
//   }
// };

// return (

//   <>



  
//   <Form {...form}>
//     {/* Main layout with two columns */}
//     <div className="flex space-x-4">
//       {/* Left Column */}
//       <div className="flex-1 space-x-4 mt-20">
//         {/* Card for Contribution Input */}
//         <div className="border p-4 mb-4">
//           <h2 className="text-xl font-semibold mb-2">Title</h2>
//           <FormField
//             control={form.control}
//             name="description"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Description:</FormLabel>
//                 <FormControl style={{ width: '100%' }}>
//                   <Input placeholder="Details incluided here" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         {/* Validation List */}
//         <div style={{ width: '50%' }} className="border p-4">
//           <h2  className="text-xl font-semibold mb-2">Validation List</h2><br></br>
//           {/* Display users and stakes dynamically */}
//           {/* You may use a map function here to iterate through the list */}
//           <div>
//           <ScrollableContainer>
//             <div>User 1 - Stake 1</div>
//             <div>User 2 - Stake 2</div>
//             <div>User 1 - Stake 1</div>
//             <div>User 2 - Stake 2</div>
//             <div>User 1 - Stake 1</div>
//             <div>User 2 - Stake 2</div>
//             <div>User 1 - Stake 1</div>
//             <div>User 2 - Stake 2</div>
//             <div>User 1 - Stake 1</div>
//             <div>User 2 - Stake 2</div>
//             <div>User 1 - Stake 1</div>
//             <div>User 2 - Stake 2</div>
//             <div>User 1 - Stake 1</div>
//             <div>User 2 - Stake 2</div>
//             <div>User 1 - Stake 1</div>
//             <div>User 2 - Stake 2</div>
//             <div>User 1 - Stake 1</div>
//             <div>User 2 - Stake 2</div>
//             <div>User 1 - Stake 1</div>
//             <div>User 2 - Stake 2</div>
//             {/* ... more users and stakes ... */}
//             </ScrollableContainer>
//           </div>
//         </div>
//       </div>

//       {/* Right Column */}
//       <div className="flex-1 space-x-4 mt-20">
//         {/* Validation Section */}
//         <div className="border p-4 mb-4">
//           <h2 className="text-xl font-semibold mb-2">Validation</h2>
//           {/* Thumbs Up/Down icons */}
//           <div>
//             <button>👍</button>
//             <button>👎</button>
//           </div>
//           {/* Stake Input */}
//           <FormControl>
//           <Input
//       style={{ width: '100px' }}
//       placeholder="Enter Fees"
//       type="text"
//       inputMode="numeric"
//       pattern="[0-9]*"
//       title="Only numbers are allowed"
//     />
//           </FormControl><br></br><br></br>
//           {/* Submit Button */}
//           <Button type="submit">Submit</Button>
//         </div>

//         {/* Validators List */}
//         <div className="border p-4">
//           <h2 className="text-xl font-semibold mb-2">Validators</h2>
//           {/* Display list of validators */}
//           <div>
//           <ScrollableContainer>
//             <div>Validator #1</div>
//             <div>Validator #2</div>
//             <div>Validator #1</div>
//             <div>Validator #2</div>
//             <div>Validator #1</div>
//             <div>Validator #2</div>
//             <div>Validator #1</div>
//             <div>Validator #2</div>
//             <div>Validator #2</div>
//             <div>Validator #2</div>   
//             <div>Validator #2</div>
//             <div>Validator #1</div>
//             <div>Validator #2</div>
//             <div>Validator #1</div>
//             <div>Validator #2</div>
//             <div>Validator #1</div>
//             <div>Validator #2</div>
//             <div>Validator #2</div>
//             <div>Validator #2</div>
//             </ScrollableContainer>
//             {/* ... more validators ... */}
//           </div>
//         </div>
//       </div>
//     </div>
//   </Form>

//   </>
// );
// }