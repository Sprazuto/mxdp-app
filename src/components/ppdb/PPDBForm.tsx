'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ppdbRegistrationSchema, type PPDBRegistrationData, ppdbRegistrationDefaultValues } from '@/lib/validations/ppdb'
import { ArrowRight, ArrowLeft, Check, Loader2, Sparkles, Star, Shield, User, Baby, Calendar, BookOpen, MessageSquare, AlertCircle, Mail } from 'lucide-react'
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
        <FloatingOrnaments count={15} variant="card" />
        <div className="relative z-10 text-center py-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-6 border-4 border-emerald-200 dark:border-emerald-800 shadow-xl shadow-emerald-200/50">
            <Check className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
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
            <Shield className="h-4 w-4 inline-block ml-1 text-emerald-500" aria-hidden="true" />
          </p>
          <button
            onClick={() => { setSubmitResult(null); form.reset(); setCurrentStep(0); }}
            className="inline-flex items-center justify-center gap-2 rounded-full border-4 border-emerald-300 dark:border-emerald-700 bg-emerald-500 hover:bg-emerald-400 text-white font-black px-8 py-4 shadow-lg shadow-emerald-200/50 hover:shadow-xl hover:shadow-emerald-300/50 hover:-translate-y-1 active:translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:ring-offset-2"
          >
            Daftar Lagi
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    )
  }

  if (submitResult?.success === false) {
    return (
      <div className="relative max-w-2xl mx-auto">
        <FloatingOrnaments count={10} variant="card" />
        <div className="relative z-10 text-center py-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/30 mb-6 border-4 border-red-200 dark:border-red-800 shadow-xl shadow-red-200/50">
            <svg className="h-12 w-12 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Gagal Mendaftar</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-md mx-auto">{submitResult.message}</p>
          <button
            onClick={() => { setSubmitResult(null); }}
            className="inline-flex items-center justify-center gap-2 rounded-full border-4 border-red-300 dark:border-red-700 bg-red-500 hover:bg-red-400 text-white font-black px-8 py-4 w-full max-w-xs shadow-lg shadow-red-200/50 hover:shadow-xl hover:shadow-red-300/50 hover:-translate-y-1 active:translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-offset-2"
          >
            Coba Lagi
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    )
  }

  const step = steps[currentStep]
  const stepThemes = [
    { bg: 'bg-[#E6FFFA]', border: 'border-emerald-200 dark:border-emerald-800', iconColor: 'text-emerald-600 dark:text-emerald-400', inputFocus: 'focus:ring-emerald-200', glow: 'shadow-emerald-200' },
    { bg: 'bg-[#FDF2F8]', border: 'border-pink-200 dark:border-pink-800', iconColor: 'text-pink-600 dark:text-pink-400', inputFocus: 'focus:ring-pink-200', glow: 'shadow-pink-200' },
    { bg: 'bg-[#FEFCE8]', border: 'border-amber-200 dark:border-amber-800', iconColor: 'text-amber-600 dark:text-amber-400', inputFocus: 'focus:ring-amber-200', glow: 'shadow-amber-200' },
    { bg: 'bg-[#F5F3FF]', border: 'border-purple-200 dark:border-purple-800', iconColor: 'text-purple-600 dark:text-purple-400', inputFocus: 'focus:ring-purple-200', glow: 'shadow-purple-200' },
  ]
  const theme = stepThemes[currentStep]

  return (
    <div className="relative max-w-2xl mx-auto">
      <FloatingOrnaments count={20} variant="section" />
      
      <div className="relative z-10">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4 relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-700 -z-10" />
            {steps.map((s, idx) => (
              <div key={s.id} className="flex items-center flex-col relative z-10">
                <div className={cn(
                  'w-14 h-14 rounded-full flex items-center justify-center text-base font-black transition-all duration-300 border-4 shadow-lg',
                  idx < currentStep
                    ? 'bg-emerald-500 text-white border-emerald-600 shadow-emerald-200/50'
                    : idx === currentStep
                    ? `${theme.bg} ${theme.iconColor} ${theme.border} ring-4 ring-emerald-200 dark:ring-emerald-800 shadow-lg ${theme.glow}`
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-600'
                )}>
                  {idx < currentStep ? <Check className="h-7 w-7" /> : <span>{idx + 1}</span>}
                </div>
                <span className="mt-2 text-xs font-black text-center w-20 text-slate-600 dark:text-slate-400">
                  {s.title}
                </span>
              </div>
            ))}
          </div>
          <div className="text-center text-sm font-bold text-slate-600 dark:text-slate-400">
            Langkah {currentStep + 1} dari {steps.length}: {step.title}
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className={`relative p-6 sm:p-8 rounded-[32px] border-4 ${theme.bg} ${theme.border} shadow-xl ${theme.glow} dark:bg-slate-900/50`}>
            <FloatingOrnaments count={8} variant="card" className="pointer-events-none" />
            
            <div className="mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="flex items-center gap-3 text-2xl font-black text-slate-900 dark:text-white">
                <span className="text-3xl">{step.icon}</span>
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
                            'w-full pl-12 pr-4 py-4 rounded-[16px] border-2 bg-white dark:bg-slate-800',
                            'text-slate-900 dark:text-white placeholder-slate-400 font-medium',
                            'focus:outline-none focus:ring-4 focus:border-transparent transition-all duration-200',
                            'hover:border-slate-300 dark:hover:border-slate-600',
                            errors.parentName
                              ? 'border-red-300 dark:border-red-700 focus:ring-red-300 bg-red-50/30 dark:bg-red-900/20'
                              : 'border-slate-200 dark:border-slate-700'
                          )}
                          aria-invalid={errors.parentName ? 'true' : 'false'}
                          aria-describedby={errors.parentName ? 'parentName-error' : undefined}
                        />
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" aria-hidden="true" />
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
                            'w-full pl-12 pr-4 py-4 rounded-[16px] border-2 bg-white dark:bg-slate-800',
                            'text-slate-900 dark:text-white placeholder-slate-400 font-medium',
                            'focus:outline-none focus:ring-4 focus:border-transparent transition-all duration-200',
                            'hover:border-slate-300 dark:hover:border-slate-600',
                            errors.parentPhone
                              ? 'border-red-300 dark:border-red-700 focus:ring-red-300 bg-red-50/30 dark:bg-red-900/20'
                              : 'border-slate-200 dark:border-slate-700'
                          )}
                          aria-invalid={errors.parentPhone ? 'true' : 'false'}
                          aria-describedby={errors.parentPhone ? 'parentPhone-error' : undefined}
                        />
                        <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" aria-hidden="true" />
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
                          'w-full pl-12 pr-4 py-4 rounded-[16px] border-2 bg-white dark:bg-slate-800',
                          'text-slate-900 dark:text-white placeholder-slate-400 font-medium',
                          'focus:outline-none focus:ring-4 focus:border-transparent transition-all duration-200',
                          'hover:border-slate-300 dark:hover:border-slate-600',
                          errors.parentEmail
                            ? 'border-red-300 dark:border-red-700 focus:ring-red-300 bg-red-50/30 dark:bg-red-900/20'
                            : 'border-slate-200 dark:border-slate-700'
                        )}
                        aria-invalid={errors.parentEmail ? 'true' : 'false'}
                        aria-describedby={errors.parentEmail ? 'parentEmail-error' : undefined}
                      />
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" aria-hidden="true" />
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
                          'w-full pl-12 pr-4 py-4 rounded-[16px] border-2 bg-white dark:bg-slate-800',
                          'text-slate-900 dark:text-white placeholder-slate-400 font-medium',
                          'focus:outline-none focus:ring-4 focus:border-transparent transition-all duration-200',
                          'hover:border-slate-300 dark:hover:border-slate-600',
                          errors.childFullName
                            ? 'border-red-300 dark:border-red-700 focus:ring-red-300 bg-red-50/30 dark:bg-red-900/20'
                            : 'border-slate-200 dark:border-slate-700'
                        )}
                        aria-invalid={errors.childFullName ? 'true' : 'false'}
                        aria-describedby={errors.childFullName ? 'childFullName-error' : undefined}
                      />
                      <Baby className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" aria-hidden="true" />
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
                          'w-full pl-12 pr-4 py-4 rounded-[16px] border-2 bg-white dark:bg-slate-800',
                          'text-slate-900 dark:text-white placeholder-slate-400 font-medium',
                          'focus:outline-none focus:ring-4 focus:border-transparent transition-all duration-200',
                          'hover:border-slate-300 dark:hover:border-slate-600',
                          'border-slate-200 dark:border-slate-700'
                        )}
                      />
                      <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" aria-hidden="true" />
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
                            'w-full pl-12 pr-4 py-4 rounded-[16px] border-2 bg-white dark:bg-slate-800',
                            'text-slate-900 dark:text-white font-medium',
                            'focus:outline-none focus:ring-4 focus:border-transparent transition-all duration-200',
                            'hover:border-slate-300 dark:hover:border-slate-600',
                            errors.childDob
                              ? 'border-red-300 dark:border-red-700 focus:ring-red-300 bg-red-50/30 dark:bg-red-900/20'
                              : 'border-slate-200 dark:border-slate-700'
                          )}
                          aria-invalid={errors.childDob ? 'true' : 'false'}
                          aria-describedby={errors.childDob ? 'childDob-error' : undefined}
                        />
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" aria-hidden="true" />
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
                            'appearance-none w-full pl-12 pr-10 py-4 rounded-[16px] border-2 bg-white dark:bg-slate-800',
                            'text-slate-900 dark:text-white font-medium',
                            'focus:outline-none focus:ring-4 focus:border-transparent transition-all duration-200',
                            'hover:border-slate-300 dark:hover:border-slate-600',
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
                          'appearance-none w-full pl-12 pr-10 py-4 rounded-[16px] border-2 bg-white dark:bg-slate-800',
                          'text-slate-900 dark:text-white font-medium',
                          'focus:outline-none focus:ring-4 focus:border-transparent transition-all duration-200',
                          'hover:border-slate-300 dark:hover:border-slate-600',
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
                    </div>
                    {form.formState.errors.programApplied && (
                      <p id="programApplied-error" className="text-sm text-red-500 flex items-center gap-1" role="alert">
                        <AlertCircle className="h-4 w-4" aria-hidden="true" />
                        {form.formState.errors.programApplied.message}
                      </p>
                    )}
                  </div>
                  <div className="rounded-[20px] bg-blue-50 dark:bg-blue-900/20 p-4 border-2 border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-blue-800 dark:text-blue-200 flex items-center gap-2">
                      <Sparkles className="h-4 w-4" aria-hidden="true" />
                      <strong>Catatan:</strong> Usia anak akan diverifikasi sesuai program yang dipilih.
                      Pastikan usia anak sesuai dengan rentang usia program pada saat tahun ajaran berlangsung.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="rounded-[20px] bg-slate-50 dark:bg-slate-800/50 p-4 border-2 border-slate-200 dark:border-slate-700">
                    <h4 className="font-black text-slate-900 dark:text-white mb-4">Ringkasan Data</h4>
                    <dl className="grid gap-3 sm:grid-cols-2 text-sm">
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
                        'focus:outline-none focus:ring-4 focus:border-transparent transition-all duration-200',
                        'hover:border-slate-300 dark:hover:border-slate-600',
                        'border-slate-200 dark:border-slate-700'
                      )}
                    />
                  </div>
                  <div className="rounded-[20px] bg-amber-50 dark:bg-amber-900/20 p-4 border-2 border-amber-200 dark:border-amber-800">
                    <p className="text-sm text-amber-800 dark:text-amber-200 flex items-center gap-2">
                      <Shield className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                      <strong>Konfirmasi:</strong> Dengan menekan tombol "Kirim Pendaftaran", saya menyatakan bahwa semua data yang diisi benar dan lengkap. Saya bersedia dihubungi via WhatsApp untuk verifikasi dan informasi lanjutan.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 rounded-full border-4 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-6 py-3 font-black text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-slate-300 focus:ring-offset-2"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    Kembali
                  </button>
                )}
                {currentStep < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => {
                      form.trigger().then(valid => valid && goNext())
                    }}
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 rounded-full border-4 border-emerald-300 dark:border-emerald-700 bg-emerald-500 hover:bg-emerald-400 text-white font-black px-8 py-3 shadow-lg shadow-emerald-200/50 hover:shadow-xl hover:shadow-emerald-300/50 hover:-translate-y-1 active:translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:ring-offset-2"
                  >
                    Selanjutnya
                    <ArrowRight className="h-5 w-5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border-4 border-emerald-300 dark:border-emerald-700 bg-emerald-500 hover:bg-emerald-400 text-white font-black px-8 py-3 shadow-lg shadow-emerald-200/50 hover:shadow-xl hover:shadow-emerald-300/50 hover:-translate-y-1 active:translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:ring-offset-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Mengirim...
                      </>
                    ) : (
                      'Kirim Pendaftaran'
                    )}
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