import { z } from 'zod'

export const user_signup_zod_schema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email address is required' }),
    imageUrl: z.string({ required_error: 'Image URL is required' }).optional(),
    password: z.string({ required_error: 'Password  is required' }),
    name: z.string({ required_error: 'Name is required' }),
  }),
})

export const user_login_zod_schema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email address is required' }),
    password: z.string({ required_error: 'Password  is required' }),
  }),
})

export const user_refresh_token_zod_schema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh token  is required' }),
  }),
})
