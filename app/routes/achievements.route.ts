import router from '@adonisjs/core/services/router'

router
    .group(() => {
        // router.get('/', '#controllers/achievements.index')
    })
    .prefix('api/v1/achievements')