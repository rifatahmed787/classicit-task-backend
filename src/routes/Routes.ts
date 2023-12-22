import express from 'express'
import { UserRoute } from '../app/modules/user/user.routes'
import { AuthRoute } from '../app/modules/auth/auth.route'
import { UploadRoute } from '../app/modules/cloudinary/upload.route'
import { ProductRoute } from '../app/modules/products/product.routes'
// import { CartRoute } from '../app/modules/addToCart/cart.route'

const router = express.Router()

const all_routes = [
  { path: '/auth', router: AuthRoute },
  { path: '/upload', router: UploadRoute },
  { path: '/users', router: UserRoute },
  { path: '/products', router: ProductRoute },
  // { path: '/cart', router: CartRoute },
]

all_routes.map(item => router.use(item.path, item.router))

export default router
