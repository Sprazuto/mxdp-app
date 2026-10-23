'use client'

import { useState, useEffect } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, CheckCircle, AlertCircle, MessageSquare, Calendar, Mail, Phone, User, Baby, Send, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { contactFormSchema, type ContactFormData, contactFormDefaultValues } from '@/lib/validations/contact'
import { CampusMap } from '@/components/ui/CampusMap'

const WHATSAPP_ADMIN = '6281234567890'

const formResolver = zodResolver(contactFormSchema) as any

export function ContactSection() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: formResolver,
    defaultValues: contactFormDefaultValues,
  })

  const formatWhatsAppMessage = (data: ContactFormData) => {
    const lines = [
      'Halo Admin MXDP,',
      '',
      'Saya ingin mendaftar kunjungan sekolah:',
      `👤 Nama Orang Tua: ${data.parentName}`,
      `👶 Nama Anak: ${data.childName}`,
      `🎂 Usia Anak: ${data.childAge} tahun`,
      `📱 WhatsApp: ${data.whatsapp}`,
      data.email ? `📧 Email: ${data.email}` : '',
      `📅 Tanggal Kunjungan: ${data.preferredDate}`,
      data.notes ? `📝 Catatan: ${data.notes}` : '',
      '',
      'Terima kasih!',
    ]
    return encodeURIComponent(lines.filter(Boolean).join('\n'))
  }

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Terjadi kesalahan saat mengirim formulir')
      }

      setSubmitStatus('success')
      reset()
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Gagal mengirim formulir. Silakan coba lagi.')
    }
  }

  const [tomorrowDate, setTomorrowDate] = useState<string>('')

  useEffect(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    setTomorrowDate(tomorrow.toISOString().split('T')[0])
  }, [])

  const getTomorrowDate = () => tomorrowDate

  return (
    <section className="px-4 py-20 sm:py-24 lg:py-28 bg-white dark:bg-gray-950" aria-labelledby="contact-title">
      <div className="mx-auto max-w-7xl">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
          <div className="mb-10 lg:mb-0">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-100/80 px-4 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 backdrop-blur-sm mb-4">
              Hubungi Kami
            </span>
            <h2 id="contact-title" className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Jadwalkan Kunjungan & Pertanyaan
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Isi formulir di samping untuk menjadwalkan kunjungan ke kampus MXDP atau mengajukan pertanyaan. Tim kami akan menghubungi Anda dalam 1x24 jam.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <MessageSquare className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">WhatsApp Langsung</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Balasan cepat dari tim kami</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800">
                <div className="p-3 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                  <Phone className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Telepon</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">+62 21 1234 5678 (Senin-Jumat, 08:00-16:00)</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800">
                <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                  <Mail className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">info@mxdp.id</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-red-500" aria-hidden="true" />
                Lokasi Kampus
              </h3>
              <CampusMap
                lat={-6.9175}
                lng={107.6191}
                zoom={15}
                address="Jl. Pendidikan No. 123, Jakarta Selatan, DKI Jakarta 12345"
                name="MXDP Edukasi"
              />
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl blur-2xl" aria-hidden="true" />
            <form onSubmit={handleSubmit(onSubmit)} className="relative p-6 sm:p-8 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl">
              {submitStatus === 'success' && (
                <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 animate-fade-in">
                  <CheckCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-emerald-800 dark:text-emerald-200">Formulir Terkirim!</p>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300">Tim kami akan menghubungi Anda segera via WhatsApp/Email.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 animate-fade-in">
                  <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-red-800 dark:text-red-200">Gagal Mengirim</p>
                    <p className="text-sm text-red-700 dark:text-red-300">{errorMessage}</p>
                  </div>
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Nama Orang Tua <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <input
                      {...register('parentName')}
                      id="parentName"
                      type="text"
                      placeholder="Nama lengkap orang tua/wali"
                      className={cn(
                        'w-full pl-10 pr-4 py-3 rounded-xl border bg-white dark:bg-gray-800',
                        'text-gray-900 dark:text-white placeholder-gray-400',
                        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                        'transition-colors',
                        errors.parentName
                          ? 'border-red-300 dark:border-red-700 focus:ring-red-500'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      )}
                      aria-invalid={errors.parentName ? 'true' : 'false'}
                      aria-describedby={errors.parentName ? 'parentName-error' : undefined}
                    />
                  </div>
                  {errors.parentName && (
                    <p id="parentName-error" className="mt-1.5 text-sm text-red-500 flex items-center gap-1" role="alert">
                      <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      {errors.parentName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="childName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Nama Anak <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <div className="relative">
                    <Baby className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <input
                      {...register('childName')}
                      id="childName"
                      type="text"
                      placeholder="Nama lengkap anak"
                      className={cn(
                        'w-full pl-10 pr-4 py-3 rounded-xl border bg-white dark:bg-gray-800',
                        'text-gray-900 dark:text-white placeholder-gray-400',
                        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                        'transition-colors',
                        errors.childName
                          ? 'border-red-300 dark:border-red-700 focus:ring-red-500'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      )}
                      aria-invalid={errors.childName ? 'true' : 'false'}
                      aria-describedby={errors.childName ? 'childName-error' : undefined}
                    />
                  </div>
                  {errors.childName && (
                    <p id="childName-error" className="mt-1.5 text-sm text-red-500 flex items-center gap-1" role="alert">
                      <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      {errors.childName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="childAge" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Usia Anak (Tahun) <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <input
                      {...register('childAge', { valueAsNumber: true })}
                      id="childAge"
                      type="number"
                      min="1"
                      max="18"
                      placeholder="Contoh: 4"
                      className={cn(
                        'w-full pl-10 pr-4 py-3 rounded-xl border bg-white dark:bg-gray-800',
                        'text-gray-900 dark:text-white placeholder-gray-400',
                        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                        'transition-colors',
                        errors.childAge
                          ? 'border-red-300 dark:border-red-700 focus:ring-red-500'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      )}
                      aria-invalid={errors.childAge ? 'true' : 'false'}
                      aria-describedby={errors.childAge ? 'childAge-error' : undefined}
                    />
                  </div>
                  {errors.childAge && (
                    <p id="childAge-error" className="mt-1.5 text-sm text-red-500 flex items-center gap-1" role="alert">
                      <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      {errors.childAge.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Nomor WhatsApp <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <input
                      {...register('whatsapp')}
                      id="whatsapp"
                      type="tel"
                      placeholder="08xx-xxxx-xxxx"
                      className={cn(
                        'w-full pl-10 pr-4 py-3 rounded-xl border bg-white dark:bg-gray-800',
                        'text-gray-900 dark:text-white placeholder-gray-400',
                        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                        'transition-colors',
                        errors.whatsapp
                          ? 'border-red-300 dark:border-red-700 focus:ring-red-500'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      )}
                      aria-invalid={errors.whatsapp ? 'true' : 'false'}
                      aria-describedby={errors.whatsapp ? 'whatsapp-error' : undefined}
                    />
                  </div>
                  {errors.whatsapp && (
                    <p id="whatsapp-error" className="mt-1.5 text-sm text-red-500 flex items-center gap-1" role="alert">
                      <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      {errors.whatsapp.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Email (Opsional)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <input
                      {...register('email')}
                      id="email"
                      type="email"
                      placeholder="email@contoh.com"
                      className={cn(
                        'w-full pl-10 pr-4 py-3 rounded-xl border bg-white dark:bg-gray-800',
                        'text-gray-900 dark:text-white placeholder-gray-400',
                        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                        'transition-colors',
                        errors.email
                          ? 'border-red-300 dark:border-red-700 focus:ring-red-500'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      )}
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                  </div>
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-sm text-red-500 flex items-center gap-1" role="alert">
                      <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Tanggal Kunjungan yang Diharapkan <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <input
                      {...register('preferredDate')}
                      id="preferredDate"
                      type="date"
                      min={getTomorrowDate()}
                      className={cn(
                        'w-full pl-10 pr-4 py-3 rounded-xl border bg-white dark:bg-gray-800',
                        'text-gray-900 dark:text-white',
                        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                        'transition-colors',
                        errors.preferredDate
                          ? 'border-red-300 dark:border-red-700 focus:ring-red-500'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      )}
                      aria-invalid={errors.preferredDate ? 'true' : 'false'}
                      aria-describedby={errors.preferredDate ? 'preferredDate-error' : undefined}
                    />
                  </div>
                  {errors.preferredDate && (
                    <p id="preferredDate-error" className="mt-1.5 text-sm text-red-500 flex items-center gap-1" role="alert">
                      <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      {errors.preferredDate.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Catatan / Pertanyaan (Opsional)
                  </label>
                  <textarea
                    {...register('notes')}
                    id="notes"
                    rows={4}
                    placeholder="Sebutkan program yang diminati, kebutuhan khusus, atau pertanyaan lain..."
                    className={cn(
                      'w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-800 resize-none',
                      'text-gray-900 dark:text-white placeholder-gray-400',
                      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                      'transition-colors',
                      errors.notes
                        ? 'border-red-300 dark:border-red-700 focus:ring-red-500'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    )}
                    aria-invalid={errors.notes ? 'true' : 'false'}
                    aria-describedby={errors.notes ? 'notes-error' : undefined}
                  />
                  {errors.notes && (
                    <p id="notes-error" className="mt-1.5 text-sm text-red-500 flex items-center gap-1" role="alert">
                      <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      {errors.notes.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={submitStatus === 'submitting'}
                  className={cn(
                    'flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold transition-all duration-300',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                    submitStatus === 'submitting'
                      ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl'
                  )}
                >
                  {submitStatus === 'submitting' ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" aria-hidden="true" />
                      Kirim Formulir
                    </>
                  )}
                </button>

                <a
                  href={`https://wa.me/${WHATSAPP_ADMIN}?text=${formatWhatsAppMessage(contactFormDefaultValues)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-green-300 dark:border-green-600 bg-green-50 dark:bg-green-900/20 px-6 py-3.5 text-base font-semibold text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  <MessageSquare className="h-5 w-5" aria-hidden="true" />
                  Chat WhatsApp
                </a>
              </div>

              <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
                Dengan mengirim formulir ini, Anda menyetujui kebijakan privasi kami. Data Anda aman dan tidak akan dibagikan ke pihak ketiga.
              </p>
            </form>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
      `}</style>
    </section>
  )
}