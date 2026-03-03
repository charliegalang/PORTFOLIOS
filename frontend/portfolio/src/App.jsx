import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { Plus, Moon, Sun, X, ChevronDown, Sparkles, Eye, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
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

// Combined assets for modal navigation
const allAssets = [
  ...brandGuidelineAssets,
  ...uiuxAssets,
  ...socialAssetsRaw,
  ...brandPresentationAssets
]

// Image Modal Component
const ImageModal = ({ src, allImages, isOpen, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onPrev, onNext])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={(e) => { e.stopPropagation(); onClose() }}
            className="absolute top-8 right-8 p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors z-[101]"
          >
            <X size={28} className="text-white" />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev() }}
            className="absolute left-4 md:left-8 p-4 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full transition-all group z-[101]"
          >
            <ChevronLeft size={32} className="text-white group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onNext() }}
            className="absolute right-4 md:right-8 p-4 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full transition-all group z-[101]"
          >
            <ChevronRight size={32} className="text-white group-hover:scale-110 transition-transform" />
          </button>
          
          <motion.div
            key={src}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative max-w-[85vw] max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={src} 
              alt="Project View"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Project Card Component
const ProjectCard = ({ src, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative cursor-pointer"
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
        <motion.p 
          initial={{ y: 20 }}
          animate={{ y: isHovered ? 0 : 20 }}
          className="text-white text-sm font-light tracking-wider"
        >
          Project {String(index + 1).padStart(2, '0')}
        </motion.p>
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          className="h-[2px] w-16 bg-[#EAB308] origin-left mt-2"
        />
      </div>
      
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-black">
        <img 
          src={src} 
          alt={`Project ${index + 1}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0 }}
          className="absolute top-4 right-4 z-30 p-3 bg-[#EAB308] rounded-full"
        >
          <Eye size={18} className="text-black" />
        </motion.div>
      </div>
    </motion.div>
  )
}

const SectionTitle = ({ children, align = "left", subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`mb-12 ${align === 'center' ? 'text-center' : ''}`}
  >
    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1E1E1E] dark:text-white">
      {children}
    </h2>
    {subtitle && (
      <p className="mt-4 text-[#4A4A4A] dark:text-[#A0A0A0] text-lg max-w-2xl mx-auto">
        {subtitle}
      </p>
    )}
    <div className={`h-[2px] w-24 bg-[#EAB308] mt-6 ${align === 'center' ? 'mx-auto' : ''}`} />
  </motion.div>
)

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const heroRef = useRef(null)
  const mainRef = useRef(null)

  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(isDark)

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.8])

  const openModal = (src) => {
    const index = allAssets.indexOf(src)
    setSelectedImageIndex(index)
  }

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % allAssets.length)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + allAssets.length) % allAssets.length)
  }

  return (
    <div className="bg-white dark:bg-black text-[#1E1E1E] dark:text-white transition-colors duration-500 overflow-x-hidden">
      
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-6 transition-all ${
          scrolled ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-[#EAB308] overflow-hidden">
            <img src={profilePic} alt="Ron" className="w-full h-full object-cover" />
          </div>
          <span className={`font-bold transition-colors ${scrolled ? "text-[#1E1E1E] dark:text-white" : "text-white"}`}>
            RON MEDINA
          </span>
        </motion.div>

        <div className="flex items-center gap-8">
          <div className={`hidden md:flex gap-8 text-sm font-medium transition-colors ${scrolled ? "text-[#4A4A4A] dark:text-white/80" : "text-white/80"}`}>
            {['Work', 'About', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ y: -2 }}
                className="hover:text-[#EAB308] transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>
          
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full transition-colors ${scrolled ? "bg-black/5 dark:bg-white/10" : "bg-white/10"}`}
          >
            {darkMode ? <Sun size={18} className="text-white" /> : <Moon size={18} className={scrolled ? "text-[#1E1E1E]" : "text-white"} />}
          </button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute inset-0"
          >
            <img src={bgImage} alt="Background" className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black" />
          </motion.div>
        </motion.div>

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1 
              className="text-7xl md:text-9xl font-bold text-white mb-6 tracking-tighter"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(234,179,8,0.3)",
                  "0 0 40px rgba(234,179,8,0.5)",
                  "0 0 20px rgba(234,179,8,0.3)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Simplicity.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-white/80 text-xl md:text-2xl tracking-[0.5em] uppercase mb-12"
            >
              Pure. Precise. Purposeful.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-20 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ChevronDown size={32} className="text-white/60" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main ref={mainRef} className="relative z-20 bg-white dark:bg-black">
        
        {/* Profile Section */}
        <section className="py-32 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative group cursor-pointer"
                onClick={() => openModal(profilePic)}
              >
                <div className="relative aspect-[3/4] max-w-md mx-auto">
                  <div className="absolute inset-0 bg-[#EAB308] rounded-[60px] rotate-3 group-hover:rotate-6 transition-transform duration-500" />
                  <div className="absolute inset-4 bg-black rounded-[50px] overflow-hidden">
                    <img 
                      src={profilePic} 
                      alt="Ron Medina"
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-5xl md:text-7xl font-bold leading-[1.1]">
                  I'm <span className="text-[#EAB308]">Ron Medina</span>
                </h2>
                <p className="text-xl md:text-2xl text-[#4A4A4A] dark:text-[#A0A0A0] leading-relaxed">
                  Designing simplicity out of complexity. 
                  <span className="block mt-4 text-[#1E1E1E] dark:text-white font-medium">
                    Currently crafting digital experiences that matter.
                  </span>
                </p>

                <div className="flex gap-8 pt-8">
                  {[
                    { number: '5+', label: 'Years Experience' },
                    { number: '100+', label: 'Projects' },
                    { number: '50+', label: 'Happy Clients' }
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="text-3xl font-bold text-[#EAB308]">{stat.number}</div>
                      <div className="text-sm text-[#4A4A4A] dark:text-[#A0A0A0]">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Work Sections */}
        <section className="py-32 px-6 md:px-12 bg-[#F5F5F5] dark:bg-black">
          <div className="max-w-7xl mx-auto">
            
            {/* UI/UX Design */}
            <SectionTitle align="center" subtitle="Clean, intuitive interfaces for digital products">
              UI/UX Design
            </SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
              {uiuxAssets.slice(0, 6).map((src, i) => (
                <ProjectCard 
                  key={i}
                  src={src}
                  index={i}
                  onClick={() => openModal(src)}
                />
              ))}
            </div>

            {/* Brand Identity */}
            <SectionTitle align="center" subtitle="Guidelines and identity systems that define brands">
              Brand Identity
            </SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
              {brandGuidelineAssets.slice(0, 6).map((src, i) => (
                <ProjectCard 
                  key={i}
                  src={src}
                  index={i}
                  onClick={() => openModal(src)}
                />
              ))}
            </div>

            {/* Social Media */}
            <SectionTitle align="center" subtitle="Engaging visual content for social platforms">
              Social Media
            </SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
              {socialAssetsRaw.slice(0, 6).map((src, i) => (
                <ProjectCard 
                  key={i}
                  src={src}
                  index={i}
                  onClick={() => openModal(src)}
                />
              ))}
            </div>

            {/* Presentations & Print */}
            <SectionTitle align="center" subtitle="Professional presentation and print materials">
              Presentations & Print
            </SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
              {brandPresentationAssets.slice(0, 6).map((src, i) => (
                <ProjectCard
                  key={i}
                  src={src}
                  index={i}
                  onClick={() => openModal(src)}
                />
              ))}
            </div>

            {/* View All Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#EAB308] text-black rounded-full font-medium"
              >
                View All Projects
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Promise Section */}
        <section className="py-32 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <SectionTitle align="center" subtitle="What I always deliver">
              Two Things
            </SectionTitle>

            <div className="grid md:grid-cols-2 gap-8 mt-16">
              {[
                {
                  number: "01",
                  title: "Designs you will love",
                  description: "I love creating new things — it's what drives me. Great teamwork always brings ideas to life."
                },
                {
                  number: "02",
                  title: "Stress free work",
                  description: "I keep things simple — no stress, no drama — just results that help move forward."
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="group p-8 rounded-[40px] bg-white dark:bg-black border border-[#E5E5E5] dark:border-[#2A2A2A] hover:shadow-xl transition-all duration-500"
                >
                  <div className="text-6xl font-black text-[#EAB308]/20 mb-6">{item.number}</div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{item.title}</h3>
                  <p className="text-[#4A4A4A] dark:text-[#A0A0A0] text-lg leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6 md:px-12 bg-[#EAB308]">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Sparkles className="mx-auto mb-8 text-black opacity-50" size={48} />
              <h2 className="text-5xl md:text-7xl font-bold text-black mb-8">Let's create something amazing</h2>
              <p className="text-xl text-black/80 mb-12 max-w-2xl mx-auto">
                Ready to bring your ideas to life? Let's collaborate and make something extraordinary together.
              </p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:hello@ronmedina.com"
                className="group inline-flex items-center gap-4 px-12 py-6 bg-black text-white rounded-full text-lg font-medium hover:bg-black/90 transition-colors"
              >
                Get in touch
                <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500" />
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-24 px-6 md:px-12 bg-black text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-2xl font-bold mb-6">Ron Medina</h4>
              <p className="text-white/60">Designing simplicity out of complexity.</p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-6">Navigation</h4>
              <ul className="space-y-3 text-white/60">
                {['Work', 'About', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-6">Connect</h4>
              <ul className="space-y-3 text-white/60">
                <li>
                  <a href="mailto:hello@ronmedina.com" className="hover:text-white transition-colors">
                    hello@ronmedina.com
                  </a>
                </li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-16 pt-8 text-center text-white/40 text-sm">
            <p>© 2024 Ron Medina. All rights reserved.</p>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 text-center opacity-[0.03] pointer-events-none text-8xl font-black whitespace-nowrap">
          RON MEDINA • RON MEDINA • RON MEDINA
        </div>
      </footer>

      {/* Image Modal with Navigation */}
      <ImageModal 
        src={selectedImageIndex !== null ? allAssets[selectedImageIndex] : null}
        isOpen={selectedImageIndex !== null}
        onClose={() => setSelectedImageIndex(null)}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </div>
  )
}

export default App;