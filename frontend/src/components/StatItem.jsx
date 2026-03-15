import React from 'react';
import { motion } from 'framer-motion';
import RichTextEditor from './RichTextEditor';
import CrudControls from './CrudControls';

const StatItem = ({ stat, index, onUpdate, onDelete, onMove, isEditMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative group/stat"
    >
      {isEditMode && (
        <CrudControls
          onDelete={onDelete}
          onMoveUp={() => onMove('up')}
          onMoveDown={() => onMove('down')}
          className="absolute -top-8 right-0 opacity-0 group-hover/stat:opacity-100 transition-opacity"
        />
      )}
      <RichTextEditor
        value={stat.n}
        onSave={(val) => onUpdate('n', val)}
        isEditMode={isEditMode}
        className="text-xl sm:text-2xl md:text-3xl font-bold text-[#EAB308]"
        placeholder="Number"
      />
      <RichTextEditor
        value={stat.l}
        onSave={(val) => onUpdate('l', val)}
        isEditMode={isEditMode}
        className="text-xs sm:text-sm text-theme-secondary"
        placeholder="Label"
      />
    </motion.div>
  )
}

export default StatItem;
