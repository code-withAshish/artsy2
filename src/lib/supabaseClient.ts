import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jjoagbmykizulwdmhzzn.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impqb2FnYm15a2l6dWx3ZG1oenpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcxODg5ODYsImV4cCI6MjAzMjc2NDk4Nn0.V55rgAFZLi8Ttq9hhtSBNoV2apz_BDOoCEdPyuJzWm8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
