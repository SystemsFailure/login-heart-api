import { BaseSchema } from '@adonisjs/lucid/schema'

// enum - city, country, orientations, interests, educations, occupations, hobbies

export default class extends BaseSchema {
  protected tableName = 'profiles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('last_name').defaultTo('')
      table.integer('age').defaultTo(16)
      table.string('orientation').defaultTo('')
      table.string('interests').defaultTo('')
      table.text('bio')
      table.integer('height').defaultTo(0)
      table.integer('weight').defaultTo(0)
      table.string('marital_status').defaultTo('')
      table.string('education').defaultTo('')
      table.string('occupation').defaultTo('')
      table.string('dating_goal').defaultTo('')
      table.string('hobbies').defaultTo('')
      table.string('additional_contact_info').defaultTo('')
      table.date('date_of_birth').notNullable()

      table.string('city', 100)
      table.string('country', 100)

      table.boolean('is_verified').defaultTo(false)
      table.boolean('is_premium').defaultTo(false)
      table.boolean('is_active').defaultTo(true)
      table.datetime('last_login')
      table.string('online_status').defaultTo('offline')

      // REFERENCES
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('cascade')
      table.integer('photo_id').unsigned().references('id').inTable('photos').onDelete('cascade')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}