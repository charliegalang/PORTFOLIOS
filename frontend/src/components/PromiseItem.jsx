import React from 'react';
import { motion } from 'framer-motion';
import RichTextEditor from './RichTextEditor';
import CrudControls from './CrudControls';

const PromiseItem = ({ item, index, onUpdate, onDelete, onMove, isEditMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      viewport={{ once: true }}
      className="group p-4 sm:p-5 md:p-6 lg:p-8 rounded-[30px] sm:rounded-[35px] md:rounded-[40px] bg-theme-primary border border-theme hover:shadow-xl transition-all duration-500 relative"
    >
      {isEditMode && (
        <CrudControls
          onDelete={onDelete}
          onMoveUp={() => onMove('up')}
          onMoveDown={() => onMove('down')}
          className="absolute -top-8 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      )}
      <RichTextEditor
        value={item.n}
        onSave={(val) => onUpdate('n', val)}
        isEditMode={isEditMode}
        className="text-4xl sm:text-5xl md:text-6xl font-black text-[#EAB308]/20 mb-3 sm:mb-4 md:mb-5 lg:mb-6"
        placeholder="00"
      />
      <RichTextEditor
        value={item.t}
        onSave={(val) => onUpdate('t', val)}
        isEditMode={isEditMode}
        className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 text-theme-primary"
        placeholder="Title"
      />
      <RichTextEditor
        value={item.d}
        onSave={(val) => onUpdate('d', val)}
        isEditMode={isEditMode}
        className="text-sm sm:text-base md:text-lg text-theme-secondary leading-relaxed"
        placeholder="Description..."
      />
    </motion.div>
  )
}

export default PromiseItem;
