import { Schema, Types, model } from 'mongoose'
import { IProduct, ProductModel } from './product.interface'

// And a schema that knows about IUserMethods

const ProductSchema = new Schema<IProduct, ProductModel>({
  title: { type: String, required: true },
  rating: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: [String], required: true },
  color: { type: [String], required: true },
  size: { type: [String], required: true },
  quantity: { type: Number, required: true },
})

//isProductAvailable
ProductSchema.statics.isProductAvailable = async function (
  id: Types.ObjectId
): Promise<Partial<IProduct> | null> {
  return await Product.findById(id).lean()
}

export const Product = model<IProduct, ProductModel>('Product', ProductSchema)
