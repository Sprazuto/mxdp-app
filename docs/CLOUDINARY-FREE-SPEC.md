# CLOUDINARY FREE TIER — SPESIFIKASI TEKNIS UNTUK AI AGENT

**Versi dokumen:** 1.0\
**Tanggal acuan:** 23 Oktober 2026\
**Paket:** Cloudinary Free\
**Harga:** $0, gratis selamanya\
**Sumber utama:** [https://cloudinary.com/pricing](<https://cloudinary.com/pricing>)

## 1\. Tujuan dan instruksi utama

AI Agent harus menggunakan Cloudinary sebagai layanan pengelolaan media untuk upload, penyimpanan, transformasi, optimasi, dan delivery gambar serta video.

Prioritas implementasi:

1. Gunakan fitur yang tersedia pada paket Free.
2. Patuhi batas 25 credits dan aturan penghitungan usage.
3. Jangan mengekspos API secret ke browser.
4. Optimalkan ukuran media dan bandwidth.
5. Hindari transformasi baru yang tidak diperlukan.
6. Gunakan URL media yang konsisten agar cache CDN efektif.
7. Validasi file sebelum upload.
8. Lindungi aset privat menggunakan mekanisme autentikasi yang sesuai.
9. Jangan mengaktifkan add-on berbayar tanpa persetujuan pengguna.
10. Verifikasi dokumentasi resmi terbaru sebelum mengambil keputusan yang bergantung pada batas layanan.

Jika kebutuhan aplikasi melampaui paket Free, jelaskan keterbatasannya dan usulkan alternatif sebelum melakukan upgrade atau menambahkan biaya.

## 2\. Spesifikasi paket Free

### 2.1 Harga dan akun

| Parameter | Batas atau fasilitas |
| --- | --- |
| Harga | $0 |
| Masa berlaku | Gratis selamanya |
| Kartu kredit | Tidak diperlukan untuk mendaftar |
| Users | 3 pengguna per akun |
| Accounts | 1 akun |
| Monthly credits | 25 credits |
| Image API | Termasuk |
| Video API | Termasuk |
| Upload API | Termasuk |
| Upload widget | Termasuk |
| Search | Termasuk |
| Remote fetch | Termasuk |
| CDN delivery | Termasuk |
| Auto-backup | Termasuk |
| Revision tracking | Termasuk |
| Image transformations | Termasuk |
| Video transformations | Termasuk |
| Video transcoding | Termasuk |
| Adaptive streaming | Termasuk |
| Free add-ons | Dapat diakses sesuai ketentuan masing-masing |
| MCP servers | Termasuk |
| Support | Forum, ticket, dan email |

Batas users dan accounts di atas berlaku untuk paket Cloudinary Image & Video API. Jangan menyamakannya dengan paket Cloudinary Assets/DAM yang memiliki struktur dan kuota berbeda.

### 2.2 Sistem credits

Cloudinary Free menggunakan satu kuota gabungan sebesar 25 credits.

| Pemakaian | Setara 1 credit |
| --- | --- |
| Image/video transformations | 1.000 transformasi |
| Managed storage | 1 GB |
| Image bandwidth | 1 GB |
| Video bandwidth | 1 GB pada Free |

Nilai tersebut merupakan konversi penggunaan, bukan kuota terpisah yang dapat dipakai seluruhnya tanpa saling memengaruhi.

Contoh:

- Storage 5 GB menghabiskan sekitar 5 credits.
- Bandwidth gambar 10 GB menghabiskan sekitar 10 credits.
- 5.000 transformasi menghabiskan sekitar 5 credits.

Jika ketiganya digunakan bersamaan, total pemakaian adalah sekitar 20 credits.

Contoh di atas mengasumsikan tidak ada penggunaan tambahan lain dan konversi standar berlaku untuk aset tersebut.

**Peringatan:** jangan mengasumsikan 25 credits berarti 25 GB storage ditambah 25 GB bandwidth ditambah 25.000 transformasi.

### 2.3 Periode penghitungan

Cloudinary Free menggunakan aturan berikut:

- Transformasi: dihitung berdasarkan penggunaan selama 30 hari terakhir.
- Bandwidth: dihitung berdasarkan penggunaan selama 30 hari terakhir.
- Storage: dihitung berdasarkan total aset yang sedang tersimpan.

Pemakaian transformasi dan bandwidth tidak otomatis kembali ke nol pada tanggal pertama setiap bulan. Penggunaan yang lebih lama akan keluar dari jendela 30 hari seiring berjalannya waktu.

Menghapus aset yang tidak diperlukan dapat mengurangi pemakaian storage. Namun, penghapusan aset tidak serta-merta menghapus seluruh riwayat transformasi atau bandwidth yang masih berada dalam jendela penghitungan.

## 3\. Kegunaan Cloudinary

Gunakan Cloudinary untuk:

- Foto profil pengguna.
- Thumbnail artikel.
- Cover artikel dan blog.
- Gambar produk e-commerce.
- Banner dan hero image.
- Galeri foto.
- Gambar portofolio.
- Gambar dokumentasi.
- Video pendek.
- Video produk.
- Video pembelajaran.
- Thumbnail video.
- Responsive image delivery.
- Optimasi format dan kualitas gambar.
- Crop, resize, dan transformasi gambar.
- Delivery media melalui CDN.

Jangan menggunakan Cloudinary sebagai database utama untuk metadata bisnis, akun pengguna, transaksi, atau relasi data aplikasi.

Metadata yang diperlukan untuk query aplikasi dapat disimpan di Supabase atau database yang sudah digunakan proyek.

## 4\. Arsitektur integrasi

Gunakan arsitektur berikut jika sesuai dengan kebutuhan aplikasi:

1. **Frontend:** Next.js, React, atau framework yang digunakan proyek.
2. **Cloudinary:** penyimpanan, pengolahan, dan delivery media.
3. **Upload service:** server-side endpoint untuk operasi upload yang memerlukan tanda tangan.
4. **Database:** menyimpan metadata dan referensi aset.
5. **CDN:** mengirim media yang telah dioptimalkan.
6. **Monitoring:** mengawasi credits, storage, bandwidth, dan transformasi.

Contoh alur upload:

1. Pengguna memilih file.
2. Frontend memvalidasi ukuran dan tipe file.
3. Backend memeriksa autentikasi dan izin pengguna.
4. Backend membuat signature upload jika diperlukan.
5. File diunggah ke Cloudinary.
6. Cloudinary mengembalikan informasi aset.
7. Backend memvalidasi hasil dan menyimpan metadata ke database.
8. Frontend menampilkan URL media yang sesuai.

Jangan menyimpan file besar sebagai binary di database jika Cloudinary sudah digunakan untuk kebutuhan tersebut.

## 5\. Environment variables dan kredensial

Contoh konfigurasi:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

Ketentuan:

- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: nama cloud yang dapat digunakan di frontend.
- `CLOUDINARY_API_KEY`: hanya digunakan pada lingkungan yang sesuai dengan izin dan kebutuhan operasional.
- `CLOUDINARY_API_SECRET`: hanya digunakan server-side.
- `CLOUDINARY_UPLOAD_PRESET`: nama preset upload jika dibutuhkan.

Jangan memberikan prefix `NEXT_PUBLIC_` pada API secret.

Jangan memasukkan secret ke source code, repository publik, log, atau bundle browser.

Tambahkan file environment lokal ke `.gitignore`. Gunakan environment variables atau secret manager dari platform deployment.

Jika secret bocor, rotasi kredensial sesegera mungkin.

## 6\. Strategi upload

### 6.1 Signed upload

Gunakan signed upload ketika aplikasi memerlukan kontrol server-side terhadap parameter upload.

Contoh kebutuhan:

- Foto profil pengguna.
- Dokumen privat.
- Media yang hanya boleh diunggah oleh pengguna terautentikasi.
- Upload dengan batas ukuran dan jenis file tertentu.
- Upload yang memerlukan penentuan folder atau metadata oleh server.

Ketentuan:

- Backend memverifikasi identitas dan hak akses pengguna.
- Signature dibuat di server menggunakan kredensial rahasia.
- Batasi parameter upload yang dapat dipilih klien.
- Jangan menerima folder, public ID, atau metadata sensitif tanpa validasi.
- Jangan mengirim API secret ke frontend.

### 6.2 Unsigned upload

Unsigned upload boleh digunakan untuk kebutuhan yang memang cocok dengan upload preset publik.

Ketentuan:

- Konfigurasikan preset di dashboard.
- Batasi format, ukuran, dan parameter yang diizinkan sesuai dukungan preset.
- Jangan menganggap preset publik sebagai mekanisme autentikasi.
- Terapkan proteksi tambahan terhadap penyalahgunaan upload.
- Jangan menggunakan unsigned upload untuk aset privat tanpa desain keamanan yang tepat.

Jangan membuat upload preset terlalu permisif hanya agar implementasi cepat selesai.

## 7\. Validasi file dan keamanan

AI Agent wajib menerapkan validasi berikut:

- Memeriksa tipe media.
- Memeriksa ukuran file.
- Membatasi ekstensi yang diizinkan.
- Memeriksa hak akses pengguna.
- Membatasi frekuensi upload sesuai kebutuhan.
- Menghindari nama file yang mengandung data sensitif.
- Menghindari metadata pribadi yang tidak diperlukan.
- Menggunakan mekanisme autentikasi yang tepat untuk aset privat.
- Menghindari URL publik untuk dokumen rahasia.
- Menangani upload yang gagal atau terputus.

Jangan mengandalkan validasi frontend saja. Backend harus melakukan validasi yang sesuai.

Jika aplikasi menerima dokumen yang berisiko, evaluasi kebutuhan pemindaian malware atau mekanisme keamanan eksternal.

## 8\. Transformasi dan optimasi gambar

Gunakan transformasi Cloudinary untuk menghasilkan gambar yang sesuai kebutuhan komponen.

Prioritas:

1. Gunakan ukuran gambar yang sesuai dengan layout.
2. Gunakan `f_auto` jika sesuai untuk format otomatis.
3. Gunakan `q_auto` jika sesuai untuk optimasi kualitas.
4. Gunakan crop dan resize sesuai aspect ratio komponen.
5. Hindari mengirim gambar asli beresolusi besar ke thumbnail.
6. Gunakan lazy loading untuk gambar di luar viewport awal.
7. Gunakan placeholder jika bermanfaat.
8. Hindari parameter transformasi yang berubah-ubah tanpa kebutuhan.

Contoh URL transformasi:

```
https://res.cloudinary.com/<cloud_name>/image/upload/f_auto,q_auto,w_800/sample.jpg
```

URL tersebut hanya contoh. Gunakan `cloud_name` dan `public_id` dari aset proyek yang sebenarnya.

### Aturan penggunaan transformasi

Transformasi baru umumnya mengonsumsi credits ketika Cloudinary harus menghasilkan derivative yang belum pernah dibuat sebelumnya.

Jika URL transformasi yang sama sudah menghasilkan derivative dan cache dapat digunakan, pengiriman berulang tidak menambah hitungan transformasi baru untuk derivative tersebut. Namun, bandwidth tetap dihitung berdasarkan data yang dikirim.

Karena itu:

- Gunakan kombinasi transformasi yang konsisten.
- Hindari variasi parameter yang tidak diperlukan.
- Hindari membuat transformasi eager dalam jumlah besar tanpa alasan.
- Jangan membuat ukuran gambar unik untuk setiap request.
- Jangan mengasumsikan semua transformasi lanjutan dihitung dengan tarif standar.
- Periksa aturan khusus jika menggunakan fitur transformasi lanjutan.

## 9\. Optimasi bandwidth dan CDN

Bandwidth merupakan bagian penting dari kuota 25 credits.

AI Agent harus:

- Mengirim ukuran gambar sesuai kebutuhan tampilan.
- Menghindari gambar asli yang terlalu besar.
- Menggunakan format efisien bila didukung.
- Menggunakan caching browser dan CDN yang sesuai.
- Menghindari download ulang file yang sama tanpa kebutuhan.
- Mengoptimalkan thumbnail dan gambar kartu.
- Memakai responsive images bila framework mendukung.
- Menghindari autoplay video yang tidak diperlukan.
- Memeriksa ukuran file video sebelum upload.
- Memantau penggunaan bandwidth melalui dashboard Cloudinary.

Jangan mengasumsikan bahwa penggunaan CDN menghilangkan biaya atau kuota bandwidth. Data yang berhasil dikirim tetap dapat dihitung dalam penggunaan Cloudinary.

## 10\. Video dan adaptive streaming

Cloudinary Free mendukung video transformation, transcoding, dan adaptive streaming sesuai batas paket.

Ketentuan:

- Jangan mengunggah video dengan resolusi lebih tinggi daripada kebutuhan aplikasi.
- Hindari transcoding berulang tanpa alasan.
- Gunakan thumbnail yang dioptimalkan.
- Tentukan resolusi berdasarkan perangkat dan kebutuhan pengguna.
- Batasi video autoplay jika tidak diperlukan.
- Gunakan lazy loading untuk media di bawah viewport.
- Pantau storage, transformasi video, dan bandwidth video.
- Periksa aturan khusus penghitungan transformasi video berdasarkan durasi dan resolusi.

Video dapat mengonsumsi credits jauh lebih cepat daripada gambar. Jangan mengasumsikan satu video selalu setara dengan satu transformasi.

Jika aplikasi memerlukan banyak video atau streaming dengan trafik tinggi, lakukan estimasi pemakaian sebelum implementasi.

## 11\. Storage dan backup

Cloudinary menyimpan aset asli serta dapat menyimpan derivative hasil transformasi dan revisi yang dibackup.

Ketentuan:

- Pantau total ukuran aset.
- Hindari duplikasi upload.
- Gunakan public ID yang konsisten.
- Jangan menghapus aset yang masih direferensikan oleh database.
- Gunakan prosedur penghapusan yang aman.
- Jangan menganggap penghapusan record database otomatis menghapus file Cloudinary.
- Jangan menganggap penghapusan file Cloudinary otomatis membersihkan referensinya di database.

Paket Free menyertakan auto-backup dan revision tracking sesuai ketentuan layanan. Backup yang tersimpan di Cloudinary ikut menggunakan storage.

Jangan mengasumsikan backup Cloudinary merupakan satu-satunya mekanisme pemulihan yang dibutuhkan aplikasi. Jika aset sangat penting, pertimbangkan strategi backup eksternal dan verifikasi apakah solusi tersebut memerlukan paket berbayar.

## 12\. Integrasi dengan Supabase

Jika aplikasi menggunakan Supabase sebagai backend utama, gunakan pembagian tanggung jawab berikut.

### Cloudinary

- File gambar dan video.
- Transformasi media.
- Thumbnail.
- Optimasi kualitas.
- URL delivery.
- Informasi aset yang diperlukan untuk operasi media.

### Supabase

- User profiles.
- Authentication.
- Data bisnis.
- Relasi antardata.
- Metadata aset.
- Kepemilikan aset.
- Status upload.
- Referensi `public_id`, resource type, dan informasi yang diperlukan untuk pengelolaan aset.

Contoh struktur metadata:

```
create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id),
  provider text not null default 'cloudinary',
  public_id text not null,
  resource_type text not null,
  secure_url text,
  created_at timestamptz not null default now()
);

alter table public.media_assets enable row level security;

create policy "Users can read their own media metadata"
on public.media_assets
for select
to authenticated
using ((select auth.uid()) = owner_id);
```

Contoh tersebut hanya titik awal. Tambahkan policy insert, update, dan delete sesuai kebutuhan. Pastikan operasi server-side memverifikasi pemilik aset dan izin yang sesuai.

Jangan menganggap RLS pada metadata otomatis melindungi URL Cloudinary yang bersifat publik. Jika aset harus privat, gunakan mekanisme delivery dan authorization yang sesuai.

## 13\. Penghapusan dan sinkronisasi aset

Jika pengguna menghapus gambar atau video:

1. Verifikasi identitas dan kepemilikan aset.
2. Periksa apakah aset masih digunakan oleh konten lain.
3. Hapus aset melalui mekanisme Cloudinary yang memiliki izin yang sesuai.
4. Perbarui metadata database secara aman.
5. Tangani kegagalan di salah satu sistem.
6. Catat status operasi agar dapat dipulihkan atau diperiksa.

Jangan memberikan API secret ke browser untuk menghapus aset.

Hindari menghapus file secara otomatis hanya karena metadata database tidak ditemukan tanpa mekanisme rekonsiliasi yang telah disetujui.

## 14\. Monitoring credits dan penggunaan

Gunakan dashboard Cloudinary untuk memantau:

- Transformations.
- Managed storage.
- Image bandwidth.
- Video bandwidth.
- Total credits yang terpakai.
- Total aset.
- Error summary.
- Penggunaan per product environment.

Tetapkan target internal berikut:

| Resource | Target peringatan |
| --- | --- |
| Total credits | 20 credits |
| Storage | 20% dari anggaran credit ekuivalen |
| Transformations | 20% dari anggaran credit ekuivalen |
| Bandwidth | 20% dari anggaran credit ekuivalen |

Tabel tersebut adalah pedoman monitoring internal, bukan batas resmi per resource. Ketiga kategori berbagi kuota 25 credits; alokasi aktual harus disesuaikan dengan kebutuhan proyek.

Rekomendasi:

- Buat peringatan internal ketika total penggunaan mendekati 80%.
- Tinjau penggunaan setelah penambahan fitur media.
- Identifikasi transformasi URL yang menghasilkan terlalu banyak derivative.
- Optimalkan aset besar.
- Hentikan proses batch yang tidak penting jika penggunaan mendekati batas.
- Jangan mengaktifkan paket berbayar secara otomatis.

## 15\. Error handling

Tangani setidaknya:

- Cloud name salah.
- Kredensial tidak valid.
- Signature upload salah.
- Upload gagal.
- File terlalu besar.
- Format tidak diizinkan.
- Public ID tidak ditemukan.
- Transformasi gagal.
- Aset privat tidak memiliki izin akses.
- Database gagal menyimpan metadata.
- Kuota mendekati atau melampaui batas.
- URL media tidak valid.
- Koneksi jaringan terputus.

Ketentuan:

- Jangan menampilkan API secret kepada pengguna.
- Jangan mengklaim upload berhasil jika Cloudinary belum mengonfirmasi.
- Jangan menyimpan metadata seolah-olah file berhasil diunggah ketika operasi gagal.
- Tangani operasi upload dan penyimpanan metadata secara konsisten.
- Hindari retry upload tanpa idempotency atau mekanisme deduplikasi yang sesuai.
- Berikan pesan error yang dapat dipahami pengguna.

## 16\. Batas fitur dan larangan implementasi

Jangan menjadikan fitur berikut sebagai persyaratan wajib pada paket Free:

- Custom delivery domain yang memerlukan paket lebih tinggi.
- Fitur multi-user administration lanjutan yang hanya tersedia pada paket berbayar.
- Fitur allowlist/blocklist asset access yang memerlukan paket tertentu.
- Backup ke bucket S3 milik sendiri jika fitur tersebut memerlukan paket berbayar.
- Paid add-ons tanpa persetujuan.
- Kuota storage, bandwidth, atau transformasi tanpa batas.
- Asumsi bahwa penggunaan berlebih otomatis ditagihkan dan layanan tetap berjalan.

Perhatikan bahwa Cloudinary memiliki produk Image & Video API serta produk Assets/DAM. Jangan mencampur batas kedua produk tersebut.

Jika fitur tidak tersedia pada Free, cari solusi alternatif yang aman dan jelaskan biaya serta trade-off-nya.

## 17\. Checklist penerimaan implementasi

### Konfigurasi

- [ ]Cloud name benar.
- [ ]API secret hanya berada di server.
- [ ]Upload preset sesuai kebutuhan.
- [ ]Kredensial tidak masuk repository.
- [ ]SDK sesuai versi dokumentasi.

### Upload

- [ ]Validasi tipe dan ukuran file diterapkan.
- [ ]Signed atau unsigned upload dipilih dengan alasan yang tepat.
- [ ]Aset berhasil diunggah.
- [ ]Metadata aset disimpan dengan benar.
- [ ]Error upload ditangani.
- [ ]Upload duplikat dikendalikan.

### Optimasi

- [ ]Transformasi sesuai kebutuhan UI.
- [ ]Format dan kualitas dioptimalkan.
- [ ]Ukuran gambar sesuai viewport.
- [ ]Cache digunakan secara tepat.
- [ ]Bandwidth dan credits dipertimbangkan.
- [ ]Video tidak diproses berlebihan.

### Keamanan dan integrasi

- [ ]Kepemilikan aset diverifikasi.
- [ ]Metadata database memiliki policy yang benar.
- [ ]URL publik tidak digunakan untuk konten yang wajib privat tanpa perlindungan.
- [ ]API secret tidak terekspos.
- [ ]Penghapusan aset aman.
- [ ]Kegagalan database dan Cloudinary ditangani.

### Operasional

- [ ]Penggunaan credits dapat dipantau.
- [ ]Risiko kuota habis didokumentasikan.
- [ ]Tidak ada ketergantungan pada fitur berbayar tanpa persetujuan.
- [ ]Lint, type-check, build, dan tes dijalankan jika tersedia.
- [ ]Kegagalan tes dilaporkan secara jujur.

## 18\. Format laporan akhir AI Agent

Setelah implementasi, laporkan:

1. Ringkasan perubahan.
2. File yang dibuat atau diubah.
3. Alur upload yang diimplementasikan.
4. Environment variables yang diperlukan.
5. Jenis transformasi dan optimasi yang digunakan.
6. Integrasi database dan metadata.
7. Penggunaan Cloudinary Free yang relevan.
8. Risiko penggunaan credits.
9. Hasil lint, type-check, build, dan tes.
10. Masalah yang belum terselesaikan.
11. Fitur berbayar yang sengaja tidak digunakan.
12. Rekomendasi jika kebutuhan media bertambah.

## 19\. Aturan keputusan terakhir

Jika kebutuhan aplikasi bertentangan dengan batas Cloudinary Free:

1. Pertahankan fungsi utama aplikasi.
2. Utamakan keamanan media.
3. Optimalkan ukuran file dan transformasi.
4. Kurangi derivative yang tidak diperlukan.
5. Jangan menambahkan layanan berbayar tanpa persetujuan.
6. Jelaskan trade-off dan estimasi penggunaan.
7. Minta persetujuan sebelum upgrade.

**Instruksi penutup:** Bangun integrasi Cloudinary yang kompatibel dengan Free Tier. Gunakan 25 credits sebagai anggaran gabungan untuk transformasi, storage, dan bandwidth. Jangan mengekspos API secret, jangan menganggap bandwidth gratis tanpa batas, dan jangan mengklaim fitur berbayar tersedia pada paket Free.

## Referensi resmi untuk AI Agent

- [Cloudinary Pricing](<https://cloudinary.com/pricing?utm_source=chatgpt.com>) — fitur dan kuota paket Free.
  Pricing and Plans
- [Billing and Plans](<https://cloudinary.com/documentation/billing_and_plans?utm_source=chatgpt.com>) — credit, storage, bandwidth, dan periode penghitungan.
  Documentation
- [How Do Credits Work?](<https://cloudinary.com/documentation/developer_onboarding_faq_credits?utm_source=chatgpt.com>) — mekanisme penggunaan credits.
  Documentation
- [What Can I Do With the Free Plan?](<https://cloudinary.com/documentation/developer_onboarding_faq_free_plan?utm_source=chatgpt.com>) — fasilitas paket Free.
  Documentation
- [Upload Parameters](<https://cloudinary.com/documentation/upload_parameters?utm_source=chatgpt.com>) — parameter upload dan transformasi.
  Documentation
- [Usage Data](<https://cloudinary.com/documentation/programmable_media_asset_usage_data?utm_source=chatgpt.com>) — monitoring penggunaan dan error.
  Documentation