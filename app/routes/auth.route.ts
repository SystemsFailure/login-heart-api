import router from '@adonisjs/core/services/router'

router.group(() => {
    router.post('/login', "#controllers/auth_controller.login")
    router.post('/signup', "#controllers/auth_controller.signup")
}).prefix('api/v1/auth')