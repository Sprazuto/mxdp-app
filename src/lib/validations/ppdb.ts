import { z } from 'zod'

export const ppdbParentSchema = z.object({
  parentName: z.string().min(2, 'Nama orang tua minimal 2 karakter').max(100, 'Nama terlalu panjang'),
  parentPhone: z.string()
    .min(10, 'Nomor WhatsApp minimal 10 digit')
    .max(15, 'Nomor WhatsApp maksimal 15 digit')
    .regex(/^[\d\s\-\+\(\)]+$/, 'Format nomor tidak valid'),
  parentEmail: z.string().email('Format email tidak valid').optional().or(z.literal('')),
})

export const ppdbChildSchema = z.object({
  childFullName: z.string().min(2, 'Nama lengkap anak minimal 2 karakter').max(100, 'Nama terlalu panjang'),
  childNickname: z.string().max(50, 'Nama panggilan maksimal 50 karakter').optional(),
  childDob: z.string().min(1, 'Tanggal lahir wajib diisi'),
  gender: z.enum(['L', 'P']).optional().refine(val => val === 'L' || val === 'P', 'Jenis kelamin wajib dipilih'),
})

export const ppdbProgramSchema = z.object({
  programApplied: z.string().min(1, 'Program wajib dipilih'),
})

export const ppdbConfirmSchema = z.object({
  notes: z.string().max(500, 'Catatan maksimal 500 karakter').optional(),
})

export const ppdbRegistrationSchema = ppdbParentSchema.merge(ppdbChildSchema).merge(ppdbProgramSchema).merge(ppdbConfirmSchema)

export type PPDBParentData = z.infer<typeof ppdbParentSchema>
export type PPDBChildData = z.infer<typeof ppdbChildSchema>
export type PPDBProgramData = z.infer<typeof ppdbProgramSchema>
export type PPDBConfirmData = z.infer<typeof ppdbConfirmSchema>
export type PPDBRegistrationData = z.infer<typeof ppdbRegistrationSchema>

export const ppdbRegistrationDefaultValues: PPDBRegistrationData = {
  parentName: '',
  parentPhone: '',
  parentEmail: '',
  childFullName: '',
  childNickname: '',
  childDob: '',
  gender: 'L',
  programApplied: '',
  notes: '',
}