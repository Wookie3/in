// Dashboard
import Link from "next/link";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const Dashboard = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Placeholder data
  const carrotBalance = 45231.89;
  const myCommunities = [
    { name: 'Community #1', role: 'Admin' },
    { name: 'Community #2', role: 'Member' },
    { name: 'Community #3', role: 'Member' },
  ];

  return (
    <div className="flex">
      <div className="flex flex-col p-4 bg-gray-200 border rounded">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-700">All the Rabbit Holes that you belong to here.</p>
        <Link href="/rabbitHole/42" className="text-blue-500 mt-2">
          RabbitHole
        </Link>
      </div>

      <div className="flex flex-col p-4 ml-4 bg-gray-200 border rounded">
        <h2 className="text-xl font-bold mb-2">Job Rabbit Holes</h2>
        <div className="mb-2">
          <label htmlFor="communitySearch" className="text-gray-700">Search for Communities:</label>
          <input type="text" id="communitySearch" className="border border-black px-3 py-2" />
        </div>
        <div className="flex flex-col">
          <p className="text-gray-700">Community #1</p>
          <p className="text-gray-700">Community #2</p>
          <p className="text-gray-700">Community #3</p>
          {/* Add more communities dynamically */}
        </div>
      </div>

      <div className="flex flex-col p-4 ml-4 bg-gray-200 border rounded">
        <p className="text-gray-700">My carrot balance: {carrotBalance}</p>
        <div className="flex flex-col mt-2">
          <p className="text-gray-700">Community #1: Admin</p>
          <p className="text-gray-700">Community #2: Member</p>
          <p className="text-gray-700">Community #3: Member</p>
          {/* Add more communities dynamically */}
        </div>
      </div>

      <div className="flex flex-col p-4 ml-4 bg-gray-200 border rounded">
        <h2 className="text-xl font-bold mb-2">Create a Community</h2>
        <form className="flex flex-col">
          <label htmlFor="communityName" className="text-gray-700 mb-1">Name:</label>
          <input type="text" id="communityName" className="border border-black px-3 py-2 mb-2" required />

          <label htmlFor="communityDescription" className="text-gray-700 mb-1">Description:</label>
          <textarea id="communityDescription" className="border border-black px-3 py-2 mb-2" required></textarea>

          <label htmlFor="prioritationReward" className="text-gray-700 mb-1">Prioritation Reward:</label>
          <input type="text" id="prioritationReward" className="border border-black px-3 py-2 mb-2" required />

          <label htmlFor="validationReward" className="text-gray-700 mb-1">Validation Reward:</label>
          <input type="text" id="validationReward" className="border border-black px-3 py-2 mb-2" required />

          <label htmlFor="protocolFee" className="text-gray-700 mb-1">Protocol Fee:</label>
          <input type="text" id="protocolFee" className="border border-black px-3 py-2 mb-2" required />

          <div className="flex mt-2">
            <button type="button" className="bg-gray-500 text-white px-4 py-2 mr-2">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
