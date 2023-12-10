/* Server Side for Contribution View Page*/


//removed 'use client' directive as this is server component

import Link from "next/link";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server'

// pages/contribution.js
import React from 'react';
import Contributionview from './contribution-view.jsx';


//Gets profile data for user
const getProfile = async (user, supabase) => {
  const { data: profileData, error: profileError } = await supabase
  .from('Profile')
  .select(`profile_id, username`)
  .eq('user_id', user.id)
  .single()

  if (profileError) {
      //console.error(profileError)
      throw profileError;
  }

  return profileData;
}

//Gets info about the selected contribution to view
const getContribution_data = async (supabase, contribution_id) => {
    
  const { data: contributionData, error: contributionError } = await supabase
  .from('Contribution')
  .select(`contribution_id, create_at, title, description, Proposal (proposal_id, title), Profile (profile_id, username)`)
  .eq('contribution_id', contribution_id)
  .single()

  if (contributionError) {
      console.error(contributionError)
      throw contributionError;
  }

  return contributionData;
}

const getValidations = async (supabase, contribution_id) => {
    
  const { data: validationData, error: validationError } = await supabase
  .from('Validation')
  .select(`validation_id, create_at, review, stake_amount, is_for, Profile (profile_id, username)`)
  .eq('contribution_id', contribution_id)

  if (validationError) {
      console.error(validationError)
      throw validationError;
  }

  return validationData;
}


async function ContributionPage({ params }) {

  const supabase = createServerComponentClient({ cookies });
  const {
      data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
      redirect('/login');
  }

  const contribution_id = params.contributionid;

  const selectedContribution = await getContribution_data(supabase, contribution_id);
  //console.log(selectedContribution);

  const validations = await getValidations(supabase, contribution_id);
  //console.log(validations)

  const userProfile = await getProfile(user, supabase);
  //console.log(userProfile);


  return (
    <div>
      <h1>Contribution View Page</h1>

        <Contributionview contribution={selectedContribution} validations={validations} userprofile={userProfile} />

    </div>
  );
}
export default ContributionPage;


// function ContributionPage() {
//   const taskData = {
//     taskId: 123,
//     taskTitle: 'Develop a Rabbit-Hole Community Website',
//     taskReward: '400',
//     taskDeadline: '2023-12-31',
//     taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
//     taskValidation: 'Información de validación',
//     taskFile: 'carrot.pdf',
//   };

//   return (
//     <div>
//       <h1>Contribution View Page</h1>
//       {/* Use the renamed component */}
//       <MyRenamedComponent
//         taskTitle={taskData.taskTitle}
//         taskReward={taskData.taskReward}
//         taskDeadline={taskData.taskDeadline}
//         taskDescription={taskData.taskDescription}
//         taskValidation={taskData.taskValidation}
//         taskFile={taskData.taskFile}
//       />
//     </div>
//   );
// }

// export default ContributionPage;