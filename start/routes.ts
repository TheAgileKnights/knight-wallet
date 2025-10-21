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

router.on('/').renderInertia('home')
router.on('/debug').renderInertia('debug')

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
