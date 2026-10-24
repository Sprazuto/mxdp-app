'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ppdbRegistrationSchema, type PPDBRegistrationData, ppdbRegistrationDefaultValues } from '@/lib/validations/ppdb'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, ArrowLeft, Check, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

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
      <div className="max-w-2xl mx-auto">
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
            <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Pendaftaran Berhasil!</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-2">{submitResult.message}</p>
          <p className="text-lg font-mono font-semibold text-blue-600 dark:text-blue-400 mb-8">
            No. Registrasi: {submitResult.registrationNumber}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Simpan nomor registrasi ini untuk keperluan komunikasi selanjutnya. Tim kami akan menghubungi Anda via WhatsApp dalam 1x24 jam.
          </p>
          <Button onClick={() => { setSubmitResult(null); form.reset(); setCurrentStep(0); }} className="mt-8">
            Daftar Lagi
          </Button>
        </div>
      </div>
    )
  }

  if (submitResult?.success === false) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 mb-6">
            <svg className="h-10 w-10 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Gagal Mendaftar</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">{submitResult.message}</p>
          <Button onClick={() => { setSubmitResult(null); }} className="w-full max-w-xs">
            Coba Lagi
          </Button>
        </div>
      </div>
    )
  }

  const step = steps[currentStep]

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((s, idx) => (
            <div key={s.id} className="flex items-center">
              <div className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all',
                idx < currentStep
                  ? 'bg-blue-600 text-white'
                  : idx === currentStep
                  ? 'bg-blue-600 text-white ring-4 ring-blue-600/20'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
              )}>
                {idx < currentStep ? <Check className="h-5 w-5" /> : <span>{idx + 1}</span>}
              </div>
              {idx < steps.length - 1 && (
                <div className={cn(
                  'w-16 h-1 mx-2',
                  idx < currentStep ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                )} />
              )}
            </div>
          ))}
        </div>
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          Langkah {currentStep + 1} dari {steps.length}: {step.title}
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl">
              <span className="text-2xl">{step.icon}</span>
              {step.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Parent Data */}
            {currentStep === 0 && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="parentName">Nama Lengkap Orang Tua <span className="text-red-500">*</span></Label>
                    <Input
                      id="parentName"
                      placeholder="Contoh: Budi Santoso"
                      {...form.register('parentName')}
                    />
                    {form.formState.errors.parentName && (
                      <p className="text-sm text-red-500">{form.formState.errors.parentName.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parentPhone">Nomor WhatsApp <span className="text-red-500">*</span></Label>
                    <Input
                      id="parentPhone"
                      type="tel"
                      placeholder="Contoh: 081234567890"
                      {...form.register('parentPhone')}
                    />
                    {form.formState.errors.parentPhone && (
                      <p className="text-sm text-red-500">{form.formState.errors.parentPhone.message}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parentEmail">Email (Opsional)</Label>
                  <Input
                    id="parentEmail"
                    type="email"
                    placeholder="Contoh: budi@email.com"
                    {...form.register('parentEmail')}
                  />
                  {form.formState.errors.parentEmail && (
                    <p className="text-sm text-red-500">{form.formState.errors.parentEmail.message}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Child Data */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="childFullName">Nama Lengkap Anak <span className="text-red-500">*</span></Label>
                  <Input
                    id="childFullName"
                    placeholder="Contoh: Ahmad Fauzi Santoso"
                    {...form.register('childFullName')}
                  />
                  {form.formState.errors.childFullName && (
                    <p className="text-sm text-red-500">{form.formState.errors.childFullName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="childNickname">Nama Panggilan (Opsional)</Label>
                  <Input
                    id="childNickname"
                    placeholder="Contoh: Aji"
                    {...form.register('childNickname')}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="childDob">Tanggal Lahir <span className="text-red-500">*</span></Label>
                    <Input
                      id="childDob"
                      type="date"
                      max={new Date().toISOString().split('T')[0]}
                      {...form.register('childDob')}
                    />
                    {form.formState.errors.childDob && (
                      <p className="text-sm text-red-500">{form.formState.errors.childDob.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Jenis Kelamin <span className="text-red-500">*</span></Label>
                    <Select
                      placeholder="Pilih jenis kelamin"
                      {...form.register('gender')}
                    >
                      <option value="L">Laki-laki</option>
                      <option value="P">Perempuan</option>
                    </Select>
                    {form.formState.errors.gender && (
                      <p className="text-sm text-red-500">{form.formState.errors.gender.message}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Program Selection */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Program yang Dilamar <span className="text-red-500">*</span></Label>
                  <Select
                    placeholder="Pilih program"
                    {...form.register('programApplied')}
                  >
                    {programs.map((p) => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </Select>
                  {form.formState.errors.programApplied && (
                    <p className="text-sm text-red-500">{form.formState.errors.programApplied.message}</p>
                  )}
                </div>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Catatan:</strong> Usia anak akan diverifikasi sesuai program yang dipilih.
                    Pastikan usia anak sesuai dengan rentang usia program pada saat tahun ajaran berlangsung.
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Ringkasan Data</h4>
                  <dl className="grid gap-3 sm:grid-cols-2 text-sm">
                    <dt className="text-gray-500 dark:text-gray-400">Nama Orang Tua</dt>
                    <dd className="font-medium">{form.getValues('parentName')}</dd>
                    <dt className="text-gray-500 dark:text-gray-400">WhatsApp</dt>
                    <dd className="font-medium">{form.getValues('parentPhone')}</dd>
                    {form.getValues('parentEmail') && (
                      <>
                        <dt className="text-gray-500 dark:text-gray-400">Email</dt>
                        <dd className="font-medium">{form.getValues('parentEmail')}</dd>
                      </>
                    )}
                    <dt className="text-gray-500 dark:text-gray-400">Nama Anak</dt>
                    <dd className="font-medium">{form.getValues('childFullName')}</dd>
                    {form.getValues('childNickname') && (
                      <>
                        <dt className="text-gray-500 dark:text-gray-400">Nama Panggilan</dt>
                        <dd className="font-medium">{form.getValues('childNickname')}</dd>
                      </>
                    )}
                    <dt className="text-gray-500 dark:text-gray-400">Tanggal Lahir</dt>
                    <dd className="font-medium">{new Date(form.getValues('childDob')).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</dd>
                    <dt className="text-gray-500 dark:text-gray-400">Jenis Kelamin</dt>
                    <dd className="font-medium">{form.getValues('gender') === 'L' ? 'Laki-laki' : 'Perempuan'}</dd>
                    <dt className="text-gray-500 dark:text-gray-400">Program</dt>
                    <dd className="font-medium">{programs.find(p => p.value === form.getValues('programApplied'))?.label || '-'}</dd>
                  </dl>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Catatan Tambahan (Opsional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Informasi tambahan yang ingin disampaikan..."
                    rows={3}
                    {...form.register('notes')}
                  />
                </div>
                <div className="rounded-lg bg-yellow-50 dark:bg-yellow-900/20 p-4 border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Konfirmasi:</strong> Dengan menekan tombol "Kirim Pendaftaran", saya menyatakan bahwa semua data yang diisi benar dan lengkap. Saya bersedia dihubungi via WhatsApp untuk verifikasi dan informasi lanjutan.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4 border-t">
              {currentStep > 0 && (
                <Button type="button" variant="outline" onClick={goBack} disabled={isSubmitting}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Kembali
                </Button>
              )}
              {currentStep < steps.length - 1 ? (
                <Button type="button" onClick={() => {
                  form.trigger().then(valid => valid && goNext())
                }} disabled={isSubmitting}>
                  Selanjutnya
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    'Kirim Pendaftaran'
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}