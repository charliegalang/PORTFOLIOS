import React, { useRef, useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Sun, Moon, X, Menu, Upload, Copy, Check, ArrowRight, ChevronDown, Save
} from 'lucide-react'

// Components
import RichTextEditor from '../components/RichTextEditor'
import GallerySection from '../components/GallerySection'
import ExperienceSection from '../components/ExperienceSection'
import CrudControls from '../components/CrudControls'
import ImageModal from '../components/ImageModal'
import SectionTitle from '../components/SectionTitle'
import StatItem from '../components/StatItem'
import PromiseItem from '../components/PromiseItem'

// Services
import { uploadToCloudinary, fetchImagesByTag, deleteFromCloudinary } from '../services/CloudinaryService'
import { fetchPortfolio, savePortfolio } from '../services/PortfolioService'

// Hooks
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useEditMode } from '../hooks/useEditMode'
import { useDarkMode } from '../hooks/useDarkMode'
import { useScrollEffects } from '../hooks/useScrollEffects'

function Portfolio() {
  const isEditMode = useEditMode();
  const [darkMode, setDarkMode] = useDarkMode();
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // States
  const [gallerySections, setGallerySections] = useState([]);
  const [profileUrl, setProfileUrl] = useState('');
  const [profileId, setProfileId] = useState('');
  const [bgUrl, setBgUrl] = useState('');
  const [bgId, setBgId] = useState('');
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [aboutName, setAboutName] = useState("");
  const [aboutText, setAboutText] = useState("");
  const [stats, setStats] = useState([]);
  const [promiseItems, setPromiseItems] = useState([]);
  const [twoThingsTitle, setTwoThingsTitle] = useState("Two Things");
  const [twoThingsSubtitle, setTwoThingsSubtitle] = useState("");
  const [contactTitle, setContactTitle] = useState("");
  const [contactText, setContactText] = useState("");
  const [contactButton, setContactButton] = useState("");
  const [footerName, setFooterName] = useState("");
  const [footerText, setFooterText] = useState("");
  const [footerEmail, setFooterEmail] = useState("");
  const [copyright, setCopyright] = useState("");
  const [experienceData, setExperienceData] = useState(null);

  // Load from database instead of localStorage
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchPortfolio();
      if (data) {
        setGallerySections(data.gallerySections || []);
        setProfileUrl(data.profileUrl || '');
        setProfileId(data.profileId || '');
        setBgUrl(data.bgUrl || '');
        setBgId(data.bgId || '');
        setHeroTitle(data.heroTitle || "");
        setHeroSubtitle(data.heroSubtitle || "");
        setAboutName(data.aboutName || "");
        setAboutText(data.aboutText || "");
        setStats(data.stats || []);
        setPromiseItems(data.promiseItems || []);
        setTwoThingsTitle(data.twoThingsTitle || "Two Things");
        setTwoThingsSubtitle(data.twoThingsSubtitle || "");
        setContactTitle(data.contactTitle || "");
        setContactText(data.contactText || "");
        setContactButton(data.contactButton || "");
        setFooterName(data.footerName || "");
        setFooterText(data.footerText || "");
        setFooterEmail(data.footerEmail || "");
        setCopyright(data.copyright || "");
        setExperienceData(data.experienceData || null);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  const handleGlobalSave = async () => {
    setIsSaving(true);
    try {
      const payload = {
        gallerySections, profileUrl, profileId, bgUrl, bgId, heroTitle, heroSubtitle,
        aboutName, aboutText, stats, promiseItems, twoThingsTitle, twoThingsSubtitle,
        contactTitle, contactText, contactButton, footerName, footerText, footerEmail,
        copyright, experienceData
      };
      await savePortfolio(payload);
      alert('Portfolio saved successfully!');
    } catch (error) {
      alert('Failed to save: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Gallery Section CRUD
  const addGallerySection = () => {
    const newSection = { id: generateId(), categoryId: generateId(), title: 'New Gallery Section', subtitle: 'Add a description here', images: [] };
    setGallerySections(prev => [...prev, newSection]);
  };

  const deleteGallerySection = (sectionId) => {
    if (confirm("Delete this entire gallery section?")) {
      setGallerySections(prev => prev.filter(s => s.id !== sectionId));
    }
  };

  const moveGallerySection = (sectionId, direction) => {
    setGallerySections(prev => {
      const index = prev.findIndex(s => s.id === sectionId);
      if ((direction === 'up' && index === 0) || (direction === 'down' && index === prev.length - 1)) return prev;
      const newSections = [...prev];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
      return newSections;
    });
  };

  const updateGallerySection = (sectionId, field, value) => {
    setGallerySections(prev => prev.map(section => section.id === sectionId ? { ...section, [field]: value } : section));
  };

  const updateGalleryImages = (sectionId, images) => {
    setGallerySections(prev => prev.map(section => section.id === sectionId ? { ...section, images } : section));
  };

  // Stats CRUD
  const addStat = () => setStats(prev => [...prev, { id: generateId(), n: '', l: '' }]);
  const updateStat = (id, field, value) => setStats(prev => prev.map(stat => stat.id === id ? { ...stat, [field]: value } : stat));
  const deleteStat = (id) => confirm("Delete this stat?") && setStats(prev => prev.filter(stat => stat.id !== id));
  const moveStat = (id, direction) => {
    setStats(prev => {
      const index = prev.findIndex(s => s.id === id);
      if ((direction === 'up' && index === 0) || (direction === 'down' && index === prev.length - 1)) return prev;
      const newStats = [...prev];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      [newStats[index], newStats[newIndex]] = [newStats[newIndex], newStats[index]];
      return newStats;
    });
  };

  // Promise Items CRUD
  const addPromiseItem = () => {
    const newNumber = (promiseItems.length + 1).toString().padStart(2, '0');
    setPromiseItems(prev => [...prev, { id: generateId(), n: newNumber, t: '', d: '' }]);
  };

  const updatePromiseItem = (id, field, value) => setPromiseItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  const deletePromiseItem = (id) => confirm("Delete this promise item?") && setPromiseItems(prev => prev.filter(item => item.id !== id));
  const movePromiseItem = (id, direction) => {
    setPromiseItems(prev => {
      const index = prev.findIndex(i => i.id === id);
      if ((direction === 'up' && index === 0) || (direction === 'down' && index === prev.length - 1)) return prev;
      const newItems = [...prev];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
      return newItems.map((item, i) => ({ ...item, n: (i + 1).toString().padStart(2, '0') }));
    });
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const heroRef = useRef(null);
  const workRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const { scrolled, heroOpacity, heroScale } = useScrollEffects(heroRef);

  const handleStaticUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const currentImages = await fetchImagesByTag(`static_${type}`);
    if (currentImages.length > 0) {
      for (const img of currentImages) await deleteFromCloudinary(img.public_id);
    }
    const data = await uploadToCloudinary(file, `static_${type}`);
    if (data) {
      if (type === 'profile') { setProfileUrl(data.url); setProfileId(data.public_id); }
      else { setBgUrl(data.url); setBgId(data.public_id); }
    }
  }

  const allAssets = useMemo(() => gallerySections.flatMap(section => section.images), [gallerySections]);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  }

  if (loading) {
    return <div className="fixed inset-0 bg-black flex items-center justify-center"><div className="w-16 h-16 border-4 border-[#EAB308] border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="bg-theme-primary text-theme-primary transition-colors duration-500 overflow-x-hidden min-h-screen relative">
      {isEditMode && (
        <div className="fixed bottom-8 right-8 z-[60]">
          <button
            onClick={handleGlobalSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-4 bg-green-500 text-white rounded-full font-bold shadow-2xl hover:bg-green-600 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {isSaving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={20} />}
            {isSaving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      )}

      <motion.nav
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 transition-all ${scrolled ? "bg-theme-primary/80 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4"}`}
      >
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
          <div className="w-10 h-10 rounded-full bg-[#EAB308] overflow-hidden"><img src={profileUrl} alt="Ron" className="w-full h-full object-cover" /></div>
          <span className={`font-bold transition-colors ${scrolled ? "text-theme-primary" : "text-white"}`}>RON MEDINA</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <div className={`flex gap-8 text-sm font-medium transition-colors ${scrolled ? "text-theme-secondary" : "text-white/80"}`}>
            <button onClick={() => scrollToSection(workRef)} className="hover:text-[#EAB308] transition-colors">Work</button>
            <button onClick={() => scrollToSection(aboutRef)} className="hover:text-[#EAB308] transition-colors">About</button>
            <button onClick={() => scrollToSection(contactRef)} className="hover:text-[#EAB308] transition-colors">Contact</button>
          </div>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full transition-colors bg-white/10">{darkMode ? <Sun size={18} className={scrolled ? "text-theme-primary" : "text-white"} /> : <Moon size={18} className={scrolled ? "text-theme-primary" : "text-white"} />}</button>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 bg-white/10 rounded-full transition-colors">{mobileMenuOpen ? <X size={18} className={scrolled || darkMode ? "text-theme-primary" : "text-white"} /> : <Menu size={18} className={scrolled || darkMode ? "text-theme-primary" : "text-white"} />}</button>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-20 left-4 right-4 md:hidden bg-theme-primary rounded-2xl shadow-xl border border-theme p-4">
              <div className="flex flex-col gap-4">
                <button onClick={() => scrollToSection(workRef)} className="text-left px-4 py-3 hover:bg-theme-secondary rounded-xl transition-colors text-theme-primary">Work</button>
                <button onClick={() => scrollToSection(aboutRef)} className="text-left px-4 py-3 hover:bg-theme-secondary rounded-xl transition-colors text-theme-primary">About</button>
                <button onClick={() => scrollToSection(contactRef)} className="text-left px-4 py-3 hover:bg-theme-secondary rounded-xl transition-colors text-theme-primary">Contact</button>
                <div className="border-t border-theme pt-4"><button onClick={() => setDarkMode(!darkMode)} className="flex items-center justify-between w-full px-4 py-3 hover:bg-theme-secondary rounded-xl transition-colors text-theme-primary"><span>Theme</span> {darkMode ? <Sun size={18} /> : <Moon size={18} />}</button></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-black transition-colors duration-500">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0">
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 20, repeat: Infinity }} className="absolute inset-0">
            <img src={bgUrl} alt="Background" className="w-full h-full object-cover opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/20 transition-colors duration-500" />
          </motion.div>
        </motion.div>
        {isEditMode && (
          <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30">
            <input type="file" onChange={(e)=>handleStaticUpload(e,'bg')} className="hidden" id="bg-upload" />
            <label htmlFor="bg-upload" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold cursor-pointer border border-white/20 transition-all flex items-center gap-2"><Upload size={14} /> Update Background</label>
          </div>
        )}
        <div className="relative z-10 text-center px-4 w-full">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="flex flex-col items-center">
            <RichTextEditor value={heroTitle} onSave={setHeroTitle} isEditMode={isEditMode} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-4 sm:mb-6 tracking-tighter px-2" placeholder="Hero Title" />
            <RichTextEditor value={heroSubtitle} onSave={setHeroSubtitle} isEditMode={isEditMode} className="text-white/80 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl tracking-[0.3em] sm:tracking-[0.5em] uppercase mb-8 sm:mb-12 px-4" placeholder="Hero Subtitle" />
          </motion.div>
        </div>
        <button onClick={() => scrollToSection(workRef)} className="absolute bottom-8 sm:bottom-12 md:bottom-16 lg:bottom-20 left-1/2 -translate-x-1/2 cursor-pointer hover:text-[#EAB308] transition-colors z-20">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}><ChevronDown size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-white/60 hover:text-[#EAB308]" /></motion.div>
        </button>
      </section>

      <main className="relative z-20 bg-theme-primary transition-colors duration-500">
        <section ref={aboutRef} className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative group cursor-pointer">
                <div className="relative aspect-[3/4] max-w-sm sm:max-w-md mx-auto" onClick={() => setSelectedImage({url: profileUrl})}>
                  <div className="absolute inset-0 bg-[#EAB308] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] rotate-3 group-hover:rotate-6 transition-transform duration-500" />
                  <div className="absolute inset-3 sm:inset-4 bg-black rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden transition-colors duration-500"><img src={profileUrl} alt="Ron" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" /></div>
                </div>
                {isEditMode && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30">
                    <input type="file" onChange={(e)=>handleStaticUpload(e,'profile')} className="hidden" id="profile-upload" />
                    <label htmlFor="profile-upload" className="bg-[#EAB308] text-black px-4 py-2 rounded-full text-xs font-bold cursor-pointer shadow-xl transition-all flex items-center gap-2"><Upload size={14} /> Update Profile</label>
                  </div>
                )}
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4 sm:space-y-5 md:space-y-6 px-2 sm:px-0">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] text-theme-primary min-h-[1.5em]"><RichTextEditor value={aboutName} onSave={setAboutName} isEditMode={isEditMode} className="text-[#EAB308] inline-block" placeholder="Your Name" /></h2>
                <div><RichTextEditor value={aboutText} onSave={setAboutText} isEditMode={isEditMode} className="text-base sm:text-lg md:text-xl lg:text-2xl text-theme-secondary leading-relaxed" placeholder="Designing simplicity out of complexity. Currently crafting digital experiences that matter." /></div>
                <div className="flex gap-4 sm:gap-6 md:gap-8 pt-4 sm:pt-6 md:pt-8 relative">
                  {isEditMode && <CrudControls onAdd={addStat} className="absolute -top-8 right-0" />}
                  {stats.map((stat, i) => <StatItem key={stat.id} stat={stat} index={i} onUpdate={(field, value) => updateStat(stat.id, field, value)} onDelete={() => deleteStat(stat.id)} onMove={(direction) => moveStat(stat.id, direction)} isEditMode={isEditMode} />)}
                </div>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => scrollToSection(contactRef)} className="mt-4 sm:mt-6 md:text-lg group inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-[#EAB308] text-black rounded-full text-sm sm:text-base font-medium">Let's work together <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px] group-hover:translate-x-1 transition-transform" /></motion.button>
              </motion.div>
            </div>
          </div>
        </section>

        <ExperienceSection isEditMode={isEditMode} data={experienceData} onChange={setExperienceData} />

        <section ref={workRef} className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12 bg-theme-secondary transition-colors duration-500">
          <div className="max-w-7xl mx-auto">
            {isEditMode && <div className="mb-8 flex justify-center"><button onClick={addGallerySection} className="flex items-center gap-2 px-8 py-4 bg-green-500 text-white rounded-full font-bold hover:bg-green-600 transition-all hover:scale-105 shadow-lg"><Plus size={20} />Add New Gallery Section</button></div>}
            {gallerySections.map((section, index) => (
              <GallerySection key={section.id} id={section.id} categoryId={section.categoryId} images={section.images} title={section.title} subtitle={section.subtitle} onImageClick={setSelectedImage} isEditMode={isEditMode} onUpload={(data) => { const updatedImages = [...section.images, data]; updateGalleryImages(section.id, updatedImages); }} onDelete={(imageIndex) => { const updatedImages = section.images.filter((_, idx) => idx !== imageIndex); updateGalleryImages(section.id, updatedImages); }} onTitleEdit={(val) => updateGallerySection(section.id, 'title', val)} onSubtitleEdit={(val) => updateGallerySection(section.id, 'subtitle', val)} onMoveUp={index > 0 ? () => moveGallerySection(section.id, 'up') : null} onMoveDown={index < gallerySections.length - 1 ? () => moveGallerySection(section.id, 'down') : null} onDeleteSection={() => deleteGallerySection(section.id)} showMoveUp={index > 0} showMoveDown={index < gallerySections.length - 1} />
            ))}
          </div>
        </section>

        <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12 bg-theme-primary transition-colors duration-500">
          <div className="max-w-7xl mx-auto relative">
            {isEditMode && <CrudControls onAdd={addPromiseItem} className="absolute -top-12 right-0" />}
            <SectionTitle align="center" subtitle={twoThingsSubtitle} isEditMode={isEditMode} onTitleEdit={setTwoThingsTitle} onSubtitleEdit={setTwoThingsSubtitle}>{twoThingsTitle}</SectionTitle>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mt-8 sm:mt-10 md:mt-12 lg:mt-16">{promiseItems.map((item, i) => <PromiseItem key={item.id} item={item} index={i} onUpdate={(field, value) => updatePromiseItem(item.id, field, value)} onDelete={() => deletePromiseItem(item.id)} onMove={(direction) => movePromiseItem(item.id, direction)} isEditMode={isEditMode} />)}</div>
          </div>
        </section>

        <section ref={contactRef} className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12 bg-[#EAB308] text-center">
          <RichTextEditor value={contactTitle} onSave={setContactTitle} isEditMode={isEditMode} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black mb-4 sm:mb-5 px-2" placeholder="Contact Title" />
          <RichTextEditor value={contactText} onSave={setContactText} isEditMode={isEditMode} className="text-base sm:text-lg md:text-xl text-black/80 mb-6 sm:mb-8 max-w-2xl mx-auto px-4" placeholder="Contact description..." />
          <RichTextEditor value={contactButton} onSave={setContactButton} isEditMode={isEditMode} className="group inline-flex items-center gap-2 sm:gap-3 md:gap-4 px-6 md:px-10 py-3 md:py-5 bg-black text-white rounded-full text-sm md:text-lg font-medium" placeholder="Button text" />
        </section>
      </main>

      <footer className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-theme-primary border-t border-theme relative overflow-hidden transition-colors duration-500">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 text-left">
            <div>
              <RichTextEditor value={footerName} onSave={setFooterName} isEditMode={isEditMode} className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5 md:mb-6" placeholder="Your Name" />
              <RichTextEditor value={footerText} onSave={setFooterText} isEditMode={isEditMode} className="text-sm sm:text-base text-theme-secondary opacity-60" placeholder="Footer text" />
              {isEditMode && <div className="mt-8 p-4 bg-theme-secondary rounded-2xl border border-theme inline-block"><p className="text-xs font-bold text-[#EAB308] mb-2 uppercase tracking-wider">Public Link</p><button onClick={() => { navigator.clipboard.writeText("https://portfolioss-4gai.onrender.com/"); setCopied(true); setTimeout(()=>setCopied(false),2000); }} className="flex items-center gap-2 px-4 py-2 bg-[#EAB308] text-black rounded-full text-sm font-bold active:scale-95">{copied ? <Check size={16} /> : <Copy size={16} />} {copied ? "Copied!" : "Copy Public Link"}</button></div>}
              <div className="flex gap-3 sm:gap-4 mt-8">
                <a href="https://linkedin.com" target="_blank" className="w-8 h-8 sm:w-10 sm:h-10 bg-theme-secondary border border-theme rounded-full flex items-center justify-center hover:bg-[#EAB308] hover:text-black transition-colors"><svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
                <a href="https://instagram.com" target="_blank" className="w-8 h-8 sm:w-10 sm:h-10 bg-theme-secondary border border-theme rounded-full flex items-center justify-center hover:bg-[#EAB308] hover:text-black transition-colors"><svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/></svg></a>
              </div>
            </div>
            <div><h4 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 md:mb-6">Navigation</h4><ul className="space-y-2 sm:space-y-2.5 opacity-60 text-sm sm:text-base"><li><button onClick={() => scrollToSection(workRef)} className="hover:text-[#EAB308]">Work</button></li><li><button onClick={() => scrollToSection(aboutRef)} className="hover:text-[#EAB308]">About</button></li><li><button onClick={() => scrollToSection(contactRef)} className="hover:text-[#EAB308]">Contact</button></li></ul></div>
            <div><h4 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 md:mb-6">Connect</h4><ul className="space-y-2 sm:space-y-2.5 opacity-60 text-sm sm:text-base"><li><RichTextEditor value={footerEmail} onSave={setFooterEmail} isEditMode={isEditMode} className="hover:text-[#EAB308]" placeholder="email@example.com" /></li><li><a href="https://linkedin.com" target="_blank" className="hover:text-[#EAB308]">LinkedIn</a></li><li><a href="https://instagram.com" target="_blank" className="hover:text-[#EAB308]">Instagram</a></li></ul></div>
          </div>
          <RichTextEditor value={copyright} onSave={setCopyright} isEditMode={isEditMode} className="mt-16 text-center opacity-40 text-sm" placeholder="Copyright text" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 text-center opacity-[0.03] pointer-events-none text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black whitespace-nowrap text-theme-primary">RON MEDINA • RON MEDINA • RON MEDINA</div>
      </footer>

      <ImageModal src={selectedImage} isOpen={selectedImage !== null} onClose={() => setSelectedImage(null)} onNext={() => setSelectedImage(allAssets[(allAssets.indexOf(selectedImage) + 1) % allAssets.length])} onPrev={() => setSelectedImage(allAssets[(allAssets.indexOf(selectedImage) - 1 + allAssets.length) % allAssets.length])} />
    </div>
  )
}

export default Portfolio;
