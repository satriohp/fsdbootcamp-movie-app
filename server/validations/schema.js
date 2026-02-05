const { z } = require('zod');

const registerSchema = z.object({
  username: z.string().min(3, { message: "Username minimal 3 karakter" }),
  email: z.string().email({ message: "Format email tidak valid" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
});

const loginSchema = z.object({
  email: z.string().email({ message: "Format email tidak valid" }),
  password: z.string().min(1, { message: "Password wajib diisi" }),
});

const movieSchema = z.object({
  title: z.string().min(1, { message: "Title wajib diisi" }),
  category: z.string().optional(),
  src: z.string().url({ message: "Source harus berupa URL valid" }).optional().or(z.literal('')),
  year: z.string().optional(),
  type: z.string().optional(),
  description: z.string().optional(),
  isPremium: z.coerce.boolean().default(false), 
  rating: z.coerce.number().min(0).max(10).default(0),
  genreIds: z.array(z.number()).optional(),
});

module.exports = {
  registerSchema,
  loginSchema,
  movieSchema
};