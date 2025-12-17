import { createClient } from "@supabase/supabase-js";

// ใส่ URL และ Key ของคุณที่นี่
const supabaseUrl = "https://jxllyoukbiczoepyluhc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4bGx5b3VrYmljem9lcHlsdWhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5NjQwNDcsImV4cCI6MjA4MTU0MDA0N30.NZohKsGVLqB1d8q28D_1RqlL6YhNKvAOuXs_LjMXa6w";
export const supabase = createClient(supabaseUrl, supabaseKey);
