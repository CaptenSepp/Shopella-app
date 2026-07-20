export const getServerConfig = () => {
  const supabaseUrl = process.env.VITE_SUPABASE_URL
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY

  if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error("Supabase server environment variables are missing.")
  }

  return { supabaseUrl, supabaseSecretKey }
}
