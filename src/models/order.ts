import { z } from "zod";

// Catálogo de productos válidos
export const validProducts = ["prod-123", "prod-456"];

// validaciones con zod
export const OrderSchema = z.object({
    productId: z.string()
        .regex(/^[A-Za-z0-9\-]+$/, { message: "productId: Formato inválido" })
        .refine(val => validProducts.includes(val), { message: "productId: No existe en el catálogo" }),

    quantity: z.number()
        .int({ message: "quantity: Debe ser entero" })
        .min(1, { message: "quantity: Mínimo 1" })
        .max(100, { message: "quantity: Máximo 100" }),

    userId: z.string()
        .startsWith("user-", { message: "userId: Debe comenzar con 'user-'" })
        .length(10, { message: "userId: Debe tener 10 caracteres" }),

    approvalToken: z
        .string()
        .length(5, { message: "approvalToken: Debe tener 5 caracteres" })
        .optional()
}).superRefine((data, ctx) => {
    if (data.quantity > 50 && !data.approvalToken) {
        ctx.addIssue({
            path: ["approvalToken"],
            message: "approvalToken: Obligatorio si quantity > 50",
            code: z.ZodIssueCode.custom
        });
    }
});

// Interface TypeScript
export type Order = z.infer<typeof OrderSchema>;
