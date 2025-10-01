import { z } from "zod"

export const createSemanaSchema = z.object({
  titulo: z
    .string()
    .min(3, "El título debe tener al menos 3 caracteres."),
})

export type CreateSemanaSchema = z.infer<typeof createSemanaSchema>

export const createArchivoSchema = z.object({
  nombre: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres."),
  drive_id: z
    .string()
    .min(10, "Ingresa un ID de Drive válido."),
})

export type CreateArchivoSchema = z.infer<typeof createArchivoSchema>
