import type { NextConfig } from 'next'

const allowedOrigins = [
	'https://supabase-table.vercel.app',
	'http://localhost:3000',
]

const nextConfig: NextConfig = {
	async headers() {
		return [
			{
				source: '/api/:path*',
				headers: [
					{
						key: 'Access-Control-Allow-Credentials',
						value: 'true',
					},
					{
						key: 'Access-Control-Allow-Origin',
						value: allowedOrigins.join(','), // Lista todas as origens permitidas
					},
					{
						key: 'Access-Control-Allow-Methods',
						value: 'GET,DELETE,PATCH,POST,PUT,OPTIONS',
					},
					{
						key: 'Access-Control-Allow-Headers',
						value:
							'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
					},
					{
						key: 'Access-Control-Max-Age',
						value: '86400',
					},
				],
			},
		]
	},
}

export default nextConfig
