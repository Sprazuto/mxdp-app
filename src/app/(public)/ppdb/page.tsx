"use client";

import { PPDBForm } from "@/components/ppdb/PPDBForm"
import { ArrowLeft, Sparkles, Shield, CheckCircle, Mail, Clock, Sparkle } from "lucide-react"
import Link from "next/link"
import { Card, CardIcon, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

export default function PPDBPage() {
  return (
    <>
      <Navbar />
      <div className="relative min-h-screen py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Back Link */}
          <div className="mb-8" data-sc-in data-sc-cue="0 0.4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-[var(--c-mint)] hover:text-[var(--c-mint)]/80 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Kembali ke Beranda
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-16" data-sc-in data-sc-cue="0 0.6">
            <div className="inline-flex items-center justify-center w-24 h-24 clay-card clay-mint blob-3 mb-6 shadow-xl shadow-[var(--c-mint)]/30 border-4 border-[var(--c-mint)]/50" data-sc-in data-sc-cue="0.1 0.5">
              <Sparkles className="h-10 w-10 text-[var(--c-mint)]" aria-hidden="true" />
            </div>

            <h1 className="sc-display sc-display--xl mb-4">
              Pendaftaran Siswa Baru
              <span className="block gradient-text">(PPDB)</span>
            </h1>

            <p className="sc-body text-lg max-w-2xl mx-auto">
              Isi formulir pendaftaran di bawah ini. Proses pendaftaran terdiri dari 4 langkah mudah:
              Data Orang Tua → Data Anak → Pilih Program → Konfirmasi.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid gap-6 sm:grid-cols-3 mb-16" data-sc-in data-sc-stagger="100">
            <Card variant="mint" blob={3} hoverable={false} className="p-6" data-sc-cue="0.1 0.4">
              <div className="flex items-center gap-4">
                <CardIcon color="mint">
                  <CheckCircle className="h-7 w-7" aria-hidden="true" />
                </CardIcon>
                <div>
                  <h3 className="sc-display sc-display--md">Gratis Biaya Daftar</h3>
                  <p className="sc-body text-sm">Tidak ada biaya pendaftaran</p>
                </div>
              </div>
            </Card>

            <Card variant="blue" blob={4} hoverable={false} className="p-6" data-sc-cue="0.15 0.45">
              <div className="flex items-center gap-4">
                <CardIcon color="blue">
                  <Clock className="h-7 w-7" aria-hidden="true" />
                </CardIcon>
                <div>
                  <h3 className="sc-display sc-display--md">Proses Cepat</h3>
                  <p className="sc-body text-sm">Verifikasi 1x24 jam</p>
                </div>
              </div>
            </Card>

            <Card variant="lavender" blob={7} hoverable={false} className="p-6" data-sc-cue="0.2 0.5">
              <div className="flex items-center gap-4">
                <CardIcon color="lavender">
                  <Mail className="h-7 w-7" aria-hidden="true" />
                </CardIcon>
                <div>
                  <h3 className="sc-display sc-display--md">Notifikasi Email</h3>
                  <p className="sc-body text-sm">Konfirmasi otomatis ke email</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Form */}
          <PPDBForm />

          {/* Footer Info */}
          <div className="mt-16 relative clay-card clay-amber blob-5 p-8" data-sc-in data-sc-cue="0.8 1">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[var(--c-amber)] rounded-full opacity-30 blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-[var(--c-peach)] blob-5 opacity-20 blur-xl"></div>
            <h3 className="sc-display sc-display--lg mb-6 flex items-center justify-center gap-2 relative z-10">
              <Shield className="h-6 w-6 text-[var(--c-amber)]" aria-hidden="true" />
              Informasi Penting
            </h3>
            <ul className="space-y-4 relative z-10">
              <li className="flex items-start gap-3 p-4 clay-card clay-sand blob-6 hover:border-[var(--c-amber)] transition-all duration-200">
                <span className="flex-shrink-0 mt-1 h-2 w-2 rounded-full animate-bounce" style={{ background: 'var(--c-amber)' }} />
                Pastikan nomor WhatsApp aktif dan dapat dihubungi untuk verifikasi
              </li>
              <li className="flex items-start gap-3 p-4 clay-card clay-sand blob-6 hover:border-[var(--c-amber)] transition-all duration-200">
                <span className="flex-shrink-0 mt-1 h-2 w-2 rounded-full animate-bounce" style={{ animationDelay: '0.2s', background: 'var(--c-amber)' }} />
                Data yang diisi harus benar dan sesuai dengan dokumen asli
              </li>
              <li className="flex items-start gap-3 p-4 clay-card clay-sand blob-6 hover:border-[var(--c-amber)] transition-all duration-200">
                <span className="flex-shrink-0 mt-1 h-2 w-2 rounded-full animate-bounce" style={{ animationDelay: '0.4s', background: 'var(--c-amber)' }} />
                Nomor registrasi akan dikirim via email setelah pendaftaran berhasil
              </li>
              <li className="flex items-start gap-3 p-4 clay-card clay-sand blob-6 hover:border-[var(--c-amber)] transition-all duration-200">
                <span className="flex-shrink-0 mt-1 h-2 w-2 rounded-full animate-bounce" style={{ animationDelay: '0.6s', background: 'var(--c-amber)' }} />
                Tim kami akan menghubungi dalam 1x24 jam untuk langkah selanjutnya
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}