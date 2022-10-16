import { Router } from 'express'
import controllers from './item.controller'

const router = Router()

// /api/item
router
  .route('/')
  .get(controllers.getMany)
  .post(controllers.createOne)

// /api/item/:id
router
  .route('/:id')
  .put(controllers.updateOne)
  .delete(controllers.removeOne)
  .get(controllers.getOne)
export default router
