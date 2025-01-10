// This check can be removed
// it is just for tutorial purposes

import { env } from '@/env'

export const hasEnvVars = env.SUPABASE_URL && env.SUPABASE_SECRET_KEY
