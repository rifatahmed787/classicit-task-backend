import { pagination_map } from '../../../helpers/pagination'
import { GenericResponse } from '../../../interfaces/common'
import { IPagination } from '../../../interfaces/pagination'

import ApiError from '../../errors/ApiError'
import {
  IProduct,
  IProductFilter,
  IProductFilteringItems as IProductUniqueFilteringItems,
} from './product.interface'
import { Product } from './product.model'
import { User } from '../user/user.model'
import { IUser, UserRole } from '../user/user.interface'
import httpStatus from 'http-status'
import { Types } from 'mongoose'
import { JwtPayload } from 'jsonwebtoken'
import { filter_product_conditions } from './product.condition'

// Create new Product
const create_new_product = async (
  product_data: IProduct,
  user_data: JwtPayload
): Promise<IProduct | null> => {
  // User checking
  const isUserExist: IUser | null = await User.isUserExistByID(
    user_data?._id as Types.ObjectId
  )

  if (user_data?.role !== UserRole?.Admin) {
    throw new ApiError(httpStatus.FORBIDDEN, 'User is not authorized as Admin')
  }

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  const created_product = await Product.create(product_data)

  return created_product
}

//  gel_all_Products
const get_all_porducts = async (
  filers: IProductFilter,
  pagination_data: Partial<IPagination>
): Promise<GenericResponse<IProduct[]> | null> => {
  const { page, limit, skip, sortObject } = pagination_map(pagination_data)

  // and conditions (for search and filter)
  const IsConditions = filter_product_conditions(filers) ?? {}

  //
  const all_products = await Product.find(IsConditions)
    .sort(sortObject)
    .skip(skip)
    .limit(limit)

  const total = await Product.countDocuments(IsConditions)

  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: all_products,
  }
}

//best seller
const bestSeller = async (): Promise<IProduct[] | null> => {
  const fiveStar = await Product.find({ rating: { $gte: 4 } })
    .sort({ rating: -1 })
    .limit(9)

  return fiveStar
}

//  gel_all
const get__unique_filtering_items =
  async (): Promise<GenericResponse<IProductUniqueFilteringItems> | null> => {
    // and conditions (for search and filter)
    const allSizes = await Product.distinct('variations.size')
    const allColors = await Product.distinct('variations.color')
    return {
      data: { size: allSizes, color: allColors },
    }
  }

//Product detail
const get_product_details = async (id: string): Promise<IProduct | null> => {
  const isExist = await Product.findById(id)

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')
  }

  //
  const product_details = await Product.findById(id)

  return product_details
}

// Update Product
const update_product = async (
  product_data: Partial<IProduct>,
  product_id: Types.ObjectId | string,
  user_data: JwtPayload
): Promise<IProduct | null> => {
  // Product User checking

  if (user_data?.role !== UserRole.Admin) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Only Admin can update.')
  }

  const updated_product_data = await Product.findByIdAndUpdate(
    product_id,
    product_data,
    {
      new: true,
    }
  )

  if (!updated_product_data) {
    throw new ApiError(
      httpStatus.EXPECTATION_FAILED,
      'Failed to update product data'
    )
  }

  return updated_product_data
}

//  Delete Product
const delete_product = async (
  Product_id: string | Types.ObjectId,
  user_data: JwtPayload
): Promise<IProduct | null> => {
  // Product User checking
  if (user_data?.role !== UserRole.Admin) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Only Admin can delete.')
  }

  const product = await Product.findByIdAndDelete(Product_id)

  if (!product) {
    throw new ApiError(
      httpStatus.EXPECTATION_FAILED,
      'Failed to delete product'
    )
  }

  return product
}

export const ProductServices = {
  create_new_product,
  update_product,
  get_all_porducts,
  get_product_details,
  delete_product,
  get__unique_filtering_items,

  bestSeller,
}
