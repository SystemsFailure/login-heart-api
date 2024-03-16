import User from "#models/user";
import { createUserValidator } from "#validators/user";
import { TransactionClientContract } from "@adonisjs/lucid/types/database";
import TransactionService from "./transaction.service.js";
import { ModelPaginatorContract } from "@adonisjs/lucid/types/model";

interface UserPaginationDTO {
    currentPage: number,
    perPage: number,
}

interface UserDTO {
    name: string,
    email: string,
    password: string,
}

export default class UserService {

    public async index(data: UserPaginationDTO) : Promise<ModelPaginatorContract<User>>
    {
        return await User.query().paginate(data.currentPage, data.perPage)
    }

    public async create(data: UserDTO, roleId: number) : Promise<User | undefined>
    {
        const payload: UserDTO = await createUserValidator.validate(data);
        if(payload) {
            const transactionService: TransactionService = new TransactionService();
            const trx: TransactionClientContract = await transactionService.create({})

            if(trx) {
                const user: User = new User();
                user.name = payload.name;
                user.email = payload.email;
                user.password = payload.password;
                user.roleId = roleId;
                
                await user.useTransaction(trx)

                await user.save();
                await trx.commit();
                
                return user
            }
        }
    }

    public async getOne(id: number) : Promise<User | null>
    {
        return await User.query().where('id', id).first();
    }
}