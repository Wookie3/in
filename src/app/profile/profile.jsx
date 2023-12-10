"use client";

import { useState } from "react";
import Link from "next/link";
import { Carrot, RefreshCw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { set } from "date-fns";

const ProfilePage = (data) => {
  const supabase = createClientComponentClient();
  const [Data, setData] = useState(data);

    // all data is in Data state (not deconstructed) ie:
    // console.log(Data.walletData); // data object from table: Wallet
    // console.log(Data.profileData);// data object from table: Profile
    const formatDate = (date) => {
        const d = new Date(date);
        return d.toLocaleString();
    };
    const displayStatus = () => {
        return Data.profileData?.is_active ? "Active" : "Inactive";
    };
    //   const [switchStatus, setSwitchStatus] = useState(Data.profileData?.is_active);
    // const changeStatus = async (profileData) => {
    //     return async () => {
    //     const { error: updateError } = await supabase
    //         .from("Profile")
    //         .update("is_active", !profileData.is_active)
    //         .eq("profile_id", profileData.profile_id);
    //     if (updateError) {
    //         console.log("Error updating status: ", error);
    //     }
    //     setSwitchStatus(!switchStatus);
    // }};
    return (
        <div className="flex justify-center p-8">
            <Card className="max-w-lg bg-slate">
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>Welcome back {Data.profileData?.username}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-end px-6 pb-4">
                        <Badge className="px-4 py-1 gap-1.5">
                            Wallet: <Carrot className="w-5 h-5 stroke-0.25" />{Data.walletData?.balance}
                        </Badge>
                    </div>
                    <div className="flex flex-col justify-self-center gap-y-3">
                        <p>Last Updated Profile: {formatDate(Data.profileData?.updated_at)} </p>
                        <p>Current Username: <Badge className='px-3 py-1 text-base' variant='outline'>{Data.profileData?.username}</Badge></p>
                        <p>Profile created: {formatDate(Data.profileData?.created_at)}</p>
                    </div>
                </CardContent>
                <CardFooter className="gap-2">
                    <p>Account Status: {displayStatus()}</p>
                    {/* <Switch
                        id="account-status"
                        checked={switchStatus}
                        onCheckedChange={changeStatus(Data.profileData)}
                    /> */}
                </CardFooter>
            </Card>
        </div>
    );
};
export default ProfilePage;
