import { Database } from "@adonisjs/lucid/database";
import db from "@adonisjs/lucid/services/db";
import { IsolationLevels, TransactionClientContract } from "@adonisjs/lucid/types/database";

interface TransactionOptions {
    isolationLevel?: IsolationLevels,
}
// Здесь определен и реализован небольщой интерфейс по работе с транзакциями
export default class TransactionService 
{
    protected database: Database;
    public trx: TransactionClientContract | null;

    // Инициализация
    constructor() 
    {
        this.database = db;
        this.trx = null;
    }
    // Создаем и записываем транзакцию, после возвращаем this - небольшая реализация паттерна builder
    public async createBuilder(
        options: TransactionOptions,
    ) : Promise<TransactionService>
    {
        const __trx__: TransactionClientContract = await this.database.transaction(options);
        this.trx = __trx__;
        return this;
    }
    public async create(options: TransactionOptions,) : Promise<TransactionClientContract>
    {
        return await this.database.transaction(options)
    }
    // Совершаем транзакцию
    public async commit(): Promise<void> 
    {
        if(this.trx != null) 
        {
            await this.trx.commit();
        }
    }
    // Откатываем транзакцию
    public async rollback(): Promise<void>
    {
        if(this.trx != null)
        {
            await this.trx.rollback();
        }
    }
}