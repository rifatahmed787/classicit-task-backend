import { User } from '../user/user.model'
import { Types } from 'mongoose'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'
import { IUser } from '../user/user.interface'
import { ICart } from './cart.interface'
import { Cart } from './cart.model'
import { Product } from '../products/product.model'

// Add in wish list
const ad_to_cart = async (cart_data: ICart): Promise<ICart | null> => {
  // User checking
  const isUserExist: IUser | null = await User.isUserExistByID(
    cart_data?.user_id as Types.ObjectId
  )

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  // Product checking checking
  const isProductExist = await Product.findById(cart_data.product_id)

  if (!isProductExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')
  }

  //  reading list cheking
  const isInCart = await Cart.findOne({
    Product_id: cart_data?.product_id,
    user_id: cart_data?.user_id,
  })

  if (isInCart) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Already in your cart have this product'
    )
  }

  const created_cart = await Cart.create(cart_data)

  return created_cart
}

// Remove from wish list
const remove_from_cart = async (cart_data: ICart): Promise<ICart | null> => {
  // User checking
  const isUserExist: IUser | null = await User.isUserExistByID(
    cart_data?.user_id as Types.ObjectId
  )

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  // Product checking checking
  const isProductExist = await Product.findById(cart_data.product_id)

  if (!isProductExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')
  }

  //  reading list cheking
  const isInRedingList = await Cart.findOne({
    product_id: cart_data?.product_id,
    user_id: cart_data?.user_id,
  })

  if (!isInRedingList) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Already removed from your cart')
  }

  const remove_cart = await Cart.findByIdAndDelete(cart_data?._id)

  return remove_cart
}

// get_cart_by_id
const get_cart_by_user_id = async (
  user_id: string
): Promise<ICart[] | null> => {
  const user_cart = await Cart.find({ user_id: user_id })
    .populate('product_id')
    .populate('user_id')

  return user_cart
}

export const CartServices = {
  ad_to_cart,
  get_cart_by_user_id,
  remove_from_cart,
}
