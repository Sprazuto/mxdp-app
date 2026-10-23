# SUPABASE FREE TIER — SPESIFIKASI TEKNIS UNTUK AI AGENT

**Versi dokumen:** 1.0\
**Tanggal acuan:** 23 Oktober 2026\
**Paket:** Supabase Free ($0/bulan)\
**Sumber utama:** https://supabase.com/pricing

## 1\. Tujuan dan instruksi utama

AI Agent harus membangun, mengonfigurasi, atau mengembangkan aplikasi menggunakan Supabase Free sebagai backend, database, authentication provider, file storage, dan layanan pendukung sesuai kebutuhan proyek.

Prioritas implementasi:

1. Gunakan fitur yang tersedia dalam paket Free.
2. Hindari dependensi pada fitur berbayar.
3. Jangan mengasumsikan kuota atau kemampuan yang tidak tercantum dalam dokumentasi resmi.
4. Jangan mengekspos kredensial server, secret, atau service role key ke browser.
5. Gunakan PostgreSQL, Row Level Security (RLS), dan validasi input dengan benar.
6. Rancang aplikasi agar dapat menangani kuota habis dan proyek yang dijeda.
7. Verifikasi dokumentasi dan batas paket terbaru sebelum mengambil keputusan teknis.
8. Jangan mengklaim konfigurasi, deployment, atau pengujian berhasil tanpa verifikasi nyata.

Jika kebutuhan pengguna tidak dapat dipenuhi oleh Free Tier, jelaskan batasannya dan usulkan alternatif sebelum melakukan perubahan yang menambah biaya.

## 2\. Spesifikasi resmi paket Free

### 2.1 Harga dan proyek

| Parameter | Batas atau fasilitas |
| --- | --- |
| Harga | $0/bulan |
| Proyek aktif | Maksimal 2 |
| Status proyek | Dapat dijeda setelah 1 minggu tidak aktif |
| Database | Dedicated PostgreSQL instance per proyek |
| Compute | Shared compute |
| API requests | Tidak terbatas berdasarkan kuota jumlah request |
| Dashboard team members | Tidak terbatas |
| Akses role proyek | Owner, Admin, Developer |
| Support | Community support |
| Automatic backups | Tidak tersedia |
| Point-in-time recovery | Tidak tersedia |
| Custom domain Supabase | Tidak tersedia |
| Uptime SLA | Tidak tersedia |

Batas dua proyek aktif berlaku secara keseluruhan sesuai aturan organisasi dan kepemilikan Supabase, bukan dua proyek untuk setiap organisasi yang dibuat tanpa batas. Proyek yang dijeda tidak dihitung sebagai proyek aktif.

Jangan mengasumsikan proyek yang dijeda tetap melayani request aplikasi secara normal.

### 2.2 Database dan compute

| Resource | Batas |
| --- | --- |
| Database size | 500 MB per proyek |
| Disk provisioned | Hingga 1 GB pada Free |
| CPU | Shared compute |
| RAM | 500 MB |
| Automatic database backups | Tidak tersedia |
| Point-in-time recovery | Tidak tersedia |
| Branching | Tidak tersedia |
| Advanced disk configuration | Tidak tersedia |

Database size quota 500 MB berbeda dari kapasitas disk yang disediakan. Jika ukuran database melampaui 500 MB, database proyek Free dapat masuk ke mode read-only.

AI Agent tidak boleh menganggap bahwa kapasitas disk 1 GB berarti database boleh tumbuh sampai 1 GB tanpa pembatasan.

### 2.3 Network dan bandwidth

| Resource | Batas |
| --- | --- |
| Egress | 5 GB |
| Cached egress | 5 GB |
| API request count | Tidak terbatas |
| Log retention | 1 hari |

Egress adalah data yang dikirim keluar melalui layanan Supabase. Pemakaian dapat berasal dari database, Storage, Auth, Realtime, Functions, dan layanan terkait.

Cached egress merupakan kuota terpisah yang terutama berlaku untuk pengiriman file Storage melalui cache. Jangan menyamakan egress dengan kapasitas database.

### 2.4 Authentication

| Fitur | Batas atau fasilitas |
| --- | --- |
| Total users | Tidak terbatas |
| Monthly Active Users (MAU) | 50.000 |
| Anonymous sign-ins | Termasuk |
| Social OAuth providers | Termasuk |
| Custom SMTP | Termasuk |
| Basic MFA | Termasuk |
| User data ownership | Termasuk |
| Auth audit logs | 1 jam |
| Custom email branding | Tidak termasuk |
| Advanced phone MFA | Tidak termasuk |
| SAML SSO | Tidak termasuk |
| Leaked password protection | Tidak termasuk |
| Single session per user | Tidak termasuk |
| Custom session timeouts | Tidak termasuk |

MAU adalah jumlah pengguna aktif bulanan yang dihitung sesuai aturan pengukuran Supabase. Jangan menganggap total akun yang tersimpan sama dengan jumlah MAU.

Jika aplikasi membutuhkan pengiriman email autentikasi yang andal, konfigurasi SMTP dan batas provider email harus diverifikasi. Jangan mengasumsikan layanan email eksternal memiliki kuota gratis tanpa batas.

### 2.5 Storage

| Resource | Batas |
| --- | --- |
| File storage | 1 GB |
| Cached egress | 5 GB |
| Maximum file upload size | 50 MB |
| Basic CDN | Termasuk |
| Custom access controls | Termasuk |
| Image transformations | Tidak termasuk |

AI Agent harus menggunakan kebijakan akses Storage yang tepat dan menghindari penyimpanan file publik apabila kontennya bersifat privat.

Batas unggahan maksimum 50 MB bukan berarti setiap unggahan sebesar itu disarankan. Ukuran file harus dioptimalkan sesuai kebutuhan aplikasi.

### 2.6 Realtime

| Resource | Batas |
| --- | --- |
| Realtime messages | 2 juta per bulan |
| Concurrent peak connections | 200 |
| Pesan per detik | 100 |
| Channel joins per detik | 100 |
| Channels per connection | 100 |
| Maximum message size | 256 KB |
| Broadcast replay retention | 72 jam |

Postgres Changes dan fitur Realtime tersedia pada paket Free, tetapi penggunaannya harus dikendalikan.

Hindari mengirim event untuk setiap perubahan yang tidak penting. Gunakan filter, subscription yang relevan, dan cleanup ketika komponen frontend dilepas.

### 2.7 Edge Functions

| Resource | Batas |
| --- | --- |
| Invocations | 500.000 per bulan |
| CPU dan memori | Mengikuti batas runtime Free |
| Custom Access Token hook | Tersedia |
| Email/SMS hooks | Tersedia |

Jangan mengasumsikan bahwa kuota invocations berarti waktu eksekusi, CPU, ukuran payload, atau jumlah request eksternal tidak terbatas.

Periksa batas runtime resmi untuk fungsi yang akan digunakan.

### 2.8 Fitur platform yang tidak tersedia

Jangan menjadikan fitur berikut sebagai persyaratan wajib pada paket Free:

- Automatic backups.
- Point-in-time recovery.
- Database branching.
- Advanced disk configuration.
- Log drains.
- Platform audit logs.
- Metrics endpoint.
- SSO untuk dashboard.
- Custom domain Supabase.
- Dedicated support dan SLA.
- Fitur compliance berbayar seperti SOC 2, ISO 27001, atau HIPAA.
- Image transformations bawaan Storage.
- Fitur lanjutan keamanan Auth yang secara eksplisit dikecualikan dari Free.

Jika diperlukan, jelaskan alternatif eksternal, risikonya, dan potensi biayanya.

## 3\. Arsitektur aplikasi yang direkomendasikan

Gunakan arsitektur berikut bila sesuai dengan kebutuhan proyek:

1. **Supabase PostgreSQL:** database utama.
2. **Supabase Auth:** autentikasi dan manajemen sesi.
3. **Supabase Storage:** penyimpanan file.
4. **Supabase Realtime:** sinkronisasi data langsung jika dibutuhkan.
5. **Supabase Edge Functions:** operasi server-side tertentu.
6. **Frontend:** Next.js, React, atau framework yang ditentukan pengguna.
7. **Supabase client:** integrasi API, Auth, dan database.
8. **Row Level Security:** kontrol akses database.
9. **Monitoring:** pemantauan kuota dan error.
10. **Backup eksternal:** strategi tambahan jika data penting tidak boleh hilang.

Jangan menambahkan layanan eksternal tanpa alasan teknis yang jelas.

## 4\. Environment variables dan keamanan kredensial

Contoh untuk proyek Next.js:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key

SUPABASE_SECRET_KEY=
SUPABASE_DB_URL=
```

Ketentuan:

- `NEXT_PUBLIC_SUPABASE_URL` merupakan URL proyek.
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` merupakan publishable key yang boleh digunakan di browser bersama RLS yang benar.
- `SUPABASE_SECRET_KEY` hanya boleh digunakan server-side.
- `SUPABASE_DB_URL` hanya boleh digunakan pada lingkungan server yang aman, jika koneksi database langsung memang dibutuhkan.
- Gunakan nama variabel yang sesuai dengan SDK dan versi Supabase yang dipakai.
- Jangan mengisi kredensial dengan nilai palsu lalu mengklaim koneksi berhasil.
- Jangan menyimpan secret di source code, commit Git, log, atau bundle browser.
- Tambahkan `.env.local` ke `.gitignore`.
- Jika kredensial bocor, cabut atau rotasi sesegera mungkin.

Publishable key bukan pengganti authorization. Keamanan tetap harus ditegakkan menggunakan RLS, grants, dan validasi server-side yang sesuai.

Jangan pernah mengekspos `service_role` key atau secret key ke browser.

## 5\. Database schema dan migrasi

AI Agent wajib:

- Memeriksa schema yang sudah ada sebelum mengubah database.
- Membuat tabel hanya berdasarkan kebutuhan aplikasi.
- Menggunakan tipe data PostgreSQL yang tepat.
- Menambahkan primary key dan foreign key.
- Menambahkan index untuk query yang benar-benar membutuhkan index.
- Menghindari index berlebihan yang menghabiskan ruang.
- Menambahkan constraint dan validasi.
- Menggunakan migration files yang dapat ditinjau dan diulang dengan aman.
- Menghindari destructive migrations tanpa persetujuan.
- Menggunakan transaksi untuk operasi yang membutuhkan konsistensi.
- Memastikan perubahan schema tidak merusak data lama.

Contoh struktur sederhana:

```
create table public.profiles (
  id uuid primary key references auth.users(id)
    on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can read their own profile"
on public.profiles
for select
to authenticated
using ((select auth.uid()) = id);

create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);
```

Contoh ini hanya ilustrasi. Terapkan kebijakan insert, update, delete, dan select sesuai kebutuhan. Jangan menganggap policy select dan update sudah mencakup seluruh operasi.

### Batas ukuran database

Gunakan strategi penghematan ruang:

- Hindari menyimpan gambar atau video sebagai binary besar di PostgreSQL.
- Simpan file di Supabase Storage dan metadata di database.
- Hapus data sementara sesuai kebijakan retensi.
- Hindari duplikasi payload JSON yang besar.
- Pantau tabel, index, dan ukuran database.
- Buat peringatan internal ketika pemakaian mendekati 80% dari 500 MB.
- Jangan menghapus data secara otomatis hanya untuk memenuhi kuota tanpa persetujuan pengguna.

## 6\. Row Level Security (RLS)

RLS adalah persyaratan keamanan utama untuk tabel yang dapat diakses melalui API publik.

AI Agent wajib:

1. Mengaktifkan RLS pada tabel yang dapat diakses melalui API dan memuat data yang perlu dilindungi.
2. Membuat policy secara eksplisit untuk operasi yang diizinkan.
3. Menggunakan `auth.uid()` atau mekanisme authorization yang sesuai.
4. Membatasi data berdasarkan pemilik, tenant, organisasi, atau role sesuai kebutuhan.
5. Menguji akses dengan user yang berhak dan tidak berhak.
6. Menghindari policy terbuka seperti `using (true)` kecuali tabel memang dirancang untuk dibaca secara publik.
7. Memastikan Storage policies melindungi file privat.
8. Tidak mempercayai role atau user ID yang dikirim langsung dari browser tanpa validasi.
9. Tidak menganggap menyembunyikan tombol UI sebagai kontrol keamanan.
10. Memastikan fungsi server-side juga memvalidasi identitas dan izin pengguna.

Jika tabel digunakan untuk data publik, izinkan hanya operasi publik yang memang diperlukan.

## 7\. Authentication dan session management

Gunakan Supabase Auth jika kebutuhan proyek mencakup akun pengguna.

Fitur yang dapat dipertimbangkan:

- Email dan password.
- Social OAuth.
- Session management.
- Password reset.
- Email verification.
- Anonymous sign-in.
- Basic MFA.

Ketentuan:

- Validasi sesi di server sesuai framework.
- Jangan mempercayai data profil yang dikirim klien sebagai bukti identitas.
- Gunakan redirect URL yang diizinkan.
- Lindungi halaman dan API privat.
- Tangani sesi kedaluwarsa dan logout.
- Jangan menaruh token akses di URL.
- Jangan mencatat access token atau refresh token ke log.
- Gunakan custom SMTP jika dibutuhkan dan konfigurasikan dengan benar.
- Uji alur reset password dan verifikasi email.
- Jangan mengandalkan fitur SAML SSO atau keamanan Auth berbayar pada Free.

## 8\. Storage dan file uploads

Gunakan Supabase Storage untuk gambar, dokumen, dan file yang dibutuhkan aplikasi.

Aturan:

- Buat bucket publik hanya jika file memang dimaksudkan untuk dibagikan.
- Gunakan bucket privat untuk file yang memerlukan authorization.
- Terapkan Storage RLS policies.
- Validasi ukuran, tipe file, dan hak akses.
- Gunakan nama file yang aman dan hindari path yang dapat dimanipulasi.
- Hindari mengandalkan ekstensi file sebagai satu-satunya validasi tipe.
- Batasi ukuran unggahan di frontend dan server.
- Pertimbangkan pemindaian file jika aplikasi menerima dokumen dari pengguna.
- Gunakan URL bertanda tangan untuk akses sementara ke file privat bila sesuai.
- Optimalkan gambar sebelum upload jika memungkinkan.
- Pantau penyimpanan dan bandwidth.

Jangan mengandalkan image transformations bawaan Supabase Storage karena fitur tersebut tidak termasuk paket Free. Gunakan optimasi di sisi klien atau layanan alternatif yang sesuai jika dibutuhkan.

## 9\. API dan query database

Supabase menyediakan API requests tanpa batas jumlah request pada paket Free, tetapi itu tidak berarti seluruh resource tidak terbatas.

AI Agent harus:

- Memilih field yang dibutuhkan.
- Menggunakan filter dan pagination.
- Menghindari query yang memuat seluruh tabel.
- Membatasi ukuran response.
- Menggunakan index pada kolom yang sering difilter atau diurutkan.
- Menghindari N+1 queries.
- Menggunakan batch operations jika sesuai.
- Menghindari polling berlebihan.
- Menggunakan cache untuk data yang relatif statis.
- Mengendalikan egress dan ukuran payload.
- Memeriksa query plan untuk query berat.
- Menangani rate limits dan error API.

Jangan membuat klaim bahwa aplikasi dapat menangani trafik tak terbatas hanya karena jumlah API requests tidak memiliki kuota bulanan.

## 10\. Edge Functions

Gunakan Edge Functions ketika operasi perlu dijalankan di lingkungan server-side, misalnya:

- Integrasi API eksternal yang memerlukan secret.
- Validasi operasi yang tidak boleh dipercayakan kepada browser.
- Webhook handler.
- Tugas backend ringan.
- Logika bisnis yang memerlukan kredensial privat.

Aturan implementasi:

- Validasi input.
- Verifikasi identitas dan izin.
- Jangan menaruh secret dalam response.
- Tambahkan timeout untuk layanan eksternal.
- Hindari operasi CPU-intensif yang tidak sesuai dengan runtime.
- Gunakan idempotency untuk operasi yang berpotensi dipanggil ulang.
- Jangan melakukan retry tanpa batas.
- Pantau jumlah invocations.
- Jangan menganggap Edge Functions merupakan pengganti database atau worker tanpa batas.

Jika tugas dapat diselesaikan dengan query database sederhana, jangan membuat Edge Function tambahan tanpa manfaat yang jelas.

## 11\. Realtime

Gunakan Realtime hanya ketika aplikasi benar-benar membutuhkan sinkronisasi langsung.

Aturan:

- Subscribe hanya pada tabel dan perubahan yang diperlukan.
- Terapkan RLS dan authorization.
- Hentikan subscription ketika komponen tidak lagi digunakan.
- Hindari membuat banyak koneksi duplikat.
- Batasi frekuensi update.
- Hindari broadcast payload yang besar.
- Tangani koneksi terputus dan reconnect.
- Gunakan mekanisme fetch ulang yang aman ketika diperlukan.
- Pantau 2 juta pesan per bulan dan batas koneksi serentak.
- Gunakan polling terkontrol atau revalidation jika real-time tidak diperlukan.

Jangan mengasumsikan semua jenis pesan memiliki perilaku kuota yang sama. Verifikasi aturan perhitungan penggunaan di dokumentasi resmi.

## 12\. Backup, recovery, dan kehilangan data

Paket Free tidak menyediakan automatic backups atau point-in-time recovery.

Untuk data yang penting, AI Agent harus menyarankan strategi backup yang sesuai, misalnya:

- Ekspor database secara terjadwal ke penyimpanan yang aman.
- Menyimpan migration files di repository.
- Menyimpan file penting di lokasi backup terpisah.
- Menguji prosedur pemulihan.
- Mendokumentasikan langkah restore.
- Membatasi akses terhadap file backup.
- Tidak menyimpan backup dengan kredensial yang sama tanpa perlindungan tambahan.

Backup eksternal dapat memerlukan layanan atau infrastruktur tambahan dan tidak otomatis gratis.

Jangan mengklaim data terlindungi dari kehilangan hanya karena menggunakan Supabase PostgreSQL.

## 13\. Proyek yang dijeda dan availability

Proyek Free dapat dijeda setelah satu minggu tidak aktif.

AI Agent harus mempertimbangkan hal ini ketika membangun:

- Website produksi.
- API yang harus selalu tersedia.
- Webhook eksternal.
- Scheduled jobs.
- Aplikasi dengan background processing.
- Sistem yang membutuhkan koneksi database setiap saat.

Jangan mengasumsikan proyek Free memiliki uptime SLA atau selalu aktif.

Jika kebutuhan aplikasi memerlukan availability yang terjamin, jelaskan bahwa Free Tier mungkin tidak sesuai dan diskusikan pilihan deployment lain sebelum mengubah paket.

## 14\. Monitoring dan pengendalian kuota

AI Agent harus memantau atau menyediakan panduan untuk:

- Database size.
- Storage size.
- Egress dan cached egress.
- MAU.
- Realtime messages dan peak connections.
- Edge Function invocations.
- Error API.
- Proyek yang dijeda.
- Log retention.

Gunakan target operasional internal berikut:

| Resource | Target peringatan |
| --- | --- |
| Database | 400 MB |
| File Storage | 800 MB |
| Egress | 4 GB |
| Cached egress | 4 GB |
| MAU | 40.000 |
| Realtime messages | 1,6 juta |
| Edge Functions | 400.000 invocations |

Angka pada tabel adalah target monitoring internal sebesar 80% dari kuota yang relevan, bukan batas resmi baru dari Supabase.

Ketika pemakaian mendekati batas:

1. Identifikasi sumber penggunaan.
2. Kurangi query atau transfer yang tidak diperlukan.
3. Optimalkan payload dan penyimpanan.
4. Bersihkan data yang memang aman untuk dihapus setelah mendapat persetujuan.
5. Evaluasi apakah aplikasi masih cocok dengan Free.
6. Jangan menonaktifkan keamanan demi mengurangi penggunaan.

## 15\. Error handling

Tangani minimal kondisi berikut:

- URL atau key Supabase tidak valid.
- Authentication gagal.
- Session kedaluwarsa.
- Pengguna tidak memiliki izin.
- RLS menolak query.
- Record tidak ditemukan.
- Unique constraint gagal.
- Foreign key constraint gagal.
- Database mencapai batas ukuran.
- Proyek dijeda.
- Storage mencapai kuota.
- Upload terlalu besar.
- Egress atau kuota layanan habis.
- Edge Function gagal.
- Realtime terputus.
- Koneksi jaringan gagal.

Ketentuan:

- Jangan menampilkan stack trace kepada pengguna.
- Jangan mengirim secret dalam error response.
- Catat error server secara aman.
- Bedakan kegagalan sementara dan permanen.
- Hindari retry tanpa batas.
- Jangan menyamarkan kegagalan query sebagai data kosong yang valid.
- Berikan pesan yang jelas dan tindakan pemulihan yang sesuai.

## 16\. Migrasi, testing, dan kualitas kode

Sebelum menyatakan implementasi selesai, AI Agent wajib:

1. Memeriksa repository dan struktur database.
2. Memeriksa versi SDK dan framework.
3. Membuat atau memperbarui migration files.
4. Memastikan RLS aktif dan policy benar.
5. Menjalankan tes akses dengan pengguna berbeda.
6. Menguji alur autentikasi.
7. Menguji operasi baca dan tulis.
8. Menguji upload dan akses file.
9. Menjalankan lint, type-check, dan build jika tersedia.
10. Melaporkan tes yang gagal atau belum dijalankan.

Jangan menghapus tabel atau data produksi tanpa persetujuan eksplisit.

Jangan mengklaim migrasi berhasil apabila belum dijalankan pada database target.

## 17\. Checklist penerimaan

### Konfigurasi

- [ ]URL dan publishable key benar.
- [ ]Secret key hanya tersedia server-side.
- [ ]File environment tidak masuk repository.
- [ ]SDK sesuai versi dokumentasi.
- [ ]Proyek yang digunakan berada pada paket yang diharapkan.

### Database

- [ ]Schema dan migration tersedia.
- [ ]Primary key dan foreign key benar.
- [ ]Index dibuat sesuai kebutuhan.
- [ ]RLS aktif pada tabel yang memerlukan perlindungan.
- [ ]Policy diuji untuk akses yang sah dan tidak sah.
- [ ]Ukuran database dipantau.
- [ ]Tidak ada operasi destruktif yang tidak disetujui.

### Auth dan Storage

- [ ]Login, logout, dan session handling diuji.
- [ ]Route privat dilindungi.
- [ ]Storage policies benar.
- [ ]File privat tidak dapat diakses tanpa izin.
- [ ]Ukuran dan tipe file divalidasi.
- [ ]Secret tidak terekspos.

### Operasional

- [ ]Pagination dan query optimization diterapkan.
- [ ]Penggunaan egress diperhitungkan.
- [ ]Realtime digunakan hanya bila diperlukan.
- [ ]Edge Functions memiliki validasi dan error handling.
- [ ]Risiko project pausing didokumentasikan.
- [ ]Strategi backup tersedia jika data penting.
- [ ]Tidak ada asumsi bahwa layanan gratis memiliki SLA.

### Validasi akhir

- [ ]Lint berhasil jika tersedia.
- [ ]Type-check berhasil jika tersedia.
- [ ]Build berhasil jika tersedia.
- [ ]Tes relevan dijalankan.
- [ ]Hasil tes dan keterbatasan dilaporkan secara jujur.

## 18\. Format laporan akhir AI Agent

Setelah implementasi, laporkan:

1. Ringkasan perubahan.
2. File yang dibuat atau diubah.
3. Tabel dan migration yang ditambahkan.
4. RLS policies yang dibuat.
5. Environment variables yang diperlukan.
6. Fitur Supabase Free yang digunakan.
7. Kuota yang relevan.
8. Hasil lint, type-check, build, dan testing.
9. Risiko keamanan atau kehilangan data.
10. Masalah yang belum terselesaikan.
11. Dependensi eksternal dan potensi biaya.
12. Fitur berbayar yang sengaja tidak digunakan.

## 19\. Aturan keputusan terakhir

Jika kebutuhan proyek bertentangan dengan batas Supabase Free:

1. Utamakan keamanan data.
2. Pertahankan fungsi utama aplikasi.
3. Cari solusi yang kompatibel dengan Free.
4. Jangan menambahkan layanan berbayar tanpa persetujuan.
5. Jelaskan trade-off dan risiko dengan bahasa yang jelas.
6. Minta persetujuan sebelum upgrade paket atau melakukan tindakan yang berisiko terhadap data.

**Instruksi penutup:** Bangun aplikasi yang benar-benar kompatibel dengan Supabase Free, bukan hanya aplikasi yang berhasil berjalan pada saat development. Perhitungkan ukuran database, storage, egress, MAU, Realtime, Edge Functions, risiko proyek dijeda, dan tidak tersedianya backup otomatis. Jangan pernah mengorbankan RLS atau keamanan kredensial demi kemudahan implementasi.

## Referensi resmi untuk AI Agent

- [Supabase Pricing](<https://supabase.com/pricing?utm_source=chatgpt.com>) — harga dan tabel fitur.
- [About Billing on Supabase](<https://supabase.com/docs/guides/platform/billing-on-supabase?utm_source=chatgpt.com>) — kuota dan batas penggunaan.
  Supabase Docs
- [Billing FAQ](<https://supabase.com/docs/guides/platform/billing-faq?utm_source=chatgpt.com>) — proyek aktif, pause, dan konsekuensi kuota.
  Supabase Docs
- [Database Size Limits](<https://supabase.com/docs/guides/platform/database-size?utm_source=chatgpt.com>) — batas 500 MB dan perilaku read-only.
  Supabase Docs
- [Realtime Limits](<https://supabase.com/docs/guides/realtime/limits?utm_source=chatgpt.com>) — koneksi dan batas pesan.
  Supabase Docs
- [Supabase Security](<https://supabase.com/docs/guides/database/secure-data?utm_source=chatgpt.com>) — panduan keamanan database dan RLS.