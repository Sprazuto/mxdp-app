# RESEND FREE TIER — SPESIFIKASI TEKNIS UNTUK AI AGENT

**Versi dokumen:** 1.0\
**Tanggal acuan:** 23 Oktober 2026\
**Paket:** Resend Free ($0/bulan)\
**Sumber resmi:** [https://resend.com/pricing](<https://resend.com/pricing>)

## 1\. Tujuan dan instruksi utama

AI Agent harus menggunakan Resend sebagai layanan email untuk mengirim email transaksional, notifikasi aplikasi, dan email lain yang diizinkan oleh kebutuhan produk.

Prioritas implementasi:

1. Gunakan kuota dan fitur yang tersedia dalam paket Free.
2. Jangan mengasumsikan email dapat dikirim tanpa batas.
3. Jangan mengekspos API key ke browser atau repository publik.
4. Verifikasi domain pengirim sebelum penggunaan produksi.
5. Buat sistem pengiriman yang aman terhadap duplikasi, kegagalan, dan retry.
6. Pantau kuota harian dan bulanan.
7. Jangan mengirim email promosi tanpa izin penerima yang sesuai.
8. Jangan mengklaim email telah diterima hanya karena API berhasil menerima permintaan.
9. Verifikasi dokumentasi resmi jika batas paket atau SDK berubah.
10. Jangan mengaktifkan layanan berbayar atau pay-as-you-go tanpa persetujuan pengguna.

Jika kebutuhan aplikasi melebihi batas Free, jelaskan keterbatasan dan alternatifnya sebelum mengubah paket.

## 2\. Spesifikasi resmi paket Free

| Parameter | Batas atau fasilitas |
| --- | --- |
| Harga | $0/bulan |
| Email | 3.000 per bulan |
| Batas harian | 100 email per hari |
| Custom sending domains | Maksimal 3 domain |
| Webhook endpoints | 1 endpoint |
| Automation runs | 10.000 per bulan |
| Retensi data | 30 hari |
| AI credits | 5 per bulan |
| API | REST API |
| SDK | SDK resmi tersedia |
| SMTP relay | Tersedia |
| React Email | Tersedia |
| Scheduled emails | Tersedia sesuai dukungan API/fitur |
| Batch sending | Tersedia sesuai batas layanan |
| Ticket support | Termasuk |
| Dedicated IP | Tidak termasuk |
| Pay-as-you-go untuk overage | Tidak tersedia pada Free |

**Aturan penting:** batas harian 100 email dan batas bulanan 3.000 email berlaku secara bersamaan. AI Agent harus menghormati batas yang tercapai lebih dahulu.

Kuota dibagikan oleh tim Resend sesuai aturan akun, bukan secara otomatis diberikan penuh kepada setiap domain.

Jangan mengasumsikan kuota bulanan yang tersisa dapat dipakai sekaligus dalam satu hari.

## 3\. Kegunaan Resend

Gunakan Resend untuk kebutuhan seperti:

- Email verifikasi akun.
- Email reset password.
- Magic link.
- Notifikasi pendaftaran.
- Notifikasi transaksi.
- Konfirmasi pesanan.
- Email perubahan status.
- Notifikasi keamanan.
- Email undangan.
- Email laporan atau notifikasi sistem.
- Newsletter atau broadcast apabila memenuhi aturan kontak, consent, dan batas produk.

Bedakan email transaksional dan marketing:

- **Transaksional:** email yang dipicu oleh tindakan atau keadaan tertentu, misalnya reset password dan konfirmasi transaksi.
- **Marketing:** email promosi atau broadcast kepada kontak yang sudah ada.

Jangan menggunakan endpoint email transaksional sebagai cara untuk menghindari aturan atau batas produk marketing.

## 4\. Domain dan identitas pengirim

### 4.1 Domain pengirim

Paket Free menyediakan hingga tiga domain pengirim.

Sebelum pengiriman produksi:

1. Tambahkan domain di dashboard Resend.
2. Konfigurasikan record DNS yang diberikan Resend.
3. Verifikasi domain.
4. Periksa status SPF dan DKIM.
5. Gunakan alamat `From` dari domain yang telah diverifikasi.
6. Uji pengiriman ke mailbox yang dikuasai tim.
7. Pantau bounce dan complaint.

Contoh alamat pengirim:

- `noreply@example.com`
- `notifications@example.com`
- `support@example.com`

Alamat tersebut hanya contoh. Jangan menggunakannya sebelum domain benar-benar dimiliki dan diverifikasi.

### 4.2 SPF, DKIM, dan DMARC

AI Agent harus:

- Mengikuti nilai DNS yang dihasilkan Resend.
- Tidak mengarang record SPF atau DKIM.
- Menghindari konflik SPF jika domain sudah menggunakan penyedia email lain.
- Mengonfigurasi DMARC sesuai kebijakan domain dan kebutuhan deliverability.
- Tidak mengklaim autentikasi email berhasil sebelum status DNS diverifikasi.
- Tidak mengubah record email produksi tanpa persetujuan pemilik domain.

Jangan menghapus record DNS yang sudah ada hanya untuk membuat verifikasi Resend berhasil.

### 4.3 Testing sebelum domain siap

Gunakan fitur testing Resend atau alamat pengujian resmi yang didukung.

Contoh alamat simulasi untuk menguji event:

- `delivered@resend.dev`
- `bounced@resend.dev`
- `complained@resend.dev`

Alamat tersebut digunakan untuk pengujian skenario, bukan sebagai pengganti verifikasi domain produksi.

## 5\. API key dan environment variables

Contoh konfigurasi:

```
RESEND_API_KEY=re_xxxxxxxxx
RESEND_FROM_EMAIL=noreply@example.com
RESEND_WEBHOOK_SECRET=whsec_xxxxxxxxx
```

Ketentuan:

- `RESEND_API_KEY`: hanya digunakan server-side.
- `RESEND_FROM_EMAIL`: alamat pengirim dari domain yang diverifikasi.
- `RESEND_WEBHOOK_SECRET`: secret untuk verifikasi webhook jika webhook digunakan.
- Jangan memberikan prefix `NEXT_PUBLIC_` pada secret Resend.
- Jangan menyimpan secret di source code, frontend bundle, log, atau Git.
- Tambahkan file environment lokal ke `.gitignore`.
- Gunakan secret manager atau environment variables dari platform deployment.
- Rotasi API key yang terindikasi bocor.
- Gunakan API key dengan izin minimum yang diperlukan jika dukungan izin tersedia.

Jangan membuat API key palsu lalu mengklaim pengiriman telah berhasil.

## 6\. Arsitektur pengiriman email

Gunakan pola berikut jika sesuai dengan aplikasi:

1. **Frontend:** meminta operasi bisnis yang sah, misalnya mendaftar atau melakukan checkout.
2. **Backend:** memvalidasi input dan otorisasi.
3. **Email service module:** membentuk pesan email dan memanggil Resend.
4. **Resend API:** menerima permintaan pengiriman.
5. **Webhook endpoint:** menerima event pengiriman, bounce, complaint, atau event lain yang diperlukan.
6. **Database:** menyimpan status email jika riwayat dan audit dibutuhkan.
7. **Monitoring:** memantau kuota dan kegagalan.

Frontend tidak boleh memanggil Resend dengan secret API key.

Jangan mengirim email penting hanya berdasarkan nilai email atau user ID yang dikirim browser tanpa validasi server-side.

## 7\. Integrasi SDK

Gunakan SDK resmi yang sesuai dengan runtime aplikasi.

Contoh untuk Node.js atau Next.js server-side:

```
import { Resend } from 'resend'

const apiKey = process.env.RESEND_API_KEY

if (!apiKey) {
  throw new Error('RESEND_API_KEY is not configured')
}

const resend = new Resend(apiKey)

export async function sendWelcomeEmail(to: string) {
  const from = process.env.RESEND_FROM_EMAIL

  if (!from) {
    throw new Error('RESEND_FROM_EMAIL is not configured')
  }

  const { data, error } = await resend.emails.send({
    from,
    to,
    subject: 'Welcome!',
    html: '<h1>Welcome</h1><p>Your account is ready.</p>',
  })

  if (error) {
    throw new Error(`Resend send failed: ${error.message}`)
  }

  return data
}
```

Contoh ini merupakan titik awal, bukan implementasi lengkap untuk seluruh kebutuhan produksi.

Ketentuan:

- Jangan memasukkan data pengguna yang tidak diperlukan ke dalam email.
- Escape atau sanitasi konten dinamis ketika membuat HTML.
- Jangan menerima alamat pengirim arbitrer dari request publik.
- Validasi alamat penerima.
- Jangan menampilkan API key atau respons internal yang sensitif.
- Gunakan template terpisah untuk jenis email yang berbeda.
- Tangani error API secara eksplisit.
- Verifikasi API dan SDK sesuai dokumentasi terbaru.

## 8\. Batas kuota dan kebijakan pengiriman

### 8.1 Kuota

| Resource | Kuota Free |
| --- | --- |
| Email per bulan | 3.000 |
| Email per hari | 100 |
| Domain pengirim | 3 |
| Webhook endpoints | 1 |
| Automation runs | 10.000/bulan |
| Retensi data | 30 hari |
| AI credits | 5/bulan |

Setiap permintaan harus diperiksa terhadap kuota yang berlaku. Jangan mengasumsikan satu permintaan API selalu sama dengan satu email yang dihitung untuk kuota; penerima tambahan dan fitur terkait dapat memengaruhi perhitungan. Periksa definisi penggunaan resmi.

### 8.2 Pengendalian penggunaan

Gunakan target internal berikut:

- Peringatan harian pada 80 email.
- Peringatan bulanan pada 2.400 email.
- Batasi email nonkritis saat kuota mendekati batas.
- Prioritaskan reset password, verifikasi akun, dan notifikasi yang benar-benar diperlukan.
- Jangan mengirim email berulang untuk event yang sama.
- Hindari retry tanpa batas.
- Simpan log pengiriman yang memadai tanpa menyimpan secret.
- Jangan mengandalkan dashboard manual sebagai satu-satunya sistem monitoring.

Target 80% tersebut adalah kebijakan operasional internal, bukan kuota resmi baru.

### 8.3 Jika kuota habis

Pada paket Free, jangan mengasumsikan pengiriman otomatis berlanjut dengan tagihan tambahan.

Jika kuota tercapai:

1. Hentikan pengiriman nonkritis.
2. Catat pesan yang belum berhasil dikirim.
3. Tampilkan status yang sesuai pada aplikasi.
4. Hindari retry agresif.
5. Tunggu reset kuota atau minta persetujuan upgrade.
6. Jangan menghapus antrean email penting secara otomatis.
7. Jangan mengklaim pesan terkirim apabila API menolak permintaan.

Pay-as-you-go untuk email tersedia pada paket berbayar sesuai ketentuan Resend.

## 9\. Queue, retry, dan idempotency

Untuk sistem produksi, hindari mengirim email secara langsung berulang kali akibat retry HTTP atau pengulangan event.

AI Agent harus mempertimbangkan:

- Menyimpan status email yang akan dikirim.
- Menggunakan idempotency key jika didukung oleh operasi dan SDK terkait.
- Menyimpan ID email yang dikembalikan Resend.
- Membedakan status queued, accepted, delivered, bounced, dan failed.
- Mencegah pemicu event yang sama mengirim email berulang.
- Menggunakan exponential backoff untuk error sementara.
- Tidak melakukan retry terus-menerus terhadap error konfigurasi atau kuota.
- Mempertahankan daftar email yang tertunda ketika kuota habis.
- Menyediakan cara untuk memeriksa dan memproses ulang email yang gagal secara aman.

Jika aplikasi sudah memakai Supabase atau database lain, gunakan database tersebut sebagai sumber status pengiriman bila sesuai. Jangan menambahkan queue eksternal berbayar tanpa persetujuan.

## 10\. Template email dan konten

Pisahkan template berdasarkan kebutuhan:

- Welcome.
- Email verification.
- Password reset.
- Login magic link.
- Transaction confirmation.
- Status update.
- Security alert.
- Notification.
- Marketing email, jika diperlukan.

Ketentuan:

- Gunakan subject yang jelas.
- Sertakan versi teks biasa jika memungkinkan.
- Gunakan HTML yang valid dan responsif.
- Jangan menanamkan secret atau data pribadi berlebihan.
- Escape konten dinamis.
- Gunakan URL absolut yang benar.
- Jangan membuat tautan reset password atau verifikasi secara manual jika platform autentikasi menyediakan mekanisme resmi.
- Uji tampilan di perangkat mobile.
- Jangan menganggap email yang terkirim pasti masuk inbox utama.

Untuk newsletter atau marketing, hormati consent, unsubscribe, dan kebijakan email yang berlaku.

## 11\. Webhooks

Paket Free menyediakan satu webhook endpoint.

Gunakan endpoint tersebut untuk event yang paling penting bagi aplikasi, misalnya:

- Email delivered.
- Email bounced.
- Email complained.
- Email failed.
- Event lain yang memang diperlukan.

AI Agent harus:

1. Membuat endpoint HTTPS yang dapat diakses Resend.
2. Memilih event yang dibutuhkan.
3. Memverifikasi tanda tangan webhook dengan mekanisme resmi Resend.
4. Memakai raw request body sesuai kebutuhan verifikasi.
5. Menolak request dengan signature tidak valid.
6. Menangani event duplikat secara idempotent.
7. Menyimpan event yang relevan.
8. Mengembalikan response dengan cepat.
9. Menghindari pemrosesan berat secara sinkron.
10. Tidak mempercayai payload webhook sebelum diverifikasi.

Jangan menggunakan satu endpoint sebagai alasan untuk menonaktifkan validasi event. Jika aplikasi membutuhkan banyak tujuan, buat satu endpoint yang memvalidasi dan meneruskan event secara internal.

## 12\. Keamanan dan privasi

AI Agent wajib:

- Mengirim data penerima hanya kepada Resend untuk kebutuhan yang sah.
- Tidak menyimpan API key di log.
- Tidak memasukkan informasi sensitif ke subject email.
- Membatasi akses terhadap log dan riwayat email.
- Menghindari data pribadi yang tidak diperlukan.
- Memvalidasi otorisasi sebelum mengirim email yang dipicu pengguna.
- Menghindari endpoint publik yang dapat dipakai untuk spam.
- Membatasi jumlah email per pengguna jika sesuai.
- Mencegah penyalahgunaan endpoint pengiriman.
- Memproses permintaan unsubscribe dan suppression sesuai aturan yang berlaku.

Jangan menjadikan API pengiriman email sebagai endpoint bebas yang bisa dipanggil anonim tanpa pembatasan.

## 13\. Deliverability dan reputasi domain

AI Agent harus memperhatikan:

- SPF dan DKIM yang valid.
- DMARC yang sesuai.
- Bounce rate.
- Complaint rate.
- Kualitas daftar penerima.
- Consent dan unsubscribe.
- Konsistensi identitas pengirim.
- Penggunaan alamat pengirim yang benar-benar dikuasai.
- Pemisahan domain untuk kebutuhan transaksional dan marketing jika diperlukan.

Jangan mengirim email ke daftar alamat yang diperoleh tanpa izin.

Jangan mencoba menghindari suppression, bounce handling, atau kebijakan provider.

Jangan menjanjikan 100% inbox placement. Resend menerima permintaan pengiriman, tetapi hasil akhirnya tetap bergantung pada sistem email penerima dan reputasi pengirim.

## 14\. Monitoring dan penggunaan API

Pantau:

- Total email harian.
- Total email bulanan.
- Email yang accepted.
- Email delivered.
- Bounce dan complaint.
- Email gagal.
- Webhook failures.
- Domain verification status.
- Automation runs.
- Error API dan rate limit.

Jika tersedia pada akun dan SDK yang digunakan, manfaatkan Usage API untuk membaca pemakaian dan batas aktual secara terprogram.

Jangan membuat asumsi bahwa angka pemakaian selalu dapat diketahui hanya dengan menghitung record lokal. Rekonsiliasikan status lokal dengan data Resend bila dibutuhkan.

Untuk error rate limit, gunakan header respons dan mekanisme retry yang sesuai. Jangan mengirim permintaan tanpa batas saat API mengembalikan HTTP 429.

## 15\. Ketergantungan eksternal dan biaya

AI Agent tidak boleh mengaktifkan atau menggunakan fitur berbayar tanpa persetujuan.

Perhatikan bahwa biaya tambahan mungkin muncul dari:

- Paket Pro atau Scale.
- Overage email pada paket berbayar.
- Automation runs di atas kuota jika fitur berbayar diaktifkan.
- Add-on domain.
- Dedicated IP.
- SSO.
- Infrastruktur backend untuk queue atau webhook.
- Penyimpanan dan observabilitas eksternal.

Jika penggunaan mendekati batas Free, berikan estimasi kebutuhan berdasarkan volume aktual sebelum menyarankan upgrade.

## 16\. Checklist penerimaan implementasi

### Konfigurasi

- [ ]API key berada di server.
- [ ]Environment variables dikonfigurasi.
- [ ]Domain pengirim telah diverifikasi.
- [ ]SPF dan DKIM telah diperiksa.
- [ ]Alamat pengirim berasal dari domain yang sesuai.
- [ ]SDK sesuai dengan runtime proyek.

### Pengiriman

- [ ]Email uji berhasil diproses.
- [ ]Error API ditangani.
- [ ]Status email tidak disamakan dengan delivery.
- [ ]Retry tidak menyebabkan duplikasi.
- [ ]Kuota harian dan bulanan dipertimbangkan.
- [ ]Email nonkritis dapat ditunda ketika kuota habis.
- [ ]Template email telah diperiksa.

### Keamanan

- [ ]Tidak ada secret di frontend.
- [ ]Endpoint pengiriman memiliki authorization.
- [ ]Input penerima divalidasi.
- [ ]Konten dinamis ditangani dengan aman.
- [ ]Webhook diverifikasi jika digunakan.
- [ ]Event duplikat tidak diproses berulang secara merusak.
- [ ]Log tidak memuat kredensial.

### Operasional

- [ ]Monitoring penggunaan tersedia atau didokumentasikan.
- [ ]Bounce dan complaint ditangani.
- [ ]Domain verification status dapat diperiksa.
- [ ]Tidak ada asumsi overage gratis.
- [ ]Fitur berbayar tidak diaktifkan tanpa izin.
- [ ]Hasil pengujian dilaporkan secara jujur.

## 17\. Format laporan akhir AI Agent

Setelah implementasi, laporkan:

1. Ringkasan perubahan.
2. File yang dibuat atau diubah.
3. Email templates yang ditambahkan.
4. Environment variables yang diperlukan.
5. Status domain dan DNS jika telah diverifikasi.
6. Fitur Free yang digunakan.
7. Penggunaan kuota yang relevan.
8. Hasil tes pengiriman.
9. Status lint, type-check, build, dan tes lain jika tersedia.
10. Risiko keamanan dan deliverability.
11. Masalah yang belum terselesaikan.
12. Dependensi eksternal dan potensi biaya.

## 18\. Aturan keputusan terakhir

Jika kebutuhan aplikasi bertentangan dengan batas Resend Free:

1. Utamakan keamanan dan privasi penerima.
2. Pertahankan email transaksional yang paling penting.
3. Kurangi pengiriman yang tidak diperlukan.
4. Gunakan antrean untuk email yang dapat ditunda.
5. Jangan menambahkan layanan berbayar tanpa persetujuan.
6. Jelaskan trade-off dan risiko.
7. Minta persetujuan sebelum upgrade atau mengaktifkan pay-as-you-go.

**Instruksi penutup:** Bangun integrasi email yang benar-benar kompatibel dengan Resend Free. Hormati batas 3.000 email per bulan, 100 email per hari, maksimal tiga domain, satu webhook endpoint, dan kuota automation. Jangan pernah mengekspos API key atau mengklaim email sudah diterima hanya berdasarkan keberhasilan request API.

## Referensi resmi untuk AI Agent

- [Resend Pricing](<https://resend.com/pricing?utm_source=chatgpt.com>) — kuota, harga, domain, dan fitur.
  Resend
- [More Domains on the Free Tier](<https://resend.com/changelog/three-domains-on-the-free-tier?utm_source=chatgpt.com>) — perubahan kuota domain pada Agustus 2026.
  Resend
- [API Key Permissions](<https://resend.com/changelog/new-api-key-permissions?utm_source=chatgpt.com>) — pembatasan izin API key.
  Resend
- [Managing Webhooks via API](<https://resend.com/changelog/managing-webhooks-via-api?utm_source=chatgpt.com>) — pengelolaan dan verifikasi webhook.
  Resend
- [Account Usage API](<https://resend.com/changelog/account-usage-api?utm_source=chatgpt.com>) — pengambilan penggunaan dan kuota melalui API.
  Resend
- [Official Resend CLI](<https://resend.com/changelog/cli?utm_source=chatgpt.com>) — alat CLI untuk developer dan AI Agent.
  Resend