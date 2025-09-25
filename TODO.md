# TODO: Tambahkan Efek Elektrik Smooth pada Theme Toggle

## Steps to Complete:
1. **Edit styles.css**: Tambahkan @keyframes electric-glow untuk animasi pulsing RGB (biru/ungu/putih), dan class .theme-transition-electric dengan animation dan transition smooth 0.5s (apply ke body atau .hero).
2. **Edit script.js**: Di event listener theme toggle (klik .theme-toggle), tambahkan body.classList.add('theme-transition-electric') saat switch theme, lalu remove setelah 500ms via setTimeout.
3. **Verify Changes**: Launch browser ke index.html, klik toggle theme – efek elektrik muncul smooth saat ganti dark/light, durasi 0.5s, tidak konflik dengan animasi lain.
4. **Update TODO.md**: Mark steps sebagai completed setelah verifikasi.
5. **Complete Task**: Gunakan attempt_completion untuk finalisasi.

Progress: 
- [x] Step 1
- [x] Step 2
- [x] Step 3
- [x] Step 4
- [x] Step 5
