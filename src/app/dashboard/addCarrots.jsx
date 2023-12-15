'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Carrot } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast"


const AddCarrots = (walletData) => {
  const [amount, setAmount] = useState(0);
  const router = useRouter();
  const { toast } = useToast();
  const updateWallet = async () => {
    const supabase = createClientComponentClient();
    const newBalance = walletData.walletData?.balance + parseInt(amount);
    if (newBalance < 0) {
      toast({
        variant: "destructive",
        title: "Error removing funds",
        description: "Your wallet balance cannot fall below zero.",
      })
      // console.log("Wallet funds cannot fall below zero.");
      return;
    }
    const { error: updateError } = await supabase
      .from("Wallet")
      .update({ balance: newBalance })
      .eq("wallet_id", walletData.walletData.wallet_id);
    if (updateError) {
      console.log("Error updating wallet: ", updateError);
    }
    router.refresh();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="gap-1 p-2 ">
          <Plus />
          <Carrot />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add Carrots</AlertDialogTitle>
          <AlertDialogDescription>
            Enter the amount you would like to add:
          </AlertDialogDescription>
          <Label htmlFor="amount">Amount</Label>
          <Input
            type="number"
            id="amount"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction onClick={() => updateWallet(walletData, amount)}>
            Submit
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default AddCarrots;
