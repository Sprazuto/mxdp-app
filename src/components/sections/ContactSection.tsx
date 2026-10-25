"use client";

import { useState } from "react";
import { useForm, type UseFormRegister, type FieldError, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { Loader2, CheckCircle, AlertCircle, MessageSquare, Calendar, Mail, Phone, User, Baby, Send, MapPin, Sparkles as SparklesIcon, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { contactFormSchema, type ContactFormData, contactFormDefaultValues } from "@/lib/validations/contact";
import { CampusMap } from "@/components/ui/CampusMap";
import { Sparkles } from "@/components/aceternity";
import { staggerContainer, getMotionProps, useReducedMotion } from "@/lib/motion";

const WHATSAPP_ADMIN = "6281234567890";

const formResolver = zodResolver(contactFormSchema) as Resolver<ContactFormData>;
const viewportOnce = { once: true, margin: "50px" };

export function ContactSection() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const reducedMotion = useReducedMotion();
  const motionProps = getMotionProps(reducedMotion);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: formResolver,
    defaultValues: contactFormDefaultValues,
  });

  const formatWhatsAppMessage = (data: ContactFormData) => {
    const lines = [
      "Halo Admin MXDP,",
      "",
      "Saya ingin mendaftar kunjungan sekolah:",
      `Nama Orang Tua: ${data.parentName}`,
      `Nama Anak: ${data.childName}`,
      `Usia Anak: ${data.childAge} tahun`,
      `WhatsApp: ${data.whatsapp}`,
      data.email ? `Email: ${data.email}` : "",
      `Tanggal Kunjungan: ${data.preferredDate}`,
      data.notes ? `Catatan: ${data.notes}` : "",
      "",
      "Terima kasih!",
    ];
    return encodeURIComponent(lines.filter(Boolean).join("\n"));
  };

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Terjadi kesalahan saat mengirim formulir");
      }

      setSubmitStatus("success");
      reset();
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Gagal mengirim formulir. Silakan coba lagi.");
    }
  };

  const [tomorrowDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });

  const getTomorrowDate = () => tomorrowDate;

  return (
    <section
      className={cn(
        "relative px-4 py-16 sm:py-20 lg:py-24",
        "bg-gradient-to-b from-emerald-50 via-white to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
      )}
      aria-labelledby="contact-title"
    >
      <Sparkles count={25} color="multi" size="md" />

      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-20 left-10 w-[300px] h-[300px] rounded-full bg-emerald-200/40 blur-3xl dark:bg-emerald-900/20" />
        <div className="absolute bottom-20 right-10 w-[300px] h-[300px] rounded-full bg-pink-200/40 blur-3xl dark:bg-pink-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
          <motion.div
            className="mb-10 lg:mb-0"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            {...motionProps}
          >
            <motion.span
              className="inline-flex items-center gap-2 rounded-full bg-blue-100/90 px-5 py-2 text-sm font-bold text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 backdrop-blur-sm mb-4 border-2 border-blue-200 dark:border-blue-800 shadow-lg shadow-blue-200/50 rotate-[-2deg]"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <SparklesIcon className="h-4 w-4 animate-bounce" />
              Hubungi Kami
            </motion.span>

            <motion.h2
              id="contact-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            >
              Jadwalkan Kunjungan
              <span className="block text-slate-900 dark:text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                & Pertanyaan
              </span>
            </motion.h2>

            <motion.p
              className="text-lg text-slate-600 dark:text-slate-300 mb-8 font-medium"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              Isi formulir di samping untuk menjadwalkan kunjungan ke kampus MXDP atau mengajukan pertanyaan. Tim kami akan menghubungi Anda dalam 1x24 jam.
            </motion.p>

            <motion.div
              className="space-y-4"
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              {...motionProps}
            >
              <motion.div
                className="p-5 rounded-[20px] bg-white/80 dark:bg-slate-800/80 border-4 border-blue-200 dark:border-blue-800 backdrop-blur-sm hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-xl hover:shadow-blue-200/30 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    className="p-4 rounded-[16px] bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-lg shadow-blue-200/50"
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <MessageSquare className="h-7 w-7" aria-hidden="true" />
                  </motion.div>
                  <div>
                    <h3 className="font-black text-slate-900 dark:text-white">WhatsApp Langsung</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Balasan cepat dari tim kami</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="p-5 rounded-[20px] bg-white/80 dark:bg-slate-800/80 border-4 border-emerald-200 dark:border-emerald-800 backdrop-blur-sm hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-xl hover:shadow-emerald-200/30 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    className="p-4 rounded-[16px] bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 shadow-lg shadow-emerald-200/50"
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <Phone className="h-7 w-7" aria-hidden="true" />
                  </motion.div>
                  <div>
                    <h3 className="font-black text-slate-900 dark:text-white">Telepon</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">+62 21 1234 5678 (Senin-Jumat, 08:00-16:00)</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="p-5 rounded-[20px] bg-white/80 dark:bg-slate-800/80 border-4 border-purple-200 dark:border-purple-800 backdrop-blur-sm hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-xl hover:shadow-purple-200/30 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    className="p-4 rounded-[16px] bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 shadow-lg shadow-purple-200/50"
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <Mail className="h-7 w-7" aria-hidden="true" />
                  </motion.div>
                  <div>
                    <h3 className="font-black text-slate-900 dark:text-white">Email</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">info@mxdp.id</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, delay: 0.4 }}
              {...motionProps}
            >
              <h3 className="font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <MapPin className="h-6 w-6 text-red-500" aria-hidden="true" />
                Lokasi Kampus
              </h3>
              <motion.div
                className="rounded-[36px] overflow-hidden border-8 border-white/90 dark:border-slate-800/90 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.2)]"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <CampusMap
                  lat={-6.9175}
                  lng={107.6191}
                  zoom={15}
                  address="Jl. Pendidikan No. 123, Jakarta Selatan, DKI Jakarta 12345"
                  name="MXDP Edukasi"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            {...motionProps}
          >
            <Sparkles count={15} color="multi" size="sm" className="absolute inset-0 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-[32px] blur-2xl" aria-hidden="true" />
            <form onSubmit={handleSubmit(onSubmit)} className="relative p-6 sm:p-8 md:p-10 rounded-[32px] bg-white border-4 border-amber-200 dark:border-amber-800 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.15)] dark:bg-slate-900/90">
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-6 flex items-center gap-3 p-4 rounded-[16px] bg-emerald-50 dark:bg-emerald-900/30 border-4 border-emerald-200 dark:border-emerald-800 shadow-lg shadow-emerald-200/50"
                >
                  <motion.div
                    className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <CheckCircle className="h-7 w-7 text-emerald-600 dark:text-emerald-400 flex-shrink-0" aria-hidden="true" />
                  </motion.div>
                  <div>
                    <p className="font-black text-emerald-800 dark:text-emerald-200">Formulir Terkirim!</p>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300">Tim kami akan menghubungi Anda segera via WhatsApp/Email.</p>
                  </div>
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-6 flex items-center gap-3 p-4 rounded-[16px] bg-red-50 dark:bg-red-900/30 border-4 border-red-200 dark:border-red-800 shadow-lg shadow-red-200/50"
                >
                  <motion.div
                    className="p-2 rounded-full bg-red-100 dark:bg-red-900/30"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <AlertCircle className="h-7 w-7 text-red-600 dark:text-red-400 flex-shrink-0" aria-hidden="true" />
                  </motion.div>
                  <div>
                    <p className="font-black text-red-800 dark:text-red-200">Gagal Mengirim</p>
                    <p className="text-sm text-red-700 dark:text-red-300">{errorMessage}</p>
                  </div>
                </motion.div>
              )}

              <motion.div
                className="grid gap-4 sm:grid-cols-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, delay: 0.2 }}
                {...motionProps}
              >
                <InputField
                  label="Nama Orang Tua"
                  icon={<User className="h-4 w-4 text-emerald-500" />}
                  register={register("parentName")}
                  id="parentName"
                  placeholder="Nama lengkap orang tua/wali"
                  error={errors.parentName}
                  errorId="parentName-error"
                />
                <InputField
                  label="Nama Anak"
                  icon={<Baby className="h-4 w-4 text-pink-500" />}
                  register={register("childName")}
                  id="childName"
                  placeholder="Nama lengkap anak"
                  error={errors.childName}
                  errorId="childName-error"
                />
                <InputField
                  label="Usia Anak (Tahun)"
                  type="number"
                  icon={<Calendar className="h-4 w-4 text-amber-500" />}
                  register={register("childAge", { valueAsNumber: true })}
                  id="childAge"
                  min="1"
                  max="18"
                  placeholder="Contoh: 4"
                  error={errors.childAge}
                  errorId="childAge-error"
                />
                <InputField
                  label="Nomor WhatsApp"
                  type="tel"
                  icon={<Phone className="h-4 w-4 text-green-500" />}
                  register={register("whatsapp")}
                  id="whatsapp"
                  placeholder="08xx-xxxx-xxxx"
                  error={errors.whatsapp}
                  errorId="whatsapp-error"
                />
                <InputField
                  label="Email (Opsional)"
                  type="email"
                  icon={<Mail className="h-4 w-4 text-purple-500" />}
                  register={register("email")}
                  id="email"
                  placeholder="email@contoh.com"
                  error={errors.email}
                  errorId="email-error"
                />
                <InputField
                  label="Tanggal Kunjungan yang Diharapkan"
                  type="date"
                  icon={<Calendar className="h-4 w-4 text-orange-500" />}
                  register={register("preferredDate")}
                  id="preferredDate"
                  min={getTomorrowDate()}
                  placeholder="Pilih tanggal"
                  error={errors.preferredDate}
                  errorId="preferredDate-error"
                />
                <div className="sm:col-span-2">
                  <label htmlFor="notes" className="block text-sm font-black text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                    <SparklesIcon className="h-4 w-4 text-teal-500" aria-hidden="true" />
                    Catatan / Pertanyaan (Opsional)
                  </label>
                  <textarea
                    {...register("notes")}
                    id="notes"
                    rows={4}
                    placeholder="Sebutkan program yang diminati, kebutuhan khusus, atau pertanyaan lain..."
                    className={cn(
                      "w-full px-4 py-4 rounded-[16px] border-2 bg-white dark:bg-slate-800 resize-none",
                      "text-slate-900 dark:text-white placeholder-slate-400 font-medium",
                      "focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-transparent",
                      "transition-all duration-200",
                      "hover:border-slate-300 dark:hover:border-slate-600",
                      errors.notes
                        ? "border-red-300 dark:border-red-700 focus:ring-red-300 bg-red-50/30 dark:bg-red-900/20"
                        : "border-slate-200 dark:border-slate-700"
                    )}
                    aria-invalid={errors.notes ? "true" : "false"}
                    aria-describedby={errors.notes ? "notes-error" : undefined}
                  />
                  {errors.notes && (
                    <motion.p
                      id="notes-error"
                      className="mt-1.5 text-sm text-red-500 flex items-center gap-1"
                      role="alert"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle className="h-4 w-4" aria-hidden="true" />
                      {errors.notes.message}
                    </motion.p>
                  )}
                </div>
              </motion.div>

              <motion.div
                className="mt-8 flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, delay: 0.3 }}
                {...motionProps}
              >
                <motion.button
                  type="submit"
                  disabled={submitStatus === "submitting"}
                  className={cn(
                    "flex-1 inline-flex items-center justify-center gap-2 rounded-full border-4 font-black text-base py-4 transition-all duration-200",
                    "focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:ring-offset-2",
                    submitStatus === "submitting"
                      ? "bg-slate-200 dark:bg-slate-700 text-slate-400 border-slate-300 dark:border-slate-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-emerald-600 shadow-[0_12px_24px_-6px_rgba(16,185,129,0.5)] hover:from-emerald-400 hover:to-teal-400 hover:shadow-[0_16px_32px_-8px_rgba(16,185,129,0.6)]"
                  )}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {submitStatus === "submitting" ? (
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
                </motion.button>

                <motion.a
                  href={`https://wa.me/${WHATSAPP_ADMIN}?text=${formatWhatsAppMessage(contactFormDefaultValues)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border-4 border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 px-6 py-4 text-base font-black text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 hover:border-green-400 dark:hover:border-green-600 hover:shadow-xl hover:shadow-green-200/30 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-offset-2"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageSquare className="h-5 w-5" aria-hidden="true" />
                  Chat WhatsApp
                </motion.a>
              </motion.div>

              <motion.p
                className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, delay: 0.4 }}
                {...motionProps}
              >
                Dengan mengirim formulir ini, Anda menyetujui kebijakan privasi kami. Data Anda aman dan tidak akan dibagikan ke pihak ketiga.
                <Shield className="h-3.5 w-3.5 inline-block ml-1 text-emerald-500" aria-hidden="true" />
              </motion.p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface InputFieldProps {
  label: string;
  icon: React.ReactNode;
  register: ReturnType<UseFormRegister<ContactFormData>>;
  id: string;
  placeholder: string;
  type?: string;
  min?: string;
  max?: string;
  error?: FieldError;
  errorId?: string;
}

function InputField({ label, icon, register, id, placeholder, type = "text", min, max, error, errorId }: InputFieldProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.4 }}
    >
      <label htmlFor={id} className="block text-sm font-black text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
        {icon}
        {label} <span className="text-red-500" aria-hidden="true">*</span>
      </label>
      <div className="relative">
        <input
          {...register}
          id={id}
          type={type}
          min={min}
          max={max}
          placeholder={placeholder}
          className={cn(
            "w-full pl-12 pr-4 py-4 rounded-[16px] border-2 bg-white dark:bg-slate-800",
            "text-slate-900 dark:text-white placeholder-slate-400 font-medium",
            "focus:outline-none focus:ring-4 focus:border-transparent",
            "transition-all duration-200",
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