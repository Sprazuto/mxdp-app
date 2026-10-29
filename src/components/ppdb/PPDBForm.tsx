"use client";

import { useState } from "react";
import { useForm, type UseFormRegister, type FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useReducedMotion } from "motion/react";
import { ppdbRegistrationSchema, type PPDBRegistrationData, ppdbRegistrationDefaultValues } from "@/lib/validations/ppdb";
import { ArrowRight, ArrowLeft, Check, Loader2, Sparkles, Star, Shield, User, Baby, Calendar, BookOpen, MessageSquare, AlertCircle, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sparkles as SparklesAnim } from "@/components/aceternity";
import { fadeInUp, staggerContainer, cardVariants, buttonVariants } from "@/lib/motion";

const steps = [
  { id: "parent", title: "Data Orang Tua", icon: "👨‍👩‍👧" },
  { id: "child", title: "Data Anak", icon: "👶" },
  { id: "program", title: "Pilih Program", icon: "📚" },
  { id: "confirm", title: "Konfirmasi", icon: "✅" },
];

const programs = [
  { value: "toddler-class", label: "Toddler Class (1-3 Tahun)" },
  { value: "playgroup", label: "Playgroup (2-4 Tahun)" },
  { value: "tk-a", label: "TK A / Kelompok A (4-5 Tahun)" },
  { value: "tk-b", label: "TK B / Kelompok B (5-6 Tahun)" },
];

export function PPDBForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string; registrationNumber?: string } | null>(null);
  const reducedMotion = useReducedMotion();

  const form = useForm<PPDBRegistrationData>({
    resolver: zodResolver(ppdbRegistrationSchema),
    defaultValues: ppdbRegistrationDefaultValues,
    mode: "onChange",
  });

  const { register, handleSubmit, formState: { errors } } = form;

  const goNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: PPDBRegistrationData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/ppdb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        setSubmitResult({ success: true, message: result.message, registrationNumber: result.registrationNumber });
      } else {
        setSubmitResult({ success: false, message: result.message || "Terjadi kesalahan" });
      }
    } catch {
      setSubmitResult({ success: false, message: "Gagal mengirim data. Silakan coba lagi." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitResult?.success) {
    return (
      <motion.div
        className="relative max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SparklesAnim count={15} color="multi" size="md" />
        <div className="relative z-10 text-center py-12">
          <motion.div
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-6 border-4 border-emerald-200 dark:border-emerald-800 shadow-xl shadow-emerald-200/50"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30, delay: 0.2 }}
          >
            <Check className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
          </motion.div>
          <motion.h2
            className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            Pendaftaran
            <span className="block text-slate-900 dark:text-white bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Berhasil!
            </span>
          </motion.h2>
          <motion.p
            className="text-slate-600 dark:text-slate-300 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            {submitResult.message}
          </motion.p>
          <motion.p
            className="text-lg font-mono font-black text-emerald-600 dark:text-emerald-400 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            No. Registrasi: {submitResult.registrationNumber}
          </motion.p>
          <motion.p
            className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            Simpan nomor registrasi ini untuk keperluan komunikasi selanjutnya. Tim kami akan menghubungi Anda via WhatsApp dalam 1x24 jam.
            <Shield className="h-4 w-4 inline-block ml-1 text-emerald-500" aria-hidden="true" />
          </motion.p>
          <motion.button
            onClick={() => { setSubmitResult(null); form.reset(); setCurrentStep(0); }}
            variants={buttonVariants}
            className="inline-flex items-center justify-center gap-2 rounded-full border-4 border-emerald-300 dark:border-emerald-700 bg-emerald-500 hover:bg-emerald-400 text-white font-black px-8 py-4 shadow-lg shadow-emerald-200/50 hover:shadow-xl hover:shadow-emerald-300/50 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:ring-offset-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            Daftar Lagi
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </motion.span>
          </motion.button>
        </div>
      </motion.div>
    );
  }

  if (submitResult?.success === false) {
    return (
      <motion.div
        className="relative max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SparklesAnim count={10} color="pink" size="md" />
        <div className="relative z-10 text-center py-12">
          <motion.div
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/30 mb-6 border-4 border-red-200 dark:border-red-800 shadow-xl shadow-red-200/50"
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30, delay: 0.2 }}
          >
            <motion.svg
              className="h-12 w-12 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          </motion.div>
          <motion.h2
            className="text-3xl font-black text-slate-900 dark:text-white mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            Gagal Mendaftar
          </motion.h2>
          <motion.p
            className="text-slate-600 dark:text-slate-300 mb-6 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            {submitResult.message}
          </motion.p>
          <motion.button
            onClick={() => { setSubmitResult(null); }}
            variants={buttonVariants}
            className="inline-flex items-center justify-center gap-2 rounded-full border-4 border-red-300 dark:border-red-700 bg-red-500 hover:bg-red-400 text-white font-black px-8 py-4 w-full max-w-xs shadow-lg shadow-red-200/50 hover:shadow-xl hover:shadow-red-300/50 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-offset-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            Coba Lagi
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </motion.span>
          </motion.button>
        </div>
      </motion.div>
    );
  }

  const step = steps[currentStep];
  const stepThemes: Array<{ bg: string; border: string; iconColor: string; inputFocus: string; glow: string; accent: "emerald" | "pink" | "amber" | "purple" }> = [
    { bg: "bg-[#E6FFFA] dark:bg-emerald-900/20", border: "border-emerald-200 dark:border-emerald-800", iconColor: "text-emerald-600 dark:text-emerald-400", inputFocus: "focus:ring-emerald-200", glow: "shadow-emerald-200", accent: "emerald" },
    { bg: "bg-[#FDF2F8] dark:bg-pink-900/20", border: "border-pink-200 dark:border-pink-800", iconColor: "text-pink-600 dark:text-pink-400", inputFocus: "focus:ring-pink-200", glow: "shadow-pink-200", accent: "pink" },
    { bg: "bg-[#FEFCE8] dark:bg-amber-900/20", border: "border-amber-200 dark:border-amber-800", iconColor: "text-amber-600 dark:text-amber-400", inputFocus: "focus:ring-amber-200", glow: "shadow-amber-200", accent: "amber" },
    { bg: "bg-[#F5F3FF] dark:bg-purple-900/20", border: "border-purple-200 dark:border-purple-800", iconColor: "text-purple-600 dark:text-purple-400", inputFocus: "focus:ring-purple-200", glow: "shadow-purple-200", accent: "purple" },
  ];
  const theme = stepThemes[currentStep];

  return (
    <motion.div
      className="relative max-w-2xl mx-auto"
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      animate={reducedMotion ? false : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SparklesAnim count={20} color={theme.accent} size="md" />

      <div className="relative z-10">
        {/* Progress Indicator */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4 relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-700 -z-10" />
            {steps.map((s, idx) => (
              <motion.div
                key={s.id}
                className="flex items-center flex-col relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + idx * 0.1 }}
              >
                <motion.div
                  className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center text-base font-black transition-all duration-300 border-4 shadow-lg",
                    idx < currentStep
                      ? "bg-emerald-500 text-white border-emerald-600 shadow-emerald-200/50"
                      : idx === currentStep
                      ? `${theme.bg} ${theme.iconColor} ${theme.border} ring-4 ring-emerald-200 dark:ring-emerald-800 shadow-lg ${theme.glow}`
                      : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-600"
                  )}
                  whileHover={idx === currentStep ? { scale: 1.1, rotate: 3 } : {}}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  {idx < currentStep ? <Check className="h-7 w-7" /> : <span>{idx + 1}</span>}
                </motion.div>
                <span className="mt-2 text-xs font-black text-center w-20 text-slate-600 dark:text-slate-400">
                  {s.title}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="text-center text-sm font-bold text-slate-600 dark:text-slate-400">
            Langkah {currentStep + 1} dari {steps.length}: {step.title}
          </div>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <motion.div
            className={`relative p-6 sm:p-8 rounded-[32px] border-4 ${theme.bg} ${theme.border} shadow-xl ${theme.glow} dark:bg-slate-900/50`}
            variants={cardVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <SparklesAnim count={8} color={theme.accent} size="sm" className="pointer-events-none" />

            <motion.div
              className="mb-6 pb-4 border-b border-slate-200 dark:border-slate-700"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h3 className="flex items-center gap-3 text-2xl font-black text-slate-900 dark:text-white">
                <span className="text-3xl">{step.icon}</span>
                {step.title}
              </h3>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              {/* Step 1: Parent Data */}
              {currentStep === 0 && (
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    className="grid gap-4 sm:grid-cols-2"
                    variants={staggerContainer(0.1)}
                    initial="hidden"
                    animate="visible"
                  >
                    <InputField
                      label="Nama Lengkap Orang Tua"
                      icon={<User className="h-4 w-4 text-emerald-500" />}
                      register={register("parentName")}
                      id="parentName"
                      placeholder="Contoh: Budi Santoso"
                      error={errors.parentName}
                      errorId="parentName-error"
                    />
                    <InputField
                      label="Nomor WhatsApp"
                      type="tel"
                      icon={<MessageSquare className="h-4 w-4 text-green-500" />}
                      register={register("parentPhone")}
                      id="parentPhone"
                      placeholder="Contoh: 081234567890"
                      error={errors.parentPhone}
                      errorId="parentPhone-error"
                    />
                  </motion.div>
                  <InputField
                    label="Email (Opsional)"
                    type="email"
                    icon={<Mail className="h-4 w-4 text-purple-500" />}
                    register={register("parentEmail")}
                    id="parentEmail"
                    placeholder="Contoh: budi@email.com"
                    error={errors.parentEmail}
                    errorId="parentEmail-error"
                  />
                </motion.div>
              )}

              {/* Step 2: Child Data */}
              {currentStep === 1 && (
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <InputField
                      label="Nama Lengkap Anak"
                      icon={<Baby className="h-4 w-4 text-pink-500" />}
                      register={register("childFullName")}
                      id="childFullName"
                      placeholder="Contoh: Ahmad Fauzi Santoso"
                      error={errors.childFullName}
                      errorId="childFullName-error"
                    />
                  </motion.div>
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <InputField
                      label="Nama Panggilan (Opsional)"
                      icon={<Sparkles className="h-4 w-4 text-amber-500" />}
                      register={register("childNickname")}
                      id="childNickname"
                      placeholder="Contoh: Aji"
                      required={false}
                    />
                  </motion.div>
                  <motion.div
                    className="grid gap-4 sm:grid-cols-2"
                    variants={staggerContainer(0.1)}
                    initial="hidden"
                    animate="visible"
                  >
                    <InputField
                      label="Tanggal Lahir"
                      type="date"
                      placeholder="YYYY-MM-DD"
                      icon={<Calendar className="h-4 w-4 text-orange-500" />}
                      register={register("childDob")}
                      id="childDob"
                      max={new Date().toISOString().split("T")[0]}
                      error={errors.childDob}
                      errorId="childDob-error"
                    />
                    <SelectField
                      label="Jenis Kelamin"
                      icon={<Shield className="h-4 w-4 text-blue-500" />}
                      register={register("gender")}
                      id="gender"
                      error={errors.gender}
                      errorId="gender-error"
                      options={[
                        { value: "", label: "Pilih jenis kelamin", disabled: true },
                        { value: "L", label: "Laki-laki" },
                        { value: "P", label: "Perempuan" },
                      ]}
                    />
                  </motion.div>
                </motion.div>
              )}

              {/* Step 3: Program Selection */}
              {currentStep === 2 && (
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <SelectField
                      label="Program yang Dilamar"
                      icon={<BookOpen className="h-4 w-4 text-blue-500" />}
                      register={register("programApplied")}
                      id="programApplied"
                      error={errors.programApplied}
                      errorId="programApplied-error"
                      options={[
                        { value: "", label: "Pilih program", disabled: true },
                        ...programs,
                      ]}
                    />
                  </motion.div>
                  <motion.div
                    className="rounded-[20px] bg-blue-50 dark:bg-blue-900/20 p-4 border-2 border-blue-200 dark:border-blue-800"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <p className="text-sm text-blue-800 dark:text-blue-200 flex items-center gap-2">
                      <Sparkles className="h-4 w-4" aria-hidden="true" />
                      <strong>Catatan:</strong> Usia anak akan diverifikasi sesuai program yang dipilih. Pastikan usia anak sesuai dengan rentang usia program pada saat tahun ajaran berlangsung.
                    </p>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 3 && (
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    className="rounded-[20px] bg-slate-50 dark:bg-slate-800/50 p-4 border-2 border-slate-200 dark:border-slate-700"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h4 className="font-black text-slate-900 dark:text-white mb-4">Ringkasan Data</h4>
                    <dl className="grid gap-3 sm:grid-cols-2 text-sm">
                      <dt className="text-slate-500 dark:text-slate-400">Nama Orang Tua</dt>
                      <dd className="font-black">{form.getValues("parentName")}</dd>
                      <dt className="text-slate-500 dark:text-slate-400">WhatsApp</dt>
                      <dd className="font-black">{form.getValues("parentPhone")}</dd>
                      {form.getValues("parentEmail") && (
                        <>
                          <dt className="text-slate-500 dark:text-slate-400">Email</dt>
                          <dd className="font-black">{form.getValues("parentEmail")}</dd>
                        </>
                      )}
                      <dt className="text-slate-500 dark:text-slate-400">Nama Anak</dt>
                      <dd className="font-black">{form.getValues("childFullName")}</dd>
                      {form.getValues("childNickname") && (
                        <>
                          <dt className="text-slate-500 dark:text-slate-400">Nama Panggilan</dt>
                          <dd className="font-black">{form.getValues("childNickname")}</dd>
                        </>
                      )}
                      <dt className="text-slate-500 dark:text-slate-400">Tanggal Lahir</dt>
                      <dd className="font-black">{new Date(form.getValues("childDob")).toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</dd>
                      <dt className="text-slate-500 dark:text-slate-400">Jenis Kelamin</dt>
                      <dd className="font-black">{form.getValues("gender") === "L" ? "Laki-laki" : "Perempuan"}</dd>
                      <dt className="text-slate-500 dark:text-slate-400">Program</dt>
                      <dd className="font-black">{programs.find((p) => p.value === form.getValues("programApplied"))?.label || "-"}</dd>
                    </dl>
                  </motion.div>
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <InputField
                      label="Catatan Tambahan (Opsional)"
                      icon={<Sparkles className="h-4 w-4 text-teal-500" />}
                      register={register("notes")}
                      id="notes"
                      type="textarea"
                      placeholder="Informasi tambahan yang ingin disampaikan..."
                      rows={3}
                    />
                  </motion.div>
                  <motion.div
                    className="rounded-[20px] bg-amber-50 dark:bg-amber-900/20 p-4 border-2 border-amber-200 dark:border-amber-800"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <p className="text-sm text-amber-800 dark:text-amber-200 flex items-center gap-2">
                      <Shield className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                      <strong>Konfirmasi:</strong> Dengan menekan tombol &quot;Kirim Pendaftaran&quot;, saya menyatakan bahwa semua data yang diisi benar dan lengkap. Saya bersedia dihubungi via WhatsApp untuk verifikasi dan informasi lanjutan.
                    </p>
                  </motion.div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <motion.div
                className="flex justify-between pt-4 border-t border-slate-200 dark:border-slate-700"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                {currentStep > 0 && (
                  <motion.button
                    type="button"
                    onClick={goBack}
                    disabled={isSubmitting}
                    variants={buttonVariants}
                    className="inline-flex items-center justify-center gap-2 rounded-full border-4 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-6 py-3 font-black text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-slate-300 focus:ring-offset-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ArrowLeft className="h-5 w-5" />
                    Kembali
                  </motion.button>
                )}
                {currentStep < steps.length - 1 ? (
                  <motion.button
                    type="button"
                    onClick={() => { form.trigger().then((valid) => valid && goNext()); }}
                    disabled={isSubmitting}
                    variants={buttonVariants}
                    className="inline-flex items-center justify-center gap-2 rounded-full border-4 border-emerald-300 dark:border-emerald-700 bg-emerald-500 hover:bg-emerald-400 text-white font-black px-8 py-3 shadow-lg shadow-emerald-200/50 hover:shadow-xl hover:shadow-emerald-300/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:ring-offset-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Selanjutnya
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.span>
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    variants={buttonVariants}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border-4 border-emerald-300 dark:border-emerald-700 bg-emerald-500 hover:bg-emerald-400 text-white font-black px-8 py-3 shadow-lg shadow-emerald-200/50 hover:shadow-xl hover:shadow-emerald-300/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:ring-offset-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Mengirim...
                      </>
                    ) : (
                      "Kirim Pendaftaran"
                    )}
                  </motion.button>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}

interface InputFieldProps {
  label: string;
  icon: React.ReactNode;
  register: ReturnType<UseFormRegister<PPDBRegistrationData>>;
  id: string;
  placeholder: string;
  type?: string;
  max?: string;
  required?: boolean;
  rows?: number;
  error?: FieldError;
  errorId?: string;
}

function InputField({ label, icon, register, id, placeholder, type = "text", max, required = true, rows, error, errorId }: InputFieldProps) {
  if (type === "textarea") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <label htmlFor={id} className="block text-sm font-black text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
          {icon}
          {label} {required && <span className="text-red-500" aria-hidden="true">*</span>}
        </label>
        <textarea
          {...register}
          id={id}
          placeholder={placeholder}
          rows={rows || 3}
          className={cn(
            "w-full px-4 py-4 rounded-[16px] border-2 bg-white dark:bg-slate-800 resize-none",
            "text-slate-900 dark:text-white placeholder-slate-400 font-medium",
            "focus:outline-none focus:ring-4 focus:border-transparent transition-all duration-200",
            "hover:border-slate-300 dark:hover:border-slate-600",
            error
              ? "border-red-300 dark:border-red-700 focus:ring-red-300 bg-red-50/30 dark:bg-red-900/20"
              : "border-slate-200 dark:border-slate-700"
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : undefined}
        />
        {error && (
          <motion.p
            id={errorId}
            className="mt-1.5 text-sm text-red-500 flex items-center gap-1"
            role="alert"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            {error.message}
          </motion.p>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label htmlFor={id} className="block text-sm font-black text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
        {icon}
        {label} {required && <span className="text-red-500" aria-hidden="true">*</span>}
      </label>
      <div className="relative">
        <input
          {...register}
          id={id}
          type={type}
          max={max}
          placeholder={placeholder}
          className={cn(
            "w-full pl-12 pr-4 py-4 rounded-[16px] border-2 bg-white dark:bg-slate-800",
            "text-slate-900 dark:text-white placeholder-slate-400 font-medium",
            "focus:outline-none focus:ring-4 focus:border-transparent transition-all duration-200",
            "hover:border-slate-300 dark:hover:border-slate-600",
            error
              ? "border-red-300 dark:border-red-700 focus:ring-red-300 bg-red-50/30 dark:bg-red-900/20"
              : "border-slate-200 dark:border-slate-700"
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : undefined}
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" aria-hidden="true">
          {icon}
        </span>
      </div>
      {error && (
        <motion.p
          id={errorId}
          className="mt-1.5 text-sm text-red-500 flex items-center gap-1"
          role="alert"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle className="h-4 w-4" aria-hidden="true" />
          {error.message}
        </motion.p>
      )}
    </motion.div>
  );
}

interface SelectFieldProps {
  label: string;
  icon: React.ReactNode;
  register: ReturnType<UseFormRegister<PPDBRegistrationData>>;
  id: string;
  error?: FieldError;
  errorId?: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
}

function SelectField({ label, icon, register, id, error, errorId, options }: SelectFieldProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label htmlFor={id} className="block text-sm font-black text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
        {icon}
        {label} <span className="text-red-500" aria-hidden="true">*</span>
      </label>
      <div className="relative">
        <select
          {...register}
          id={id}
          className={cn(
            "appearance-none w-full pl-12 pr-10 py-4 rounded-[16px] border-2 bg-white dark:bg-slate-800",
            "text-slate-900 dark:text-white font-medium",
            "focus:outline-none focus:ring-4 focus:border-transparent transition-all duration-200",
            "hover:border-slate-300 dark:hover:border-slate-600",
            error
              ? "border-red-300 dark:border-red-700 focus:ring-red-300 bg-red-50/30 dark:bg-red-900/20"
              : "border-slate-200 dark:border-slate-700"
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : undefined}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" aria-hidden="true">
          {icon}
        </span>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>
      </div>
      {error && (
        <motion.p
          id={errorId}
          className="mt-1.5 text-sm text-red-500 flex items-center gap-1"
          role="alert"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle className="h-4 w-4" aria-hidden="true" />
          {error.message}
        </motion.p>
      )}
    </motion.div>
  );
}