'use client'

import { useState, useEffect } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, CheckCircle, AlertCircle, MessageSquare, Calendar, Mail, Phone, User, Baby, Send, MapPin, Sparkles, Star, Shield, Sparkle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { contactFormSchema, type ContactFormData, contactFormDefaultValues } from '@/lib/validations/contact'
import { CampusMap } from '@/components/ui/CampusMap'
import { FloatingOrnaments } from '@/components/ui/FloatingOrnaments'

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
    <section className="relative px-4 py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-amber-50 via-orange-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" aria-labelledby="contact-title">
      <FloatingOrnaments count={35} variant="section" />
      
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-20 left-10 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-blue-300/30 via-purple-300/20 to-pink-300/30 blur-3xl animate-float-rotate" />
        <div className="absolute bottom-20 right-10 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-emerald-300/30 via-teal-300/20 to-cyan-300/30 blur-3xl animate-float-rotate" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-200/15 to-purple-200/15 blur-3xl animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(#fde047_1px,transparent_1px)] [background-size:20px_20px] opacity-10 animate-shimmer" />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-400/3 via-transparent to-pink-400/3" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
          <div className="mb-10 lg:mb-0">
            <span className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400/90 via-orange-400/90 to-pink-400/90 px-6 py-3 text-sm font-black text-slate-950 backdrop-blur-sm mb-4 border-2 border-amber-300 shadow-[0_8px_32px_rgba(251,191,36,0.4)] rotate-[-2deg] animate-bounce-slow">
              <Sparkles className="h-5 w-5 animate-bounce" />
              <Sparkle className="h-4 w-4 text-amber-300 animate-pulse-glow" />
              Hubungi Kami
            </span>
            <h2 id="contact-title" className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4">
              Jadwalkan Kunjungan
              <span className="block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                & Pertanyaan
              </span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 font-medium">
              Isi formulir di samping untuk menjadwalkan kunjungan ke kampus MXDP atau mengajukan pertanyaan. Tim kami akan menghubungi Anda dalam 1x24 jam.
            </p>

            <div className="space-y-4">
              <div className="relative p-5 rounded-[24px] bg-white/80 dark:bg-slate-800/80 border-4 border-blue-200 dark:border-blue-800 backdrop-blur-sm hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-[0_20px_40px_rgba(14,165,233,0.3)] hover:-translate-y-1 transition-all duration-500">
                <FloatingOrnaments count={3} variant="card" className="pointer-events-none" />
                <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-white/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                <div className="flex items-center gap-4 relative z-10">
                  <div className="relative p-4 rounded-[16px] bg-gradient-to-br from-blue-400 to-purple-400 dark:from-blue-700 dark:to-purple-700 shadow-[0_8px_24px_rgba(14,165,233,0.5),_inset_0_2px_0_rgba(255,255,255,0.3)]">
                    <MessageSquare className="h-7 w-7 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]" aria-hidden="true" />
                    <div className="absolute inset-0 rounded-[16px] bg-gradient-to-b from-white/30 to-transparent" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 dark:text-white">WhatsApp Langsung</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Balasan cepat dari tim kami</p>
                  </div>
                </div>
                <Star className="absolute top-3 right-3 h-5 w-5 text-amber-300/90 animate-pulse-glow" aria-hidden="true" />
                <Sparkle className="absolute bottom-3 left-3 h-4 w-4 text-pink-300/80 animate-pulse-glow" aria-hidden="true" />
              </div>
              <div className="relative p-5 rounded-[24px] bg-white/80 dark:bg-slate-800/80 border-4 border-emerald-200 dark:border-emerald-800 backdrop-blur-sm hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-[0_20px_40px_rgba(16,185,129,0.3)] hover:-translate-y-1 transition-all duration-500">
                <FloatingOrnaments count={3} variant="card" className="pointer-events-none" />
                <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-white/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                <div className="flex items-center gap-4 relative z-10">
                  <div className="relative p-4 rounded-[16px] bg-gradient-to-br from-emerald-400 to-teal-400 dark:from-emerald-700 dark:to-teal-700 shadow-[0_8px_24px_rgba(16,185,129,0.5),_inset_0_2px_0_rgba(255,255,255,0.3)]">
                    <Phone className="h-7 w-7 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]" aria-hidden="true" />
                    <div className="absolute inset-0 rounded-[16px] bg-gradient-to-b from-white/30 to-transparent" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 dark:text-white">Telepon</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">+62 21 1234 5678 (Senin-Jumat, 08:00-16:00)</p>
                  </div>
                </div>
                <Star className="absolute top-3 right-3 h-5 w-5 text-amber-300/90 animate-pulse-glow" aria-hidden="true" />
                <Sparkle className="absolute bottom-3 left-3 h-4 w-4 text-pink-300/80 animate-pulse-glow" aria-hidden="true" />
              </div>
              <div className="relative p-5 rounded-[24px] bg-white/80 dark:bg-slate-800/80 border-4 border-purple-200 dark:border-purple-800 backdrop-blur-sm hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-[0_20px_40px_rgba(168,85,247,0.3)] hover:-translate-y-1 transition-all duration-500">
                <FloatingOrnaments count={3} variant="card" className="pointer-events-none" />
                <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-white/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                <div className="flex items-center gap-4 relative z-10">
                  <div className="relative p-4 rounded-[16px] bg-gradient-to-br from-purple-400 to-pink-400 dark:from-purple-700 dark:to-pink-700 shadow-[0_8px_24px_rgba(168,85,247,0.5),_inset_0_2px_0_rgba(255,255,255,0.3)]">
                    <Mail className="h-7 w-7 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]" aria-hidden="true" />
                    <div className="absolute inset-0 rounded-[16px] bg-gradient-to-b from-white/30 to-transparent" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 dark:text-white">Email</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">info@mxdp.id</p>
                  </div>
                </div>
                <Star className="absolute top-3 right-3 h-5 w-5 text-amber-300/90 animate-pulse-glow" aria-hidden="true" />
                <Sparkle className="absolute bottom-3 left-3 h-4 w-4 text-pink-300/80 animate-pulse-glow" aria-hidden="true" />
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <MapPin className="h-6 w-6 text-red-500 animate-bounce-slow" aria-hidden="true" />
                Lokasi Kampus
              </h3>
              <div className="rounded-[40px] overflow-hidden border-8 border-white/90 dark:border-slate-800/90 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.25)]">
                <CampusMap
                  lat={-6.9175}
                  lng={107.6191}
                  zoom={15}
                  address="Jl. Pendidikan No. 123, Jakarta Selatan, DKI Jakarta 12345"
                  name="MXDP Edukasi"
                />
              </div>
            </div>
          </div>

          <div className="relative">
            <FloatingOrnaments count={20} variant="card" className="absolute inset-0 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-[40px] blur-2xl" aria-hidden="true" />
            <form onSubmit={handleSubmit(onSubmit)} className="relative p-6 sm:p-8 md:p-10 rounded-[40px] bg-white border-4 border-amber-200 dark:border-amber-800 border-t-2 border-amber-100/50 shadow-[0_30px_70px_-12px_rgba(0,0,0,0.2)] dark:bg-slate-900/95">
              <FloatingOrnaments count={8} variant="card" className="pointer-events-none" />
              
              {/* Glossy highlight overlay */}
              <div className="absolute inset-0 rounded-[40px] bg-gradient-to-b from-white/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-amber-300/20 via-transparent to-pink-300/20 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {submitStatus === 'success' && (
                <div className="relative mb-6 flex items-center gap-3 p-4 rounded-[20px] bg-emerald-50 dark:bg-emerald-900/30 border-4 border-emerald-200 dark:border-emerald-800 animate-fade-in shadow-[0_12px_32px_rgba(16,185,129,0.3)]">
                  <FloatingOrnaments count={3} variant="card" className="pointer-events-none" />
                  <div className="relative p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                    <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400 flex-shrink-0 drop-shadow-[0_2px_8px_rgba(16,185,129,0.3)]" aria-hidden="true" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent" />
                  </div>
                  <div>
                    <p className="font-black text-emerald-800 dark:text-emerald-200">Formulir Terkirim!</p>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300">Tim kami akan menghubungi Anda segera via WhatsApp/Email.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="relative mb-6 flex items-center gap-3 p-4 rounded-[20px] bg-red-50 dark:bg-red-900/30 border-4 border-red-200 dark:border-red-800 animate-fade-in shadow-[0_12px_32px_rgba(239,68,68,0.3)]">
                  <FloatingOrnaments count={3} variant="card" className="pointer-events-none" />
                  <div className="relative p-2 rounded-full bg-red-100 dark:bg-red-900/30">
                    <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400 flex-shrink-0 drop-shadow-[0_2px_8px_rgba(239,68,68,0.3)]" aria-hidden="true" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent" />
                  </div>
                  <div>
                    <p className="font-black text-red-800 dark:text-red-200">Gagal Mengirim</p>
                    <p className="text-sm text-red-700 dark:text-red-300">{errorMessage}</p>
                  </div>
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="parentName" className="block text-sm font-black text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                    <User className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                    Nama Orang Tua <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <div className="relative">
                    <input
                      {...register('parentName')}
                      id="parentName"
                      type="text"
                      placeholder="Nama lengkap orang tua/wali"
                      className={cn(
                        'w-full pl-12 pr-4 py-5 rounded-[16px] border-2 bg-white dark:bg-slate-800',
                        'text-slate-900 dark:text-white placeholder-slate-400 font-medium',
                        'focus:outline-none focus:ring-4 focus:ring-emerald-200 focus:border-transparent',
                        'transition-all duration-200',
                        'hover:border-slate-300 dark:hover:border-slate-600',
                        'shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)]',
                        errors.parentName
                          ? 'border-red-300 dark:border-red-700 focus:ring-red-300 bg-red-50/30 dark:bg-red-900/20'
                          : 'border-slate-200 dark:border-slate-700'
                      )}
                      aria-invalid={errors.parentName ? 'true' : 'false'}
                      aria-describedby={errors.parentName ? 'parentName-error' : undefined}
                    />
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" aria-hidden="true" />
                    {/* Input glow ring */}
                    <div className="absolute inset-0 rounded-[16px] bg-gradient-to-r from-emerald-300/30 to-teal-300/30 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                  {errors.parentName && (
                    <p id="parentName-error" className="mt-1.5 text-sm text-red-500 flex items-center gap-1" role="alert">
                      <AlertCircle className="h-4 w-4" aria-hidden="true" />
                      {errors.parentName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="childName" className="block text-sm font-black text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                    <Baby className="h-4 w-4 text-pink-500" aria-hidden="true" />
                    Nama Anak <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <div className="relative">
                    <input
                      {...register('childName')}
                      id="childName"
                      type="text"
                      placeholder="Nama lengkap anak"
                      className={cn(
                        'w-full pl-12 pr-4 py-5 rounded-[16px] border-2 bg-white dark:bg-slate-800',
                        'text-slate-900 dark:text-white placeholder-slate-400 font-medium',
                        'focus:outline-none focus:ring-4 focus:ring-pink-200 focus:border-transparent',
                        'transition-all duration-200',
                        'hover:border-slate-300 dark:hover:border-slate-600',
                        'shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)]',
                        errors.childName
                          ? 'border-red-300 dark:border-red-700 focus:ring-red-300 bg-red-50/30 dark:bg-red-900/20'
                          : 'border-slate-200 dark:border-slate-700'
                      )}
                      aria-invalid={errors.childName ? 'true' : 'false'}
                      aria-describedby={errors.childName ? 'childName-error' : undefined}
                    />
                    <Baby className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" aria-hidden="true" />
                    <div className="absolute inset-0 rounded-[16px] bg-gradient-to-r from-pink-300/30 to-rose-300/30 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                  {errors.childName && (
                    <p id="childName-error" className="mt-1.5 text-sm text-red-500 flex items-center gap-1" role="alert">
                      <AlertCircle className="h-4 w-4" aria-hidden="true" />
                      {errors.childName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="childAge" className="block text-sm font-black text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-amber-500" aria-hidden="true" />
                    Usia Anak (Tahun) <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <div className="relative">
                    <input
                      {...register('childAge', { valueAsNumber: true })}
                      id="childAge"
                      type="number"
                      min="1"
                      max="18"
                      placeholder="Contoh: 4"
                      className={cn(
                        'w-full pl-12 pr-4 py-5 rounded-[16px] border-2 bg-white dark:bg-slate-800',
                        'text-slate-900 dark:text-white placeholder-slate-400 font-medium',
                        'focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-transparent',
                        'transition-all duration-200',
                        'hover:border-slate-300 dark:hover:border-slate-600',
                        'shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)]',
                        errors.childAge
                          ? 'border-red-300 dark:border-red-700 focus:ring-red-300 bg-red-50/30 dark:bg-red-900/20'
                          : 'border-slate-200 dark:border-slate-700'
                      )}
                      aria-invalid={errors.childAge ? 'true' : 'false'}
                      aria-describedby={errors.childAge ? 'childAge-error' : undefined}
                    />
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" aria-hidden="true" />
                    <div className="absolute inset-0 rounded-[16px] bg-gradient-to-r from-amber-300/30 to-orange-300/30 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                  {errors.childAge && (
                    <p id="childAge-error" className="mt-1.5 text-sm text-red-500 flex items-center gap-1" role="alert">
                      <AlertCircle className="h-4 w-4" aria-hidden="true" />
                      {errors.childAge.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-black text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                    <Phone className="h-4 w-4 text-green-500" aria-hidden="true" />
                    Nomor WhatsApp <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <div className="relative">
                    <input
                      {...register('whatsapp')}
                      id="whatsapp"
                      type="tel"
                      placeholder="08xx-xxxx-xxxx"
                      className={cn(
                        'w-full pl-12 pr-4 py-5 rounded-[16px] border-2 bg-white dark:bg-slate-800',
                        'text-slate-900 dark:text-white placeholder-slate-400 font-medium',
                        'focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-transparent',
                        'transition-all duration-200',
                        'hover:border-slate-300 dark:hover:border-slate-600',
                        'shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)]',
                        errors.whatsapp
                          ? 'border-red-300 dark:border-red-700 focus:ring-red-300 bg-red-50/30 dark:bg-red-900/20'
                          : 'border-slate-200 dark:border-slate-700'
                      )}
                      aria-invalid={errors.whatsapp ? 'true' : 'false'}
                      aria-describedby={errors.whatsapp ? 'whatsapp-error' : undefined}
                    />
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" aria-hidden="true" />
                    <div className="absolute inset-0 rounded-[16px] bg-gradient-to-r from-green-300/30 to-emerald-300/30 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                  {errors.whatsapp && (
                    <p id="whatsapp-error" className="mt-1.5 text-sm text-red-500 flex items-center gap-1" role="alert">
                      <AlertCircle className="h-4 w-4" aria-hidden="true" />
                      {errors.whatsapp.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-black text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                    <Mail className="h-4 w-4 text-purple-500" aria-hidden="true" />
                    Email (Opsional)
                  </label>
                  <div className="relative">
                    <input
                      {...register('email')}
                      id="email"
                      type="email"
                      placeholder="email@contoh.com"
                      className={cn(
                        'w-full pl-12 pr-4 py-5 rounded-[16px] border-2 bg-white dark:bg-slate-800',
                        'text-slate-900 dark:text-white placeholder-slate-400 font-medium',
                        'focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-transparent',
                        'transition-all duration-200',
                        'hover:border-slate-300 dark:hover:border-slate-600',
                        'shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)]',
                        errors.email
                          ? 'border-red-300 dark:border-red-700 focus:ring-red-300 bg-red-50/30 dark:bg-red-900/20'
                          : 'border-slate-200 dark:border-slate-700'
                      )}
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" aria-hidden="true" />
                    <div className="absolute inset-0 rounded-[16px] bg-gradient-to-r from-purple-300/30 to-pink-300/30 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-sm text-red-500 flex items-center gap-1" role="alert">
                      <AlertCircle className="h-4 w-4" aria-hidden="true" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="preferredDate" className="block text-sm font-black text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-orange-500" aria-hidden="true" />
                    Tanggal Kunjungan yang Diharapkan <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <div className="relative">
                    <input
                      {...register('preferredDate')}
                      id="preferredDate"
                      type="date"
                      min={getTomorrowDate()}
                      className={cn(
                        'w-full pl-12 pr-4 py-5 rounded-[16px] border-2 bg-white dark:bg-slate-800',
                        'text-slate-900 dark:text-white font-medium',
                        'focus:outline-none focus:ring-4 focus:ring-orange-200 focus:border-transparent',
                        'transition-all duration-200',
                        'hover:border-slate-300 dark:hover:border-slate-600',
                        'shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)]',
                        errors.preferredDate
                          ? 'border-red-300 dark:border-red-700 focus:ring-red-300 bg-red-50/30 dark:bg-red-900/20'
                          : 'border-slate-200 dark:border-slate-700'
                      )}
                      aria-invalid={errors.preferredDate ? 'true' : 'false'}
                      aria-describedby={errors.preferredDate ? 'preferredDate-error' : undefined}
                    />
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" aria-hidden="true" />
                    <div className="absolute inset-0 rounded-[16px] bg-gradient-to-r from-orange-300/30 to-red-300/30 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                  {errors.preferredDate && (
                    <p id="preferredDate-error" className="mt-1.5 text-sm text-red-500 flex items-center gap-1" role="alert">
                      <AlertCircle className="h-4 w-4" aria-hidden="true" />
                      {errors.preferredDate.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="notes" className="block text-sm font-black text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                    <Sparkles className="h-4 w-4 text-teal-500" aria-hidden="true" />
                    Catatan / Pertanyaan (Opsional)
                  </label>
                  <textarea
                    {...register('notes')}
                    id="notes"
                    rows={4}
                    placeholder="Sebutkan program yang diminati, kebutuhan khusus, atau pertanyaan lain..."
                    className={cn(
                      'w-full px-4 py-4 rounded-[16px] border-2 bg-white dark:bg-slate-800 resize-none',
                      'text-slate-900 dark:text-white placeholder-slate-400 font-medium',
                      'focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-transparent',
                      'transition-all duration-200',
                      'hover:border-slate-300 dark:hover:border-slate-600',
                      'shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)]',
                      errors.notes
                        ? 'border-red-300 dark:border-red-700 focus:ring-red-300 bg-red-50/30 dark:bg-red-900/20'
                        : 'border-slate-200 dark:border-slate-700'
                    )}
                    aria-invalid={errors.notes ? 'true' : 'false'}
                    aria-describedby={errors.notes ? 'notes-error' : undefined}
                  />
                  <div className="absolute inset-0 rounded-[16px] bg-gradient-to-r from-teal-300/30 to-emerald-300/30 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  {errors.notes && (
                    <p id="notes-error" className="mt-1.5 text-sm text-red-500 flex items-center gap-1" role="alert">
                      <AlertCircle className="h-4 w-4" aria-hidden="true" />
                      {errors.notes.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={submitStatus === 'submitting'}
                  className={cn(
                    'group relative flex-1 inline-flex items-center justify-center gap-2 rounded-full border-4 font-black text-base py-5 transition-all duration-300',
                    'focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:ring-offset-2',
                    submitStatus === 'submitting'
                      ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 border-slate-300 dark:border-slate-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 text-white border-emerald-600 border-t-2 border-emerald-200/50 shadow-[0_16px_40px_-8px_rgba(16,185,129,0.5),_inset_0_2px_0_rgba(255,255,255,0.3)] hover:from-emerald-400 hover:via-teal-400 hover:to-emerald-400 hover:shadow-[0_20px_50px_-10px_rgba(16,185,129,0.6),_inset_0_2px_0_rgba(255,255,255,0.4)] active:translate-y-1.5 active:border-b-4 active:shadow-[0_6px_16px_-4px_rgba(16,185,129,0.4)]'
                  )}
                >
                  <span className="relative z-10">{submitStatus === 'submitting' ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" aria-hidden="true" />
                      Kirim Formulir
                    </>
                  )}</span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </button>

                <a
                  href={`https://wa.me/${WHATSAPP_ADMIN}?text=${formatWhatsAppMessage(contactFormDefaultValues)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex-1 inline-flex items-center justify-center gap-2 rounded-full border-4 border-green-300 dark:border-green-700 border-t-2 border-green-100/50 bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 dark:from-green-900/30 dark:via-emerald-900/30 dark:to-green-900/30 px-6 py-5 text-base font-black text-green-700 dark:text-green-300 hover:bg-gradient-to-r hover:from-green-100 hover:via-emerald-100 hover:to-green-100 dark:hover:from-green-900/40 dark:hover:via-emerald-900/40 dark:hover:to-green-900/40 hover:border-green-400 dark:hover:border-green-600 hover:shadow-[0_16px_40px_-8px_rgba(34,197,94,0.3)] hover:-translate-y-1 transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-offset-2"
                >
                  <MessageSquare className="h-5 w-5 transition-transform group-hover:scale-110 group-hover:rotate-12" aria-hidden="true" />
                  <span className="relative z-10">Chat WhatsApp</span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-green-100/40 to-transparent animate-shimmer" />
                </a>
              </div>

              <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
                Dengan mengirim formulir ini, Anda menyetujui kebijakan privasi kami. Data Anda aman dan tidak akan dibagikan ke pihak ketiga.
                <Shield className="h-3.5 w-3.5 inline-block ml-1 text-emerald-500 animate-bounce-slow" aria-hidden="true" />
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