import { z } from 'zod';

const pedidoSchema = z
  .object({
    nombre: z.string().min(3, { message: 'Nombre inválido: mínimo 3 letras' }),
    direccion: z
      .string()
      .min(5, { message: 'Dirección inválida: mínimo 5 caracteres' }),
    telefono: z
      .number()
      .int({ message: 'Debe ser un número entero' })
      .min(1000000, { message: 'Teléfono inválido: mínimo 6 dígitos' }),
    precio: z.number().min(0, { message: 'El precio no puede ser negativo' }),
    envio: z.number().min(0, { message: 'El envío no puede ser negativo' }),
    propina: z
      .number()
      .min(0, { message: 'La propina no puede ser negativa' })
      .optional()
      .default(0),
    forma_de_pago: z.enum([
      'Efectivo',
      'Tarjeta',
      'Transferencia',
      'QR',
      'MercadoPago',
      'Débito',
    ]),
  })
  .transform((data) => ({
    ...data,
    preciototal: data.precio + data.envio + data.propina,
  }));
