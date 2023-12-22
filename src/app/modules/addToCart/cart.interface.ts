import { Model, Types } from 'mongoose'
import { IUser } from '../user/user.interface'
import { IProduct } from '../products/product.interface'

export type ICart = {
  _id?: Types.ObjectId
  product_id: Types.ObjectId | IProduct
  user_id: Types.ObjectId | IUser
  color: string[]
  size: string[]
  quantity: number
}

// Create a new Model type that knows about IUserMethods when available here...
export type CartModel = {
  isProductInUserCart(product_id: string, user_id: string): Promise<boolean>
} & Model<ICart>
