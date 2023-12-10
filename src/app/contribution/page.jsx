

import Link from "next/link";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server'

import React from 'react';
//import { useRouter } from 'next/navigation';

import Contributionform from './contribution';





async function Contributionsubmitpage({ params }) {
 // const router = useRouter();
  //console.log('Router:', router);
  const supabase = createServerComponentClient({ cookies });
  const {
      data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
      redirect('/login');
  }


  const taskData = {
    taskId: 123,
    taskTitle: 'Develop a Rabbit-Hole Community Website',
    taskReward: '400',
    taskDeadline: '2023-12-31',
    taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
    taskValidation: 'Información de validación',
    taskFile: 'carrot.pdf',
  }; // Here the route query goes for tasks

  return (
    <div>
      <h1>Contribution Page for {taskData.taskTitle}</h1>
      <Contributionform
       
        taskTitle={taskData.taskTitle}
        taskReward={taskData.taskReward}
        taskDeadline={taskData.taskDeadline}
        taskDescription={taskData.taskDescription}
        taskValidation={taskData.taskValidation}
        taskFile={taskData.taskFile}
      />
    </div>
  );
}

export default Contributionsubmitpage;



// import React from 'react';
// import { ProfileForm } from './contribution';

// function ContributionPage() {
//   return (
//     <div>
//       <h1>Contribution Page</h1>
//       <ProfileForm />
//     </div>
//   );
// }

// export default ContributionPage;