"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Calendar } from "@/components/ui/calendar";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { usePathname, useRouter } from "next/navigation";
import { DatePicker } from "./datePicker";
import { CalendarIcon } from "lucide-react";
import { RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { createClient } from "@supabase/supabase-js";

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be between 3 and 12 characters",
  }),
  description: z
    .string()
    .min(3, {
      message: "Description must be at least 3 characters",
    })
    .max(100, {
      message: "Description must be less than 100 characters",
    }),
  deadline: z.date({
    required_error: "A deadline is required.",
  }),
  rewards: z.string().min(1, {
    message: "Must include a reward amount",
  }),
  effort: z.string().min(1, {
    message: "Must include an effort amount",
  }),
});

const SubmitProposalForm = ({ userId }) => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const pathname = usePathname();
  const rabbittHoleId = pathname.split("/")[2];
  const { toast } = useToast();
  const [Submitted, setSubmitted] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      effort: "",
      rewards: "",
    },
  });
  async function onSubmit(formdata) {
    const handleReload = () => {
      router.refresh();
    };
    // const createAt = new Date()
    //   .toJSON()
    //   .replace("T", " ")
    //   .replace(".", "+00")
    //   .slice(0, 22);
    // const updateAt = new Date()
    //   .toJSON()
    //   .replace("T", " ")
    //   .replace(".", "+00")
    //   .slice(0, 22);

    const rewards = parseFloat(formdata.rewards);
    const effort = parseFloat(formdata.effort);
    const date = new Date().toISOString();
  const rabbittHoleId = pathname.split("/")[2];
    const { error: insertError } = await supabase.from("Proposal").insert({
      create_at: date,
      update_at: date,
      description: formdata.description,
      deadline: formdata.deadline,
      rewards: rewards,
      rabbithole_id: rabbittHoleId,
      title: formdata.title,
      user_id: userId,
      effort: effort,
      status: "pending",
    });
    if (insertError) {
      console.log("error inserting data:", insertError);
    }

    if (Submitted === false) {
      setSubmitted(true);
    }

    toast({
      title: "Proposal submitted!",
      description: "Refresh page to see your proposal.",
      action: (
        <ToastAction onClick={handleReload} altText="Refresh">
          <RefreshCw />
        </ToastAction>
      ),
    });
  }

  function displaySubmitbtn() {
    return <Button type="submit">Submit</Button>;
  }
  function displaySuccess() {
    return <span className="font-semibold">Successfully Submitted!</span>;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Submit Proposal</Button>
      </DialogTrigger>

      <DialogContent className="md:max-w-[640px] max-h-80%">
        <DialogHeader>
          <DialogTitle>Submit a proposal</DialogTitle>
          <DialogDescription>
            Click Submit when you're done, be sure to fill out all fields.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title here" {...field} />
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
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                    Give a discription of your proposal and what needs to be
                    done to complete it.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Deadline</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-8">
              <FormField
                control={form.control}
                name="effort"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Effort required</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      How many hours will it take?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rewards"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rewards</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              {Submitted ? displaySuccess() : displaySubmitbtn()}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default SubmitProposalForm;
