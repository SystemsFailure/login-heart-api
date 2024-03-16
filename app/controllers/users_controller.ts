import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
    async index({response, params, auth} : HttpContext) {
        // Здесь теперь есть роли
        const __auth__ =  await auth.use('api').authenticate()

        const currentPage = params.currentPage
        const perPage = params.perPage

        if(!currentPage || !perPage ) response.apiError('you is not defined the currentPage and perPage')

        try {
            if(auth.use('api').isAuthenticated) {
                const users = await User.query().paginate(currentPage, perPage)
                response.apiSuccess(users)
            } else {
                response.apiError('you is not authenticated')
            }
        } catch (error) {
            response.apiError(error)
        }
    }

    async store({request, response} : HttpContext) {
        try {
            const name = request.input('name')
            const email = request.input('email')
            const password = request.input('password')

            const user = await User.create({
                name: name,
                email: email,
                password: password,
                roleId: 2,
            })

            const token = await User.accessTokens.create(user)

            response.apiSuccess({data: user, token: token})
        } catch (error) {
            response.apiError(error)
        }
    }

    async alone({request, response} : HttpContext) {
        try {
            const user = await User.findBy('id', request.param('id'))
            response.apiSuccess(user)
        } catch (error) {
            response.apiError(error)
        }
    }

    async update({request, response} : HttpContext) {
        try {
            const newData = request.all()
            const user = await User.find(request.param('id'))
            if(user) {
                user.merge(newData)
                await user.save()
            }
            response.apiSuccess('data updated')
        } catch (error) {
            response.apiError(error)
        }
    }
}