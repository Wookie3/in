"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { usePathname, useRouter } from "next/navigation";

const formSchema = z.object({
  description: z
    .string()
    .min(3, {
      message: "Description must be at least 3 characters",
    })
    .max(50),
  amount: z.string().min(1, {
    message: "Must include a carrot amount",
  }),
});

const RequestCarrots = ({ userid }) => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const pathname = usePathname();
  const rabbittHoleId = pathname.split("/")[2];
  const { toast } = useToast();
  const [isSubmitted, setisSubmitted] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      amount: 0,
    },
  });
  async function onSubmit(formdata) {// TODO: Add a check to make sure the user is a dam or sire before displaying the request carrots button
    // Do something with the form values.
    const handleReload = () => {
      router.refresh();
    };
    const amount = parseFloat(formdata.amount);
    const { data: carrotPotData, error: carrotPotError } = await supabase
      .from("Carrot-Pot")
      .select("*")
      .eq("rabbithole_id", rabbittHoleId)
      .single();
    if (carrotPotError) {
      console.error(carrotPotError);
    }
    const newBalance = carrotPotData.balance + amount;
    const { error: carrotPotUpdateError } = await supabase
      .from("Carrot-Pot")
      .update({ balance: newBalance })
      .eq("rabbithole_id", rabbittHoleId)
      .select();
    if (carrotPotUpdateError) {
      console.error(carrotPotUpdateError);
    }
    if (isSubmitted === false) {
      setisSubmitted(true);
    }
    toast({
      title: "Carrot Request has been granted!",
      description: "Please refresh the page to see the updated balance.",
      action: (
        <ToastAction onClick={handleReload} altText="Refresh">
          Refresh
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
        <Button variant="outline">Request more Carrots</Button>
      </DialogTrigger>

      <DialogContent className="md:max-w-[640px] max-h-80%">
        <DialogHeader>
          <DialogTitle>Request more carrots</DialogTitle>
          <DialogDescription>Click Submit when you're done.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
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
                    Give a short reason why you need more carrots for your
                    Rabbit-Hole.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-2 grid-cols-3">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Request Amount</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                className="grid gap-2"
              />
            </div>

            <DialogFooter>
              {isSubmitted ? displaySuccess() : displaySubmitbtn()}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default RequestCarrots;
