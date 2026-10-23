# SANITY FREE TIER — SPESIFIKASI TEKNIS UNTUK AI AGENT

**Versi dokumen:** 1.0\
**Tanggal acuan:** 23 Oktober 2026\
**Paket:** Sanity Free ($0/bulan)\
**Sumber resmi:** https://www.sanity.io/pricing#compare-plans\
**Dokumentasi kuota:** [https://www.sanity.io/docs/help/understanding-quotas](<https://www.sanity.io/docs/help/understanding-quotas>)

## 1\. Tujuan dan instruksi utama

AI Agent harus membangun, mengonfigurasi, atau mengembangkan aplikasi yang menggunakan Sanity sebagai headless CMS dengan mematuhi batas paket Free.

Prioritas implementasi:

1. Gunakan fitur yang termasuk dalam paket Free.
2. Hindari dependensi terhadap fitur Growth atau Enterprise.
3. Jangan mengasumsikan kuota atau fitur yang tidak tercantum dalam spesifikasi ini.
4. Jangan mengekspos token rahasia ke browser atau repository publik.
5. Bangun sistem yang tetap berfungsi ketika kuota API, bandwidth, atau penyimpanan mendekati batas.
6. Gunakan dokumentasi resmi terbaru jika ada perubahan fitur, SDK, API, atau kuota.
7. Jangan mengklaim bahwa deployment, konfigurasi, atau pengujian berhasil sebelum benar-benar memverifikasinya.

Jika pengguna meminta fitur yang tidak tersedia pada paket Free, jelaskan keterbatasannya dan usulkan alternatif yang kompatibel sebelum mengimplementasikan perubahan.

## 2\. Spesifikasi paket

| Parameter | Batas atau fasilitas |
| --- | --- |
| Biaya paket | $0/bulan |
| User seats | Hingga 20 |
| Role yang tersedia | Administrator dan Viewer |
| Dataset | 2, keduanya public |
| Dokumen | 10.000 |
| Unique attributes | 2.000 per dataset |
| GROQ-powered webhooks | 2 |
| API CDN requests | 1.000.000 per bulan |
| API requests | 250.000 per bulan |
| Asset storage | 100 GB |
| Bandwidth | 100 GB per bulan |
| Live connections | 1.000 per dataset |
| Live retention | 15 menit |
| Content types | Tidak terbatas, selama batas atribut dipatuhi |
| Locales | Tidak terbatas, selama batas atribut dipatuhi |
| Hosting Sanity Studio | Termasuk |
| Live Preview | Termasuk |
| Visual Editing | Termasuk |
| Real-time editing | Termasuk |
| GROQ dan GraphQL | Termasuk |
| Portable Text | Termasuk |
| Mutations dan patching | Termasuk |
| Content Source Maps | Termasuk |
| Content Agent | Termasuk |
| Agent Context dan Agent Actions | Termasuk |
| Semantic search | Termasuk |
| Embeddings generation | Termasuk |
| Embeddings queries | 500 per bulan |
| AI credits | 1.000 per bulan |
| Compute invocations | 500.000 per bulan |
| Compute allowance | 20.000 GB-seconds per bulan |
| Scheduled Functions | 5 |
| Frekuensi scheduled functions | Harian |
| Support | Community support |

Semua kuota wajib dianggap sebagai batas keras. Paket Free tidak menyediakan overage berbayar untuk melanjutkan pemakaian di atas kuota.

## 3\. Batas fitur dan larangan implementasi

AI Agent DILARANG mengandalkan fitur berikut sebagai bagian dari implementasi Free:

- Private datasets.
- Custom roles.
- Role Editor, Developer, atau Contributor.
- Comments dan Task Management bawaan Sanity.
- Scheduled drafts bawaan Sanity.
- Custom permission roles.
- Advanced dataset management dan cloud cloning.
- Cross-dataset references yang memerlukan fitur berbayar.
- Fitur Content Releases berbayar.
- Tambahan kuota berbayar atau asumsi bahwa pemakaian berlebih akan otomatis ditagihkan.

Jangan membuat solusi yang diam-diam bergantung pada salah satu fitur tersebut.

Jika fitur yang dibutuhkan tidak tersedia, usulkan alternatif eksternal atau implementasi mandiri. Nyatakan dengan jelas biaya, keamanan, dan dependensi tambahan yang mungkin muncul.

## 4\. Dataset dan keamanan

### 4.1 Dataset

Gunakan maksimal dua dataset public dalam satu proyek:

- `production`: konten aktif untuk website produksi.
- `development`: pengembangan dan pengujian.

Nama tersebut merupakan konvensi yang direkomendasikan, bukan nama wajib dari Sanity.

Ketentuan:

- Jangan menganggap dataset development bersifat privat.
- Jangan menyimpan password, API secret, token, data pelanggan sensitif, atau informasi rahasia dalam dataset.
- Jangan memasukkan data pribadi yang tidak diperlukan ke CMS.
- Jangan menganggap URL dataset yang sulit ditebak sebagai mekanisme keamanan.
- Gunakan data sintetis atau data yang aman untuk pengujian.

### 4.2 Token dan environment variables

Token dengan hak baca/tulis tidak boleh dimasukkan ke bundle frontend.

Contoh variabel lingkungan:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-10-23
SANITY_API_READ_TOKEN=
SANITY_API_WRITE_TOKEN=
```

Ketentuan implementasi:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`: ID proyek, bukan secret.
- `NEXT_PUBLIC_SANITY_DATASET`: nama dataset.
- `NEXT_PUBLIC_SANITY_API_VERSION`: gunakan versi API yang valid dan didukung SDK; ubah tanggal contoh jika perlu.
- `SANITY_API_READ_TOKEN`: hanya digunakan server-side jika dibutuhkan.
- `SANITY_API_WRITE_TOKEN`: hanya digunakan server-side untuk operasi tulis yang diotorisasi.

Jangan mengisi token dengan nilai palsu lalu mengklaim autentikasi telah berhasil.

Tambahkan file `.env.local` ke `.gitignore`. Jika token pernah masuk ke Git atau bundle browser, segera cabut dan rotasi token tersebut.

### 4.3 Akses Viewer dan Administrator

Paket Free hanya menyediakan role Administrator dan Viewer.

- Administrator digunakan untuk pengelolaan proyek dan konfigurasi.
- Viewer digunakan untuk akses baca sesuai izin yang diberikan.
- Jangan menjanjikan workflow editorial dengan role Editor khusus.
- Jika dibutuhkan pembatasan tulis pada aplikasi publik, terapkan autentikasi dan otorisasi pada backend aplikasi sendiri.

Jangan menganggap UI yang menyembunyikan tombol sudah cukup untuk melindungi operasi tulis.

## 5\. Arsitektur aplikasi yang direkomendasikan

Gunakan arsitektur headless CMS:

1. **Sanity Content Lake:** penyimpanan konten.
2. **Sanity Studio:** antarmuka pengelolaan konten.
3. **Frontend:** Next.js, React, atau framework yang diminta pengguna.
4. **Sanity client:** untuk query, mutasi, dan integrasi.
5. **CDN:** untuk pembacaan konten publik yang cocok dengan caching.
6. **Image URL Builder:** untuk transformasi gambar yang diperlukan.
7. **Environment configuration:** untuk project ID, dataset, dan token server-side.
8. **Monitoring:** untuk penggunaan kuota dan error API.

Jangan menambahkan database kedua, layanan autentikasi, atau layanan penyimpanan eksternal tanpa kebutuhan yang jelas.

### Aturan query

- Utamakan GROQ untuk query konten yang sederhana dan efisien.
- Pilih hanya field yang diperlukan.
- Gunakan pagination untuk daftar panjang.
- Terapkan filtering dan sorting di query bila sesuai.
- Hindari query yang memuat seluruh dokumen atau seluruh aset tanpa kebutuhan.
- Gunakan CDN untuk pembacaan konten publik yang dapat di-cache.
- Gunakan pembacaan non-CDN hanya ketika kebutuhan konsistensi atau data memang memerlukannya.
- Jangan menjalankan polling dengan interval sangat pendek.
- Gunakan cache, revalidation, atau mekanisme real-time yang tepat.
- Jangan mengasumsikan semua permintaan dihitung sama; verifikasi kategori penggunaan berdasarkan dokumentasi Sanity.

## 6\. Schema dan pengelolaan konten

AI Agent boleh membuat content type sebanyak yang diperlukan, tetapi wajib mengendalikan jumlah unique attributes per dataset.

Aturan schema:

- Setiap schema memiliki nama yang jelas.
- Setiap field memiliki tipe data dan tujuan yang jelas.
- Field wajib diberi validasi.
- Slug harus unik sesuai kebutuhan aplikasi.
- Field gambar sebaiknya memakai tipe image Sanity dan `alt` text.
- Referensi antardokumen menggunakan referensi Sanity yang sesuai.
- Konten panjang dapat menggunakan Portable Text.
- Konten multibahasa dapat memakai pola locale yang sesuai.
- Jangan membuat schema duplikat untuk variasi konten yang dapat ditangani dengan field atau referensi.
- Jangan menambahkan field yang tidak digunakan.
- Verifikasi batas unique attributes ketika menambah schema baru.

Contoh content type:

- `siteSettings`
- `page`
- `post`
- `author`
- `category`
- `navigationItem`

Daftar tersebut hanya contoh. Buat schema berdasarkan kebutuhan proyek, bukan secara otomatis membuat semuanya.

### Contoh schema artikel

```
import { defineType, defineField } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: rule => rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
})
```

Contoh tersebut merupakan titik awal. Sesuaikan dengan versi `sanity` yang digunakan dan kebutuhan proyek.

## 7\. API dan batas konsumsi

### 7.1 Kuota bulanan

| Resource | Kuota |
| --- | --- |
| API CDN requests | 1.000.000/bulan |
| API requests | 250.000/bulan |
| Bandwidth | 100 GB/bulan |
| Embeddings queries | 500/bulan |
| AI credits | 1.000/bulan |
| Compute invocations | 500.000/bulan |
| Compute allowance | 20.000 GB-seconds/bulan |

Kuota pemakaian bulanan seperti API dan bandwidth direset pada pukul 00.00 UTC di hari pertama bulan kalender. Kuota dokumen dan aset mencerminkan pemakaian saat ini, bukan kuota yang otomatis pulih setiap bulan.

### 7.2 Pengendalian kuota

Implementasikan prinsip berikut:

- Tetapkan target operasional maksimal 80% dari kuota yang relevan.
- Catat error dan status respons API.
- Pantau penggunaan melalui dashboard Sanity.
- Hindari pengambilan data berulang yang tidak diperlukan.
- Gunakan pagination dan cache.
- Hindari mengirim gambar berukuran besar jika versi teroptimasi sudah memadai.
- Hindari pembuatan dokumen duplikat.
- Sediakan pesan error yang dapat dipahami ketika kuota tercapai.
- Jangan melakukan retry tanpa batas ketika respons menunjukkan kuota telah habis.
- Gunakan exponential backoff untuk error sementara yang memang layak dicoba ulang.
- Jangan mengandalkan email peringatan sebagai satu-satunya sistem monitoring.

### 7.3 Perilaku ketika kuota habis

Paket Free tidak menyediakan overage.

Ketika batas API atau bandwidth tercapai, fungsi terkait dapat diblokir sampai kuota direset atau paket di-upgrade. Sanity memberikan peringatan penggunaan pada 80% dan 100%.

Ketika batas aset tercapai, unggahan aset baru dapat gagal, sedangkan aset yang sudah ada tetap disajikan.

Ketika batas dokumen tercapai, pembuatan konten baru dapat terhambat. Jangan menghapus konten secara otomatis tanpa persetujuan pengguna.

## 8\. Gambar dan aset

Ketentuan:

- Gunakan Sanity Image Pipeline dan URL Builder bila sesuai.
- Pilih dimensi gambar sesuai kebutuhan komponen.
- Gunakan format gambar modern yang didukung.
- Jangan mengunduh dan mengunggah ulang aset tanpa alasan.
- Jangan menghasilkan transformasi gambar berulang dengan parameter yang berbeda jika tidak diperlukan.
- Gunakan lazy loading untuk gambar yang tidak berada di area awal halaman.
- Simpan metadata gambar yang benar-benar dibutuhkan.
- Pantau total ukuran aset terhadap batas 100 GB.
- Optimalkan bandwidth dengan ukuran gambar yang sesuai viewport.
- Pertahankan alt text untuk aksesibilitas.

Jika aset mendekati batas penyimpanan, laporkan kondisi tersebut dan berikan rekomendasi pembersihan yang dapat ditinjau pengguna.

## 9\. Studio, preview, dan editorial

Fitur berikut termasuk dalam paket Free:

- Hosting Sanity Studio.
- Live Preview.
- Visual Editing.
- Presentation tool dan page-building.
- Real-time editing.
- Multiplayer presence.
- Content Source Maps.

AI Agent dapat memanfaatkan fitur tersebut jika relevan dengan aplikasi.

Batasan:

- Jangan mengandalkan Comments atau Task Management bawaan.
- Jangan mengandalkan Scheduled Drafts bawaan.
- Jangan menjanjikan riwayat perubahan atau retensi yang tidak termasuk dalam paket.
- Jangan menganggap Preview otomatis aman hanya karena halaman tidak ditautkan ke navigasi.
- Jika menggunakan draft content, pastikan akses draft dibatasi dengan benar pada server dan mekanisme autentikasi yang sesuai.

## 10\. Compute dan AI

Paket Free mencakup fasilitas berikut:

- Content Agent dan Agent Context.
- Agent Actions.
- Semantic search.
- Embeddings generation.
- 1.000 AI credits per bulan.
- 500 embeddings queries per bulan.
- 500.000 function invocations per bulan.
- 20.000 GB-seconds compute per bulan.
- 5 scheduled functions dengan frekuensi harian.

Aturan implementasi:

- Jangan menggunakan AI untuk pekerjaan yang dapat diselesaikan dengan query sederhana tanpa manfaat yang jelas.
- Batasi jumlah operasi per dokumen.
- Gunakan batching bila didukung dan sesuai.
- Pantau penggunaan AI credits dan embeddings queries.
- Jangan membuat scheduled function yang berjalan lebih sering daripada batas paket.
- Jangan mengasumsikan AI credits tidak terbatas hanya karena fitur AI tersedia.
- Jangan menganggap Content Agent identik dengan AI Agent eksternal yang sedang mengembangkan aplikasi.

## 11\. Konfigurasi dan dependensi

Sebelum implementasi, AI Agent wajib:

1. Memeriksa struktur repository yang sudah ada.
2. Mengidentifikasi framework dan package manager.
3. Memeriksa versi `sanity`, `@sanity/client`, dan paket terkait.
4. Mempertahankan konvensi proyek yang sudah berjalan.
5. Menghindari upgrade major tanpa alasan.
6. Memeriksa dokumentasi resmi yang sesuai dengan versi SDK.
7. Menambahkan hanya dependensi yang benar-benar diperlukan.
8. Memastikan file environment tidak masuk ke Git.
9. Menjalankan lint, type-check, dan build jika tersedia.
10. Melaporkan pemeriksaan yang gagal atau tidak dapat dilakukan.

Jangan membuat ulang proyek dari nol jika repository sudah berisi implementasi yang dapat dikembangkan.

## 12\. Strategi caching dan performa

AI Agent harus memilih strategi caching sesuai karakteristik konten:

- Konten publik yang jarang berubah: gunakan CDN dan cache.
- Halaman statis: gunakan static generation atau incremental revalidation bila framework mendukung.
- Konten yang sering berubah: gunakan revalidation atau mekanisme real-time sesuai kebutuhan.
- Data sensitif atau draft: gunakan jalur server-side yang memiliki kontrol akses.
- Query mahal atau berulang: sederhanakan query dan gunakan cache yang sesuai.

Jangan mengasumsikan bahwa cache frontend menghilangkan seluruh penggunaan Sanity API. Verifikasi perilaku aktual berdasarkan framework dan konfigurasi yang digunakan.

## 13\. Error handling dan observabilitas

Tangani setidaknya:

- Konfigurasi project ID atau dataset tidak valid.
- Token tidak tersedia atau tidak memiliki izin.
- Dokumen tidak ditemukan.
- Respons API gagal.
- Koneksi jaringan gagal.
- Kuota API atau bandwidth habis.
- Aset tidak ditemukan.
- Validasi schema gagal.
- Draft tidak dapat diakses.
- Data belum tersedia saat halaman dirender.

Ketentuan:

- Jangan menampilkan stack trace atau secret kepada pengunjung.
- Gunakan log server tanpa memasukkan token atau data sensitif.
- Bedakan error sementara dan error permanen.
- Tampilkan fallback yang sesuai jika konten opsional tidak tersedia.
- Jangan menyamarkan kegagalan pengambilan data sebagai konten valid.
- Sediakan cara untuk mendiagnosis error konfigurasi dengan aman.

## 14\. Checklist penerimaan implementasi

AI Agent harus memverifikasi setiap item yang relevan sebelum menyatakan pekerjaan selesai.

### Konfigurasi

- [ ]Project ID dan dataset benar.
- [ ]API version valid.
- [ ]Token rahasia hanya berada di server.
- [ ]`.env.local` diabaikan oleh Git.
- [ ]Paket dan versi SDK sesuai dokumentasi.

### CMS

- [ ]Schema dapat dimuat oleh Sanity Studio.
- [ ]Field wajib memiliki validasi.
- [ ]Query hanya meminta field yang diperlukan.
- [ ]Jumlah dokumen dan atribut diperhitungkan.
- [ ]Dataset public tidak digunakan untuk rahasia.
- [ ]Preview dan draft tidak membocorkan konten.

### Frontend

- [ ]Halaman memuat data CMS dengan benar.
- [ ]Gambar dioptimalkan.
- [ ]Loading, empty state, dan error state tersedia.
- [ ]Cache dan revalidation sesuai kebutuhan.
- [ ]Tidak ada token tulis dalam bundle browser.
- [ ]Responsif dan aksesibel.

### Kuota dan operasional

- [ ]Tidak ada polling berlebihan.
- [ ]Tidak ada retry tanpa batas.
- [ ]Penggunaan API dan aset dapat dipantau.
- [ ]Penanganan kuota habis tersedia.
- [ ]Tidak ada asumsi tentang overage gratis.
- [ ]Tidak ada ketergantungan wajib pada fitur berbayar.

### Validasi akhir

- [ ]Lint berhasil, jika tersedia.
- [ ]Type-check berhasil, jika tersedia.
- [ ]Build berhasil, jika tersedia.
- [ ]Tes relevan dijalankan.
- [ ]Kegagalan atau tes yang tidak dijalankan dilaporkan dengan jujur.

## 15\. Format laporan akhir AI Agent

Setelah implementasi, laporkan:

1. Ringkasan perubahan.
2. File yang dibuat atau diubah.
3. Schema dan query yang ditambahkan.
4. Environment variables yang perlu diatur.
5. Fitur Free yang digunakan.
6. Batas paket yang relevan.
7. Hasil lint, type-check, build, dan tes.
8. Masalah yang belum terselesaikan.
9. Risiko kuota dan keamanan yang perlu diperhatikan.
10. Fitur berbayar yang sengaja tidak digunakan.

## 16\. Aturan keputusan terakhir

Jika ada konflik antara kebutuhan aplikasi dan batas Sanity Free:

1. Utamakan keamanan.
2. Pertahankan fungsi utama aplikasi.
3. Cari implementasi yang kompatibel dengan Free.
4. Hindari layanan tambahan tanpa persetujuan.
5. Jelaskan trade-off yang tidak dapat dihindari.
6. Minta persetujuan sebelum memilih solusi yang menambah biaya atau mengubah kebutuhan produk.

**Instruksi penutup:** Bangun aplikasi yang benar-benar kompatibel dengan Sanity Free, bukan sekadar aplikasi yang berhasil berjalan selama masa trial. Seluruh keputusan teknis harus mempertimbangkan kuota, keamanan dataset public, dan ketersediaan fitur setelah trial berakhir.

## Referensi resmi untuk AI Agent

- [Sanity Pricing & Compare Plans](<https://www.sanity.io/pricing?utm_source=chatgpt.com#compare-plans>) — harga, fitur, dan batas kuota.
  Sanity
- [Understanding Quotas](<https://www.sanity.io/docs/help/understanding-quotas?utm_source=chatgpt.com>) — perilaku kuota, reset, dan pembatasan saat kuota habis.
  Sanity Docs
- [Plans and Payments](<https://www.sanity.io/docs/platform-management/plans-and-payments?utm_source=chatgpt.com>) — pengelolaan paket dan penagihan.
  Sanity Docs
- [Sanity Documentation](<https://www.sanity.io/docs?utm_source=chatgpt.com>) — panduan SDK, schema, query, Studio, dan integrasi.