"use client";

import { useState } from "react";
import { Carrot, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { ModeToggle } from "@/components/mode-toggle";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import next from "next";
// import AddCarrots from "./addCarrots";


const ProfilePage = ({ profileData, walletData }) => {
  const supabase = createClientComponentClient();
  const [amount, setAmount] = useState(0);
  const router = useRouter();
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleString();
  };
  const displayStatus = () => {
    return profileData?.is_active ? "Active" : "Inactive";
  };
  const updateWallet = async (walletData, amount) => {
    const newBalance = walletData?.balance + parseInt(amount);
    if (newBalance < 0) {
      console.log("Wallet funds cannot fall below zero.");
      return;
    }
    const { error: updateError } = await supabase
      .from("Wallet")
      .update({ balance: newBalance })
      .eq("wallet_id", walletData.wallet_id);
    if (updateError) {
      console.log("Error updating wallet: ", updateError);
    }
    console.log("Wallet: ", walletData);
    console.log("Amount: ", amount);
    router.refresh();
  };
  return (
    <div className="flex justify-center p-8">
      <Card className="max-w-lg bg-slate">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>Profile</CardTitle>
            <div className="flex justify-end px-6 pb-4">
              <Badge className="px-4 py-1 gap-1.5">
                Wallet: <Carrot className="w-5 h-5 stroke-0.25" />
                {walletData?.balance}
              </Badge>
            </div>
          </div>
          <CardDescription>
            Welcome back {profileData?.username}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col justify-self-center gap-y-3">
            <p>Last Updated Profile: {formatDate(profileData?.updated_at)} </p>
            <p>
              Current Username:{" "}
              <Badge className="px-3 py-1 text-base" variant="outline">
                {profileData?.username}
              </Badge>
            </p>
            <p>Profile created: {formatDate(profileData?.created_at)}</p>
            <p>Account Status: {displayStatus()}</p>
          </div>
        </CardContent>
        <CardFooter className="gap-2 flex justify-between">
          <AlertDialog>
            <AlertDialogTrigger>
                <Button className="gap-1 p-2 "><Plus /><Carrot/></Button></AlertDialogTrigger>
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

                <AlertDialogAction
                  onClick={() => updateWallet(walletData, amount)}
                >
                  Submit
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <ModeToggle />
        </CardFooter>
      </Card>
    </div>
  );
};
export default ProfilePage;
