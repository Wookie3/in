import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const TaskList = async ({ params }) => {
    const supabase = createServerComponentClient({ cookies });
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }
    return (
        <div>
            <h1>Task List for Rabbit Hole: {params.groupId}</h1>
        </div>
    );
};
export default TaskList;