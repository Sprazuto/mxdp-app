"use client";

import { useState } from "react";
import { useForm, type UseFormRegister, type FieldError, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle, AlertCircle, MessageSquare, Calendar, Mail, Phone, User, Baby, Send, MapPin, Sparkles as SparklesIcon, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { contactFormSchema, type ContactFormData, contactFormDefaultValues } from "@/lib/validations/contact";
import { CampusMap } from "@/components/ui/CampusMap";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const WHATSAPP_ADMIN = "6281234567890";

const formResolver = zodResolver(contactFormSchema) as Resolver<ContactFormData>;

export function ContactSection() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

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

  return (
    <section className="relative px-4 py-16 sm:py-20 lg:py-24" aria-labelledby="contact-title">
      <div className="mx-auto max-w-7xl">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
          {/* Left Panel */}
          <div className="mb-10 lg:mb-0" data-sc-in data-sc-cue="0 0.6">
            <span className="inline-flex items-center gap-2 clay-badge clay-blue px-4 py-1.5 text-sm font-semibold mb-4">
              <SparklesIcon className="h-4 w-4 animate-bounce" />
              Hubungi Kami
            </span>

            <h2 id="contact-title" className="sc-display sc-display--xl mb-4">
              Jadwalkan Kunjungan
              <span className="block gradient-text">& Pertanyaan</span>
            </h2>

            <p className="sc-body text-lg mb-8">
              Isi formulir di samping untuk menjadwalkan kunjungan ke kampus MXDP atau mengajukan pertanyaan. Tim kami akan menghubungi Anda dalam 1x24 jam.
            </p>

            <div className="space-y-4" data-sc-in data-sc-stagger="100">
              <Card variant="blue" blob={4} padded hoverable={false} className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center rounded-[var(--sc-r-lg)] w-14 h-14 clay-card clay-blue text-white shadow-[0_8px_16px_-4px_color-mix(in_oklab,var(--clay-6)_40%,transparent)]">
                    <MessageSquare className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="sc-display sc-display--md font-bold text-[var(--sc-ink)]">WhatsApp Langsung</h3>
                    <p className="sc-body text-sm">Balasan cepat dari tim kami</p>
                  </div>
                </div>
              </Card>

              <Card variant="mint" blob={3} padded hoverable={false} className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center rounded-[var(--sc-r-lg)] w-14 h-14 clay-card clay-mint text-white shadow-[0_8px_16px_-4px_color-mix(in_oklab,var(--clay-3)_40%,transparent)]">
                    <Phone className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="sc-display sc-display--md font-bold text-[var(--sc-ink)]">Telepon</h3>
                    <p className="sc-body text-sm">+62 21 1234 5678 (Senin-Jumat, 08:00-16:00)</p>
                  </div>
                </div>
              </Card>

              <Card variant="lavender" blob={7} padded hoverable={false} className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center rounded-[var(--sc-r-lg)] w-14 h-14 clay-card clay-lavender text-white shadow-[0_8px_16px_-4px_color-mix(in_oklab,var(--clay-4)_40%,transparent)]">
                    <Mail className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="sc-display sc-display--md font-bold text-[var(--sc-ink)]">Email</h3>
                    <p className="sc-body text-sm">info@mxdp.id</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-8" data-sc-in data-sc-cue="0.8 1">
              <h3 className="sc-display sc-display--md font-bold text-[var(--sc-ink)] mb-4 flex items-center gap-2">
                <MapPin className="h-6 w-6 text-[var(--c-rose)]" aria-hidden="true" />
                Lokasi Kampus
              </h3>
              <div className="rounded-[var(--sc-r-xl)] overflow-hidden border-4 border-[var(--sc-surface)] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.15)]">
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

          {/* Right Panel - Form */}
          <div className="relative" data-sc-in data-sc-cue="0.1 0.7">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--c-blue)]/10 to-[var(--c-lavender)]/10 rounded-[var(--sc-r-xl)] blur-2xl" aria-hidden="true" />
            <form onSubmit={handleSubmit(onSubmit)} className="relative p-6 sm:p-8 md:p-10 rounded-[var(--sc-r-xl)] clay-card clay-peach blob-2 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.15)]">
              {submitStatus === "success" && (
                <div className="mb-6 flex items-center gap-3 p-4 rounded-[var(--sc-r-lg)] clay-card clay-mint blob-6 border-2 border-[var(--c-mint)] shadow-[0_8px_16px_-4px_rgba(181,234,215,0.4)]" data-sc-in>
                  <div className="flex items-center justify-center rounded-[var(--sc-r-lg)] w-12 h-12 clay-card clay-mint text-white shadow-[0_8px_16px_-4px_color-mix(in_oklab,var(--clay-3)_40%,transparent)]">
                    <CheckCircle className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="sc-display sc-display--md font-bold text-[var(--c-mint)]">Formulir Terkirim!</p>
                    <p className="sc-body text-sm">Tim kami akan menghubungi Anda segera via WhatsApp/Email.</p>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 flex items-center gap-3 p-4 rounded-[var(--sc-r-lg)] clay-card clay-pink blob-1 border-2 border-[var(--c-pink)] shadow-[0_8px_16px_-4px_rgba(255,154,162,0.4)]" data-sc-in>
                  <div className="flex items-center justify-center rounded-[var(--sc-r-lg)] w-12 h-12 clay-card clay-pink text-white shadow-[0_8px_16px_-4px_color-mix(in_oklab,var(--clay-1)_40%,transparent)]">
                    <AlertCircle className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="sc-display sc-display--md font-bold text-[var(--c-pink)]">Gagal Mengirim</p>
                    <p className="sc-body text-sm">{errorMessage}</p>
                  </div>
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2" data-sc-in data-sc-stagger="100">
                <Input
                  label="Nama Orang Tua"
                  icon={<User className="h-4 w-4 text-[var(--c-mint)]" />}
                  {...register("parentName")}
                  id="parentName"
                  placeholder="Nama lengkap orang tua/wali"
                  error={errors.parentName?.message}
                  errorId="parentName-error"
                />
                <Input
                  label="Nama Anak"
                  icon={<Baby className="h-4 w-4 text-[var(--c-pink)]" />}
                  {...register("childName")}
                  id="childName"
                  placeholder="Nama lengkap anak"
                  error={errors.childName?.message}
                  errorId="childName-error"
                />
                <Input
                  label="Usia Anak (Tahun)"
                  type="number"
                  icon={<Calendar className="h-4 w-4 text-[var(--c-peach)]" />}
                  {...register("childAge", { valueAsNumber: true })}
                  id="childAge"
                  min="1"
                  max="18"
                  placeholder="Contoh: 4"
                  error={errors.childAge?.message}
                  errorId="childAge-error"
                />
                <Input
                  label="Nomor WhatsApp"
                  type="tel"
                  icon={<Phone className="h-4 w-4 text-[var(--c-lime)]" />}
                  {...register("whatsapp")}
                  id="whatsapp"
                  placeholder="08xx-xxxx-xxxx"
                  error={errors.whatsapp?.message}
                  errorId="whatsapp-error"
                />
                <Input
                  label="Email (Opsional)"
                  type="email"
                  icon={<Mail className="h-4 w-4 text-[var(--c-lavender)]" />}
                  {...register("email")}
                  id="email"
                  placeholder="email@contoh.com"
                  error={errors.email?.message}
                  errorId="email-error"
                />
                <Input
                  label="Tanggal Kunjungan yang Diharapkan"
                  type="date"
                  icon={<Calendar className="h-4 w-4 text-[var(--c-peach)]" />}
                  {...register("preferredDate")}
                  id="preferredDate"
                  min={tomorrowDate}
                  placeholder="Pilih tanggal"
                  error={errors.preferredDate?.message}
                  errorId="preferredDate-error"
                />
                <div className="sm:col-span-2">
                  <label htmlFor="notes" className="block text-sm font-bold text-[var(--sc-ink)] mb-1.5 flex items-center gap-1">
                    <SparklesIcon className="h-4 w-4 text-[var(--c-teal)]" aria-hidden="true" />
                    Catatan / Pertanyaan (Opsional)
                  </label>
                  <Textarea
                    {...register("notes")}
                    id="notes"
                    rows={4}
                    placeholder="Sebutkan program yang diminati, kebutuhan khusus, atau pertanyaan lain..."
                    className={cn(
                      "w-full clay-input",
                      "text-[var(--sc-ink)] placeholder-[var(--sc-ink-soft)] font-medium",
                      errors.notes
                        ? "border-[var(--c-rose)] focus:ring-[var(--c-rose)]"
                        : ""
                    )}
                    aria-invalid={errors.notes ? "true" : "false"}
                    aria-describedby={errors.notes ? "notes-error" : undefined}
                  />
                  {errors.notes && (
                    <p id="notes-error" className="mt-1.5 text-sm text-[var(--c-rose)] flex items-center gap-1" role="alert">
                      <AlertCircle className="h-4 w-4" aria-hidden="true" />
                      {errors.notes.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4" data-sc-in data-sc-cue="0.8 1">
                <Button
                  type="submit"
                  variant="clay-primary"
                  className="flex-1 gap-2 rounded-full py-4 text-lg font-semibold"
                  disabled={submitStatus === "submitting"}
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
                </Button>

                <a
                  href={`https://wa.me/${WHATSAPP_ADMIN}?text=${formatWhatsAppMessage(contactFormDefaultValues)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-bold clay-pill clay-pill-secondary"
                >
                  <MessageSquare className="h-5 w-5" aria-hidden="true" />
                  Chat WhatsApp
                </a>
              </div>

              <p className="mt-6 text-center text-sm text-[var(--sc-ink-soft)]" data-sc-in data-sc-cue="0.9 1">
                Dengan mengirim formulir ini, Anda menyetujui kebijakan privasi kami. Data Anda aman dan tidak akan dibagikan ke pihak ketiga.
                <Shield className="h-3.5 w-3.5 inline-block ml-1 text-[var(--c-lime)]" aria-hidden="true" />
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}