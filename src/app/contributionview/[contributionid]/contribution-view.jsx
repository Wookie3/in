// Import necessary libraries and components
"use client";

import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import ScrollableContainer from './ScrollableContainer';

// Define the schema for form validation
const formSchema = z.object({
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
});

// Main component for the Contribution View page
export function MyRenamedComponent() {  // Change the component name to MyRenamedComponent
  // Set up form validation using react-hook-form
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  // Create a Supabase client instance
  const supabase = createClientComponentClient();

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Logic to handle form submission and Supabase interaction
      console.log('Data before sending to Supabase:', data);
      const { data: newContribution, error } = await supabase
        .from('Contribution')
        .insert({
          description: data.description,
          created_at: new Date().toISOString(),
        });

      if (error) {
        console.error('Error while inserting data into the database:', error);
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
      {/* Main layout with two columns */}
      <div className="flex space-x-4">
        {/* Left Column */}
        <div className="flex-1 space-x-4 mt-20">
          {/* Card for Contribution Input */}
          <div className="border p-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Title</h2>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description:</FormLabel>
                  <FormControl style={{ width: '100%' }}>
                    <Input placeholder="Details incluided here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Validation List */}
          <div style={{ width: '50%' }} className="border p-4">
            <h2  className="text-xl font-semibold mb-2">Validation List</h2><br></br>
            {/* Display users and stakes dynamically */}
            {/* You may use a map function here to iterate through the list */}
            <div>
            <ScrollableContainer>
              <div>User 1 - Stake 1</div>
              <div>User 2 - Stake 2</div>
              <div>User 1 - Stake 1</div>
              <div>User 2 - Stake 2</div>
              <div>User 1 - Stake 1</div>
              <div>User 2 - Stake 2</div>
              <div>User 1 - Stake 1</div>
              <div>User 2 - Stake 2</div>
              <div>User 1 - Stake 1</div>
              <div>User 2 - Stake 2</div>
              <div>User 1 - Stake 1</div>
              <div>User 2 - Stake 2</div>
              <div>User 1 - Stake 1</div>
              <div>User 2 - Stake 2</div>
              <div>User 1 - Stake 1</div>
              <div>User 2 - Stake 2</div>
              <div>User 1 - Stake 1</div>
              <div>User 2 - Stake 2</div>
              <div>User 1 - Stake 1</div>
              <div>User 2 - Stake 2</div>
              {/* ... more users and stakes ... */}
              </ScrollableContainer>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 space-x-4 mt-20">
          {/* Validation Section */}
          <div className="border p-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Validation</h2>
            {/* Thumbs Up/Down icons */}
            <div>
              <button>👍</button>
              <button>👎</button>
            </div>
            {/* Stake Input */}
            <FormControl>
            <Input
        style={{ width: '100px' }}
        placeholder="Enter Fees"
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        title="Only numbers are allowed"
      />
            </FormControl><br></br><br></br>
            {/* Submit Button */}
            <Button type="submit">Submit</Button>
          </div>

          {/* Validators List */}
          <div className="border p-4">
            <h2 className="text-xl font-semibold mb-2">Validators</h2>
            {/* Display list of validators */}
            <div>
            <ScrollableContainer>
              <div>Validator #1</div>
              <div>Validator #2</div>
              <div>Validator #1</div>
              <div>Validator #2</div>
              <div>Validator #1</div>
              <div>Validator #2</div>
              <div>Validator #1</div>
              <div>Validator #2</div>
              <div>Validator #2</div>
              <div>Validator #2</div>   
              <div>Validator #2</div>
              <div>Validator #1</div>
              <div>Validator #2</div>
              <div>Validator #1</div>
              <div>Validator #2</div>
              <div>Validator #1</div>
              <div>Validator #2</div>
              <div>Validator #2</div>
              <div>Validator #2</div>
              </ScrollableContainer>
              {/* ... more validators ... */}
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}