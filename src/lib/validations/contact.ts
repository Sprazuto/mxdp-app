import { z } from 'zod'

export const contactFormSchema = z.object({
  parentName: z.string().min(2, 'Nama orang tua minimal 2 karakter').max(100, 'Nama terlalu panjang'),
  childName: z.string().min(2, 'Nama anak minimal 2 karakter').max(100, 'Nama terlalu panjang'),
  childAge: z.coerce.number().int().min(1, 'Usia minimal 1 tahun').max(18, 'Usia maksimal 18 tahun'),
  whatsapp: z.string()
    .min(10, 'Nomor WhatsApp minimal 10 digit')
    .max(15, 'Nomor WhatsApp maksimal 15 digit')
    .regex(/^[\d\s\-\+\(\)]+$/, 'Format nomor tidak valid'),
  email: z.string().email('Format email tidak valid').optional().or(z.literal('')),
  preferredDate: z.string().min(1, 'Tanggal kunjungan wajib diisi'),
  notes: z.string().max(500, 'Catatan maksimal 500 karakter').optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export const contactFormDefaultValues: ContactFormData = {
  parentName: '',
  childName: '',
  childAge: 0,
  whatsapp: '',
  email: '',
  preferredDate: '',
  notes: '',
}