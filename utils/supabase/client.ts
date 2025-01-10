import { env } from '@/env'
import { createBrowserClient } from '@supabase/ssr'

export const createClient = () =>
	createBrowserClient(env.SUPABASE_URL, env.SUPABASE_SECRET_KEY)
