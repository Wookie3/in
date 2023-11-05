import { createClient } from '@supabase/supabase-js';

const superbase = createClient(
    process.env.PUBLIC_SUPABASE_URL,
    process.env.PUBLIC_SUPABASE_KEY
    );
export default superbase;