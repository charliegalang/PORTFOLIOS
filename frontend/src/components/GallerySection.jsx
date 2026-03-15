import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Upload, Trash2, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Trash, Eye
} from 'lucide-react';
import { uploadToCloudinary, deleteFromCloudinary } from '../services/CloudinaryService';
import RichTextEditor from './RichTextEditor';

const GallerySection = ({
  id,
  categoryId,
  images,
  title,
  subtitle,
  onImageClick,
  isEditMode,
  onUpload,
  onDelete,
  onTitleEdit,
  onSubtitleEdit,
  onMoveUp,
  onMoveDown,
  onDeleteSection,
  showMoveUp,
  showMoveDown
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mainImageLoaded, setMainImageLoaded] = useState(false)
  const [thumbnailsLoaded, setThumbnailsLoaded] = useState({})
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const autoPlayRef = useRef(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (images.length <= 1 || !isAutoPlaying) return

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
      setMainImageLoaded(false)
    }, 5000)

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [images.length, isAutoPlaying])

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      setIsUploading(true)
      const data = await uploadToCloudinary(file, categoryId);
      if (data) onUpload(data)
      setIsUploading(false)
    }
  }

  const selectImage = (index) => {
    setCurrentIndex(index)
    setMainImageLoaded(false)
  }

  const nextImage = () => {
    if (images.length === 0) return
    setCurrentIndex((prev) => (prev + 1) % images.length)
    setMainImageLoaded(false)
  }

  const prevImage = () => {
    if (images.length === 0) return
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    setMainImageLoaded(false)
  }

  const handleThumbnailLoad = (index) => {
    setThumbnailsLoaded(prev => ({ ...prev, [index]: true }))
  }

  const getFlexClasses = () => {
    const count = images.length
    return 'flex flex-wrap justify-center gap-3'
  }

  const getThumbnailWidth = () => {
    const count = images.length
    if (count === 1) return 'w-full max-w-[200px]'
    if (count === 2) return 'w-[calc(50%-6px)] max-w-[150px]'
    if (count === 3) return 'w-[calc(33.333%-8px)] max-w-[120px]'
    if (count === 4) return 'w-[calc(50%-6px)] sm:w-[calc(25%-9px)] max-w-[120px]'
    if (count === 5) return 'w-[calc(50%-6px)] sm:w-[calc(33.333%-8px)] lg:w-[calc(20%-10px)] max-w-[120px]'
    if (count === 6) return 'w-[calc(50%-6px)] sm:w-[calc(33.333%-8px)] lg:w-[calc(16.666%-10px)] max-w-[120px]'
    return 'w-[calc(50%-6px)] sm:w-[calc(33.333%-8px)] lg:w-[calc(25%-9px)] max-w-[120px]'
  }

  return (
    <div className="mb-32 relative group/section">
      {isEditMode && (
        <div className="absolute -top-12 right-0 flex gap-2">
          {showMoveUp && (
            <button
              onClick={onMoveUp}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              title="Move section up"
            >
              <ChevronUp size={16} />
            </button>
          )}
          {showMoveDown && (
            <button
              onClick={onMoveDown}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              title="Move section down"
            >
              <ChevronDown size={16} />
            </button>
          )}
          <button
            onClick={onDeleteSection}
            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            title="Delete section"
          >
            <Trash size={16} />
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div className="flex-1">
          <RichTextEditor
            value={title}
            onSave={onTitleEdit}
            isEditMode={isEditMode}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-theme-primary"
            placeholder="Section Title"
          />
          {subtitle && (
            <RichTextEditor
              value={subtitle}
              onSave={onSubtitleEdit}
              isEditMode={isEditMode}
              className="mt-4 text-theme-secondary text-lg max-w-2xl"
              placeholder="Section Subtitle"
            />
          )}
          <div className="h-[2px] w-24 bg-[#EAB308] mt-6" />
        </div>

        {isEditMode && (
          <div className="flex gap-3">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*,.svg" />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center gap-2 px-6 py-3 bg-[#EAB308] text-black rounded-full font-bold hover:scale-105 transition-all disabled:opacity-50 shadow-lg"
            >
              {isUploading ? <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <Upload size={20} />}
              Upload Images
            </button>
          </div>
        )}
      </div>

      {images.length === 0 ? (
        <div className="text-center py-12 bg-theme-secondary rounded-2xl border border-dashed border-[#EAB308]/30">
          <p className="text-lg text-theme-primary">No designs available yet.</p>
          {isEditMode && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 px-6 py-3 bg-[#EAB308] text-black rounded-full font-bold hover:scale-105 transition-all"
            >
              Upload First Image
            </button>
          )}
        </div>
      ) : (
        <div
          className="max-w-6xl mx-auto px-4"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative aspect-video mb-8 group cursor-pointer flex items-center justify-center overflow-visible"
            onClick={() => onImageClick(images[currentIndex])}
          >
            {!mainImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#EAB308] border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            <motion.img
              key={images[currentIndex]?.url}
              src={images[currentIndex]?.url}
              alt={`${title} featured`}
              className={`w-full h-full object-contain transition-opacity duration-500 image-preserve ${mainImageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setMainImageLoaded(true)}
            />

            {isEditMode && (
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  if(confirm("Permanently delete this image?")) {
                    const success = await deleteFromCloudinary(images[currentIndex].public_id);
                    if (success) {
                      onDelete(currentIndex);
                      if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
                    } else {
                      alert("Failed to delete from server. Please try again.");
                    }
                  }
                }}
                className="absolute top-4 left-4 p-3 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-20"
              >
                <Trash2 size={20} />
              </button>
            )}

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-black/20 hover:bg-black/50 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 z-10"
                >
                  <ChevronLeft size={24} className="text-white" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-black/20 hover:bg-black/50 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 z-10"
                >
                  <ChevronRight size={24} className="text-white" />
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-4 flex gap-1">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-[#EAB308]'
                      : 'w-2 bg-white/50'
                  }`}
                />
              ))}
            </div>

            <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </motion.div>

          {images.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={getFlexClasses()}
            >
              {images.map((img, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={getThumbnailWidth()}
                >
                  <div
                    className={`relative w-full pb-[100%] rounded-lg overflow-hidden bg-black cursor-pointer transition-all duration-300 ${
                      index === currentIndex
                        ? 'ring-4 ring-[#EAB308] shadow-xl'
                        : 'ring-2 ring-transparent hover:ring-[#EAB308]/50'
                    }`}
                    onClick={() => selectImage(index)}
                  >
                    {!thumbnailsLoaded[index] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
                        <div className="w-6 h-6 border-3 border-[#EAB308] border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                    <img
                      src={img.url}
                      alt=""
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 image-preserve ${thumbnailsLoaded[index] ? 'opacity-100' : 'opacity-0'}`}
                      onLoad={() => handleThumbnailLoad(index)}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <Eye size={20} className="text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}

export default GallerySection;
