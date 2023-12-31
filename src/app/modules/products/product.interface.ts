import { Model, Types } from 'mongoose'

export type IProduct = {
  title: string
  price: number
  rating: number
  description: string
  image: string[]
  color: string[]
  size: string[]
  quantity: number
}

export type ProductModel = {
  isProductAvailable(
    id: Types.ObjectId | string
  ): Promise<Partial<IProduct> | null>
} & Model<IProduct>

export type IProductFilter = {
  title?: string
  price?: number
  searchTerm?: string
}

export type IProductFilteringItems = {
  size: string[]
  color: string[]
}
