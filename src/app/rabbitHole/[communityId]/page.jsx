import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DataTable from './data-table.jsx'
import { columns } from './columns.jsx'
import {getData} from './data.js'
import Link from 'next/link'

// const getData = async () => {
//   return [
//     {
//       id: "728ed52f",
//       reward: 100,
//       status: "pending",
//       title: "Feedback component",
//       description:"Make a feedback component for a blogging website.",

//     },
//     {
//       id: "728ed52f",
//       reward: 250,
//       status: "pending",
//       title: "Homepage component",
//       description:"Make a homepage component for a blogging website.",
//     },
//     {
//       id: "728ed52f",
//       reward: 250,
//       status: "pending",
//       title: "Comment component",
//       description:"Make a comment component for a blogging website.",
//     },
//     {
//       id: "728ed52f",
//       reward: 100,
//       status: "complete",
//       title: "Feedback component",
//       description:"Make a feedback component for a blogging website.",
//     },
//     {
//       id: "728ed52f",
//       reward: 250,
//       status: "complete",
//       title: "Feedback component",
//       description:"Make a feedback component for a blogging website.",
//     },
//     {
//       id: "728ed52f",
//       reward: 250,
//       status: "pending",
//       title: "Feedback component",
//       description:"Make a feedback component for a blogging website.",
//     },
//     {
//       id: "728ed52f",
//       reward: 250,
//       status: "pending",
//       title: "Feedback component",
//       description:"Make a feedback component for a blogging website.",
//     },
//   ]
// };

const Proposals = async ({ params }) => {
    const supabase = createServerComponentClient({ cookies });
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }
    const data = await getData(params.communityId);
    const link = `/rabbitHole/${params.communityId}/submitProposal`;
    return (
        <div>
            <h1>Task List for Rabbit Hole: {params.communityId}</h1>
            <Link href={link}>Submit a Proposal</Link>
            <DataTable columns={columns} data={data} />
        </div>
    );
};
export default Proposals;