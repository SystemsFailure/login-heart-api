import type { ApplicationService } from '@adonisjs/core/types'
import RedisDB from '../app/redis/index.js';
import chalk from 'chalk';

export default class RabbitmqProvider {
  constructor(protected app: ApplicationService) {}

  async register() {}
  
  async boot() {
    const redis: RedisDB = new RedisDB();
    await redis.connDB();
    console.info(chalk.cyan('[*] CONNECTED TO REDIS SUCCESSFULY'));
}
}