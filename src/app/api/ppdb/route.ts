import { NextRequest, NextResponse } from 'next/server'
import { ppdbRegistrationSchema } from '@/lib/validations/ppdb'
import { createSupabaseServerClient } from '@/lib/supabase/client'
import { Resend } from 'resend'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@mxdp.id'
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@mxdp.id'

function generateRegistrationNumber(): string {
  const year = new Date().getFullYear()
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `REG-${year}-${randomPart}`
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return null
  return new Resend(apiKey)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const validationResult = ppdbRegistrationSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { message: 'Data tidak valid', errors: validationResult.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const data = validationResult.data

    const supabase = createSupabaseServerClient()

    const registrationNumber = generateRegistrationNumber()

    const { error: dbError } = await supabase
      .from('registrations')
      .insert({
        registration_number: registrationNumber,
        parent_name: data.parentName,
        parent_phone: data.parentPhone,
        parent_email: data.parentEmail || null,
        child_full_name: data.childFullName,
        child_nickname: data.childNickname || null,
        child_dob: data.childDob,
        gender: data.gender,
        program_applied: data.programApplied,
        status: 'PENDING',
        notes: data.notes || null,
        created_at: new Date().toISOString(),
      })

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { message: 'Gagal menyimpan data pendaftaran' },
        { status: 500 }
      )
    }

    const resend = getResendClient()

    if (resend) {
      try {
        await Promise.all([
          resend.emails.send({
            from: FROM_EMAIL,
            to: ADMIN_EMAIL,
            subject: `📝 PPDB Baru: ${registrationNumber} - ${data.childFullName}`,
            html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <div style="background: linear-gradient(135deg, #0d9488 0%, #0891b2 100%); padding: 30px; border-radius: 12px 12px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 24px;">📝 Pendaftaran PPDB Baru</h1>
                  </div>
                  <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151; width: 30%;">No. Registrasi</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937; font-family: monospace; font-size: 16px;">${registrationNumber}</td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Nama Orang Tua</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${data.parentName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">WhatsApp</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;"><a href="https://wa.me/${data.parentPhone.replace(/\D/g, '')}" style="color: #0d9488; text-decoration: none;">${data.parentPhone}</a></td>
                      </tr>
                      ${data.parentEmail ? `
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Email</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;"><a href="mailto:${data.parentEmail}" style="color: #0d9488; text-decoration: none;">${data.parentEmail}</a></td>
                      </tr>
                      ` : ''}
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Nama Anak</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${data.childFullName}</td>
                      </tr>
                      ${data.childNickname ? `
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Nama Panggilan</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${data.childNickname}</td>
                      </tr>
                      ` : ''}
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Tanggal Lahir</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${new Date(data.childDob).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Jenis Kelamin</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${data.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Program</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${data.programApplied}</td>
                      </tr>
                      ${data.notes ? `
                      <tr>
                        <td style="padding: 12px 0; font-weight: 600; color: #374151; vertical-align: top;">Catatan</td>
                        <td style="padding: 12px 0; color: #1f2937;">${data.notes}</td>
                      </tr>
                      ` : ''}
                    </table>
                    <div style="margin-top: 24px; padding: 16px; background: white; border-radius: 8px; border: 1px solid #e5e7eb;">
                      <p style="margin: 0; font-size: 14px; color: #6b7280;">Waktu pendaftaran: ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB</p>
                    </div>
                  </div>
                </body>
              </html>
            `,
          }),
          data.parentEmail ? resend.emails.send({
            from: FROM_EMAIL,
            to: data.parentEmail,
            subject: `✅ Konfirmasi Pendaftaran PPDB - ${registrationNumber}`,
            html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <div style="background: linear-gradient(135deg, #0d9488 0%, #0891b2 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 24px;">Terima Kasih, ${data.parentName}!</h1>
                    <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0;">Pendaftaran PPDB untuk ${data.childFullName} telah kami terima</p>
                  </div>
                  <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
                    <p style="font-size: 16px; margin-bottom: 20px;">Halo <strong>${data.parentName}</strong>,</p>
                    <p style="margin-bottom: 20px;">Kami telah menerima pendaftaran PPDB untuk anak Anda, <strong>${data.childFullName}</strong> (${data.gender === 'L' ? 'Laki-laki' : 'Perempuan'}).</p>

                    <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; margin: 20px 0;">
                      <h3 style="margin: 0 0 12px; font-size: 16px; color: #1f2937;">Detail Pendaftaran:</h3>
                      <ul style="margin: 0; padding-left: 20px; color: #374151;">
                        <li style="margin-bottom: 6px;"><strong>No. Registrasi:</strong> <span style="font-family: monospace;">${registrationNumber}</span></li>
                        <li style="margin-bottom: 6px;"><strong>Program:</strong> ${data.programApplied}</li>
                        <li style="margin-bottom: 6px;"><strong>Tanggal Lahir Anak:</strong> ${new Date(data.childDob).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</li>
                        <li style="margin-bottom: 6px;"><strong>WhatsApp:</strong> ${data.parentPhone}</li>
                        ${data.parentEmail ? `<li style="margin-bottom: 6px;"><strong>Email:</strong> ${data.parentEmail}</li>` : ''}
                        ${data.notes ? `<li><strong>Catatan:</strong> ${data.notes}</li>` : ''}
                      </ul>
                    </div>

                    <p style="font-size: 14px; color: #6b7280; margin-top: 24px;">Tim kami akan memverifikasi data pendaftaran dan menghubungi Anda via WhatsApp (<a href="https://wa.me/${data.parentPhone.replace(/\D/g, '')}" style="color: #0d9488;">${data.parentPhone}</a>) dalam 1x24 jam untuk langkah selanjutnya.</p>
                    <p style="font-size: 14px; color: #6b7280;">Simpan nomor registrasi <strong>${registrationNumber}</strong> untuk keperluan komunikasi selanjutnya.</p>
                    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
                    <p style="font-size: 12px; color: #9ca3af; margin: 0; text-align: center;">MXDP Edukasi • Jl. Pendidikan No. 123, Jakarta Selatan</p>
                  </div>
                </body>
              </html>
            `,
          }) : Promise.resolve(),
        ])
      } catch (emailError) {
        console.error('Email error:', emailError)
      }
    }

    return NextResponse.json({ message: 'Pendaftaran berhasil', success: true, registrationNumber })
  } catch (error) {
    console.error('PPDB registration error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}