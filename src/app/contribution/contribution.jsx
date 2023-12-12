/* File & Folder to Be Removed */

"use client";

import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from "@/components/ui/button";
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

const formSchema = z.object({
  description: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
 
});

export default function Contributionform({ taskTitle, taskDescription, taskDeadline, taskReward, taskFile }) {

  const supabase = createClientComponentClient();

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    try {
      console.log('Data before sending to Supabase:', data);
      const { data: newContribution, error } = await supabase
        .from('Contribution')
        .insert([
          {
            title: 'testing',
            description: data.description,
            proposal_id: 31,
            profile_id: 2,
            create_at: new Date().toISOString(),
          },
        ])
        .select()

      if (error) {
        console.error('Error while inserting date into the database:', error);
        return;
      }

      // Handle the result as needed
      console.log('New Contribution:', newContribution);

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        <div className="flex space-x-4">
          
          {/* Left Column */}
          <div className="flex-1 space-x-4 mt-20">
          <h1>Task:</h1>
            {/* Title Section */}
            <>
           
              <h2 className="text-xl font-semibold mb-2">{taskTitle}</h2>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description: <br></br><br></br> {taskDescription}</FormLabel>
                   
                    <h1>New Contribution:</h1>
                    <FormControl style={{ width: '100%' }}>
                      <Input placeholder={`Enter your Contribution for ${taskTitle}`} {...field} style={{ height: '200px' }} />
                    </FormControl>
                    <FormDescription>
                      {/* Additional Information */}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

           
            </>
          </div>

          {/* Right Column */}
          <div className="flex-1 space-x-4 mt-20">
            {/* Reward Section */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Reward</h2>
              <div>
                {/* Additional Information for Rewards */}
              {taskReward}
              </div>
            </div>

            {/* File Section */}
            <div>
              <h2 className="text-xl font-semibold mb-2 mt-=10">Attached File</h2>
              <div>
                {/* Additional Information for Attached File */}
                {taskFile}
              </div>
            </div>
               {/* Deadline Section */}
               <div>
                <h2 className="text-xl font-semibold mb-2 mt-20">Deadline</h2>
                <div>
                  {/* Additional Information for Deadline */}
                 {taskDeadline}
                </div>
              </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}




// "use client";

// import React from 'react';
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";

// const formSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
//   validationInput: z.string(), // Add schema for validation input
//   additionalInput: z.string(),
//   fileInput: z.string(),
// });

// export function ProfileForm() {
//   const form = useForm({
//     resolver: zodResolver(formSchema),
//   });

//   const onSubmit = async (data) => {
//     // Handle form submission
//     console.log(data);
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <div className="flex space-x-4">
//           {/* Left Column */}
//           <div className="flex-1 space-x-4 mt-20">
//             {/* Username Section */}
//             <>
//               <h2 className="text-xl font-semibold mb-2">Description</h2>
//               <FormField
              
//                 control={form.control}
//                 name="username"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Title Here</FormLabel>
//                     <FormControl style={{ width: '100%' }}>
//                       <Input  placeholder="Enter your Contribution here" {...field} style={{ height: '200px' }} />
//                     </FormControl>
//                     <FormDescription>
//                       Validation
//                     </FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Validation Input Section */}
//               <>
//                 <h2 className="text-xl font-semibold mb-2 mt-20">Validation</h2>
//                 <FormField
//                   control={form.control}
//                   name="validationInput"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormControl style={{ width: '100%' }}>
//                         <Input placeholder="Enter validation info" {...field} style={{ height: '80px' }} />
//                       </FormControl>
//                       <FormDescription>
//                         Additional information for validation.
//                       </FormDescription>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </>
//             </>
//           </div>

//           {/* Right Column */}
//           <div className="flex-1 space-x-4 mt-20">
//             {/* Reward Input Section */}
//             <>
//               <h2 className="text-xl font-semibold mb-2">Reward</h2>
//               <FormField
//                 control={form.control}
//                 name="additionalInput"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl style={{ width: '30%' }}>
//                       <Input placeholder="Enter reward info" {...field} style={{ height: '40px' }} />
//                     </FormControl>
//                     <FormDescription>
//                       Set your Reward Amount.
//                     </FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </>

//             {/* File Input Section */}
//             <>
//               <h2 className="text-xl font-semibold mb-2 mt-=10">Insert File</h2>
//               <FormField
//                 control={form.control}
//                 name="fileInput"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl>
//                       <input type="file" {...field} />
//                     </FormControl>
//                     <FormDescription>
//                       Attach a file for extra information.
//                     </FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </>
//           </div>
//         </div>
// <div className='flex justify-center'>
//         <Button type="submit">Submit</Button>
//         </div>
//       </form>
//     </Form>
//   );
// }