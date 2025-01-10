import type { UserDataResponse } from '@/types/users'
import { createClient } from '@/utils/supabase/client'
import { NextResponse } from 'next/server'

export const GET = async () => {
	try {
		// Buscar os usuários do Supabase
		const { data: users, error } = await createClient()
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
