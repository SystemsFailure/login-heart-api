import type { ApplicationService } from '@adonisjs/core/types'
import RabbitMQManager, { defaultOptions } from '../app/rabbit/index.js';
import chalk from 'chalk';

export default class RabbitmqProvider {
  constructor(protected app: ApplicationService) {}

  async register() {}
  
  async boot() {
    const rabbitClient: RabbitMQManager = new RabbitMQManager();
    const queueName: string = "authQueue"
    await rabbitClient.connect(defaultOptions);
    await rabbitClient.assertQueue(queueName, { durable: true });
    console.info(chalk.cyan('[*] CONNECTED TO RABBITMQ SUCCESSFULY'));
}
}