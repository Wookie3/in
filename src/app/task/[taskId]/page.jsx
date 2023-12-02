import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Proposal from './proposal.jsx';

const TaskDetails = async ({ params }) => {
    const supabase = createServerComponentClient({ cookies });
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }
    const id = params.taskId;
    return (
        <div className=''>
            <h1>Task Details for task {id}</h1>
            <Proposal taskId={id} />
        </div>
    );
};
export default TaskDetails;