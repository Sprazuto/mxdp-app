"use client";

export default function Home() {
  return (
    <>
      {/* Act 1: Hero - pin */}
      <section
        data-sc-act="pin"
        data-sc-span="2.8"
        data-sc-dwell="0.35"
        className="sc-stage relative min-h-screen flex items-center justify-center bg-[#fdfbf7]"
      >
        <div className="relative z-10 w-full max-w-4xl p-8 md:p-20 text-center">
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#ff9aa2] rounded-full opacity-30 blur-xl" aria-hidden="true"></div>
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#b5ead7] rounded-full opacity-25 blur-xl" aria-hidden="true"></div>

          <h1 className="text-6xl md:text-8xl font-extrabold mb-8 leading-[1.1]" data-sc-cue="0 0.78" data-sc-kinetic="lines">
            Setiap pagi dimulai dengan<br />
            <span className="text-[#c7ceea]">doa & harapan</span>
          </h1>
          <p className="text-xl md:text-2xl mb-14 text-[#8a7d6e] max-w-2xl mx-auto leading-relaxed" data-sc-cue="0.2 0.85">
            Tanpa kotak. Tanpa tepi tajam. Hanya bentuk-bentuk lembut yang menunggu disentuh.
          </p>
          <a href="#" className="inline-block bg-[#ff9aa2] text-white px-8 py-3 rounded-full font-bold shadow-[6px_6px_12px_rgba(255,154,162,0.4)]" data-sc-cue="0.4 1">
            Mulai Jelajah
          </a>
        </div>
      </section>

      {/* Act 2: Flow - features */}
      <section
        data-sc-act="flow"
        data-sc-drift="#fef3e8"
        className="relative min-h-screen px-4 md:px-8 bg-[#fefbf7]"
      >
        <div className="max-w-7xl mx-auto p-8 md:p-20 flex flex-col items-center justify-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-12 text-[#c7ceea] text-center" data-sc-cue="0 0.3">
            Bentuk-bentuk yang Hidup
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6" data-sc-in data-sc-stagger="80">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="p-8 rounded-full bg-white border border-[#8a7d6e]/20 shadow-[4px_4px_8px_rgba(0,0,0,0.08),-2px_-2px_4px_rgba(255,255,255,0.6)] text-center opacity-0 transform translate-y-4 transition-all duration-700 ease-out"
                style={{
                  transitionDelay: `${i * 80}ms`,
                  backgroundColor: ['#ff9aa2','#ffd8a8','#b5ead7','#c7ceea','#ffd3b6','#a1c4fd','#ffb3d9','#d4f6d4'][i],
                }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="font-bold mb-2">Blob {i + 1}</h3>
                <p className="text-sm text-[#8a7d6e]">Warna dan karakter sendiri</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Act 3: Pan - rail */}
      <section
        data-sc-act="pan"
        data-sc-span="4"
        className="relative min-h-screen bg-[#fff]"
      >
        <div data-sc-stage className="relative h-full flex items-center justify-center">
          <div className="relative flex gap-6 px-8 w-full max-w-6xl overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-64 p-8 rounded-[50%] bg-white border border-[#8a7d6e]/20 shadow-[8px_8px_16px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center"
                style={{
                  backgroundColor: ['#ff9aa2','#b5ead7','#c7ceea','#ffd3b6'][i-1],
                }}
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-[#fff] rounded-full shadow-lg">
                  <span className="text-3xl">📚</span>
                </div>
                <h3 className="font-bold text-[#3d352d]">Program {i}</h3>
                <p className="text-sm text-[#8a7d6e] text-center">Pilihan untuk anak Anda</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Act 4: Pin - safety */}
      <section
        data-sc-act="pin"
        data-sc-span="2"
        className="relative min-h-screen bg-[#fdfbf7]"
      >
        <div data-sc-stage className="relative h-full flex items-center justify-center bg-[#fdfbf7]">
          <div className="max-w-7xl p-8 md:p-20 grid grid-cols-1 sm:grid-cols-2 gap-8" data-sc-in data-sc-stagger="100">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="p-8 rounded-[40%] bg-white border border-[#8a7d6e]/20 shadow-[8px_8px_16px_rgba(0,0,0,0.1)] flex flex-col items-center"
                style={{
                  backgroundColor: ['#a1c4fd','#ffb3d9','#d4f6d4','#ffd8a8'][i-1],
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-[#fff] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-3xl">🛡️</span>
                </div>
                <h3 className="font-bold text-[#3d352d] mb-2">Keamanan {i}</h3>
                <p className="text-sm text-[#8a7d6e] text-center">Lingkungan belajar yang aman</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Act 5: Final CTA */}
      <section
        data-sc-act="pin"
        data-sc-span="1.5"
        className="relative min-h-[80vh] flex items-center justify-center bg-[#fdfbf7]"
      >
        <div className="relative z-10 w-full max-w-3xl p-8 md:p-20 text-center">
          <div className="w-32 h-32 mx-auto bg-[#ffd3b6] rounded-full flex items-center justify-center shadow-[12px_12px_24px_rgba(255,154,162,0.5)] mb-8 animate-bounce" aria-hidden="true">
            <span className="text-4xl">🏆</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight text-[#ff9aa2]" data-sc-cue="0 0.5">
            Kamu Menemukan Semua Bentuk
          </h2>
          <p className="text-xl md:text-2xl mb-14 text-[#8a7d6e]" data-sc-cue="0.2 0.7">
            Tidak ada kotak yang membatasi. Hanya kurva-kurva lembut yang mengantarkanmu ke sini.
          </p>
          <a href="#" className="inline-block bg-[#ffb3d9] text-white px-8 py-3 rounded-full font-bold shadow-[0_12px_24px_rgba(255,179,217,0.5)]" data-sc-cue="0.4 0.9">
            Mulai Petualangan
          </a>
        </div>
      </section>

      {/* Growth Compass */}
      <div className="fixed right-8 bottom-8 z-50 w-40 h-40 pointer-events-none isolation-isolate">
        <svg className="w-full h-full" viewBox="0 0 140 140" aria-hidden="true">
          <defs>
            <linearGradient id="compass-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff9aa2" />
              <stop offset="33%" stopColor="#ffb3d9" />
              <stop offset="66%" stopColor="#b5ead7" />
              <stop offset="100%" stopColor="#d4f6d4" />
            </linearGradient>
          </defs>
          <circle cx="70" cy="70" r="63" fill="none" stroke="#c7ceea" strokeWidth="5" />
          <circle
            cx="70" cy="70" r="63" fill="none" stroke="url(#compass-gradient)" strokeWidth="5"
            strokeLinecap="round" strokeDasharray="395.8" strokeDashoffset="395.8"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '70px 70px', transition: 'stroke-dashoffset 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#c7ceea]/50">Toddler</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#c7ceea]/50">Playgroup</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#c7ceea]/50">TK A</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#c7ceea]/50">TK B</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#c7ceea]/50">Siap SD</span>
        </div>
      </div>

      {/* ScrollCraft mounted in root layout via ScrollCraftMount */}
    </>
  );
}