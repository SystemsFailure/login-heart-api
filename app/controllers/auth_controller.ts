import type { HttpContext } from '@adonisjs/core/http';
import hash from '@adonisjs/core/services/hash';
import User from '#models/user';

export default class AuthController {
	public async login({response, request} : HttpContext) {
		const email = request.input('email');
		const password = request.input('password');
		console.log(email)
		let user = await User.findBy('email', email);
		// if(authType === 'email') {
		// 	user = await User.find('email', email);
		// } else {
		// 	user = await User.find('phone', phone);
		// }
		
	    if (!user) response.apiError({ message: 'Invalid credentials', result: false }, 'Invalid auth')

	    await hash.verify(user!.password, password);

		response.apiSuccess({ user: user!, result: true })
	}

	public async signup({request, response} : HttpContext) {
		const { email, phone, name, password } = request.only(['email', 'phone', 'name', 'password']);

		const __hash__ = await hash.make(password)

		const user = await User.create({
			phone: phone,
			email: email,
			name: name,
			password: __hash__,
		})
		const token = await User.accessTokens.create(
				user,
				['*'],
				{
				  expiresIn: '30 days'
				}
			)

		response.apiSuccess({token : token})
	}
}