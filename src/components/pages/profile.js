'use client';
import { useState } from "react";
import Link from 'next/link';

const ProfilePage = (data) => {
    const [Data, setData] = useState(data)
    // all data is in Data object ie:
    // console.log(Data.walletData); // data object from table: Wallet
    // console.log(Data.profileData);// data object from table: Profile
    return(
        <div>
            <h1>Profile Page.</h1>
            <p>Welcome back!</p>
            <p>User: {Data.profileData.username}</p>
            <p>Wallet Total: {Data.walletData.balance}</p>
            <Link href='/rabbitHole/42'>A Rabbit Hole</Link>
            <p>
            <Link href='/submitProposal'>Submit a Proposal</Link>
            </p>
        </div>
    )
};
export default ProfilePage;