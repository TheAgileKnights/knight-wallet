/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
router.on('/').renderInertia('home')
router.on('/design-artifacts').renderInertia('designArtifacts')
router.on('/debug').renderInertia('debug')
