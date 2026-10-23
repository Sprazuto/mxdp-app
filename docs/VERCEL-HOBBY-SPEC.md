# VERCEL HOBBY (FREE TIER) — SPESIFIKASI TEKNIS UNTUK AI AGENT

**Versi dokumen:** 1.0\
**Tanggal acuan:** 23 Oktober 2026\
**Platform:** Vercel\
**Paket:** Hobby\
**Harga:** $0/bulan\
**Fungsi utama:** Hosting frontend, deployment aplikasi web, CDN, dan serverless functions\
**Dokumentasi resmi:** https://vercel.com/docs\
**Halaman harga:** https://vercel.com/pricing

## 1\. Tujuan dan instruksi utama

AI Agent harus menggunakan Vercel Hobby untuk mengembangkan, melakukan deployment, dan meng-host aplikasi web yang sesuai dengan persyaratan paket gratis.

Prioritas implementasi:

1. Gunakan fitur bawaan Vercel Hobby tanpa menambahkan layanan berbayar.
2. Gunakan Git untuk version control dan deployment otomatis.
3. Optimalkan proses build, ukuran bundle, dan bandwidth.
4. Simpan kredensial rahasia hanya di environment server.
5. Pisahkan frontend, backend, database, dan penyimpanan file sesuai tanggung jawab masing-masing.
6. Pantau penggunaan kuota sebelum mencapai batas.
7. Jangan mengasumsikan resource gratis tersedia tanpa batas.
8. Jangan mengaktifkan upgrade atau layanan berbayar tanpa persetujuan pengguna.
9. Jangan mengklaim deployment berhasil sebelum memeriksa hasil deployment.
10. Periksa ketentuan paket dan dokumentasi resmi ketika batas layanan berubah.

**Batas penggunaan yang wajib dipahami:** Vercel Hobby ditujukan untuk proyek personal dan nonkomersial. Jika aplikasi merupakan SaaS, aplikasi klien, atau produk bisnis komersial, AI Agent harus memeriksa kelayakan paket dan meminta persetujuan sebelum memilih paket berbayar atau hosting alternatif.

## 2\. Spesifikasi paket Hobby

### 2.1 Fitur utama

| Fitur | Ketersediaan |
| --- | --- |
| Hosting frontend | Ya |
| Hosting aplikasi Next.js | Ya |
| Static site hosting | Ya |
| Automatic HTTPS/SSL | Ya |
| Global CDN | Ya |
| Git integration | Ya |
| Automatic CI/CD | Ya |
| Preview deployments | Ya |
| Production deployments | Ya |
| Serverless Functions | Ya |
| Environment variables | Ya |
| Custom domains | Dapat dihubungkan |
| Automatic domain certificate | Ya |
| Web Application Firewall | Fitur dasar |
| DDoS mitigation | Ya |
| Traffic dan performance insights | Fitur dasar |
| Image Optimization | Termasuk kuota dasar |
| Build cache | Ya |
| Team collaboration tingkat lanjut | Terbatas |
| On-demand paid usage | Tidak tersedia pada Hobby |

Paket Hobby cocok untuk prototipe personal, proyek pembelajaran, portofolio, dan website nonkomersial.

### 2.2 Kuota dan batas penggunaan

Batas yang tercantum dalam dokumentasi Vercel untuk Hobby meliputi:

| Resource | Batas |
| --- | --- |
| Projects | 200 |
| Deployments per day | 100 |
| Build time per deployment | 45 menit |
| Build execution | 6.000 menit |
| Concurrent builds | 1 |
| Fast Data Transfer | 100 GB/bulan |
| Fast Origin Transfer | Hingga 10 GB |
| Function invocations | 1 juta |
| Active CPU | 4 CPU-hours |
| Provisioned memory | 360 GB-hours |
| Image Optimization source images | 1.000 |
| Static deployment upload via CLI | 100 MB |
| Domains per project | 50 |
| Environment variables per environment/project | 1.000 |
| Total ukuran environment variables | 64 KB |
| Runtime logs | Retensi 1 jam |
| Function request/response body | Maksimal 4,5 MB |
| Proxied request timeout | Maksimal 120 detik |

Sumber: [https://vercel.com/docs/limits](<https://vercel.com/docs/limits>)

Batas tersebut merupakan batas platform atau kuota penggunaan yang relevan untuk paket Hobby. AI Agent harus memeriksa dashboard Usage dan dokumentasi terbaru sebelum membuat estimasi kapasitas produksi.

Jangan mengasumsikan bahwa setiap resource memiliki kuota terpisah yang tidak saling memengaruhi. Total respons HTTP, termasuk respons dari function, dapat berkontribusi terhadap bandwidth.

### 2.3 Batas deployment storage

Vercel mengumumkan perubahan pengelolaan deployment storage Hobby pada September 2026.

Ketentuan yang perlu diperhatikan:

- Hobby memiliki anggaran deployment storage sebesar 10 GB.
- Deployment lama dapat dihapus lebih cepat untuk mengosongkan ruang.
- Proyek mempertahankan deployment terbaru sesuai kebijakan retensi.
- Jika storage penuh, deployment baru dapat terhambat.
- Deployment aktif dan production deployment saat ini memiliki perlindungan sesuai kebijakan retensi.

Sumber: https://vercel.com/changelog/hobby-projects-now-retain-fewer-deployments-to-free-up-storage

AI Agent tidak boleh mengandalkan seluruh preview deployment tersimpan selamanya. Gunakan strategi deployment yang efisien dan hindari artefak build berukuran besar.

## 3\. Persyaratan kelayakan paket

Sebelum melakukan deployment, AI Agent harus menentukan apakah proyek memenuhi ketentuan Hobby.

### Gunakan Hobby apabila:

- Proyek untuk penggunaan pribadi.
- Portofolio atau proyek belajar nonkomersial.
- Eksperimen atau prototipe personal.
- Website demonstrasi yang memenuhi persyaratan paket.

### Jangan otomatis menggunakan Hobby apabila:

- Aplikasi merupakan produk SaaS komersial.
- Website digunakan sebagai bagian dari bisnis.
- Proyek dibuat untuk klien berbayar.
- Aplikasi memiliki kebutuhan SLA atau dukungan operasional profesional.
- Aplikasi membutuhkan kontrol tim dan penggunaan resource berbayar.

Jika status komersial tidak jelas, tanyakan kepada pemilik proyek sebelum memilih paket hosting.

Jangan menyamakan proyek yang gratis diakses pengguna dengan proyek nonkomersial. Aplikasi gratis tetap dapat digunakan dalam konteks bisnis.

## 4\. Arsitektur aplikasi yang direkomendasikan

Jika aplikasi menggunakan Sanity, Supabase, Resend, Cloudinary, dan Leaflet/OpenStreetMap, pembagian tanggung jawab yang disarankan adalah:

| Layanan | Tanggung jawab |
| --- | --- |
| Vercel | Hosting frontend, deployment, CDN, dan serverless functions |
| Sanity | CMS dan pengelolaan konten |
| Supabase | Database, autentikasi, dan data aplikasi |
| Resend | Email transaksional |
| Cloudinary | Penyimpanan dan optimasi media |
| Leaflet + OSM | Visualisasi peta dan data geografis |

Vercel tidak perlu menjadi tempat penyimpanan permanen semua data aplikasi.

Jangan menggunakan filesystem lokal serverless function sebagai penyimpanan permanen. Gunakan database atau object/media storage yang sesuai.

## 5\. Framework dan struktur proyek

AI Agent harus terlebih dahulu memeriksa repository yang tersedia.

Identifikasi:

- Framework.
- Bahasa pemrograman.
- Package manager.
- Build command.
- Output directory.
- Environment variables.
- Routing.
- API endpoints.
- Integrasi database.
- Kebutuhan runtime.
- Dependensi native atau binary.

Framework yang umum digunakan meliputi:

- Next.js.
- React dengan Vite.
- Astro.
- SvelteKit.
- Nuxt.
- Remix atau React Router.
- Static HTML/CSS/JavaScript.

Jangan memigrasikan framework hanya karena Vercel mendukung framework tertentu. Pertahankan arsitektur yang sudah berjalan jika kompatibel.

### Contoh konfigurasi package scripts

```
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit"
  }
}
```

Contoh tersebut ditujukan untuk proyek Next.js. Sesuaikan dengan framework, versi package, dan perintah yang benar-benar tersedia pada repository.

Jangan menambahkan script palsu yang tidak sesuai dengan dependency proyek.

## 6\. Integrasi Git dan deployment otomatis

Alur yang direkomendasikan:

1. Developer membuat perubahan di repository.
2. Perubahan di-commit ke Git.
3. Repository dihubungkan dengan Vercel.
4. Vercel menjalankan build.
5. Preview deployment dibuat untuk perubahan yang sesuai.
6. Perubahan diuji.
7. Perubahan pada production branch dipromosikan ke production.
8. Deployment dan log diperiksa setelah rilis.

Ketentuan:

- Jangan menaruh secret di repository.
- Jangan melakukan force push tanpa persetujuan.
- Jangan mengubah production branch tanpa memahami workflow proyek.
- Jangan menghapus deployment production yang aktif tanpa alasan.
- Jangan menyatakan rilis berhasil hanya berdasarkan build lokal.
- Periksa URL deployment dan status deployment sebenarnya.

Jika Git integration tidak digunakan, Vercel CLI dapat digunakan sesuai dokumentasi resmi.

## 7\. Environment variables

Environment variables dipakai untuk konfigurasi dan integrasi layanan.

Contoh:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-key

SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_TOKEN=your_server_token

RESEND_API_KEY=re_xxxxxxxxx
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

Contoh ini hanya ilustrasi. Gunakan nama variabel yang sesuai dengan implementasi aktual.

### Aturan keamanan

- Variabel dengan prefix `NEXT_PUBLIC_` pada Next.js dapat terekspos ke browser.
- Jangan menaruh API secret atau token privat dalam variabel publik.
- Simpan kredensial di Vercel Project Settings → Environment Variables.
- Pisahkan nilai untuk Development, Preview, dan Production jika dibutuhkan.
- Jangan mencetak seluruh environment variables ke log.
- Jangan mengunggah file `.env` ke Git.
- Jangan mengasumsikan perubahan environment variables otomatis memperbarui deployment yang sudah ada.
- Lakukan redeployment jika diperlukan agar konfigurasi baru berlaku.

Untuk Supabase, gunakan hanya public/anon key pada browser bersama RLS yang benar. Service role key harus tetap berada di server.

Untuk Sanity, gunakan token baca/tulis privat hanya di lingkungan server sesuai kebutuhan.

Untuk Resend dan Cloudinary, secret harus tetap server-side.

## 8\. Domain dan HTTPS

Vercel menyediakan subdomain deployment, misalnya:

`your-project.vercel.app`

Custom domain dapat dihubungkan ke proyek sesuai dukungan paket.

Ketentuan:

- Verifikasi kepemilikan domain.
- Konfigurasikan DNS sesuai instruksi Vercel.
- Pastikan domain production mengarah ke deployment yang benar.
- Periksa sertifikat HTTPS.
- Hindari konfigurasi DNS ganda yang menyebabkan konflik.
- Jangan mengubah nameserver tanpa persetujuan pemilik domain.
- Jangan mengasumsikan biaya pembelian atau perpanjangan domain termasuk dalam paket hosting gratis.

Domain yang sudah dimiliki pengguna dapat memiliki biaya registrasi dan perpanjangan tersendiri di registrar.

## 9\. Serverless Functions

Vercel Functions digunakan untuk operasi backend yang sesuai dengan model serverless.

Contoh penggunaan:

- Endpoint API.
- Validasi request.
- Integrasi layanan eksternal.
- Webhook Resend.
- Server-side Sanity queries.
- Operasi database Supabase yang membutuhkan server-side logic.
- Pembuatan signature upload Cloudinary.
- Operasi terproteksi yang tidak boleh dijalankan di browser.

Ketentuan:

- Jangan menggunakan function sebagai worker permanen.
- Jangan mengandalkan proses yang berjalan selamanya.
- Jangan menyimpan state penting hanya di memori.
- Jangan mengandalkan local filesystem untuk data permanen.
- Gunakan database atau queue eksternal jika membutuhkan pekerjaan yang tahan lama.
- Tangani timeout dan error upstream.
- Hindari melakukan banyak request eksternal serial jika dapat dioptimalkan.
- Jangan memproses file besar di function jika batas request/response atau runtime tidak mendukung.

### Batas timeout

Function memiliki batas durasi sesuai runtime dan konfigurasi plan. Pada konfigurasi Hobby dengan Fluid Compute, batas maksimum durasi function adalah 300 detik menurut dokumentasi teknis yang tersedia.

Jangan mengasumsikan setiap function dapat berjalan tanpa batas.

Sumber teknis: https://vercel.com/docs/functions/configuring-functions/duration

### Request dan response

Batas body request/response function sebesar 4,5 MB perlu diperhatikan untuk operasi API.

Jangan mengirim file gambar atau video besar melalui function Vercel jika dapat diunggah langsung ke Cloudinary menggunakan mekanisme upload yang aman.

Untuk file besar:

1. Validasi pengguna di backend.
2. Buat signature upload bila diperlukan.
3. Upload file langsung ke Cloudinary.
4. Validasi hasil upload.
5. Simpan metadata ke database.

## 10\. Bandwidth dan optimasi performa

Vercel Hobby mencakup kuota Fast Data Transfer sebesar 100 GB per bulan berdasarkan dokumentasi limits.

AI Agent harus:

- Mengoptimalkan ukuran JavaScript bundle.
- Menggunakan lazy loading.
- Mengompresi aset yang sesuai.
- Menggunakan image optimization secara selektif.
- Menghindari download ulang data yang tidak diperlukan.
- Memakai caching dengan benar.
- Menghindari response JSON berukuran sangat besar.
- Menghindari API endpoint yang menghasilkan payload berlebihan.
- Memantau transfer data pada dashboard Usage.

Bandwidth tidak hanya berasal dari gambar. Respons halaman, file statis, JSON API, dan respons server yang disajikan melalui jaringan Vercel dapat ikut dihitung.

### Strategi gambar

Jika proyek menggunakan Cloudinary:

- Gunakan Cloudinary sebagai media storage dan transformation provider.
- Sajikan gambar melalui URL Cloudinary yang telah dioptimalkan.
- Hindari transformasi gambar Vercel yang tidak diperlukan.
- Jangan membuat dua pipeline optimasi yang menghasilkan biaya atau pemrosesan berulang.
- Gunakan ukuran gambar yang sesuai dengan komponen UI.

Jika menggunakan fitur Image Optimization Vercel, pantau batas sumber gambar dan aturan penggunaannya.

## 11\. Build dan dependency management

AI Agent harus mengoptimalkan build agar sesuai dengan batas platform.

Ketentuan:

- Hapus dependency yang benar-benar tidak digunakan.
- Hindari memasukkan aset besar ke repository tanpa kebutuhan.
- Hindari menjalankan proses build berulang yang tidak perlu.
- Gunakan build cache jika kompatibel.
- Periksa build logs ketika deployment gagal.
- Jangan mengabaikan error TypeScript atau lint yang memang memblokir build.
- Jangan mematikan pemeriksaan keamanan hanya agar build berhasil.
- Jangan mengganti package lock file secara sembarangan.
- Gunakan versi Node.js yang kompatibel dengan dependency proyek.

Build time maksimum per deployment pada dokumentasi limits adalah 45 menit. Penggunaan build execution Hobby tercantum sebesar 6.000 menit.

Sumber: [https://vercel.com/docs/limits](<https://vercel.com/docs/limits>)

Jangan menganggap angka build minutes sebagai jaminan bahwa semua jenis build atau pekerjaan background akan berjalan tanpa batas.

## 12\. Preview deployments dan environment isolation

Preview deployment berguna untuk menguji perubahan sebelum production.

AI Agent harus:

- Menggunakan Preview untuk pengujian perubahan.
- Memastikan preview tidak menggunakan konfigurasi production yang tidak diperlukan.
- Membatasi akses data sensitif.
- Memeriksa environment variables pada setiap environment.
- Menghindari webhook duplikat yang menyebabkan efek samping production.
- Menghindari pengiriman email sungguhan selama pengujian tanpa persetujuan.
- Memastikan deployment production tidak berubah sebelum proses rilis yang dimaksud.

Jika preview terhubung ke Supabase, gunakan project atau data pengujian yang sesuai apabila perubahan dapat memodifikasi data produksi.

Untuk Resend, pertimbangkan mode pengujian atau penerima yang telah disetujui.

Untuk Cloudinary, hindari menghapus atau mengganti aset produksi selama pengujian.

## 13\. Integrasi webhook dan scheduled tasks

Vercel dapat menjalankan endpoint webhook dan mendukung scheduled tasks sesuai konfigurasi dan batas paket.

Jika menggunakan Cron Jobs:

- Verifikasi batas dan fitur yang tersedia untuk Hobby.
- Gunakan jadwal yang memang diperlukan.
- Lindungi endpoint dari pemanggilan tidak sah.
- Pastikan operasi idempotent.
- Catat hasil eksekusi.
- Tangani timeout.
- Jangan mengasumsikan job akan berjalan tepat pada detik tertentu.
- Jangan menggunakannya sebagai pengganti worker permanen.

Jika job harus memproses antrean besar atau berjalan lama, evaluasi layanan background processing yang sesuai.

## 14\. Keamanan aplikasi

AI Agent harus menerapkan:

- Validasi input.
- Authentication dan authorization.
- Proteksi API endpoints.
- Pengelolaan secret yang benar.
- Validasi webhook.
- Rate limiting sesuai kebutuhan.
- Security headers yang relevan.
- Error handling tanpa kebocoran informasi sensitif.
- Dependency updates yang aman.
- Proteksi terhadap injection dan penyalahgunaan endpoint.

Jangan menganggap hosting Vercel otomatis membuat aplikasi aman.

Web Application Firewall dan DDoS mitigation merupakan lapisan perlindungan platform, bukan pengganti authorization, RLS, validasi input, atau desain keamanan aplikasi.

## 15\. Monitoring dan penggunaan

Pantau dashboard Usage dan deployment logs.

Resource penting:

- Fast Data Transfer.
- Fast Origin Transfer.
- Function invocations.
- CPU usage.
- Provisioned memory.
- Build execution.
- Image Optimization.
- Deployment storage.
- Function duration.
- Error rate.
- Build failures.

Tetapkan target internal:

- Peringatan awal pada 70% kuota.
- Tinjauan optimasi pada 80% kuota.
- Hentikan pekerjaan nonkritis yang dapat ditunda jika kuota hampir habis.
- Periksa tren penggunaan sebelum menambahkan fitur berat.

Target tersebut merupakan kebijakan internal, bukan batas resmi tambahan.

Hobby tidak menyediakan pay-as-you-go untuk melanjutkan pemakaian di luar kuota gratis. Ketika penggunaan melewati batas yang berlaku, deployment atau layanan terkait dapat dijeda sampai kuota tersedia kembali atau paket diubah.

Jangan mengasumsikan upgrade otomatis terjadi.

## 16\. Biaya dan fitur berbayar

AI Agent tidak boleh mengaktifkan fitur berbayar tanpa persetujuan.

Potensi biaya dapat berasal dari:

- Upgrade ke Pro atau Enterprise.
- Domain registration dan renewal.
- Layanan eksternal.
- Resource atau add-on yang hanya tersedia pada paket tertentu.
- Penggunaan layanan pihak ketiga yang terintegrasi dengan aplikasi.

Harga paket Pro yang tercantum pada halaman harga adalah $20/bulan sebagai harga dasar, dengan usage credit dan ketentuan tambahan sesuai halaman harga. Harga dan pajak dapat berubah.

Sumber: https://vercel.com/pricing

Jika proyek memerlukan kapasitas lebih tinggi, AI Agent harus menyajikan:

1. Keterbatasan Hobby yang sedang ditemui.
2. Resource yang menyebabkan batas tercapai.
3. Opsi optimasi.
4. Alternatif hosting.
5. Estimasi biaya jika upgrade diperlukan.
6. Persetujuan pengguna sebelum melakukan perubahan berbayar.

## 17\. Checklist penerimaan implementasi

### Konfigurasi

- [ ]Framework dan build command benar.
- [ ]Repository terhubung jika Git integration digunakan.
- [ ]Environment variables dikonfigurasi.
- [ ]Secret tidak terekspos ke browser.
- [ ]Domain dan HTTPS dikonfigurasi jika diperlukan.

### Build dan deployment

- [ ]Build lokal berhasil.
- [ ]Build Vercel berhasil.
- [ ]Preview deployment dapat diakses.
- [ ]Production deployment telah diverifikasi.
- [ ]Tidak ada dependency atau konfigurasi yang rusak.
- [ ]Deployment storage dipertimbangkan.

### Integrasi

- [ ]Supabase dapat diakses dengan hak yang sesuai.
- [ ]Sanity dapat diakses dengan izin yang benar.
- [ ]Resend hanya dipanggil dari lingkungan yang sesuai.
- [ ]Cloudinary digunakan untuk operasi media.
- [ ]Integrasi Leaflet dan tile provider berfungsi.
- [ ]Error layanan eksternal ditangani.

### Operasional

- [ ]Bandwidth dan function usage dapat dipantau.
- [ ]Build time berada dalam batas.
- [ ]Tidak ada proses background tanpa batas.
- [ ]Tidak ada asumsi storage permanen pada filesystem function.
- [ ]Tidak ada layanan berbayar yang diaktifkan tanpa izin.
- [ ]Kelayakan penggunaan Hobby telah diperiksa.

### Testing

- [ ]Lint berhasil jika tersedia.
- [ ]Type-check berhasil jika tersedia.
- [ ]Build berhasil.
- [ ]Tes utama aplikasi berjalan.
- [ ]URL deployment diperiksa.
- [ ]Masalah yang belum terselesaikan dilaporkan.

## 18\. Format laporan akhir AI Agent

Setelah implementasi, laporkan:

1. Ringkasan perubahan.
2. Framework dan versi runtime.
3. File yang dibuat atau diubah.
4. Build command dan konfigurasi deployment.
5. Environment variables yang diperlukan.
6. Domain dan status HTTPS jika relevan.
7. Status build dan deployment.
8. Integrasi layanan eksternal.
9. Penggunaan kuota yang relevan.
10. Hasil lint, type-check, build, dan tes.
11. Risiko penggunaan Hobby.
12. Masalah yang belum terselesaikan.
13. Potensi biaya tambahan.
14. Rekomendasi untuk pengembangan berikutnya.

## 19\. Aturan keputusan terakhir

Jika kebutuhan aplikasi melebihi kemampuan atau batas Vercel Hobby:

1. Identifikasi resource yang menjadi kendala.
2. Optimalkan build, bandwidth, dan fungsi server.
3. Pertahankan integrasi layanan eksternal yang sudah berjalan.
4. Periksa kelayakan penggunaan paket Hobby.
5. Jangan mengaktifkan upgrade atau layanan berbayar tanpa persetujuan.
6. Jelaskan trade-off dan risiko operasional.
7. Usulkan alternatif hosting jika diperlukan.

**Instruksi penutup:** Gunakan Vercel Hobby hanya untuk proyek yang memenuhi ketentuan paket. Patuhi kuota penggunaan, jangan mengekspos secret, jangan mengandalkan filesystem function untuk penyimpanan permanen, dan jangan mengklaim deployment berhasil sebelum status deployment benar-benar diperiksa.

## Referensi resmi untuk AI Agent

- [Vercel Pricing](<https://vercel.com/pricing?utm_source=chatgpt.com>) — harga dan fitur paket.
  Vercel
- [Vercel Limits](<https://vercel.com/docs/limits?utm_source=chatgpt.com>) — kuota dan batas teknis.
  Vercel
- [Account Plans](<https://vercel.com/docs/plans?utm_source=chatgpt.com>) — perbedaan Hobby, Pro, dan Enterprise.
  Vercel
- [Vercel Hobby Terms](<https://vercel.com/legal/terms?utm_source=chatgpt.com>) — ketentuan penggunaan paket Hobby.
  Vercel
- [Function Duration](<https://vercel.com/docs/functions/configuring-functions/duration?utm_source=chatgpt.com>) — konfigurasi durasi function.
- [Hobby Deployment Storage Changes](<https://vercel.com/changelog/hobby-projects-now-retain-fewer-deployments-to-free-up-storage?utm_source=chatgpt.com>) — pembaruan deployment storage September 2026.
  Vercel