'use client';
import { useState } from "react";

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
        </div>
    )
};
export default ProfilePage;