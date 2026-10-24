'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ppdbRegistrationSchema, type PPDBRegistrationData, ppdbRegistrationDefaultValues } from '@/lib/validations/ppdb'
import { ArrowRight, ArrowLeft, Check, Loader2, Sparkles, Star, Shield, User, Baby, Calendar, BookOpen, MessageSquare, AlertCircle, Mail, Sparkle, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FloatingOrnaments } from '@/components/ui/FloatingOrnaments'

const steps = [
  { id: 'parent', title: 'Data Orang Tua', icon: '👨‍👩‍👧' },
  { id: 'child', title: 'Data Anak', icon: '👶' },
  { id: 'program', title: 'Pilih Program', icon: '📚' },
  { id: 'confirm', title: 'Konfirmasi', icon: '✅' },
]

const programs = [
  { value: 'toddler-class', label: 'Toddler Class (1-3 Tahun)' },
  { value: 'playgroup', label: 'Playgroup (2-4 Tahun)' },
  { value: 'tk-a', label: 'TK A / Kelompok A (4-5 Tahun)' },
  { value: 'tk-b', label: 'TK B / Kelompok B (5-6 Tahun)' },
]

const stepThemes = [
  {
    bg: 'bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100 dark:from-emerald-900/40 dark:via-teal-900/40 dark:to-cyan-900/40',
    border: 'border-emerald-300/60 dark:border-emerald-700/60',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    inputFocus: 'focus:ring-emerald-200',
    glow: 'shadow-emerald-400/40',
    shimmerColor: 'from-emerald-300/30 via-transparent to-teal-300/30',
  },
  {
    bg: 'bg-gradient-to-br from-pink-100 via-rose-100 to-fuchsia-100 dark:from-pink-900/40 dark:via-rose-900/40 dark:to-fuchsia-900/40',
    border: 'border-pink-300/60 dark:border-pink-700/60',
    iconColor: 'text-pink-600 dark:text-pink-400',
    inputFocus: 'focus:ring-pink-200',
    glow: 'shadow-pink-400/40',
    shimmerColor: 'from-pink-300/30 via-transparent to-rose-300/30',
  },
  {
    bg: 'bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100 dark:from-amber-900/40 dark:via-yellow-900/40 dark:to-orange-900/40',
    border: 'border-amber-300/60 dark:border-amber-700/60',
    iconColor: 'text-amber-600 dark:text-amber-400',
    inputFocus: 'focus:ring-amber-200',
    glow: 'shadow-amber-400/40',
    shimmerColor: 'from-amber-300/30 via-transparent to-yellow-300/30',
  },
  {
    bg: 'bg-gradient-to-br from-purple-100 via-violet-100 to-indigo-100 dark:from-purple-900/40 dark:via-violet-900/40 dark:to-indigo-900/40',
    border: 'border-purple-300/60 dark:border-purple-700/60',
    iconColor: 'text-purple-600 dark:text-purple-400',
    inputFocus: 'focus:ring-purple-200',
    glow: 'shadow-purple-400/40',
    shimmerColor: 'from-purple-300/30 via-transparent to-violet-300/30',
  },
]

export function PPDBForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string; registrationNumber?: string } | null>(null)

  const form = useForm<PPDBRegistrationData>({
    resolver: zodResolver(ppdbRegistrationSchema),
    defaultValues: ppdbRegistrationDefaultValues,
    mode: 'onChange',
  })

  const { register, handleSubmit, formState: { errors } } = form

  const goNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (data: PPDBRegistrationData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/ppdb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (result.success) {
        setSubmitResult({ success: true, message: result.message, registrationNumber: result.registrationNumber })
      } else {
        setSubmitResult({ success: false, message: result.message || 'Terjadi kesalahan' })
      }
    } catch {
      setSubmitResult({ success: false, message: 'Gagal mengirim data. Silakan coba lagi.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitResult?.success) {
    return (
      <div className="relative max-w-2xl mx-auto">
        <FloatingOrnaments count={20} variant="card" />
        <div className="relative z-10 text-center py-12">
          <div className="relative inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 mb-6 border-4 border-emerald-300 shadow-[0_16px_40px_rgba(16,185,129,0.5),_inset_0_2px_0_rgba(255,255,255,0.3)]">
            <Check className="h-14 w-14 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2">
            Pendaftaran
            <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Berhasil!
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-2">{submitResult.message}</p>
          <p className="text-lg font-mono font-black text-emerald-600 dark:text-emerald-400 mb-8">
            No. Registrasi: {submitResult.registrationNumber}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
            Simpan nomor registrasi ini untuk keperluan komunikasi selanjutnya. Tim kami akan menghubungi Anda via WhatsApp dalam 1x24 jam.
            <Shield className="h-4 w-4 inline-block ml-1 text-emerald-500 animate-bounce-slow" aria-hidden="true" />
          </p>
          <button
            onClick={() => { setSubmitResult(null); form.reset(); setCurrentStep(0); }}
            className="group relative inline-flex items-center justify-center gap-2 rounded-full border-4 border-emerald-300 dark:border-emerald-700 border-t-2 border-emerald-100/50 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black px-8 py-4 shadow-[0_12px_32px_rgba(16,185,129,0.5),_inset_0_2px_0_rgba(255,255,255,0.3)] hover:from-emerald-400 hover:to-teal-400 hover:shadow-[0_16px_40px_rgba(16,185,129,0.6),_inset_0_2px_0_rgba(255,255,255,0.4)] active:translate-y-1 active:border-b-4 active:shadow-[0_6px_16px_rgba(16,185,129,0.4)] transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:ring-offset-2"
          >
            <span className="relative z-10">Daftar Lagi</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:rotate-12" aria-hidden="true" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </button>
        </div>
      </div>
    )
  }

  if (submitResult?.success === false) {
    return (
      <div className="relative max-w-2xl mx-auto">
        <FloatingOrnaments count={15} variant="card" />
        <div className="relative z-10 text-center py-12">
          <div className="relative inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-red-400 to-pink-400 mb-6 border-4 border-red-300 shadow-[0_16px_40px_rgba(239,68,68,0.5),_inset_0_2px_0_rgba(255,255,255,0.3)]">
            <svg className="h-14 w-14 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Gagal Mendaftar</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-md mx-auto">{submitResult.message}</p>
          <button
            onClick={() => { setSubmitResult(null); }}
            className="group relative inline-flex items-center justify-center gap-2 rounded-full border-4 border-red-300 dark:border-red-700 border-t-2 border-red-100/50 bg-gradient-to-r from-red-500 to-pink-500 text-white font-black px-8 py-4 w-full max-wxs shadow-[0_12px_32px_rgba(239,68,68,0.5),_inset_0_2px_0_rgba(255,255,255,0.3)] hover:from-red-400 hover:to-pink-400 hover:shadow-[0_16px_40px_rgba(239,68,68,0.6),_inset_0_2px_0_rgba(255,255,255,0.4)] active:translate-y-1 active:border-b-4 active:shadow-[0_6px_16px_rgba(239,68,68,0.4)] transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-offset-2"
          >
            <span className="relative z-10">Coba Lagi</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:rotate-12" aria-hidden="true" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </button>
        </div>
      </div>
    )
  }

  const step = steps[currentStep]
  const theme = stepThemes[currentStep]

  return (
    <div className="relative max-w-2xl mx-auto">
      <FloatingOrnaments count={25} variant="section" />
      
      <div className="relative z-10">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4 relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200/50 dark:bg-slate-700/50 -z-10" />
            {steps.map((s, idx) => (
              <div key={s.id} className="flex items-center flex-col relative z-10">
                <div className={cn(
                  'w-16 h-16 rounded-full flex items-center justify-center text-base font-black transition-all duration-500 border-4 shadow-[0_8px_24px_rgba(0,0,0,0.15),_inset_0_2px_0_rgba(255,255,255,0.2)]',
                  idx < currentStep
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-emerald-600 shadow-emerald-400/50'
                    : idx === currentStep
                    ? `${theme.bg} ${theme.iconColor} ${theme.border} ring-4 ring-emerald-200 dark:ring-emerald-800 shadow-lg ${theme.glow}`
                    : 'bg-slate-200/50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 border-slate-300/50 dark:border-slate-600/50'
                )}>
                  {idx < currentStep ? <Check className="h-8 w-8" /> : <span className="animate-bounce-slow">{idx + 1}</span>}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent" />
                </div>
                <span className="mt-2 text-xs font-black text-center w-24 text-slate-600 dark:text-slate-400">
                  {s.title}
                </span>
              </div>
            ))}
          </div>
          <div className="text-center text-sm font-black text-slate-600 dark:text-slate-400">
            Langkah {currentStep + 1} dari {steps.length}: {step.title}
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className={`relative p-6 sm:p-8 rounded-[40px] border-4 ${theme.bg} ${theme.border} shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] ${theme.glow} dark:bg-slate-900/50`}>
            <FloatingOrnaments count={10} variant="card" className="pointer-events-none" />
            
            {/* Glossy highlight overlay */}
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-b from-white/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="absolute inset-0 rounded-[40px] opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: theme.shimmerColor }} />
            
            <div className="mb-6 pb-4 border-b border-slate-200/50 dark:border-slate-700/50">
              <h3 className="flex items-center gap-3 text-2xl font-black text-slate-900 dark:text-white drop-shadow-[0_2px_8px_rgba(251,191,36,0.15)]">
                <span className="text-3xl animate-bounce-slow">{step.icon}</span>
                {step.title}
              </h3>
            </div>

            <div className="space-y-6">
              {/* Step 1: Parent Data */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="parentName" className="block text-sm font-black text-slate-700 dark:text-slate-300 flex items-center gap-1">
                        <User className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                        Nama Lengkap Orang Tua <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="parentName"
                          placeholder="Contoh: Budi Santoso"
                          {...form.register('parentName')}
                          className={cn(
                            'w-full pl-12 pr-4 py-5 rounded-[16px] border-2 bg-white dark:bg-slate-800',
                            'text-slate-900 dark:text-white placeholder-slate-400 font-medium',
                            'focus:outline-none focus:ring-4 focus:border-transparent transition-all duration-200',
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
                        <div className="absolute inset-0 rounded-[16px] bg-gradient-to-r from-emerald-300/30 to-teal-300/30 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </div>
                      {form.formState.errors.parentName && (
                        <p className="text-sm text-red-500 flex items-center gap-1" role="alert">
                          <AlertCircle className="h-4 w-4" aria-hidden="true" />
                          {form.formState.errors.parentName.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="parentPhone" className="block text-sm font-black text-slate-700 dark:text-slate-300 flex items-center gap-1">
                        <MessageSquare className="h-4 w-4 text-green-500" aria-hidden="true" />
                        Nomor WhatsApp <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="parentPhone"
                          type="tel"
                          placeholder="Contoh: 081234567890"
                          {...form.register('parentPhone')}
                          className={cn(
                            'w-full pl-12 pr-4 py-5 rounded-[16px] border-2 bg-white dark:bg-slate-800',
                            'text-slate-900 dark:text-white placeholder-slate-400 font-medium',
                            'focus:outline-none focus:ring-4 focus:border-transparent transition-all duration-200',
                            'hover:border-slate-300 dark:hover:border-slate-600',
                            'shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)]',
                            errors.parentPhone
                              ? 'border-red-300 dark:border-red-700 focus:ring-red-300 bg-red-50/30 dark:bg-red-900/20'
                              : 'border-slate-200 dark:border-slate-700'
                          )}
                          aria-invalid={errors.parentPhone ? 'true' : 'false'}
                          aria-describedby={errors.parentPhone ? 'parentPhone-error' : undefined}
                        />
                        <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" aria-hidden="true" />
                        <div className="absolute inset-0 rounded-[16px] bg-gradient-to-r from-green-300/30 to-emerald-300/30 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </div>
                      {form.formState.errors.parentPhone && (
                        <p className="text-sm text-red-500 flex items-center gap-1" role="alert">
                          <AlertCircle className="h-4 w-4" aria-hidden="true" />
                          {form.formState.errors.parentPhone.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="parentEmail" className="block text-sm font-black text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <Mail className="h-4 w-4 text-purple-500" aria-hidden="true" />
                      Email (Opsional)
                    </label>
                    <div className="relative">
                      <input
                        id="parentEmail"
                        type="email"
                        placeholder="Contoh: budi@email.com"
                        {...form.register('parentEmail')}
                        className={cn(
                          'w-full pl-12 pr-4 py-5 rounded-[16px] border-2 bg-white dark:bg-slate-800',
                          'text-slate-900 dark:text-white placeholder-slate-400 font-medium',
                          'focus:outline-none focus:ring-4 focus:border-transparent transition-all duration-200',
                          'hover:border-slate-300 dark:hover:border-slate-600',
                          'shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)]',
                          errors.parentEmail
                            ? 'border-red-300 dark:border-red-700 focus:ring-red-300 bg-red-50/30 dark:bg-red-900/20'
                            : 'border-slate-200 dark:border-slate-700'
                        )}
                        aria-invalid={errors.parentEmail ? 'true' : 'false'}
                        aria-describedby={errors.parentEmail ? 'parentEmail-error' : undefined}
                      />
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" aria-hidden="true" />
                      <div className="absolute inset-0 rounded-[16px] bg-gradient-to-r from-purple-300/30 to-pink-300/30 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                    {form.formState.errors.parentEmail && (
                      <p className="text-sm text-red-500 flex items-center gap-1" role="alert">
                        <AlertCircle className="h-4 w-4" aria-hidden="true" />
                        {form.formState.errors.parentEmail.message}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Child Data */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="childFullName" className="block text-sm font-black text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <Baby className="h-4 w-4 text-pink-500" aria-hidden="true" />
                      Nama Lengkap Anak <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="childFullName"
                        placeholder="Contoh: Ahmad Fauzi Santoso"
                        {...form.register('childFullName')}
                        className={cn(
                          'w-full pl-12 pr-4 py-5 rounded-[16px] border-2 bg-white dark:bg-slate-800',
                          'text-slate-900 dark:text-white placeholder-slate-400 font-medium',
                          'focus:outline-none focus:ring-4 focus:border-transparent transition-all duration-200',
                          'hover:border-slate-300 dark:hover:border-slate-600',
                          'shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)]',
                          errors.childFullName
                            ? 'border-red-300 dark:border-red-700 focus:ring-red-300 bg-red-50/30 dark:bg-red-900/20'
                            : 'border-slate-200 dark:border-slate-700'
                        )}
                        aria-invalid={errors.childFullName ? 'true' : 'false'}
                        aria-describedby={errors.childFullName ? 'childFullName-error' : undefined}
                      />
                      <Baby className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" aria-hidden="true" />
                      <div className="absolute inset-0 rounded-[16px] bg-gradient-to-r from-pink-300/30 to-rose-300/30 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                    {form.formState.errors.childFullName && (
                      <p className="text-sm text-red-500 flex items-center gap-1" role="alert">
                        <AlertCircle className="h-4 w-4" aria-hidden="true" />
                        {form.formState.errors.childFullName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="childNickname" className="block text-sm font-black text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <Sparkles className="h-4 w-4 text-amber-500" aria-hidden="true" />
                      Nama Panggilan (Opsional)
                    </label>
                    <div className="relative">
                      <input
                        id="childNickname"
                        placeholder="Contoh: Aji"
                        {...form.register('childNickname')}
                        className={cn(
                          'w-full pl-12 pr-4 py-5 rounded-[16px] border-2 bg-white dark:bg-slate-800',
                          'text-slate-900 dark:text-white placeholder-slate-400 font-medium',
                          'focus:outline-none focus:ring-4 focus:border-transparent transition-all duration-200',
                          'hover:border-slate-300 dark:hover:border-slate-600',
                          'shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)]',
                          'border-slate-200 dark:border-slate-700'
                        )}
                      />
                      <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" aria-hidden="true" />
                      <div className="absolute inset-0 rounded-[16px] bg-gradient-to-r from-amber-300/30 to-orange-300/30 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="childDob" className="block text-sm font-black text-slate-700 dark:text-slate-300 flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-orange-500" aria-hidden="true" />
                        Tanggal Lahir <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="childDob"
                          type="date"
                          max={new Date().toISOString().split('T')[0]}
                          {...form.register('childDob')}
                          className={cn(
                            'w-full pl-12 pr-4 py-5 rounded-[16px] border-2 bg-white dark:bg-slate-800',
                            'text-slate-900 dark:text-white font-medium',
                            'focus:outline-none focus:ring-4 focus:border-transparent transition-all duration-200',
                            'hover:border-slate-300 dark:hover:border-slate-600',
                            'shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)]',
                            errors.childDob
                              ? 'border-red-300 dark:border-red-700 focus:ring-red-300 bg-red-50/30 dark:bg-red-900/20'
                              : 'border-slate-200 dark:border-slate-700'
                          )}
                          aria-invalid={errors.childDob ? 'true' : 'false'}
                          aria-describedby={errors.childDob ? 'childDob-error' : undefined}
                        />
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" aria-hidden="true" />
                        <div className="absolute inset-0 rounded-[16px] bg-gradient-to-r from-amber-300/30 to-orange-300/30 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </div>
                      {form.formState.errors.childDob && (
                        <p className="text-sm text-red-500 flex items-center gap-1" role="alert">
                          <AlertCircle className="h-4 w-4" aria-hidden="true" />
                          {form.formState.errors.childDob.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-black text-slate-700 dark:text-slate-300 flex items-center gap-1">
                        <Shield className="h-4 w-4 text-blue-500" aria-hidden="true" />
                        Jenis Kelamin <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          {...form.register('gender')}
                          className={cn(
                            'appearance-none w-full pl-12 pr-10 py-5 rounded-[16px] border-2 bg-white dark:bg-slate-800',
                            'text-slate-900 dark:text-white font-medium',
                            'focus:outline-none focus:ring-4 focus:border-transparent transition-all duration-200',
                            'hover:border-slate-300 dark:hover:border-slate-600',
                            'shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)]',
                            errors.gender
                              ? 'border-red-300 dark:border-red-700 focus:ring-red-300 bg-red-50/30 dark:bg-red-900/20'
                              : 'border-slate-200 dark:border-slate-700'
                          )}
                          aria-invalid={errors.gender ? 'true' : 'false'}
                          aria-describedby={errors.gender ? 'gender-error' : undefined}
                        >
                          <option value="" disabled>Pilih jenis kelamin</option>
                          <option value="L">Laki-laki</option>
                          <option value="P">Perempuan</option>
                        </select>
                        <Shield className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" aria-hidden="true" />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                        <div className="absolute inset-0 rounded-[16px] bg-gradient-to-r from-blue-300/30 to-sky-300/30 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </div>
                      {form.formState.errors.gender && (
                        <p id="gender-error" className="text-sm text-red-500 flex items-center gap-1" role="alert">
                          <AlertCircle className="h-4 w-4" aria-hidden="true" />
                          {form.formState.errors.gender.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Program Selection */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-black text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <BookOpen className="h-4 w-4 text-blue-500" aria-hidden="true" />
                      Program yang Dilamar <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        {...form.register('programApplied')}
                        className={cn(
                          'appearance-none w-full pl-12 pr-10 py-5 rounded-[16px] border-2 bg-white dark:bg-slate-800',
                          'text-slate-900 dark:text-white font-medium',
                          'focus:outline-none focus:ring-4 focus:border-transparent transition-all duration-200',
                          'hover:border-slate-300 dark:hover:border-slate-600',
                          'shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)]',
                          errors.programApplied
                            ? 'border-red-300 dark:border-red-700 focus:ring-red-300 bg-red-50/30 dark:bg-red-900/20'
                            : 'border-slate-200 dark:border-slate-700'
                        )}
                        aria-invalid={errors.programApplied ? 'true' : 'false'}
                        aria-describedby={errors.programApplied ? 'programApplied-error' : undefined}
                      >
                        <option value="" disabled>Pilih program</option>
                        {programs.map((p) => (
                          <option key={p.value} value={p.value}>{p.label}</option>
                        ))}
                      </select>
                      <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" aria-hidden="true" />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </div>
                      <div className="absolute inset-0 rounded-[16px] bg-gradient-to-r from-blue-300/30 to-purple-300/30 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                    {form.formState.errors.programApplied && (
                      <p id="programApplied-error" className="text-sm text-red-500 flex items-center gap-1" role="alert">
                        <AlertCircle className="h-4 w-4" aria-hidden="true" />
                        {form.formState.errors.programApplied.message}
                      </p>
                    )}
                  </div>
                  <div className="relative rounded-[24px] bg-blue-50 dark:bg-blue-900/20 p-4 border-2 border-blue-200 dark:border-blue-800">
                    <FloatingOrnaments count={3} variant="card" className="pointer-events-none" />
                    <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-white/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <p className="relative text-sm text-blue-800 dark:text-blue-200 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 animate-bounce" aria-hidden="true" />
                      <Sparkle className="h-4 w-4 text-amber-300 animate-pulse-glow" aria-hidden="true" />
                      <strong>Catatan:</strong> Usia anak akan diverifikasi sesuai program yang dipilih.
                      Pastikan usia anak sesuai dengan rentang usia program pada saat tahun ajaran berlangsung.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="relative rounded-[24px] bg-slate-50 dark:bg-slate-800/50 p-4 border-2 border-slate-200/50 dark:border-slate-700/50">
                    <FloatingOrnaments count={4} variant="card" className="pointer-events-none" />
                    <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-white/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <h4 className="relative font-black text-slate-900 dark:text-white mb-4">Ringkasan Data</h4>
                    <dl className="relative grid gap-3 sm:grid-cols-2 text-sm">
                      <dt className="text-slate-500 dark:text-slate-400">Nama Orang Tua</dt>
                      <dd className="font-black">{form.getValues('parentName')}</dd>
                      <dt className="text-slate-500 dark:text-slate-400">WhatsApp</dt>
                      <dd className="font-black">{form.getValues('parentPhone')}</dd>
                      {form.getValues('parentEmail') && (
                        <>
                          <dt className="text-slate-500 dark:text-slate-400">Email</dt>
                          <dd className="font-black">{form.getValues('parentEmail')}</dd>
                        </>
                      )}
                      <dt className="text-slate-500 dark:text-slate-400">Nama Anak</dt>
                      <dd className="font-black">{form.getValues('childFullName')}</dd>
                      {form.getValues('childNickname') && (
                        <>
                          <dt className="text-slate-500 dark:text-slate-400">Nama Panggilan</dt>
                          <dd className="font-black">{form.getValues('childNickname')}</dd>
                        </>
                      )}
                      <dt className="text-slate-500 dark:text-slate-400">Tanggal Lahir</dt>
                      <dd className="font-black">{new Date(form.getValues('childDob')).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</dd>
                      <dt className="text-slate-500 dark:text-slate-400">Jenis Kelamin</dt>
                      <dd className="font-black">{form.getValues('gender') === 'L' ? 'Laki-laki' : 'Perempuan'}</dd>
                      <dt className="text-slate-500 dark:text-slate-400">Program</dt>
                      <dd className="font-black">{programs.find(p => p.value === form.getValues('programApplied'))?.label || '-'}</dd>
                    </dl>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="notes" className="block text-sm font-black text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <Sparkles className="h-4 w-4 text-teal-500" aria-hidden="true" />
                      Catatan Tambahan (Opsional)
                    </label>
                    <textarea
                      id="notes"
                      placeholder="Informasi tambahan yang ingin disampaikan..."
                      rows={3}
                      {...form.register('notes')}
                      className={cn(
                        'w-full px-4 py-4 rounded-[16px] border-2 bg-white dark:bg-slate-800 resize-none',
                        'text-slate-900 dark:text-white placeholder-slate-400 font-medium',
                        'focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-transparent transition-all duration-200',
                        'hover:border-slate-300 dark:hover:border-slate-600',
                        'shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)]',
                        'border-slate-200 dark:border-slate-700'
                      )}
                    />
                    <div className="absolute inset-0 rounded-[16px] bg-gradient-to-r from-teal-300/30 to-emerald-300/30 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                  <div className="relative rounded-[24px] bg-amber-50 dark:bg-amber-900/20 p-4 border-2 border-amber-200 dark:border-amber-800">
                    <FloatingOrnaments count={3} variant="card" className="pointer-events-none" />
                    <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-white/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <p className="relative text-sm text-amber-800 dark:text-amber-200 flex items-center gap-2">
                      <Shield className="h-4 w-4 flex-shrink-0 animate-bounce-slow" aria-hidden="true" />
                      <Sparkle className="h-4 w-4 text-amber-300 animate-pulse-glow" aria-hidden="true" />
                      <strong>Konfirmasi:</strong> Dengan menekan tombol "Kirim Pendaftaran", saya menyatakan bahwa semua data yang diisi benar dan lengkap. Saya bersedia dihubungi via WhatsApp untuk verifikasi dan informasi lanjutan.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={isSubmitting}
                    className="group relative inline-flex items-center justify-center gap-2 rounded-full border-4 border-slate-300/50 dark:border-slate-600/50 border-t-2 border-slate-200/50 bg-white dark:bg-slate-800 px-6 py-3 font-black text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-400/50 dark:hover:border-slate-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-slate-300 focus:ring-offset-2"
                  >
                    <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                    <span className="relative z-10">Kembali</span>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-slate-100/40 to-transparent animate-shimmer" />
                  </button>
                )}
                {currentStep < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => {
                      form.trigger().then(valid => valid && goNext())
                    }}
                    disabled={isSubmitting}
                    className="group relative inline-flex items-center justify-center gap-2 rounded-full border-4 border-emerald-300 dark:border-emerald-700 border-t-2 border-emerald-100/50 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black px-8 py-3 shadow-[0_12px_32px_rgba(16,185,129,0.5),_inset_0_2px_0_rgba(255,255,255,0.3)] hover:from-emerald-400 hover:to-teal-400 hover:shadow-[0_16px_40px_rgba(16,185,129,0.6),_inset_0_2px_0_rgba(255,255,255,0.4)] active:translate-y-1 active:border-b-4 active:shadow-[0_6px_16px_rgba(16,185,129,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:ring-offset-2"
                  >
                    <span className="relative z-10">Selanjutnya</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:rotate-12" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border-4 border-emerald-300 dark:border-emerald-700 border-t-2 border-emerald-100/50 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 text-white font-black px-8 py-3 shadow-[0_16px_40px_-8px_rgba(16,185,129,0.5),_inset_0_2px_0_rgba(255,255,255,0.3)] hover:from-emerald-400 hover:via-teal-400 hover:to-emerald-400 hover:shadow-[0_20px_50px_-10px_rgba(16,185,129,0.6),_inset_0_2px_0_rgba(255,255,255,0.4)] active:translate-y-1.5 active:border-b-4 active:shadow-[0_6px_16px_-4px_rgba(16,185,129,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:ring-offset-2"
                  >
                    <span className="relative z-10">{isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Mengirim...
                      </>
                    ) : (
                      'Kirim Pendaftaran'
                    )}</span>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}