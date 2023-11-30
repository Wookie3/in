import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DataTable from './data-table.jsx'
import { columns } from './columns.jsx'

const getData = async () => {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 250,
      status: "complete",
      email: "m2@example.com",
    },
    {
      id: "728ed52f",
      amount: 250,
      status: "complete",
      email: "m2@example.com",
    },
    {
      id: "728ed52f",
      amount: 250,
      status: "complete",
      email: "m2@example.com",
    },
    {
      id: "728ed52f",
      amount: 250,
      status: "complete",
      email: "m2@example.com",
    },
    {
      id: "728ed52f",
      amount: 250,
      status: "complete",
      email: "my3@example.ca",
    },
    {
      id: "728ed52f",
      amount: 250,
      status: "complete",
      email: "m2@apple.com",
    },
  ]
};

const Proposals = async ({ params }) => {
    const supabase = createServerComponentClient({ cookies });
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }
    const data = await getData();
    return (
        <div>
            <h1>Task List for Rabbit Hole: {params.groupId}</h1>
            <DataTable columns={columns} data={data} />
        </div>
    );
};
export default Proposals;