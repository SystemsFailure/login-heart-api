import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare is_admin: boolean

  @column()
  declare is_moderator: boolean

  @column()
  declare is_user: boolean

  @column()
  declare is_premium: boolean

  @column()
  declare is_verified: boolean

  @column()
  declare is_blocked: boolean

  @column()
  declare can_like: boolean

  @column()
  declare can_message: boolean

  @column()
  declare can_view_profiles: boolean

  @column()
  declare can_block_users: boolean

  @column()
  declare can_report_users: boolean

  @column()
  declare can_create_events: boolean

  @column()
  declare can_join_events: boolean

  @column()
  declare can_view_timeline: boolean

  @column()
  declare can_send_gifts: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

    /**
   * RELATIONSHIPS
   */

  @hasMany(() => User)
  declare profile: HasMany<typeof User>
}