import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string | undefined

if (!supabaseUrl || !supabaseAnonKey) {
  // It's useful to surface this early during development.
  // In production server code you may want to throw instead.
  console.warn('Supabase env vars are not set: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '')

export function createServiceRoleClient(): SupabaseClient {
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceRole || !supabaseUrl) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL in environment')
  }
  return createClient(supabaseUrl, serviceRole)
}

export type { SupabaseClient }
