import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import TokenService from '#services/token.service'
import UserService, { UserDTO } from '#services/user.service'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'
import { inject } from '@adonisjs/core'
import { TypeServiceResponse } from '../utils/apiServiceResponse.js'

@inject()
export default class UsersController {
    constructor(protected userService: UserService) {}
    
    async index({response, params, auth} : HttpContext) {
        // Здесь теперь есть роли
        await auth.use('api').authenticate()

        const currentPage: number = params.currentPage
        const perPage: number = params.perPage

        if(!currentPage || !perPage ) response.apiError('you is not defined the currentPage and perPage')

        try {
            if(auth.use('api').isAuthenticated) {
                const result: ModelPaginatorContract<User> = await this.userService.index(
                    {
                        currentPage, 
                        perPage,
                    }
                );
                response.apiSuccess(result.serialize());
            } else {
                response.apiError('you is not authenticated')
            }
        } catch (error) {
            response.apiError(error)
        }
    }

    async store({request, response} : HttpContext) {
        const tokenService = new TokenService();

        const name = request.input('name');
        const email = request.input('email');
        const password = request.input('password');
        try {
            const user: User | undefined = await this.userService.create(
                {
                    name: name, 
                    email: email, 
                    password: password
                }, 2);
            if(user) {
                const token = await tokenService.create(user);
                response.apiSuccess({data: user, token: token});
            }
        } catch (error) {
            response.apiError(error);
        }
    }

    async alone({request, response} : HttpContext) {
        const id: number = request.param('id')
        try {
            const user: User | null = await this.userService.getOne(id);
            if(user) {
                response.apiSuccess(user);
            } else {
                response.apiError(`User is not found, result = ${user}`)
            }
        } catch (error) {
            response.apiError(error);
        }
    }

    async update({request, response} : HttpContext) {
        const userId = request.param('id')
        try {
            const newData: UserDTO = {
                name: request.input('name'),
                email: request.input('email'),
                password: request.input('password'),
            };

            const result: TypeServiceResponse = await this.userService.merge(userId, newData);

            response.apiSuccess(result);
        } catch (error) {
            response.apiError(error);
        }
    }
}