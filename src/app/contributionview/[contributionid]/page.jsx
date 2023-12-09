"use client"; // Add the "use client" directive

// pages/contribution.js
import React from 'react';
import { MyRenamedComponent } from './contribution-view';

function ContributionPage() {
  const taskData = {
    taskId: 123,
    taskTitle: 'Develop a Rabbit-Hole Community Website',
    taskReward: '400',
    taskDeadline: '2023-12-31',
    taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
    taskValidation: 'Información de validación',
    taskFile: 'carrot.pdf',
  };

  return (
    <div>
      <h1>Contribution View Page</h1>
      {/* Use the renamed component */}
      <MyRenamedComponent
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