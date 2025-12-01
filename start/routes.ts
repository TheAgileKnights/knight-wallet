/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import designArtifactsData from '../inertia/data/designArtifacts.json' with { type: 'json' }
import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth_controller')
const ProjectsController = () => import('#controllers/projects_controller')
const ProjectInvitationsController = () => import('#controllers/project_invitations_controller')
const CategoriesController = () => import('#controllers/categories_controller')
const ExpensesController = () => import('#controllers/expenses_controller')
const CollaboratorsController = () => import('#controllers/collaborators_controller')
const AppController = () => import('#controllers/app_controller')

router.on('/').renderInertia('home').as('home')
router.on('/debug').renderInertia('debug').as('debug')

router.get('/auth/google/redirect', [AuthController, 'googleRedirect']).as('auth.googleRedirect')
router.get('/auth/google/callback', [AuthController, 'googleCallback']).as('auth.googleCallback')

router.get('/auth/login', [AuthController, 'login']).as('auth.login')

router
  .group(() => {
    router.get('/auth/logout', [AuthController, 'logout']).as('auth.logout')

    // App index route - redirects to last project or projects index
    router.get('/app', [AppController, 'index']).as('app.index')

    // Projects routes
    router.get('/app/projects', [ProjectsController, 'index']).as('projects.index')
    router.post('/app/projects', [ProjectsController, 'store']).as('projects.store')
    router.get('/app/projects/:id', [ProjectsController, 'show']).as('projects.show')
    router.get('/app/projects/:id/edit', [ProjectsController, 'edit']).as('projects.edit')
    router.put('/app/projects/:id', [ProjectsController, 'update']).as('projects.update')
    router.delete('/app/projects/:id', [ProjectsController, 'destroy']).as('projects.destroy')

    // Categories routes
    router
      .get('/app/projects/:projectId/categories', [CategoriesController, 'index'])
      .as('categories.index')
    router
      .post('/app/projects/:projectId/categories', [CategoriesController, 'store'])
      .as('categories.store')
    router.put('/app/categories/:id', [CategoriesController, 'update']).as('categories.update')
    router.delete('/app/categories/:id', [CategoriesController, 'destroy']).as('categories.destroy')

    // Expenses routes
    router
      .get('/app/projects/:projectId/expenses', [ExpensesController, 'index'])
      .as('expenses.index')
    router
      .post('/app/projects/:projectId/expenses', [ExpensesController, 'store'])
      .as('expenses.store')
    router.put('/app/expenses/:id', [ExpensesController, 'update']).as('expenses.update')
    router.delete('/app/expenses/:id', [ExpensesController, 'destroy']).as('expenses.destroy')

    // Collaborators routes
    router
      .get('/app/projects/:projectId/collaborators', [CollaboratorsController, 'index'])
      .as('collaborators.index')
    router
      .delete('/app/projects/:projectId/collaborators/:userId', [
        CollaboratorsController,
        'destroy',
      ])
      .as('collaborators.destroy')

    // Project invitations routes
    router
      .post('/app/projects/:projectId/invitations', [ProjectInvitationsController, 'store'])
      .as('projects.invitations.store')
    router
      .delete('/app/invitations/:token', [ProjectInvitationsController, 'destroy'])
      .as('invitations.destroy')
  })
  .use(middleware.auth())

// Public invitation routes (no auth required)
router.get('/invite/:token', [ProjectInvitationsController, 'show']).as('invitations.show')
router
  .get('/invite/:token/accept', [ProjectInvitationsController, 'accept'])
  .as('invitations.accept')
  .use(middleware.auth())
router
  .post('/invite/:token/accept', [ProjectInvitationsController, 'accept'])
  .use(middleware.auth())

// Design Artifacts routes
router.get('/design-artifacts', ({ response }) => {
  return response.redirect('/design-artifacts/interviews/1')
})

// Single page routes (no person ID needed)
router.get('/design-artifacts/features', ({ inertia }) => {
  return inertia.render('designArtifacts', {
    type: 'features',
    features: designArtifactsData.features,
    people: designArtifactsData.people,
  })
})

router.get('/design-artifacts/video', ({ inertia }) => {
  return inertia.render('designArtifacts', {
    type: 'video',
    videoUrl: designArtifactsData.singlePages.video.data.videoUrl,
  })
})

router.get('/design-artifacts/collaboration', ({ inertia }) => {
  return inertia.render('designArtifacts', {
    type: 'collaboration',
    images: designArtifactsData.singlePages.collaboration.data.images,
  })
})

// Redirect artifact types without ID to default (1)
router.get('/design-artifacts/:artifact', ({ params, response }) => {
  return response.redirect(`/design-artifacts/${params.artifact}/1`)
})

// Artifact detail routes with numeric ID
router.get('/design-artifacts/:artifact/:id', ({ params, inertia }) => {
  const id = Number(params.id)
  const person = designArtifactsData.people[id - 1]

  return inertia.render('designArtifacts', {
    type: params.artifact,
    id,
    person,
    people: designArtifactsData.people,
  })
})
