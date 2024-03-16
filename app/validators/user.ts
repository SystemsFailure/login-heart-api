import { Database } from '@adonisjs/lucid/database'
import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
    vine.object({
      name: vine.string().trim().minLength(1).maxLength(256),
      email: vine.string().unique(async (db: Database, value: string, _) => {
        const email = await db
            .from('users')
            .where('email', value)
            .first()
        return email ? false : true
      }),
      password: vine.string().maxLength(100).trim(),
    })
  )
