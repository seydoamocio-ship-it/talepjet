import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  "https://coqfxymdiuartyccthlf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvcWZ4eW1kaXVhcnR5Y2N0aGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1Mzk3OTgsImV4cCI6MjA5MzExNTc5OH0.72-LHt8baKxXgPfjZbh1wfudvnZZb7tS0AX2KxEbZZY"
)