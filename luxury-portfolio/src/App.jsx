import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Music, ArrowUp, Github, Instagram, Tiktok, Linkedin } from 'lucide-react';
import LuxuryButton from './components/LuxuryButton';
import LuxuryCard from './components/LuxuryCard';
import emailjs from '@emailjs/browser';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const audioRef = useRef(null);
  const formRef = useRef(null);

  const texts = ["Aku Butuh Kopi", "Portfolio Kanesuuu", "Selamat Datang!"];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isDeleting) {
        if (charIndex > 0) {
          setCurrentText(prev => prev.slice(0, -1));
          setCharIndex(prev => prev - 1);
        } else {
          setIsDeleting(false);
          setTextIndex(prev => (prev + 1) % texts.length);
        }
      } else {
        if (charIndex < texts[textIndex].length) {
          setCurrentText(prev => prev + texts[textIndex].charAt(charIndex));
          setCharIndex(prev => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex, texts]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const toggleMusic = () => setIsPlaying(!isPlaying);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_0z3q0k7', 'template_08nqwhi', formRef.current, 'fY0zN0iG5vQ2rP8s')
      .then((result) => {
        setFormSubmitted(true);
        formRef.current.reset();
      }, (error) => {
        console.error('EmailJS error:', error);
        alert('Gagal mengirim pesan.');
      });
  };

  const filteredProjects = projects.filter(project => 
    activeFilter === 'all' || project.category === activeFilter
  );

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 dark:from-gray-50 dark:via-purple-50 dark:to-violet-50 transition-all duration-500`}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-playfair font-bold text-gold-300">
            Portfolio_<span className="text-white">Kanesuuu.</span>
          </h1>
          
          <nav className="hidden md:flex space-x-8">
            {['home', 'about', 'projects', 'project', 'sertifikat', 'praktikum', 'contact'].map((item) => (
              <a 
                key={item}
                href={`#${item}`}
                className="text-white hover:text-gold-300 transition-colors font-medium"
              >
                {item.toUpperCase()}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleMusic}
              className="p-3 rounded-full glass-effect hover:bg-white/10 transition-all"
            >
              <Music className={`text-gold-300 ${isPlaying ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={toggleTheme}
              className="p-3 rounded-full glass-effect hover:bg-white/10 transition-all"
            >
              {darkMode ? <Sun className="text-gold-300" /> : <Moon className="text-gold-300" />}
            </button>
          </div>
        </div>
      </header>

      {/* Audio */}
      <audio ref={audioRef} loop src="/assets/cintakupadamubersemikembali.mp4" />

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <LuxuryCard className="max-w-4xl mx-auto p-12">
            <div className="flex flex-col md:flex-row items-center gap-12">
              {/* Profile Image */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-64 h-64 rounded-full gold-gradient p-2 animate-float">
                  <img 
                    src="/assets/kanesuuu.jpg" 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover border-4 border-white/20"
                  />
                </div>
              </motion.div>
              
              {/* Profile Info */}
              <motion.div 
                className="text-left"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="bg-gold-500 text-black px-4 py-1 rounded-full text-sm font-medium">
                  WIB: {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta' })}
                </span>
                
                <h1 className="text-5xl font-playfair font-bold text-white mt-4">
                  <span className="typed-text">{currentText}</span><span className="cursor">|</span>
                </h1>
                
                <h3 className="text-3xl font-semibold text-gold-300 mt-2">
                  GANES <span className="text-white">KANESUUUU</span>
                </h3>
                
                <p className="text-xl text-gray-300 mt-2 italic quote">
                  "Aku Wawan."
                </p>
                
                <p className="text-gray-400 mt-4 max-w-md">
                  Terimakasih Sudah Berkunjung Ke Sini :).
                </p>
                
                <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
                  <div className="text-gold-300 text-lg font-semibold">
                    {new Date().toLocaleDateString('id-ID')}
                  </div>
                  <span className="font-bold text-white">
                    LULUSAN: Mi - MTs - SMAN
                  </span>
                </div>
              </motion.div>
            </div>
          </LuxuryCard>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-white/5">
        <div className="container mx-auto">
          <LuxuryCard className="max-w-4xl mx-auto p-12 text-center">
            <motion.h2 
              className="text-4xl font-playfair font-bold text-white mb-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              [Ngopi sore, sambil mikirin masa depan yang belum tentu. Tapi tenang aja, aku punya tekad <span className="text-gold-300">Dan Tugas Awokawok</span>]
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 mb-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              "Duduk sebentar, tarik napas. Dunia belum berakhir, hanya butuh rehat"
            </motion.p>
            <motion.p 
              className="text-xl text-gray-300 mb-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Searching for a Reflection Beneath the Waters. <a href="#" className="text-gold-300 hover:underline">World</a>
            </motion.p>
            <motion.p 
              className="text-xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Empty Seek!
            </motion.p>
            <div className="text-gold-300 text-lg font-semibold">
              {new Date().toLocaleDateString('id-ID')}
            </div>
          </LuxuryCard>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="projects" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.h2 
            className="text-4xl font-playfair font-bold text-center text-white mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            GALLERY <span className="text-gold-300">AKU</span>
          </motion.h2>
          
          <div className="flex justify-center mb-8 gap-4">
            {['all', 'design', 'web', 'art'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeFilter === filter 
                    ? 'gold-gradient text-black' 
                    : 'glass-effect text-white hover:bg-white/10'
                }`}
              >
                {filter === 'all' ? 'All' : filter === 'design' ? 'Universitas' : filter === 'web' ? 'Cofee' : 'Hobi'}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <LuxuryCard className="overflow-hidden">
                  <img 
                    src={`/assets/${project.image}`} 
                    alt={project.title} 
                    className="w-full h-64 object-cover rounded-xl mb-4"
                  />
                  <h3 className="text-2xl font-playfair font-bold text-white mb-2">
                    [{project.title}]
                  </h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  {project.link && (
                    <a href={project.link} className="text-gold-300 hover:underline" target="_blank" rel="noopener noreferrer">
                      {project.link}
                    </a>
                  )}
                  <div className="text-gold-300 mt-4">
                    {new Date().toLocaleDateString('id-ID')}
                  </div>
                </LuxuryCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Sections - Projects, Sertifikat, Praktikum */}
      {/* Similar structure for project, sertifikat, praktikum sections */}
      <section id="project" className="py-20 px-6 bg-white/5">
        <div className="container mx-auto">
          <motion.h2 className="text-4xl font-playfair font-bold text-center text-white mb-8">
            LATEST NEWS <span className="text-gold-300">PROJECT</span>
          </motion.h2>
          <motion.h3 className="text-2xl text-center text-gold-300 mb-12">
            Update Project
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <LuxuryCard>
                  <img src={`/assets/${item.image}`} alt={item.title} className="w-full h-48 object-cover rounded-xl mb-4" />
                  <h3 className="text-2xl font-playfair font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300 mb-4">{item.description}</p>
                  <div className="text-gold-300">{new Date().toLocaleDateString('id-ID')}</div>
                </LuxuryCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sertifikat Section */}
      <section id="sertifikat" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.h2 className="text-4xl font-playfair font-bold text-center text-white mb-8">
            SERTIFIKAT <span className="text-gold-300">AKU</span>
          </motion.h2>
          <motion.h3 className="text-2xl text-center text-gold-300 mb-12">
            Sorotan Sertifikat
          </motion.h3>
          {/* Similar grid for certificates */}
        </div>
      </section>

      {/* Praktikum Section */}
      <section id="praktikum" className="py-20 px-6 bg-white/5">
        <div className="container mx-auto">
          <motion.h2 className="text-4xl font-playfair font-bold text-center text-white mb-8">
            KUMPULAN YANG DIPELAJARI SELAMA <span className="text-gold-300">PRAKTIKUM</span>
          </motion.h2>
          <motion.h3 className="text-2xl text-center text-gold-300 mb-12">
            Pengalaman Praktikum
          </motion.h3>
          {/* Similar grid for praktikum */}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.h2 
            className="text-4xl font-playfair font-bold text-center text-white mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Kasih Aku <span className="text-gold-300">Pesan Dung</span>
          </motion.h2>
          
          <LuxuryCard className="max-w-2xl mx-auto p-8">
            <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
              <div>
                <input 
                  type="text" 
                  name="user_name" 
                  placeholder="Nama" 
                  required 
                  className="w-full p-4 glass-effect rounded-xl text-white placeholder-gray-400 focus:border-gold-300 focus:outline-none"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  name="user_email" 
                  placeholder="Email" 
                  required 
                  className="w-full p-4 glass-effect rounded-xl text-white placeholder-gray-400 focus:border-gold-300 focus:outline-none"
                />
              </div>
              <div>
                <textarea 
                  name="message" 
                  placeholder="Pesan Buat Siganteng wkwk" 
                  rows="5" 
                  required 
                  className="w-full p-4 glass-effect rounded-xl text-white placeholder-gray-400 focus:border-gold-300 focus:outline-none resize-none"
                ></textarea>
              </div>
              <LuxuryButton type="submit" className="w-full">
                Kirim Pesan
              </LuxuryButton>
            </form>
            {formSubmitted && (
              <motion.p 
                className="text-center text-gold-300 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Pesan berhasil dikirim!
              </motion.p>
            )}
          </LuxuryCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-white/5 border-t border-white/10">
        <div className="container mx-auto text-center">
          <div className="flex justify-center gap-6 mb-6">
            <a href="https://github.com/ganes2" className="p-3 rounded-full glass-effect hover:bg-white/10 transition-all" target="_blank" rel="noopener noreferrer">
              <Github className="text-gold-300" />
            </a>
            <a href="https://instagram.com/@kanesuuu_" className="p-3 rounded-full glass-effect hover:bg-white/10 transition-all" target="_blank" rel="noopener noreferrer">
              <Instagram className="text-gold-300" />
            </a>
            <a href="https://tiktok.com/@akaine.e" className="p-3 rounded-full glass-effect hover:bg-white/10 transition-all" target="_blank" rel="noopener noreferrer">
              <Tiktok className="text-gold-300" />
            </a>
            <a href="https://linkedin.com/in/username" className="p-3 rounded-full glass-effect hover:bg-white/10 transition-all" target="_blank" rel="noopener noreferrer">
              <Linkedin className="text-gold-300" />
            </a>
          </div>
          <p className="text-gray-300 mb-2">&copy; {new Date().getFullYear()} Personal Portfolio. BY_GANES.</p>
          <p className="text-gold-300 italic closing-quote">
            "Terimakasih sudah melihat bagian kecil dari hidupku. Aku tidak sempurna, tapi aku berkembang."
          </p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 gold-gradient p-4 rounded-full shadow-2xl z-50"
          >
            <ArrowUp className="text-black w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <style jsx>{`
        .cursor {
          display: inline-block;
          background-color: #FFD700;
          width: 2px;
          animation: blink 0.7s steps(1) infinite;
          margin-left: 5px;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .glass-effect {
          backdrop-filter: blur(20px);
        }
        .luxury-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
          border: 1px solid rgba(255,215,0,0.2);
          border-radius: 24px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        .gold-gradient {
          background: linear-gradient(to right, #FFD700, #D4AF37);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}

// Sample data
const projects = [
  {
    title: 'UNIVERSITAS',
    description: 'Berkuliah Di Telkom University Purwokerto Sejak 2023-2025',
    image: 'TUP.png',
    category: 'design',
    link: 'https://purwokerto.telkomuniversity.ac.id/'
  },
  {
    title: 'COSPLAY',
    description: 'AKU memiliki ketertarikan besar pada dunia cosplay — bukan sekadar mengenakan kostum, tapi bagaimana AKU bisa menghidupkan karakter fiksi melalui detail, ekspresi, dan kreativitas.',
    image: 'Cosplay.jpg',
    category: 'art'
  },
  {
    title: 'COFEE',
    description: 'Ngopi sambil nugas—kombinasi antara kewarasan dan kejar deadline. Tugas numpuk? Tenang. Selama ada kopi, aku masih bisa senyum.',
    image: 'Cofee.jpg',
    category: 'web'
  }
];

const projectData = [
  {
    title: 'Project 1',
    description: 'Deskripsi project placeholder. Ini adalah contoh project yang saya kerjakan.',
    image: 'Universitas Telkom.jpeg'
  },
  {
    title: 'Project 2',
    description: 'Project kedua dengan detail lebih lanjut.',
    image: 'TUP.png'
  }
];

export default App;
