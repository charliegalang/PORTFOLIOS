import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { Plus, Moon, Sun, X } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'

// Static Assets
import bgImage from './assets/BGImage.png'
import profilePic from './assets/52323_2512856396012_1996282797_o 1.svg'

// Vite glob imports for assets
const brandGuidelineImages = import.meta.glob('./assets/brand_guideline/*.svg', { eager: true, as: 'url' })
const brandPresentationImages = import.meta.glob('./assets/Brand_Presentations/*.svg', { eager: true, as: 'url' })
const socialMediaImages = import.meta.glob('./assets/Social Media/*.svg', { eager: true, as: 'url' })
const uiuxImages = import.meta.glob('./assets/UIUX Designs/*.svg', { eager: true, as: 'url' })

const brandGuidelineAssets = Object.values(brandGuidelineImages)
const brandPresentationAssets = Object.values(brandPresentationImages)
const socialAssetsRaw = Object.values(socialMediaImages)
const uiuxAssets = Object.values(uiuxImages)

// Explicitly sorting social assets to match the visual grid layout
const socialAssets = [
  socialAssetsRaw.find(s => s.includes('BLCK%20CLIPPER')),     // 0. Black Friday (Tall)
  socialAssetsRaw.find(s => s.includes('EA%201')),            // 1. Collage (Square)
  socialAssetsRaw.find(s => s.includes('SAMPLE%202')),        // 2. Guy (Square)
  socialAssetsRaw.find(s => s.includes('MS%20SUPERMALL')),    // 3. Consumer Week (Square)
  socialAssetsRaw.find(s => s.includes('SHOE_AEROSD')),       // 4. Shoe (Square)
  socialAssetsRaw.find(s => s.includes('OVERLAND%201')),      // 5. Overland (Wide)
  socialAssetsRaw.find(s => s.includes('Travel%20ATW')),      // 6. Travel (Square)
  socialAssetsRaw.find(s => s.includes('FOR%20PRINT%20TGP')), // 7. Quincunque (Tall)
  socialAssetsRaw.find(s => s.includes('TECH%20EXPERTZ')),    // 8. Tech Expertz (Tall)
].filter(Boolean);

// --- ANIMATION VARIANTS ---

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
}

const fadeInLeft = {
  initial: { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
}

const fadeInRight = {
  initial: { opacity: 0, x: 50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
}

const scaleUp = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
}

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const idleFloating = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// --- COMPONENTS ---

// Image Modal Component for Enlarged View
const ImageModal = ({ src, alt, isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl cursor-pointer"
        >
          {/* X Button - Outside the image container like you wanted */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-8 right-8 p-4 bg-black/50 backdrop-blur-md rounded-full hover:bg-black/70 transition-colors z-[101]"
          >
            <X size={28} className="text-white" />
          </button>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={src} 
              alt={alt} 
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * 3D Infinite Carousel Component
 * Creates a "hollow" 3D ring where images orbit.
 */
const Infinite3DRing = ({ items, radius = 400, speed = 25 }) => {
  const count = items.length;
  const [selectedImage, setSelectedImage] = useState(null);
  
  return (
    <>
      <div className="relative h-[300px] w-full flex items-center justify-center" style={{ perspective: "1200px" }}>
        <motion.div
          className="relative flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        >
          {items.map((src, i) => {
            const angle = (i / count) * 360;
            return (
              <motion.div
                key={i}
                className="absolute w-48 h-48 sm:w-64 sm:h-64 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 shadow-2xl flex items-center justify-center dark:bg-black/20 dark:border-white/10 cursor-pointer hover:brightness-110 transition-all duration-300"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: "hidden",
                }}
                onClick={() => setSelectedImage(src)}
              >
                <img 
                  src={src} 
                  className="w-full h-full object-contain drop-shadow-lg pointer-events-none" 
                  alt="Project Work"
                  style={{ transform: "translateZ(20px)" }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      <ImageModal 
        src={selectedImage} 
        alt="Enlarged project image" 
        isOpen={!!selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />
    </>
  );
};

const BreathingBeam = ({ delay = 0, bottom, right, rotate = "-25deg", width = "150%", height = "1px", opacity = 1, blur = "0px" }) => (
  <motion.div
    initial={{ opacity: 0, scaleX: 0 }}
    animate={{
      opacity: [opacity * 0.4, opacity, opacity * 0.4],
      scaleX: 1
    }}
    transition={{
      opacity: { duration: 6, repeat: Infinity, ease: "easeInOut", delay },
      scaleX: { duration: 2, delay, ease: [0.16, 1, 0.3, 1] }
    }}
    className="absolute pointer-events-none origin-right z-10"
    style={{
      bottom,
      right,
      width,
      height,
      transform: `rotate(${rotate})`,
      background: 'linear-gradient(90deg, transparent 0%, #EAB308 20%, #EAB308 50%, #EAB308 80%, transparent 100%)',
      boxShadow: '0 0 30px rgba(234, 179, 8, 0.3), 0 0 50px rgba(234, 179, 8, 0.1)',
      filter: `blur(${blur})`,
    }}
  />
)

const RingSection = ({ title, description, items, align = "left" }) => (
  <section className="mb-12">
    <motion.div 
      {...fadeInUp} 
      className={`flex items-center gap-4 mb-2 ${align === 'right' ? 'justify-end' : ''}`}
    >
      {align === 'left' && <div className="h-[2px] w-12 bg-[#EAB308]" />}
      <h2 className="text-2xl sm:text-3xl font-sans font-bold tracking-tighter uppercase text-[#1E1E1E] dark:text-white">
        {title}
      </h2>
      {align === 'right' && <div className="h-[2px] w-12 bg-[#EAB308]" />}
    </motion.div>
    {description && (
      <p className={`text-[#4A4A4A] dark:text-[#A0A0A0] mb-4 max-w-7xl mx-auto px-8 font-sans text-sm ${align === 'right' ? 'text-right' : ''}`}>
        {description}
      </p>
    )}
    <Infinite3DRing items={items} radius={400} speed={25} />
  </section>
)

function App() {
  const heroRef = useRef(null)
  const [darkMode, setDarkMode] = useState(false)
  const [selectedProfileImage, setSelectedProfileImage] = useState(null)
  
  // Check user preference
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(isDark)
  }, [])

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const heroContentOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0])
  const heroContentScale = useTransform(smoothProgress, [0, 0.4], [1, 0.92])
  const textY = useTransform(smoothProgress, [0, 0.4], [0, -80])

  // Fix for Nav color change without using mix-blend
  const navColor = useTransform(smoothProgress, [0.4, 0.5], ["#ffffff", darkMode ? "#ffffff" : "#1E1E1E"])
  const navLinkOpacity = useTransform(smoothProgress, [0.4, 0.5], [0.7, 0.4])

  return (
    <div className="bg-white dark:bg-[#0A0A0A] font-sans text-[#1E1E1E] dark:text-white selection:bg-[#EAB308]/20 transition-colors duration-300 overflow-x-hidden">
      {/* --- NAVIGATION FIXED --- */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-12 py-10">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-10 h-10 rounded-full bg-[#EAB308] overflow-hidden p-[2px] cursor-pointer hover:brightness-110 transition-all duration-300"
            onClick={() => setSelectedProfileImage(profilePic)}
          >
             <div className="w-full h-full rounded-full bg-[#1E1E1E] dark:bg-black overflow-hidden">
                <img src={profilePic} alt="Ron" className="w-full h-full object-cover" />
             </div>
          </motion.div>
          <motion.span style={{ color: navColor }} className="font-sans font-bold text-xl tracking-tighter">Ron Medina</motion.span>
        </div>
        <div className="flex items-center gap-10">
          <div className="hidden sm:flex gap-10 text-[10px] font-sans font-black tracking-[0.3em] uppercase">
            <motion.a href="#" style={{ color: navColor, opacity: navLinkOpacity }} className="hover:text-[#EAB308] transition-colors">Work</motion.a>
            <motion.a href="#" style={{ color: navColor, opacity: navLinkOpacity }} className="hover:text-[#EAB308] transition-colors">Contact</motion.a>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-[#EAB308]/10 hover:bg-[#EAB308]/20 transition-colors"
          >
            {darkMode ? <Sun size={18} className="text-[#EAB308]" /> : <Moon size={18} className="text-[#EAB308]" />}
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section ref={heroRef} className="relative h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
        <motion.div style={{ opacity: heroContentOpacity, scale: heroContentScale }} className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: [1.1, 1, 1.05], opacity: 1 }}
            transition={{
              opacity: { duration: 2 },
              scale: { duration: 20, repeat: Infinity, ease: "linear" }
            }}
            className="absolute inset-0"
          >
            <img src={bgImage} alt="Background" className="w-full h-full object-cover object-right-bottom opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
          </motion.div>

          <div className="absolute inset-0 z-10 overflow-hidden">
              <BreathingBeam bottom="5%" right="-5%" rotate="-25deg" width="180%" height="4px" opacity={0.8} delay={0.5} />
              <BreathingBeam bottom="15%" right="-10%" rotate="-25deg" width="160%" height="2px" opacity={0.6} delay={1} />
              <BreathingBeam bottom="31%" right="-15%" rotate="-25deg" width="190%" height="6px" opacity={0.9} delay={1.5} />
              <BreathingBeam bottom="43%" right="-20%" rotate="-25deg" width="140%" height="2px" opacity={0.5} delay={2} />
              <BreathingBeam bottom="30%" right="-15%" rotate="-25deg" width="190%" height="20px" opacity={0.2} blur="20px" delay={1.5} />
          </div>
        </motion.div>

        <motion.div style={{ y: textY, opacity: heroContentOpacity }} className="relative z-20 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-[22vw] sm:text-[190px] font-sans font-bold text-white leading-none tracking-[-0.05em] drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          >
            Simplicity.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1.5 }} className="mt-8 text-white/80 text-base sm:text-2xl font-sans font-light tracking-[0.8em] uppercase drop-shadow-2xl">
            Pure. Precise. Purposeful.
          </motion.p>
        </motion.div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-30">
          <svg className="relative block w-[calc(180%+1.3px)] h-[120px] sm:h-[180px] opacity-10 translate-y-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill={darkMode ? "#0A0A0A" : "#fafafa"}></path>
          </svg>
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }} transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}>
            <svg className="absolute bottom-[-1px] left-0 block w-[calc(220%+1.3px)] h-[120px] sm:h-[160px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z" fill={darkMode ? "#0A0A0A" : "#fafafa"}></path>
            </svg>
          </motion.div>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <main className="relative z-40 px-8 max-w-[1300px] mx-auto bg-white dark:bg-[#0A0A0A] pt-56 transition-colors duration-300">

        {/* PROFILE INTRO */}
        <div className="flex flex-col lg:flex-row items-center gap-24 mb-64">
          <motion.div {...fadeInUp} className="relative group cursor-pointer" onClick={() => setSelectedProfileImage(profilePic)}>
            <motion.div
              variants={idleFloating}
              animate="animate"
              className="w-72 h-[400px] sm:w-[450px] sm:h-[580px] bg-[#EAB308] rounded-[90px] relative overflow-hidden rotate-2 shadow-xl transition-all duration-700 group-hover:rotate-0 group-hover:brightness-110"
            >
              <div className="absolute inset-4 bg-[#1E1E1E] dark:bg-black rounded-[75px] flex items-end justify-center overflow-hidden">
                <img src={profilePic} alt="Ron Medina" className="w-full h-full object-cover opacity-90 transition-opacity group-hover:opacity-100" />
              </div>
            </motion.div>
            <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -inset-16 bg-[#EAB308]/10 blur-[80px] -z-10" />
          </motion.div>

          <motion.div {...fadeInUp} className="flex-1 text-center lg:text-left">
            <h2 className="text-5xl sm:text-7xl lg:text-[90px] font-sans font-bold mb-6 tracking-tighter leading-[0.85] text-[#1E1E1E] dark:text-white">I'm Ron Medina</h2>
            <p className="text-[#4A4A4A] dark:text-[#A0A0A0] text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-xl font-sans font-light">
              Designing <span className="text-[#1E1E1E] dark:text-white font-medium italic">Simplicity</span> out of complexity.
              Currently crafting digital experiences that matter.
            </p>
          </motion.div>
        </div>

        {/* ALL SECTIONS AS 3D RINGS */}
        <RingSection 
          title="Brand Identity" 
          description="Infinite orbit of guidelines and identity systems." 
          items={brandGuidelineAssets} 
          align="left"
        />

        <RingSection 
          title="UI/UX Design" 
          description="Digital interfaces circling back and forth." 
          items={uiuxAssets} 
          align="right"
        />

        <RingSection 
          title="Social Media" 
          description="Dynamic content orbiting in 3D space." 
          items={socialAssetsRaw} 
          align="left"
        />

        <RingSection 
          title="Brand Guidelines" 
          description="Comprehensive brand identity systems." 
          items={brandGuidelineAssets} 
          align="right"
        />

        <RingSection 
          title="Presentations & Print" 
          description="Professional presentation and print materials." 
          items={brandPresentationAssets} 
          align="left"
        />

        <RingSection 
          title="Social Media Posters" 
          description="Engaging social media visual content." 
          items={socialAssets} 
          align="right"
        />

        <RingSection 
          title="Interface Design" 
          description="Clean and intuitive user interfaces." 
          items={uiuxAssets} 
          align="left"
        />

        {/* PROMISE SECTION */}
        <motion.div initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="mt-32 mb-64">
          <motion.h3 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-7xl font-sans font-bold leading-[1.1] mb-16 tracking-tighter text-center sm:text-left text-[#1E1E1E] dark:text-white">
            Always delivering,<br /> <span className="text-[#EAB308] underline decoration-2 underline-offset-[16px]">two things.</span>
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            <motion.div variants={fadeInUp} className="space-y-6 p-8 rounded-[40px] bg-white dark:bg-[#1A1A1A] border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-sm hover:shadow-lg transition-all duration-700">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-sans font-black text-[#EAB308]/20 italic">01.</span>
                <h4 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-[#1E1E1E] dark:text-white">Designs you will love.</h4>
              </div>
              <p className="text-[#4A4A4A] dark:text-[#A0A0A0] text-lg font-sans leading-relaxed">I love creating new things — it's what drives me. Great teamwork always brings ideas to life.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-6 p-8 rounded-[40px] bg-white dark:bg-[#1A1A1A] border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-sm hover:shadow-lg transition-all duration-700">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-sans font-black text-[#EAB308]/20 italic">02.</span>
                <h4 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-[#1E1E1E] dark:text-white">Stress free work.</h4>
              </div>
              <p className="text-[#4A4A4A] dark:text-[#A0A0A0] text-lg font-sans leading-relaxed">I keep things simple — no stress, no drama — just results that help move forward.</p>
            </motion.div>
          </div>
        </motion.div>
      </main>

      <footer className="bg-[#1E1E1E] dark:bg-black py-48 px-8 overflow-hidden relative z-40">
        <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 40 }} className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-white text-6xl sm:text-7xl lg:text-8xl font-sans font-bold mb-12 tracking-tighter leading-none">Let's Talk.</h2>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:hello@ronmedina.com"
            className="group inline-flex items-center gap-4 px-12 py-6 bg-[#EAB308] rounded-full font-sans font-bold text-lg sm:text-xl text-[#1E1E1E] hover:bg-[#EAB308]/90 transition-all shadow-[0_40px_100px_rgba(234,179,8,0.3)]"
          >
            Get in touch <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500" />
          </motion.a>
        </motion.div>

        <div className="absolute bottom-[-20%] left-0 w-full opacity-[0.012] pointer-events-none select-none">
          <span className="text-[48vw] font-sans font-black text-white whitespace-nowrap leading-none">RON MEDINA</span>
        </div>
      </footer>

      {/* Profile Image Modal */}
      <ImageModal 
        src={selectedProfileImage} 
        alt="Ron Medina profile" 
        isOpen={!!selectedProfileImage} 
        onClose={() => setSelectedProfileImage(null)} 
      />
    </div>
  )
}

export default App


//done