import Role from '#models/role'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class UserRolesMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    await ctx.auth.use('api').authenticate()
    const user = ctx.auth.user
    const role = await Role.findBy('id', user?.roleId)
    
    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}