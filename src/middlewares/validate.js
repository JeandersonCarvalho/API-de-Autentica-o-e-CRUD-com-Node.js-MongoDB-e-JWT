import { z } from "zod";

export const validateRegister = (req, res, next) => {
  const schema = z.object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres")
  });

  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.format() });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const schema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(1, "Senha é obrigatória")
  });

  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.format() });
  }

  next();
};

export const validateItem = (req, res, next) => {
  const schema = z.object({
    title: z.string().min(1, "Título é obrigatório"),
    done: z.boolean().optional()
  });

  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.format() });
  }

  next();
};
