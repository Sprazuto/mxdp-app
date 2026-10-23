import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations/contact'
import { createSupabaseServerClient } from '@/lib/supabase/client'
import { Resend } from 'resend'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@mxdp.id'
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@mxdp.id'

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return null
  return new Resend(apiKey)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const validationResult = contactFormSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        { message: 'Data tidak valid', errors: validationResult.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const data = validationResult.data

    const supabase = createSupabaseServerClient()

    const { error: dbError } = await supabase
      .from('inquiries')
      .insert({
        parent_name: data.parentName,
        child_name: data.childName,
        child_age: data.childAge,
        whatsapp: data.whatsapp,
        email: data.email || null,
        preferred_date: data.preferredDate,
        notes: data.notes || null,
        status: 'new',
        created_at: new Date().toISOString(),
      })

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { message: 'Gagal menyimpan data ke database' },
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
            subject: `📩 Inquiry Baru: ${data.parentName} - ${data.childName}`,
            html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <div style="background: linear-gradient(135deg, #0d9488 0%, #0891b2 100%); padding: 30px; border-radius: 12px 12px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 24px;">📩 Inquiry Baru dari Website MXDP</h1>
                  </div>
                  <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151; width: 30%;">Nama Orang Tua</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${data.parentName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Nama Anak</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${data.childName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Usia Anak</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${data.childAge} tahun</td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">WhatsApp</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;"><a href="https://wa.me/${data.whatsapp.replace(/\D/g, '')}" style="color: #0d9488; text-decoration: none;">${data.whatsapp}</a></td>
                      </tr>
                      ${data.email ? `
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Email</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;"><a href="mailto:${data.email}" style="color: #0d9488; text-decoration: none;">${data.email}</a></td>
                      </tr>
                      ` : ''}
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Tanggal Kunjungan</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${new Date(data.preferredDate).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                      </tr>
                      ${data.notes ? `
                      <tr>
                        <td style="padding: 12px 0; font-weight: 600; color: #374151; vertical-align: top;">Catatan</td>
                        <td style="padding: 12px 0; color: #1f2937;">${data.notes}</td>
                      </tr>
                      ` : ''}
                    </table>
                    <div style="margin-top: 24px; padding: 16px; background: white; border-radius: 8px; border: 1px solid #e5e7eb;">
                      <p style="margin: 0; font-size: 14px; color: #6b7280;">Waktu pengiriman: ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB</p>
                    </div>
                  </div>
                </body>
              </html>
            `,
          }),
          data.email ? resend.emails.send({
            from: FROM_EMAIL,
            to: data.email,
            subject: '✅ Konfirmasi Pendaftaran Kunjungan - MXDP Edukasi',
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
                    <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0;">Pendaftaran kunjungan Anda telah kami terima</p>
                  </div>
                  <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
                    <p style="font-size: 16px; margin-bottom: 20px;">Halo <strong>${data.parentName}</strong>,</p>
                    <p style="margin-bottom: 20px;">Kami telah menerima permintaan kunjungan sekolah untuk anak Anda, <strong>${data.childName}</strong> (${data.childAge} tahun). Tim kami akan menghubungi Anda via WhatsApp (<a href="https://wa.me/${data.whatsapp.replace(/\D/g, '')}" style="color: #0d9488;">${data.whatsapp}</a>) dalam 1x24 jam untuk mengonfirmasi jadwal.</p>
                    
                    <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; margin: 20px 0;">
                      <h3 style="margin: 0 0 12px; font-size: 16px; color: #1f2937;">Detail Pendaftaran:</h3>
                      <ul style="margin: 0; padding-left: 20px; color: #374151;">
                        <li style="margin-bottom: 6px;"><strong>Tanggal Kunjungan:</strong> ${new Date(data.preferredDate).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</li>
                        <li style="margin-bottom: 6px;"><strong>Nama Anak:</strong> ${data.childName} (${data.childAge} tahun)</li>
                        <li style="margin-bottom: 6px;"><strong>WhatsApp:</strong> ${data.whatsapp}</li>
                        ${data.email ? `<li style="margin-bottom: 6px;"><strong>Email:</strong> ${data.email}</li>` : ''}
                        ${data.notes ? `<li><strong>Catatan:</strong> ${data.notes}</li>` : ''}
                      </ul>
                    </div>
                    
                    <p style="font-size: 14px; color: #6b7280; margin-top: 24px;">Jika Anda memiliki pertanyaan, silakan balas email ini atau hubungi kami via WhatsApp.</p>
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

    return NextResponse.json({ message: 'Formulir berhasil dikirim', success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}