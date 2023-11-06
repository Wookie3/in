import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';
require('dotenv').config();

// having an issue with the .env file
// const key = process.env.PUBLIC_SUPABASE_URL
// const url = process.env.PUBLIC_SUPABASE_KEY
const PUBLIC_SUPABASE_URL="https://ekcqwqntguusgyhrijvg.supabase.co"
const PUBLIC_SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrY3F3cW50Z3V1c2d5aHJpanZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyMjM1MzgsImV4cCI6MjAxNDc5OTUzOH0.oZpSkFJqBLSZv_cNIpt3hJukfKdcOnV1a6074UltOjc"

const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY)
export default supabase;