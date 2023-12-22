import { Schema, Types, model } from 'mongoose'
import { CartModel, ICart } from './cart.interface'

// And a schema that knows about IUserMethods
const CartSchema = new Schema<ICart, CartModel>({
  product_id: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
  user_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  color: { type: [String], required: true },
  size: { type: [String], required: true },
  quantity: { type: Number, required: true },
})

//is product  Exist in cart
CartSchema.statics.isProductInUserCart = async function (
  product_id: string,
  user_id: string
): Promise<boolean> {
  const isExist = await Cart.findOne({
    product_id: new Types.ObjectId(product_id),
    user_id: new Types.ObjectId(user_id),
  })

  return isExist ? true : false
}

export const Cart = model<ICart, CartModel>('cart', CartSchema)
