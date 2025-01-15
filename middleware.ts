import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const allowedOrigins = [
	'https://supabase-table.vercel.app',
	'http://localhost:3000',
	'http://localhost:3001',
]

export function middleware(request: NextRequest) {
	const origin = request.headers.get('origin')

	console.log('Origem da requisição:', origin) // Log para debug

	// Permite requisições sem origem (como de Postman ou curl)
	if (!origin) {
		return NextResponse.next()
	}

	if (!allowedOrigins.includes(origin)) {
		console.log('Origem não permitida:', origin) // Log para debug
		// Retorna 403 em vez de 400 para origens não permitidas
		return new NextResponse(null, {
			status: 403,
			statusText: 'Forbidden',
			headers: {
				'Content-Type': 'text/plain',
			},
		})
	}

	const response = NextResponse.next()

	response.headers.set('Access-Control-Allow-Origin', origin)
	response.headers.set(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, OPTIONS',
	)
	response.headers.set(
		'Access-Control-Allow-Headers',
		'Content-Type, Authorization',
	)
	response.headers.set('Access-Control-Allow-Credentials', 'true')
	response.headers.set('Access-Control-Max-Age', '86400')

	return response
}

export const config = {
	matcher: '/api/:path*',
}
