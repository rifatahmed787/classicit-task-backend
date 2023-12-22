import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { ProductServices } from './product.services'
import pick from '../../../shared/pick'
import { product_filter_keys } from './product.constant'
import { pagination_keys } from '../../../constant/common'

// Create Book
const createProduct = catchAsync(async (req: Request, res: Response) => {
  const { ...product_data } = req.body
  const user_data = req.logged_in_user
  const result = await ProductServices.create_new_product(
    product_data,
    user_data
  )

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Product created successfully',
  })
})

//  updateBook
const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id: product_id } = req.params
  const user_data = req.logged_in_user

  const { ...book_data } = req.body
  const result = await ProductServices.update_product(
    book_data,
    product_id,
    user_data
  )

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Product updated successfully',
  })
})

//  Get all books
const all_Products = catchAsync(async (req: Request, res: Response) => {
  const filers = pick(req.query, product_filter_keys)
  const pagination = pick(req.query, pagination_keys)

  const result = await ProductServices.get_all_porducts(filers, pagination)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Products retrieved successfully',
  })
})

//best seller
const bestSeller = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.bestSeller()
  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Products retrieved successfully',
  })
})

//  Get all books
const uniqueFilteringData = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.get__unique_filtering_items()

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Filtering Items retrieved successfully',
  })
})

//   Get   Book Details
const productDetails = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await ProductServices.get_product_details(id)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Product details retrieved successfully',
  })
})

//  Delete   Book
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { id: product_id } = req.params
  const user_data = req.logged_in_user
  const result = await ProductServices.delete_product(product_id, user_data)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Product deleted successfully',
  })
})

export const ProductController = {
  all_Products,
  deleteProduct,
  createProduct,
  uniqueFilteringData,
  bestSeller,
  productDetails,
  updateProduct,
}
