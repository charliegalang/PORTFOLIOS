import React from 'react';
import { motion } from 'framer-motion';
import RichTextEditor from './RichTextEditor';

const SectionTitle = ({ children, align = "left", subtitle, isEditMode, onTitleEdit, onSubtitleEdit }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`mb-12 ${align === 'center' ? 'text-center' : ''}`}
  >
    <RichTextEditor
      value={children}
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
        className="mt-4 text-theme-secondary text-lg max-w-2xl mx-auto"
        placeholder="Section Subtitle"
      />
    )}
    <div className={`h-[2px] w-24 bg-[#EAB308] mt-6 ${align === 'center' ? 'mx-auto' : ''}`} />
  </motion.div>
)

export default SectionTitle;
