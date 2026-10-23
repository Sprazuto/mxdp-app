# LEAFLET + OPENSTREETMAP — SPESIFIKASI TEKNIS UNTUK AI AGENT

**Versi dokumen:** 1.0\
**Tanggal acuan:** 23 Oktober 2026\
**Library peta:** Leaflet\
**Sumber data peta:** OpenStreetMap (OSM)\
**Tile provider awal:** OpenStreetMap Standard Raster Tiles\
**Biaya library:** Gratis dan open-source\
**Biaya data peta:** Terbuka, tunduk pada lisensi OSM\
**Biaya tile hosting:** Bergantung pada penyedia dan ketentuan penggunaan\
**Dokumentasi Leaflet:** https://leafletjs.com/reference.html\
**Kebijakan tile OSM:** [https://operations.osmfoundation.org/policies/tiles/](<https://operations.osmfoundation.org/policies/tiles/>)

## 1\. Tujuan dan instruksi utama

AI Agent harus membangun integrasi peta menggunakan Leaflet dan data OpenStreetMap untuk menampilkan peta interaktif pada aplikasi web.

Prioritas implementasi:

1. Gunakan Leaflet sebagai library peta.
2. Gunakan OpenStreetMap sebagai sumber peta dasar jika sesuai dengan kebutuhan.
3. Patuhi kebijakan tile provider yang digunakan.
4. Selalu tampilkan atribusi dan informasi lisensi yang diwajibkan.
5. Jangan menganggap tile server publik OSM sebagai layanan tanpa batas atau memiliki SLA.
6. Jangan melakukan scraping atau bulk download tile.
7. Jangan mengekspos kredensial layanan pihak ketiga.
8. Pisahkan fungsi peta, geocoding, pencarian lokasi, dan routing.
9. Buat konfigurasi tile provider agar dapat diganti tanpa mengubah seluruh aplikasi.
10. Jangan mengklaim fitur berjalan sebelum diuji pada aplikasi sebenarnya.

Jika kebutuhan aplikasi membutuhkan offline maps, routing, geocoding berkapasitas tinggi, atau availability terjamin, AI Agent harus mengevaluasi layanan tambahan sebelum implementasi.

## 2\. Komponen dan tanggung jawab

| Komponen | Tanggung jawab | Biaya |
| --- | --- | --- |
| Leaflet | Menampilkan peta interaktif | Gratis |
| OpenStreetMap data | Data geografis dan fitur peta | Terbuka, tunduk pada lisensi |
| OSM Standard Tiles | Gambar raster peta | Tanpa biaya langsung, dengan kebijakan penggunaan |
| Marker | Menandai koordinat | Fitur Leaflet |
| Popup | Menampilkan detail lokasi | Fitur Leaflet |
| Polyline | Menampilkan garis atau rute | Fitur Leaflet |
| Polygon | Menampilkan area | Fitur Leaflet |
| Geocoding | Mengubah alamat menjadi koordinat | Layanan terpisah |
| Reverse geocoding | Mengubah koordinat menjadi alamat | Layanan terpisah |
| Routing | Menghitung rute perjalanan | Layanan terpisah |
| Search/autocomplete | Mencari lokasi | Memerlukan sumber data atau API tambahan |
| Geolocation | Mengambil lokasi perangkat | Browser API dengan izin pengguna |
| Tile hosting | Mengirim gambar peta | Bergantung pada provider |

**Prinsip utama:** Leaflet hanya bertanggung jawab untuk menampilkan peta. Jangan mengasumsikan instalasi Leaflet otomatis menyediakan pencarian alamat, petunjuk jalan, navigasi, atau GPS.

## 3\. Batas penggunaan dan biaya

Tidak ada satu kuota bulanan universal untuk kombinasi Leaflet + OpenStreetMap.

Batas aktual ditentukan oleh layanan yang digunakan.

### 3.1 Leaflet

- Open-source dengan lisensi BSD-2-Clause.
- Tidak memerlukan API key untuk fungsi inti.
- Tidak memiliki kuota request bulanan bawaan.
- Tidak menyediakan tile hosting sendiri.
- Tidak menyediakan geocoding atau routing secara otomatis.
- Tidak mengenakan biaya per marker, popup, atau polyline dari library itu sendiri.

### 3.2 OpenStreetMap Standard Tiles

URL tile resmi:

```
https://tile.openstreetmap.org/{z}/{x}/{y}.png
```

Ketentuan:

- Tidak memiliki kuota komersial tetap yang dapat dipakai tanpa batas.
- Tidak memiliki SLA atau jaminan availability.
- Akses dapat diblokir jika pola penggunaan melanggar kebijakan atau membebani layanan.
- Penggunaan normal peta interaktif diperbolehkan dengan mematuhi kebijakan.
- Tidak boleh digunakan untuk bulk downloading atau offline map prefetching.
- Harus menghormati caching dan attribution requirements.

Jangan membuat asumsi bahwa tidak adanya API key berarti tidak ada batas penggunaan.

### 3.3 Perencanaan untuk produksi

Jika aplikasi digunakan untuk kebutuhan produksi:

- Evaluasi volume kunjungan dan jumlah tile yang diminta.
- Periksa kebijakan provider terbaru.
- Gunakan provider tile yang sesuai dengan kebutuhan komersial dan volume aplikasi.
- Evaluasi SLA jika availability menjadi persyaratan.
- Jangan menggunakan public tile server OSM sebagai infrastruktur tanpa batas.
- Jangan membuat proxy untuk menghindari batas provider.

Jika penggunaan meningkat, pilih penyedia tile yang memiliki ketentuan eksplisit untuk trafik aplikasi atau host tile sendiri dengan infrastruktur yang memadai.

## 4\. Instalasi dan konfigurasi

Sebelum menambahkan dependency, AI Agent harus memeriksa framework, package manager, dan struktur proyek.

Contoh untuk React atau Next.js:

```
npm install leaflet react-leaflet
npm install -D @types/leaflet
```

Sesuaikan paket dan versi dengan framework serta dokumentasi yang berlaku.

Ketentuan:

- Jangan melakukan upgrade major yang tidak diperlukan.
- Pastikan versi `leaflet`, `react-leaflet`, dan React kompatibel.
- Impor CSS Leaflet.
- Pastikan container peta memiliki tinggi yang jelas.
- Tangani lifecycle map instance dengan benar.
- Hindari inisialisasi map berulang yang menyebabkan duplicate map atau memory leak.

Untuk Next.js, komponen Leaflet yang bergantung pada browser harus diinisialisasi pada client. Jika dibutuhkan, gunakan dynamic import dengan server-side rendering dinonaktifkan untuk komponen peta.

## 5\. Environment variables dan tile provider

Untuk OSM Standard Tiles, konfigurasi dapat berupa:

```
NEXT_PUBLIC_MAP_TILE_URL=https://tile.openstreetmap.org/{z}/{x}/{y}.png
NEXT_PUBLIC_MAP_ATTRIBUTION=OpenStreetMap contributors
NEXT_PUBLIC_MAP_DEFAULT_LAT=-6.9175
NEXT_PUBLIC_MAP_DEFAULT_LNG=107.6191
NEXT_PUBLIC_MAP_DEFAULT_ZOOM=13
```

Koordinat di atas adalah contoh titik awal di Bandung, bukan lokasi pengguna yang terdeteksi.

Ketentuan:

- Tile URL boleh tersedia di frontend.
- Jangan menyimpan API secret pada variabel publik.
- Jika berpindah ke tile provider yang membutuhkan token, gunakan konfigurasi publik hanya untuk token yang memang diizinkan digunakan di browser.
- Jangan mengarang API key.
- Jangan mengubah tile URL ke provider lain tanpa memeriksa ketentuan layanan.
- Jangan membuat attribution generik yang menghilangkan atribusi wajib provider.
- Simpan konfigurasi provider di satu modul agar mudah diganti.

## 6\. Implementasi peta dasar

Contoh menggunakan React Leaflet:

```
'use client'

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

const center: [number, number] = [-6.9175, 107.6191]

export default function LocationMap() {
  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom
      style={{ height: 420, width: '100%' }}
    >
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
      />

      <Marker position={center}>
        <Popup>Lokasi contoh</Popup>
      </Marker>
    </MapContainer>
  )
}
```

Kode tersebut merupakan contoh awal. Untuk proyek nyata, AI Agent harus menyesuaikan ukuran peta, koordinat, marker, konfigurasi tile, dan error handling dengan kebutuhan aplikasi.

Jika menggunakan Next.js, pastikan komponen hanya dirender pada client.

## 7\. Atribusi dan lisensi

Atribusi OSM harus terlihat jelas di dalam atau dekat peta.

Gunakan atribusi standar:

`© OpenStreetMap contributors`

Atribusi harus menautkan ke halaman copyright OSM:

https://www.openstreetmap.org/copyright

Ketentuan:

- Jangan menyembunyikan atribusi di balik menu.
- Jangan menutup atribusi dengan komponen lain.
- Jangan menghapus kontrol attribution Leaflet.
- Jika menggunakan beberapa layer, tampilkan atribusi setiap provider sesuai ketentuannya.
- Jika mengekspor screenshot atau peta statis, periksa kewajiban atribusi untuk output tersebut.
- Patuhi Open Database License (ODbL) untuk penggunaan data OSM.

Lisensi Leaflet dan lisensi data OpenStreetMap merupakan dua hal berbeda. Mematuhi lisensi library tidak otomatis memenuhi kewajiban lisensi data atau tile provider.

## 8\. Kebijakan teknis OSM Standard Tiles

AI Agent wajib mematuhi aturan berikut.

### 8.1 URL tile

Gunakan URL HTTPS resmi:

```
https://tile.openstreetmap.org/{z}/{x}/{y}.png
```

Jangan menggunakan HTTP atau mengganti host dengan subdomain yang tidak didokumentasikan.

### 8.2 Caching

- Hormati header `Cache-Control`, `Expires`, dan `ETag`.
- Gunakan caching browser sesuai perilaku default yang patuh kebijakan.
- Jika aplikasi memiliki mekanisme caching sendiri, jangan mem-bypass cache provider.
- Jangan menambahkan `Cache-Control: no-cache` atau `Pragma: no-cache` pada request tile secara default.
- Jangan menonaktifkan caching untuk memaksa pengambilan tile baru setiap kali.
- Jika cache khusus tidak dapat membaca kebijakan server, ikuti ketentuan minimum caching tujuh hari yang dinyatakan dalam kebijakan OSM.

### 8.3 Request dan identifikasi

- Pertahankan header `Referer` yang sesuai pada aplikasi web.
- Jangan menetapkan `Referrer-Policy` yang menghilangkan referer untuk request tile OSM.
- Jangan melakukan impersonasi User-Agent.
- Jangan mengirim request menggunakan client yang menyamarkan identitas aplikasi.
- Jangan membuat proxy anonim untuk menyembunyikan pola request.

Browser biasanya mengelola User-Agent secara otomatis. Untuk aplikasi native atau client HTTP khusus, ikuti persyaratan identifikasi provider.

### 8.4 Larangan bulk download

Jangan membuat fitur:

- Download seluruh peta kota untuk penggunaan offline.
- Prefetch semua tile pada banyak tingkat zoom.
- Scraping tile untuk disimpan sebagai arsip.
- Job otomatis yang membuka peta berulang untuk mengambil tile.
- Bot yang menggerakkan viewport untuk memaksa download tile.
- Cache proxy yang digunakan untuk menghindari kebijakan provider.

Jika offline map diperlukan, gunakan penyedia yang secara eksplisit mengizinkan penggunaan offline atau jalankan infrastruktur tile sendiri.

## 9\. Marker, popup, dan layer

AI Agent dapat mengimplementasikan:

- Marker lokasi.
- Popup detail.
- Tooltip.
- Cluster marker.
- Polyline.
- Polygon.
- Circle radius.
- GeoJSON layer.
- Layer control.
- Fit bounds untuk beberapa lokasi.
- Custom marker icons.

Ketentuan:

- Gunakan koordinat latitude dan longitude yang valid.
- Jangan membuat marker dari alamat yang belum berhasil di-geocode.
- Gunakan clustering jika jumlah marker besar.
- Hindari merender ribuan marker tanpa strategi performa.
- Sanitasi konten popup jika mengandung HTML atau data dari pengguna.
- Jangan memasukkan informasi sensitif ke popup publik.
- Gunakan warna dan ikon yang memiliki makna konsisten.
- Sediakan fallback jika data koordinat tidak tersedia.

Untuk data geografis, gunakan format GeoJSON jika sesuai dengan sumber data dan operasi yang diperlukan.

## 10\. Geocoding dan pencarian alamat

Leaflet tidak menyediakan geocoding bawaan.

Jika aplikasi membutuhkan pencarian alamat, pilih penyedia geocoding secara terpisah.

Salah satu layanan yang mungkin dipertimbangkan adalah Nominatim:

https://nominatim.org/

Namun, **Nominatim memiliki kebijakan penggunaan tersendiri**. Jangan menganggap kebijakan tile OSM sama dengan kebijakan Nominatim.

Jika menggunakan public Nominatim service:

- Baca kebijakan penggunaan resminya sebelum implementasi.
- Jangan menggunakannya untuk autocomplete yang mengirim request pada setiap karakter tanpa desain yang sesuai kebijakan.
- Hindari pencarian massal dan bulk geocoding.
- Terapkan debounce pada input.
- Gunakan cache untuk query yang layak disimpan.
- Tangani rate limits.
- Jangan mengirim informasi pribadi atau alamat sensitif tanpa kebutuhan dan dasar yang sesuai.
- Jangan mengasumsikan public endpoint cocok untuk aplikasi dengan trafik tinggi.

Jika membutuhkan pencarian alamat dengan trafik tinggi, SLA, atau autocomplete intensif, evaluasi provider berbayar atau infrastruktur geocoding sendiri.

## 11\. Routing dan petunjuk jalan

Leaflet tidak menyediakan routing engine bawaan.

Jika aplikasi membutuhkan rute kendaraan, sepeda, atau pejalan kaki, gunakan layanan routing yang sesuai, misalnya layanan berbasis OSRM atau provider lain dengan ketentuan yang cocok.

Ketentuan:

- Pisahkan layer visualisasi Leaflet dari routing API.
- Jangan mengasumsikan tile OSM menyediakan perhitungan rute.
- Jangan membuat petunjuk jalan hanya dengan menggambar garis lurus antara dua titik.
- Periksa kebijakan penggunaan routing provider.
- Tangani tidak ditemukannya rute.
- Validasi koordinat asal dan tujuan.
- Bedakan rute perkiraan dari hasil routing yang sesungguhnya.
- Jangan mengklaim estimasi waktu tempuh akurat tanpa data dan layanan yang mendukungnya.

Jika routing provider memiliki batas request atau memerlukan API key, dokumentasikan batas tersebut secara eksplisit.

## 12\. Geolocation dan privasi

Jika aplikasi membutuhkan lokasi pengguna:

- Gunakan browser Geolocation API hanya setelah pengguna memberikan izin.
- Jelaskan manfaat akses lokasi jika diperlukan.
- Tangani izin ditolak.
- Tangani perangkat yang tidak mendukung geolocation.
- Tangani timeout atau lokasi yang tidak tersedia.
- Jangan menganggap lokasi IP sama dengan koordinat GPS.
- Jangan menyimpan koordinat pengguna tanpa kebutuhan yang jelas.
- Jangan mengirim koordinat sensitif ke pihak ketiga tanpa tujuan yang sesuai.
- Gunakan HTTPS pada deployment produksi.

Jangan mengaktifkan geolocation otomatis jika fitur tidak membutuhkannya.

Sediakan opsi untuk menggunakan lokasi default atau mencari lokasi secara manual.

## 13\. Integrasi dengan Supabase

Jika proyek menggunakan Supabase, gunakan pembagian tanggung jawab berikut.

### Leaflet + OSM

- Rendering peta.
- Marker dan popup.
- Layer geografis.
- Visualisasi koordinat.
- Interaksi peta.

### Supabase

- Penyimpanan data lokasi.
- Relasi antara pengguna dan lokasi.
- Data bisnis atau tempat.
- Metadata koordinat.
- Geometri dan GeoJSON jika diperlukan.
- Authorization dan RLS.

Contoh tabel lokasi:

```
create table public.locations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  latitude double precision not null,
  longitude double precision not null,
  created_at timestamptz not null default now(),
  constraint valid_latitude
    check (latitude between -90 and 90),
  constraint valid_longitude
    check (longitude between -180 and 180)
);

alter table public.locations enable row level security;

create policy "Locations are publicly readable"
on public.locations
for select
to anon, authenticated
using (true);
```

Policy publik tersebut hanya cocok untuk katalog lokasi yang memang boleh dilihat siapa saja.

Untuk lokasi privat, lokasi pengguna, alamat pelanggan, atau informasi internal, gunakan policy berbasis identitas dan hak akses. Jangan menerapkan akses baca publik sebagai default untuk seluruh tabel.

Jika kebutuhan pencarian radius atau spatial query kompleks meningkat, evaluasi PostGIS dan tipe data geografis yang sesuai.

## 14\. Integrasi dengan Sanity

Jika aplikasi menggunakan Sanity untuk konten, koordinat dapat disimpan sebagai field pada schema konten.

Contoh kebutuhan:

- Alamat kantor pada company profile.
- Lokasi cabang.
- Lokasi acara.
- Titik destinasi dalam artikel.
- Lokasi properti.
- Lokasi restoran atau toko.

Gunakan Leaflet untuk menampilkan koordinat dan marker. Jangan menjadikan tile peta sebagai tempat penyimpanan metadata konten.

Pastikan setiap koordinat yang berasal dari editor diverifikasi sebelum dipakai untuk routing atau navigasi.

## 15\. Performa dan skalabilitas

AI Agent harus:

- Memuat peta hanya ketika diperlukan.
- Menggunakan dynamic import pada aplikasi yang membutuhkan SSR.
- Mengatur ukuran container secara eksplisit.
- Menghindari inisialisasi ulang map yang tidak diperlukan.
- Membersihkan event listener dan subscription.
- Menggunakan clustering untuk banyak marker.
- Memakai GeoJSON atau layer yang efisien.
- Menghindari request geocoding berulang.
- Memakai cache untuk data lokasi jika sesuai.
- Menghindari tile prefetch massal.
- Menguji tampilan di perangkat mobile.
- Menyediakan fallback ketika tile gagal dimuat.

Jangan membuat asumsi bahwa menambahkan lebih banyak marker tidak memengaruhi performa hanya karena Leaflet gratis.

Jika aplikasi membutuhkan visualisasi puluhan ribu objek, evaluasi clustering, vector tiles, WebGL, atau solusi GIS yang sesuai.

## 16\. Error handling

Tangani minimal kondisi berikut:

- Tile gagal dimuat.
- Tile provider tidak tersedia.
- Koordinat tidak valid.
- Lokasi tidak ditemukan.
- Geolocation ditolak.
- Routing API gagal.
- Geocoding API terkena rate limit.
- GeoJSON tidak valid.
- Marker memiliki data yang tidak lengkap.
- Peta belum siap ketika ukuran container berubah.
- Browser tidak mendukung fitur yang diperlukan.

Ketentuan:

- Jangan menganggap tile yang tidak muncul berarti koordinat salah.
- Tampilkan pesan fallback yang sesuai.
- Jangan mengirim request berulang tanpa batas.
- Jangan melakukan retry agresif pada provider publik.
- Jangan menampilkan data palsu sebagai lokasi nyata.
- Jangan menyembunyikan atribusi ketika tile gagal.
- Jangan mengklaim layanan tersedia 100% sepanjang waktu.

## 17\. Checklist penerimaan implementasi

### Konfigurasi

- [ ]Leaflet dan dependency kompatibel.
- [ ]CSS Leaflet dimuat.
- [ ]Container peta memiliki ukuran.
- [ ]Tile provider dikonfigurasi secara terpusat.
- [ ]Attribution ditampilkan dengan benar.

### Fungsi peta

- [ ]Peta dapat digeser dan diperbesar.
- [ ]Marker muncul pada koordinat yang benar.
- [ ]Popup bekerja.
- [ ]Beberapa lokasi dapat ditampilkan.
- [ ]Koordinat divalidasi.
- [ ]Layer dibersihkan dengan benar.

### Kepatuhan provider

- [ ]URL tile benar.
- [ ]Kebijakan caching dipatuhi.
- [ ]Tidak ada bulk tile download.
- [ ]Attribution tidak disembunyikan.
- [ ]Tidak ada asumsi kuota atau SLA yang tidak didukung.
- [ ]Provider tambahan memiliki dokumentasi dan kebijakan sendiri.

### Privasi dan integrasi

- [ ]Geolocation memerlukan izin pengguna.
- [ ]Data privat tidak dipublikasikan.
- [ ]RLS atau authorization diterapkan pada data lokasi.
- [ ]Geocoding dan routing tidak diasumsikan tersedia dari Leaflet.
- [ ]Error provider ditangani.
- [ ]Tidak ada kredensial rahasia di frontend.

### Validasi akhir

- [ ]Lint berhasil jika tersedia.
- [ ]Type-check berhasil jika tersedia.
- [ ]Build berhasil jika tersedia.
- [ ]Pengujian peta dilakukan di browser.
- [ ]Masalah yang belum selesai dilaporkan.

## 18\. Format laporan akhir AI Agent

Setelah implementasi, laporkan:

1. Ringkasan perubahan.
2. Library dan versi yang digunakan.
3. Tile provider yang digunakan.
4. Komponen peta yang dibuat.
5. Fitur marker, popup, dan layer yang diimplementasikan.
6. Integrasi geocoding atau routing jika ada.
7. Konfigurasi provider yang diperlukan.
8. Kepatuhan terhadap attribution dan tile policy.
9. Hasil lint, type-check, build, dan testing.
10. Risiko penggunaan layanan publik.
11. Masalah yang belum terselesaikan.
12. Rekomendasi untuk produksi jika trafik meningkat.

## 19\. Aturan keputusan terakhir

Jika kebutuhan aplikasi melebihi kemampuan Leaflet atau batas layanan OSM publik:

1. Pertahankan fitur peta inti.
2. Pisahkan rendering dari penyedia tile.
3. Evaluasi provider yang sesuai.
4. Jangan melanggar kebijakan tile untuk mengurangi biaya.
5. Jangan menambahkan layanan berbayar tanpa persetujuan.
6. Jelaskan risiko, batas penggunaan, dan trade-off.
7. Minta persetujuan sebelum mengubah provider atau menambah biaya.

**Instruksi penutup:** Bangun aplikasi peta yang mematuhi lisensi dan kebijakan provider. Leaflet adalah library, OpenStreetMap adalah sumber data, sedangkan tile hosting, geocoding, dan routing merupakan komponen yang berbeda. Jangan mengasumsikan semuanya disediakan tanpa batas oleh satu layanan gratis.

## Referensi resmi untuk AI Agent

- [Leaflet Documentation](<https://leafletjs.com/reference.html?utm_source=chatgpt.com>) — API dan komponen peta.
  a JavaScript library for interactive maps
- [Leaflet Quick Start](<https://leafletjs.com/examples/quick-start/?utm_source=chatgpt.com>) — contoh implementasi awal.
  a JavaScript library for interactive maps
- [OpenStreetMap Tile Usage Policy](<https://operations.osmfoundation.org/policies/tiles/?utm_source=chatgpt.com>) — URL, caching, atribusi, dan larangan bulk download.
  operations.osmfoundation.org
- [OpenStreetMap Copyright and License](<https://www.openstreetmap.org/copyright?utm_source=chatgpt.com>) — atribusi dan lisensi data.
- [Nominatim Documentation](<https://nominatim.org/release-docs/latest/?utm_source=chatgpt.com>) — geocoding dan reverse geocoding.
- [Switch2OSM](<https://switch2osm.org/?utm_source=chatgpt.com>) — panduan menggunakan atau meng-host peta OSM.