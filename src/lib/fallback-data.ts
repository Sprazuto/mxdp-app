import { Program, Teacher } from '@/types'
import { SanityImage } from '@/lib/sanity/client'
import { SanityBlockContent } from '@/types'

const placeholderImage: SanityImage = {
  _type: 'image',
  asset: {
    _ref: 'placeholder',
    _type: 'reference',
  },
  alt: 'Placeholder image',
}

const createBlockContent = (text: string): SanityBlockContent => ({
  _type: 'array',
  _ref: undefined,
  blocks: [
    {
      _type: 'block',
      children: [{ _type: 'span', text }],
    },
  ],
})

export const programsFallback: Program[] = [
  {
    _id: 'program-1',
    title: 'Toddler Class',
    slug: { current: 'toddler-class' },
    shortDescription: 'Program pengembangan motorik dan sensorik untuk anak usia 1-3 tahun melalui bermain dan eksplorasi.',
    fullDescription: createBlockContent('Toddler Class dirancang khusus untuk anak usia 1-3 tahun untuk mendukung perkembangan motorik kasar, motorik halus, kognitif, bahasa, serta sosial-emosional melalui kegiatan bermain yang terstruktur dan menyenangkan. Kurikulum kami mengadopsi pendekatan "Learning through Play" di mana anak belajar sambil bermain di lingkungan yang aman, nyaman, dan stimulatif. Setiap kegiatan dirancang untuk mengembangkan rasa ingin tahu alami anak.'),
    thumbnail: placeholderImage,
    duration: '1 Tahun Akademik',
    ageGroup: '1-3 Tahun',
    features: [
      'Stimulasi sensorik & motorik',
      'Pengembangan bahasa awal',
      'Kemandirian dasar (makan, toilet training)',
      'Sosialisasi dengan sebaya',
      'Musik & gerak',
      'Outdoor play area aman',
    ],
    isActive: true,
    order: 1,
  },
  {
    _id: 'program-2',
    title: 'Playgroup',
    slug: { current: 'playgroup' },
    shortDescription: 'Program persiapan sekolah untuk anak usia 2-4 tahun dengan fokus pada kemandirian, sosialisasi, dan kognitif dasar.',
    fullDescription: createBlockContent('Playgroup MXDP menawarkan lingkungan belajar yang menghargai perkembangan unik setiap anak. Kami memadukan metode Montessori dan Reggio Emilia untuk menciptakan pengalaman belajar yang holistik. Kegiatan sehari-hari meliputi circle time, bermain peran, seni & kerajinan, eksperimen sains sederhana, dan bermain di luar ruangan. Semuanya dirancang untuk membangun fondasi karakter dan kecerdasan.'),
    thumbnail: placeholderImage,
    duration: '1 Tahun Akademik',
    ageGroup: '2-4 Tahun',
    features: [
      'Kemandirian & rutinitas harian',
      'Pengenalan huruf & angka (pre-literacy)',
      'Seni, musik & gerak',
      'STEAM sederhana (sains, teknologi, engineering, art, math)',
      'Bermain peran & imajinasi',
      'Karakter building (sharing, queueing, empathy)',
    ],
    isActive: true,
    order: 2,
  },
  {
    _id: 'program-3',
    title: 'TK A (Kelompok A)',
    slug: { current: 'tk-a' },
    shortDescription: 'Program Pendidikan Anak Usia Dini tingkat pertama untuk anak usia 4-5 tahun dengan kurikulum merdeka belajar.',
    fullDescription: createBlockContent('TK A MXDP mengimplementasikan Kurikulum Merdeka Belajar dengan fokus pada 6 area perkembangan: Nilai Agama & Moral, Fisik Motorik, Kognitif, Bahasa, Sosial Emosional, dan Seni. Pembelajaran berbasis proyek memungkinkan anak mengeksplorasi topik yang menarik bagi mereka, mengembangkan critical thinking, kreativitas, kolaborasi, dan komunikasi (4C skills) sejak dini.'),
    thumbnail: placeholderImage,
    duration: '1 Tahun Akademik',
    ageGroup: '4-5 Tahun',
    features: [
      'Literasi & numerasi awal',
      'Project-based learning',
      'Pendidikan karakter & agama',
      'Bahasa Inggris percakapan dasar',
      'STEAM & computational thinking',
      'Ekstrakurikuler: renang, ballet, robotik',
    ],
    isActive: true,
    order: 3,
  },
  {
    _id: 'program-4',
    title: 'TK B (Kelompok B)',
    slug: { current: 'tk-b' },
    shortDescription: 'Program persiapan sekolah dasar untuk anak usia 5-6 tahun dengan fokus kesiapan akademik & sosial-emosional.',
    fullDescription: createBlockContent('TK B adalah tahap persiapan terpenting sebelum anak memasuki SD. Program kami difokuskan pada kesiapan membaca, menulis, berhitung (calistung), serta kematangan sosial-emosional untuk transisi yang mulus ke SD. Kami bekerja sama dengan SD terkemuka untuk memastikan kelulusan TK B MXDP siap mengikuti proses belajar mengajar di jenjang selanjutnya dengan percaya diri dan antusias.'),
    thumbnail: placeholderImage,
    duration: '1 Tahun Akademik',
    ageGroup: '5-6 Tahun',
    features: [
      'Calistung (membaca, menulis, berhitung) lancar',
      'Bahasa Inggris: phonics, reading, speaking',
      'Pendidikan karakter & kepemimpinan',
      'STEAM lanjutan & coding unplugged',
      'Orientasi SD & school readiness',
      'Portfolio & assessment holistik',
    ],
    isActive: true,
    order: 4,
  },
]

export const teachersFallback: Teacher[] = [
  {
    _id: 'teacher-1',
    name: 'Dra. Siti Nurhaliza, M.Pd',
    slug: { current: 'siti-nurhaliza' },
    role: 'Kepala Sekolah & Guru TK A',
    bio: createBlockContent('Dra. Siti Nurhaliza, M.Pd memiliki pengalaman lebih dari 20 tahun di dunia pendidikan anak usia dini. Beliau lulus S1 PG-PAUD Universitas Pendidikan Indonesia dan S2 Manajemen Pendidikan Universitas Negeri Jakarta. Beliau berdedikasi menciptakan lingkungan belajar yang mengasihi, aman, dan menginspirasi setiap anak.'),
    photo: placeholderImage,
    education: [
      'S2 Manajemen Pendidikan - UNJ',
      'S1 PG-PAUD - UPI Bandung',
      'Sertifikasi Kepala Sekolah',
    ],
    experience: [
      'Kepala TK MXDP (2019 - Sekarang)',
      'Guru TK Kelompok B (2010 - 2019)',
      'Koordinator Kurikulum PAUD (2015 - 2019)',
    ],
    specialties: [
      'Manajemen Pendidikan PAUD',
      'Pengembangan Kurikulum Merdeka',
      'Parenting & Child Development',
    ],
    socialMedia: {
      linkedin: 'https://linkedin.com/in/sitinurhaliza',
      instagram: 'https://instagram.com/ibusiti_tk',
    },
    order: 1,
  },
  {
    _id: 'teacher-2',
    name: 'Budi Santoso, S.Pd',
    slug: { current: 'budi-santoso' },
    role: 'Guru TK B & Koordinator Kurikulum',
    bio: createBlockContent('Budi Santoso, S.Pd adalah pendidik berpengalaman 15 tahun dengan spesialisasi literasi dan numerasi awal. Beliau lulus S1 PG-PAUD Universitas Negeri Surabaya. Beliau dikenal dengan metode mengajar yang kreatif, sabar, dan mampu membuat anak menikmati proses belajar membaca dan berhitung.'),
    photo: placeholderImage,
    education: [
      'S1 PG-PAUD - UNESA Surabaya',
      'Sertifikasi Guru Profesional',
      'Pelatihan Jolly Phonics',
    ],
    experience: [
      'Guru TK B MXDP (2017 - Sekarang)',
      'Koordinator Kurikulum TK (2020 - Sekarang)',
      'Guru PAUD Swasta (2009 - 2017)',
    ],
    specialties: [
      'Literasi Awal & Phonics',
      'Numerasi & Matematika Dasar',
      'Project-Based Learning',
    ],
    socialMedia: {
      linkedin: 'https://linkedin.com/in/budisantoso',
      instagram: 'https://instagram.com/pakbudi_tk',
    },
    order: 2,
  },
  {
    _id: 'teacher-3',
    name: 'Rina Wijayanti, S.Psi',
    slug: { current: 'rina-wijayanti' },
    role: 'Guru TK A & Konselor Anak',
    bio: createBlockContent('Rina Wijayanti, S.Psi menggabungkan latar belakang psikologi dengan pendidikan PAUD. Beliau lulus S1 Psikologi Universitas Padjadjaran dan memiliki sertifikasi Konseling Anak. Fokus utamanya adalah perkembangan sosial-emosional, kecerdasan emosional, dan deteksi dini kebutuhan khusus.'),
    photo: placeholderImage,
    education: [
      'S1 Psikologi - UNPAD Bandung',
      'Sertifikasi Konseling Anak & Remaja',
      'Pelatihan Play Therapy',
    ],
    experience: [
      'Guru TK A & Konselor MXDP (2018 - Sekarang)',
      'Psikolog Anak di Lembaga Swasta (2015 - 2018)',
      'Relawan Peduli Anak Jalanan (2013 - 2015)',
    ],
    specialties: [
      'Perkembangan Sosial-Emosional',
      'Kecerdasan Emosional Anak',
      'Deteksi Dini Kebutuhan Khusus',
      'Play Therapy',
    ],
    socialMedia: {
      linkedin: 'https://linkedin.com/in/rinawijayanti',
      instagram: 'https://instagram.com/burina_tk',
    },
    order: 3,
  },
  {
    _id: 'teacher-4',
    name: 'Ahmad Fauzi, S.Pd',
    slug: { current: 'ahmad-fauzi' },
    role: 'Guru Playgroup & Pendidikan Jasmani',
    bio: createBlockContent('Ahmad Fauzi, S.Pd membawa energi dan semangat tinggi ke kelas Playgroup. Lulusan S1 Pendidikan Jasmani Kesehatan dan Rekreasi (PJKR) Universitas Negeri Jakarta. Beliau percaya gerak adalah bahasa pertama anak, dan mengintegrasikan pendidikan jasmani, musik, dan gerak dalam setiap aktivitas belajar.'),
    photo: placeholderImage,
    education: [
      'S1 PJKR - UNJ Jakarta',
      'Sertifikasi Yoga untuk Anak',
      'Pelatihan Fundamental Movement Skills',
    ],
    experience: [
      'Guru Playgroup & PJKR MXDP (2020 - Sekarang)',
      'Instruktur Renang Anak (2017 - 2020)',
      'Koordinator Ekstrakurikuler Olahraga (2018 - 2020)',
    ],
    specialties: [
      'Pendidikan Jasmani & Gerak Dasar',
      'Musik & Ritme untuk Anak',
      'Renang & Safety Air untuk Anak',
      'Sensorimotor Integration',
    ],
    socialMedia: {
      linkedin: 'https://linkedin.com/in/ahmadfauzi',
      instagram: 'https://instagram.com/pakfauzi_tk',
    },
    order: 4,
  },
  {
    _id: 'teacher-5',
    name: 'Dewi Lestari, S.Pd',
    slug: { current: 'dewi-lestari' },
    role: 'Guru Toddler Class & Seni Rupa',
    bio: createBlockContent('Dewi Lestari, S.Pd adalah ahli pendidikan seni untuk anak usia dini. Lulusan S1 Pendidikan Seni Rupa Universitas Negeri Yogyakarta. Beliau menciptakan ruang eksplorasi kreatif di mana toddler bebas mengekspresikan diri melalui warna, tekstur, dan bentuk, membangun fondasi kreativitas dan motorik halus.'),
    photo: placeholderImage,
    education: [
      'S1 Pendidikan Seni Rupa - UNY Yogyakarta',
      'Pelatihan Reggio Emilia Approach',
      'Sertifikasi Art Therapy Dasar',
    ],
    experience: [
      'Guru Toddler & Seni Rupa MXDP (2021 - Sekarang)',
      'Facilitator Bermain Kreatif (2018 - 2021)',
      'Asisten Guru TK (2016 - 2018)',
    ],
    specialties: [
      'Seni Rupa & Ekspresi Kreatif',
      'Sensor Play & Messy Play',
      'Motorik Halus & Koordinasi Mata-Tangan',
      'Reggio Emilia Inspired Learning',
    ],
    socialMedia: {
      linkedin: 'https://linkedin.com/in/dewilestari',
      instagram: 'https://instagram.com/budevi_tk',
    },
    order: 5,
  },
  {
    _id: 'teacher-6',
    name: 'Prof. Dr. Ir. Hendra Wijaya, M.Eng',
    slug: { current: 'hendra-wijaya' },
    role: 'Kepala Program STEAM & Robotik',
    bio: createBlockContent('Prof. Dr. Ir. Hendra Wijaya, M.Eng adalah pakar pendidikan STEAM dan robotik untuk anak usia dini. Beliau memiliki doktorat di bidang Teknik Elektro dari Institut Teknologi Bandung dan postdoc di MIT Media Lab. Beliau mengembangkan kurikulum STEAM yang disesuaikan dengan tahap perkembangan anak TK, memperkenalkan komputational thinking tanpa layar (unplugged coding).'),
    photo: placeholderImage,
    education: [
      'Dr. Teknik Elektro - ITB Bandung',
      'Postdoc MIT Media Lab - Cambridge, USA',
      'Sertifikasi STEAM Education Specialist',
    ],
    experience: [
      'Kepala Program STEAM MXDP (2022 - Sekarang)',
      'Dosen Pendidikan STEAM - ITB (2015 - Sekarang)',
      'Konsultan Kurikulum Merdeka Belajar - Kemendikbud',
      'Penulis Buku "Coding untuk Anak TK"',
    ],
    specialties: [
      'STEAM & Computational Thinking',
      'Robotik & Coding Unplugged',
      'Desain Kurikulum Inovatif',
      'Pendidikan Maker & Tinkering',
    ],
    socialMedia: {
      linkedin: 'https://linkedin.com/in/hendrawijaya',
      instagram: 'https://instagram.com/pakhendra_steam',
    },
    order: 6,
  },
]