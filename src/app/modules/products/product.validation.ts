import { z } from 'zod'

export const create_product_zod_schema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    rating: z.number({ required_error: 'Rating is required' }),
    price: z.number({ required_error: 'Price is required' }),
    description: z.string({ required_error: 'Description is required' }),
    image: z.array(z.string({ required_error: 'Image is required' })),
    variations: z.array(
      z.object({
        color: z.string({ required_error: 'Color is required' }),
        size: z.string({ required_error: 'Size is required' }),
      })
    ),
  }),
})

export const update_product_zod_schema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).optional(),
    rating: z.number({ required_error: 'Rating is required' }).optional(),
    price: z.number({ required_error: 'Price is required' }).optional(),
    description: z
      .string({ required_error: 'Description is required' })
      .optional(),
    image: z
      .array(z.string({ required_error: 'Image is required' }))
      .optional(),
    variations: z.array(
      z.object({
        color: z.string({ required_error: 'Color is required' }).optional(),
        size: z.string({ required_error: 'Size is required' }).optional(),
      })
    ),
  }),
})
