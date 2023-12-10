

import React from 'react';
//import { useRouter } from 'next/navigation';

import { ProfileForm } from './contribution';

function ContributionPage() {
 // const router = useRouter();
  //console.log('Router:', router);

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
      <ProfileForm
       
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

export default ContributionPage;



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