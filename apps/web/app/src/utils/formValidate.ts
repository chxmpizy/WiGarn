import z from 'zod';
export const userSchema = z.object({
  name: z.string().min(2, 'name must be at least 2 characters'),
  email: z.string().email('email must be valid'),
  password: z
    .string()
    .min(8, 'password must be at least 8 characters')
    .refine((password) => /[A-Za-z]/.test(password), {
      message: 'password must contain letter ',
    })
    .refine((password) => /\d/.test(password), {
      message: 'password must contain number',
    })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: 'password must contain special character',
    }),
  role: z.enum(['user', 'admin']),
  Subdistrict: z.string().min(1, 'Subdistrict is required'),
  district: z.string().min(1, 'district is required'),
  province: z.string().min(1, 'province is required'),
  postcode: z.string().min(1, 'postcode is required'),
  phoneNumber: z
    .string()
    .min(10, 'tel must be exactly 10 characters')
    .max(10, 'tel must be exactly 10 characters'),
  b_date: z.string().date(),
});
