import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare last_name: string

  @column()
  declare age: number

  @column()
  declare orientation: string

  @column()
  declare interests: string

  @column()
  declare bio: string

  @column()
  declare height: number

  @column()
  declare weight: number

  @column()
  declare marital_status: string

  @column()
  declare education: string

  @column()
  declare occupation: string

  @column()
  declare dating_goal: string

  @column()
  declare hobbies: string

  @column()
  declare additional_contact_info: string

  @column.date()
  declare date_of_birth: DateTime

  @column()
  declare city: string

  @column()
  declare country: string

  @column()
  declare is_verified: boolean

  @column()
  declare is_premium: boolean

  @column()
  declare is_active: boolean

  @column.dateTime()
  declare last_login: DateTime

  @column()
  declare online_status: string

  @column()
  declare user_id: number

  @column()
  declare photo_id: number
  /**
   * RELATIONSHIPS
   */

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}