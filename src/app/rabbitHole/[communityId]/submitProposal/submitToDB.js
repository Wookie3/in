import { createClient } from "@supabase/supabase-js";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { use } from "react";


const submitToDB = async (data) => {
  const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(URL, KEY);

  const { error: insertError } = await supabase
    .from('Proposal')
    .insert({
      create_at: data.create_at,
      update_at: data.update_at,
      description: data.description,
      deadline: data.deadline,
      rewards: data.rewards,
      rabbithole_id: data.rabbithole_id,
      title: data.title,
      user_id: data.user_id,
      effort: data.effort,
      status: data.status,
    })
  if (insertError) { console.log('error inserting data:', insertError) };
};

export default submitToDB;

// {
//     proposal_id: 2,
//     create_at: '2023-11-27T04:51:32+00:00',
//     update_at: '2023-11-27T04:51:35+00:00',
//     description: 'Make a comment component for a blogging website.',
//     expiration: '2023-12-17T04:51:57+00:00',
//     validation_period: '2023-12-31T04:52:06+00:00',
//     rewards: 30,
//     rabbithole_id: 1,
//     title: 'Comment Compenent',
//     user_id: '44a1e83e-aea0-4919-90b2-5b8d42499262',
//     effort: 20
//   }