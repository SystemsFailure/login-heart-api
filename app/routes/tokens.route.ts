import router from '@adonisjs/core/services/router'
import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

router.post('refreshToken', async ({ params, request } : HttpContext) => {
  const user = await User.findOrFail(params.id)
  const token = await User.accessTokens.create(
    user,
    ['*'],
    {
      name: request.input('token_name'),
      expiresIn: '30 days'
    }
  )

  return {
    type: 'bearer',
    value: token.value!.release(),
  }
}).prefix('api/v1/token')