import { z } from 'zod'

export const cart_zod_schema = z.object({
  body: z.object({
    product_id: z.string({ required_error: 'Product is required' }),
    color: z.array(z.string({ required_error: 'Color is required' })),
    size: z.array(z.string({ required_error: 'Size is required' })),
    quantity: z.number({ required_error: 'Quantity is required' }),
  }),
})
