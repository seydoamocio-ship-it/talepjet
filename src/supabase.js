import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  "https://coqfxymdiuartyccthlf.supabase.co",
  "BURAYA_ANON_PUBLIC_KEY"
)