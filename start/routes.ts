import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router.get('/', [controllers.Home, 'index']).as('home')

// session and log
router
  .group(() => {
    router.get('register', [controllers.auth.Register, 'create'])
    router.post('register', [controllers.auth.Register, 'store'])

    router.get('login', [controllers.auth.Session, 'create'])
    router.post('login', [controllers.auth.Session, 'store'])

    router.get('recover-account', [controllers.auth.AccountRecovery, 'create'])
    router.post('recover-account', [controllers.auth.AccountRecovery, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.get('onboarding', [controllers.auth.Onboardings, 'show'])
    router.post('onboarding', [controllers.auth.Onboardings, 'destroy'])

    router.post('logout', [controllers.auth.Session, 'destroy'])
  })
  .use([middleware.auth(), middleware.trackLastSeen()])

// router.get('/discover/:category', [DiscoverController, 'index']).as('discover.index')

// router.get('/list/:category', [ListController, 'index']).as('list.index')

// router.get('/collection', [CollectionController, 'index']).as('collection.index')
