import type { UserDataResponse } from '@/types/users'
import { supabase } from '@/utils/supabase/client'
import { type NextRequest, NextResponse } from 'next/server'

export const GET = async () => {
	try {
		// Buscar os usuários do Supabase
		const { data: users, error } = await supabase
			.from('users')
			.select('*')
			.order('createdAt', { ascending: false })
			.returns<UserDataResponse[]>()

		if (error) {
			console.error('Erro ao buscar usuários:', error)
			return NextResponse.json(
				{ error: 'Erro ao buscar usuários' },
				{ status: 500 },
			)
		}

		// Retornar os usuários
		return NextResponse.json(users)
	} catch (error) {
		console.error('Erro inesperado:', error)
		return NextResponse.json(
			{ error: 'Erro interno do servidor' },
			{ status: 500 },
		)
	}
}

export const OPTIONS = (_request: NextRequest) => {
	return new NextResponse(null, {
		status: 204,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		},
	})
}
