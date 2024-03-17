import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
    .group(() => {
        router.get('/', '#controllers/users_controller.index')
        router.get('/:id', '#controllers/users_controller.alone')
        router.post('/', '#controllers/users_controller.store')
        router.put('/:id', '#controllers/users_controller.update')
    })
    .prefix('api/v1/users').use([
        middleware.auth(),
    ])