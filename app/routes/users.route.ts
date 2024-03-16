import router from '@adonisjs/core/services/router'

router
    .group(() => {
        router.get('/', '#controllers/users_controller.index')
        router.get('/:id', '#controllers/users_controller.alone')
        router.post('/', '#controllers/users_controller.store')
    })
    .prefix('api/v1/users')