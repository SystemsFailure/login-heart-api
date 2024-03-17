import User from "#models/user";
import { UpdateUserValidator, createUserValidator } from "#validators/user";
import { TransactionClientContract } from "@adonisjs/lucid/types/database";
import TransactionService from "./transaction.service.js";
import { ModelPaginatorContract } from "@adonisjs/lucid/types/model";
import ServiceResponse, { TypeServiceResponse } from "../utils/apiServiceResponse.js";

interface UserPaginationDTO {
    currentPage: number,
    perPage: number,
}

export interface UserDTO {
    name: string,
    email: string,
    password: string,
}

export default class UserService {
    protected transactionService: TransactionService;
    protected serviceResponse: ServiceResponse<any>;
    constructor() {
        this.transactionService = new TransactionService();
        this.serviceResponse = new ServiceResponse();
    }
    public async index(data: UserPaginationDTO) : Promise<ModelPaginatorContract<User>>
    {
        return await User.query().paginate(data.currentPage, data.perPage)
    }

    public async create(data: UserDTO, roleId: number) : Promise<User | undefined>
    {
        const payload: UserDTO = await createUserValidator.validate(data);
        if(payload) {
            const trx: TransactionClientContract = await this.transactionService.create({})
            try {
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
            } catch (error) {
                trx.rollback();
                console.error(error);
            }
        }
    }

    public async getOne(id: number) : Promise<User | null>
    {
        return await User.query().where('id', id).first();
    }

    public async merge(id: number, data: UserDTO) : Promise<TypeServiceResponse>
    {
        const payload: UserDTO = await UpdateUserValidator.validate(data);
        if(payload) {
            const trx: TransactionClientContract = await this.transactionService.create({})
            try {
                const user: User | null = await User
                    .query({ client: trx })
                    .where('id', id).first();
    
                if(user) {
                    await user.merge(data);
                    await user.useTransaction(trx);
                    await user.save();
                    await trx.commit();
                }
                return this.serviceResponse.success(null, 'Data updated successfully').toJSON();
            } catch (error) {
                trx.rollback();
                return this.serviceResponse.failure(error, '').toJSON();
            }
        }
        return this.serviceResponse.failure(null, "payload is not valid").toJSON();
    }
}