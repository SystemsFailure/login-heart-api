import { BaseSchema } from '@adonisjs/lucid/schema'

// 1. id - уникальный идентификатор роли (тип данных integer, автоинкремент)
// 2. name - наименование роли (тип данных string, максимальная длина 255 символов)
// 3. description - описание роли (тип данных text, детальное описание назначения роли)
// 4. created_at - дата создания записи о роли (тип данных datetime)
// 5. updated_at - дата последнего обновления записи о роли (тип данных datetime)
// 6. is_admin - является ли роль администраторской (тип данных boolean)
// 7. is_moderator - является ли роль модераторской (тип данных boolean)
// 8. is_user - является ли роль пользовательской (тип данных boolean)
// 9. is_premium - является ли роль премиум пользовательской (тип данных boolean)
// 10. is_verified - является ли роль верифицированной (тип данных boolean)
// 11. is_blocked - является ли роль заблокированной (тип данных boolean)
// 12. can_like - есть ли возможность ставить лайки (тип данных boolean)
// 13. can_message - есть ли возможность отправлять сообщения (тип данных boolean)
// 14. can_view_profiles - есть ли возможность просматривать профили (тип данных boolean)
// 15. can_block_users - есть ли возможность блокировать пользователей (тип данных boolean)
// 16. can_report_users - есть ли возможность жаловаться на пользователей (тип данных boolean)
// 17. can_create_events - есть ли возможность создавать события (тип данных boolean)
// 18. can_join_events - есть ли возможность присоединяться к событиям (тип данных boolean)
// 19. can_view_timeline - есть ли возможность просматривать ленту событий (тип данных boolean)
// 20. can_send_gifts - есть ли возможность отправлять подарки (тип данных boolean)

export default class extends BaseSchema {
  protected tableName = 'roles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name', 255).notNullable()
      table.text('description').notNullable()
      table.boolean('is_admin').defaultTo(false)
      table.boolean('is_moderator').defaultTo(false)
      table.boolean('is_user').defaultTo(false)
      table.boolean('is_premium').defaultTo(false)
      table.boolean('is_verified').defaultTo(false)
      table.boolean('is_blocked').defaultTo(false)
      table.boolean('can_like').defaultTo(true)
      table.boolean('can_message').defaultTo(true)
      table.boolean('can_view_profiles').defaultTo(true)
      table.boolean('can_block_users').defaultTo(true)
      table.boolean('can_report_users').defaultTo(true)
      table.boolean('can_create_events').defaultTo(false)
      table.boolean('can_join_events').defaultTo(false)
      table.boolean('can_view_timeline').defaultTo(true)
      table.boolean('can_send_gifts').defaultTo(false)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}