import express from 'express'
import { UserRoute } from '../app/modules/user/user.routes'
import { AuthRoute } from '../app/modules/auth/auth.route'
// import { UploadRoute } from '../app/modules/cloudinary/upload.route'
// import { BookRoute } from '../app/modules/books/book.routes'
// import { ReviewRoute } from '../app/modules/review/review.route'
// import { WishRoute } from '../app/modules/wish/wish.route'
// import { CartRoute } from '../app/modules/addToCart/cart.route'

const router = express.Router()

const all_routes = [
  { path: '/auth', router: AuthRoute },
  // { path: '/upload', router: UploadRoute },
  // { path: '/', router: UserRoute },
  { path: '/users', router: UserRoute },
  // { path: '/books', router: BookRoute },
  // { path: '/reviews', router: ReviewRoute },
  // { path: '/wish', router: WishRoute },
  // { path: '/cart', router: CartRoute },
]

all_routes.map(item => router.use(item.path, item.router))

export default router
