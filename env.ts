import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	server: {
		SUPABASE_URL: z.string().url(),
		SUPABASE_SECRET_KEY: z.string(),
	},

	runtimeEnv: {
		SUPABASE_URL: process.env.SUPABASE_URL,
		SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY,
	},
})
