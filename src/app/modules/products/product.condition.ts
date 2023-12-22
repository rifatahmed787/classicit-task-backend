/* eslint-disable @typescript-eslint/no-explicit-any */

import { product_search_condition_keys } from './product.constant'
import { IProductFilter } from './product.interface'

export const filter_product_conditions = (
  filers: IProductFilter
): { [key: string]: Array<Record<string, any>> } | undefined => {
  const { searchTerm, ...filter_keys } = filers

  const conditions = []

  if (searchTerm) {
    conditions.push({
      $or: product_search_condition_keys.map((item: any) => ({
        [item]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  //
  if (Object.keys(filter_keys).length) {
    conditions.push({
      $and: Object.entries(filter_keys).map(([key, value]) => {
        if (key === 'publication_date') {
          return { publication_date: { $regex: '^' + value } }
        } else if (key === 'genre') {
          return { genre: new RegExp(`\\b${value}\\b`, 'i') }
        } else {
          return { [key]: value }
        }
      }),
    })
  }

  return conditions?.length > 0 ? { $and: conditions } : undefined
}
