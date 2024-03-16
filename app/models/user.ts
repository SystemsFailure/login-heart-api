import { DateTime } from 'luxon'
import { withAuthFinder } from '@adonisjs/auth'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { BaseModel, column, hasOne, belongsTo } from '@adonisjs/lucid/orm'
import type { HasOne, BelongsTo } from '@adonisjs/lucid/types/relations'
import Profile from '#models/profile'
import Role from './role.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string | null

  @column()
  declare phone: string | null

  @column()
  declare email: string

  @column()
  declare password: string

  @column()
  declare roleId: number

  /**
   * RELATIONSHIPS
   */
  @hasOne(() => Profile)
  declare profile: HasOne<typeof Profile>

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)
}