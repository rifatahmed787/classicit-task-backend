import express from 'express'
import requestValidationHandler from '../../middlewares/requestValidationHandler'

import { ProductController } from './product.controller'
import {
  create_product_zod_schema,
  update_product_zod_schema,
} from './product.validation'
import authHandler from '../../middlewares/authHandler'

const router = express.Router()

router.post(
  '/',
  authHandler(),
  requestValidationHandler(create_product_zod_schema),
  ProductController.createProduct
)
router.get('/', ProductController.all_Products)
router.get('/best-seller', ProductController.bestSeller)
router.get('/unique-filter-items', ProductController.uniqueFilteringData)

router.get('/:id', ProductController.productDetails)

router.patch(
  '/:id',
  authHandler(),
  requestValidationHandler(update_product_zod_schema),
  ProductController.updateProduct
)
router.delete('/:id', authHandler(), ProductController.deleteProduct)

export const ProductRoute = router
