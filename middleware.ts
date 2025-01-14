import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const allowedOrigins = [
	'https://supabase-table.vercel.app',
	'http://localhost:3000',
]

export function middleware(request: NextRequest) {
	const origin = request.headers.get('origin')

	// Retorna null se a origem não estiver definida ou não estiver na lista de origens permitidas
	if (!origin || !allowedOrigins.includes(origin)) {
		return new NextResponse(null, {
			status: 400,
			statusText: 'Bad Request',
			headers: {
				'Content-Type': 'text/plain',
			},
		})
	}

	const response = NextResponse.next()

	// Configura os headers CORS com a origem específica que fez a requisição
	response.headers.set('Access-Control-Allow-Origin', origin)
	response.headers.set(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, OPTIONS',
	)
	response.headers.set(
		'Access-Control-Allow-Headers',
		'Content-Type, Authorization',
	)
	response.headers.set('Access-Control-Max-Age', '86400') // 24 horas em segundos

	return response
}

export const config = {
	matcher: '/api/:path*',
}
