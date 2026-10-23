import { createBrowserClient, createServerClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const createSupabaseBrowserClient = (): SupabaseClient => {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

export const createSupabaseServerClient = (): SupabaseClient => {
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return []
      },
      setAll() {},
    },
  })
}

export const getSupabaseBrowserClient = (): SupabaseClient => {
  if (typeof window === 'undefined') {
    return createSupabaseServerClient()
  }
  return createSupabaseBrowserClient()
}