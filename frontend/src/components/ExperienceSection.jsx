import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ChevronDown, ChevronUp } from 'lucide-react';
import RichTextEditor from './RichTextEditor';
import CrudControls from './CrudControls';

const ExperienceSection = ({ isEditMode, data, onChange }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [expData, setExpData] = useState(data || {
    professionalSummaryTitle: "Professional Summary",
    summary: "",
    workHistoryTitle: "Work History",
    work: [],
    educationTitle: "Education",
    education: { degree: "", school: "", period: "" }
  })

  // Sync with prop if it changes from outside
  useEffect(() => {
    if (data) setExpData(data);
  }, [data]);

  // Notify parent of changes
  useEffect(() => {
    if (onChange) onChange(expData);
  }, [expData]);

  const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  const updateProfessionalSummaryTitle = (newTitle) => {
    setExpData(prev => ({ ...prev, professionalSummaryTitle: newTitle }))
  }

  const updateSummary = (newSummary) => {
    setExpData(prev => ({ ...prev, summary: newSummary }))
  }

  const updateWorkHistoryTitle = (newTitle) => {
    setExpData(prev => ({ ...prev, workHistoryTitle: newTitle }))
  }

  const addWork = () => {
    const newWork = {
      id: generateId(),
      title: "",
      company: "",
      period: "",
      type: "",
      responsibilities: []
    }
    setExpData(prev => ({
      ...prev,
      work: [...prev.work, newWork]
    }))
  }

  const deleteWork = (workId) => {
    if (confirm("Delete this work experience?")) {
      setExpData(prev => ({
        ...prev,
        work: prev.work.filter(w => w.id !== workId)
      }))
    }
  }

  const moveWork = (workId, direction) => {
    const index = expData.work.findIndex(w => w.id === workId)
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === expData.work.length - 1)
    ) return

    const newWork = [...expData.work]
    const newIndex = direction === 'up' ? index - 1 : index + 1
    ;[newWork[index], newWork[newIndex]] = [newWork[newIndex], newWork[index]]

    setExpData(prev => ({ ...prev, work: newWork }))
  }

  const updateWork = (workId, field, value) => {
    setExpData(prev => ({
      ...prev,
      work: prev.work.map(item =>
        item.id === workId ? { ...item, [field]: value } : item
      )
    }))
  }

  const addResponsibility = (workId) => {
    const newResp = {
      id: generateId(),
      text: ""
    }
    setExpData(prev => ({
      ...prev,
      work: prev.work.map(item =>
        item.id === workId
          ? { ...item, responsibilities: [...item.responsibilities, newResp] }
          : item
      )
    }))
  }

  const deleteResponsibility = (workId, respId) => {
    if (confirm("Delete this responsibility?")) {
      setExpData(prev => ({
        ...prev,
        work: prev.work.map(item =>
          item.id === workId
            ? { ...item, responsibilities: item.responsibilities.filter(r => r.id !== respId) }
            : item
        )
      }))
    }
  }

  const moveResponsibility = (workId, respId, direction) => {
    const work = expData.work.find(w => w.id === workId)
    const index = work.responsibilities.findIndex(r => r.id === respId)

    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === work.responsibilities.length - 1)
    ) return

    const newResponsibilities = [...work.responsibilities]
    const newIndex = direction === 'up' ? index - 1 : index + 1
    ;[newResponsibilities[index], newResponsibilities[newIndex]] = [newResponsibilities[newIndex], newResponsibilities[index]]

    setExpData(prev => ({
      ...prev,
      work: prev.work.map(item =>
        item.id === workId ? { ...item, responsibilities: newResponsibilities } : item
      )
    }))
  }

  const updateResponsibility = (workId, respId, value) => {
    setExpData(prev => ({
      ...prev,
      work: prev.work.map(item =>
        item.id === workId ? {
          ...item,
          responsibilities: item.responsibilities.map(r =>
            r.id === respId ? { ...r, text: value } : r
          )
        } : item
      )
    }))
  }

  const updateEducationTitle = (newTitle) => {
    setExpData(prev => ({ ...prev, educationTitle: newTitle }))
  }

  const updateEducation = (field, value) => {
    setExpData(prev => ({
      ...prev,
      education: { ...prev.education, [field]: value }
    }))
  }

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12 bg-theme-secondary transition-colors duration-500">
      <div className="max-w-5xl mx-auto relative">
        {isEditMode && (
          <CrudControls
            onAdd={addWork}
            className="absolute -top-12 right-0"
          />
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between gap-4 p-6 rounded-2xl bg-theme-primary border border-theme hover:shadow-lg transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#EAB308]/10 rounded-full">
              <Briefcase size={24} className="text-[#EAB308]" />
            </div>
            <div className="text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-theme-primary">Professional Experience</h2>
              <p className="text-sm text-theme-secondary opacity-60">Click to {isExpanded ? 'collapse' : 'expand'} my career journey</p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="p-2 rounded-full bg-theme-secondary group-hover:bg-[#EAB308]/10 transition-colors"
          >
            <ChevronDown size={24} className="text-[#EAB308]" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden"
            >
              <div className="mt-8 space-y-12">
                <div className="bg-theme-primary rounded-2xl p-8 border border-theme relative">
                  {isEditMode && (
                    <CrudControls
                      onDelete={() => {
                        if (confirm("Clear summary?")) {
                          updateSummary("")
                        }
                      }}
                      className="absolute top-4 right-4"
                    />
                  )}
                  <RichTextEditor
                    value={expData.professionalSummaryTitle}
                    onSave={updateProfessionalSummaryTitle}
                    isEditMode={isEditMode}
                    className="text-xl font-bold text-[#EAB308] mb-4"
                    placeholder="Professional Summary Title"
                  />
                  <RichTextEditor
                    value={expData.summary}
                    onSave={updateSummary}
                    isEditMode={isEditMode}
                    className="text-theme-secondary leading-relaxed"
                    placeholder="Add your professional summary here..."
                  />
                </div>

                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <RichTextEditor
                      value={expData.workHistoryTitle}
                      onSave={updateWorkHistoryTitle}
                      isEditMode={isEditMode}
                      className="text-2xl font-bold text-theme-primary"
                      placeholder="Work History Title"
                    />
                  </div>

                  {expData.work.map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative pl-8 border-l-2 border-[#EAB308]/30 hover:border-[#EAB308] transition-colors group"
                    >
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#EAB308] opacity-30 group-hover:opacity-100 transition-opacity" />

                      {isEditMode && (
                        <CrudControls
                          onAdd={() => addResponsibility(job.id)}
                          onDelete={() => deleteWork(job.id)}
                          onMoveUp={() => moveWork(job.id, 'up')}
                          onMoveDown={() => moveWork(job.id, 'down')}
                          className="absolute -top-2 right-0"
                        />
                      )}

                      <div className="bg-theme-primary rounded-xl p-6 border border-theme hover:shadow-lg transition-all">
                        <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                          <div>
                            <RichTextEditor
                              value={job.title}
                              onSave={(val) => updateWork(job.id, 'title', val)}
                              isEditMode={isEditMode}
                              className="text-xl font-bold text-theme-primary"
                              placeholder="Job Title"
                            />
                            <RichTextEditor
                              value={job.company}
                              onSave={(val) => updateWork(job.id, 'company', val)}
                              isEditMode={isEditMode}
                              className="text-[#EAB308] font-medium"
                              placeholder="Company Name"
                            />
                          </div>
                          <div className="text-right">
                            <RichTextEditor
                              value={job.period}
                              onSave={(val) => updateWork(job.id, 'period', val)}
                              isEditMode={isEditMode}
                              className="text-sm text-theme-secondary opacity-60"
                              placeholder="Start Date - End Date"
                            />
                            <RichTextEditor
                              value={job.type}
                              onSave={(val) => updateWork(job.id, 'type', val)}
                              isEditMode={isEditMode}
                              className="text-xs px-3 py-1 bg-[#EAB308]/10 text-[#EAB308] rounded-full mt-2"
                              placeholder="Job Type"
                            />
                          </div>
                        </div>

                        <ul className="space-y-3">
                          {job.responsibilities.map((resp, respIndex) => (
                            <li key={resp.id} className="flex gap-3 group/resp">
                              <span className="text-[#EAB308] mt-1">•</span>
                              <RichTextEditor
                                value={resp.text}
                                onSave={(val) => updateResponsibility(job.id, resp.id, val)}
                                isEditMode={isEditMode}
                                className="text-theme-secondary text-sm leading-relaxed flex-1"
                                placeholder="Add responsibility..."
                              />
                              {isEditMode && (
                                <CrudControls
                                  onDelete={() => deleteResponsibility(job.id, resp.id)}
                                  onMoveUp={() => moveResponsibility(job.id, resp.id, 'up')}
                                  onMoveDown={() => moveResponsibility(job.id, resp.id, 'down')}
                                  className="opacity-0 group-hover/resp:opacity-100 transition-opacity"
                                />
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-theme-primary rounded-2xl p-8 border border-theme relative">
                  {isEditMode && (
                    <CrudControls
                      onDelete={() => {
                        if (confirm("Clear education?")) {
                          updateEducation('degree', '')
                          updateEducation('school', '')
                          updateEducation('period', '')
                        }
                      }}
                      className="absolute top-4 right-4"
                    />
                  )}
                  <RichTextEditor
                    value={expData.educationTitle}
                    onSave={updateEducationTitle}
                    isEditMode={isEditMode}
                    className="text-xl font-bold text-[#EAB308] mb-4"
                    placeholder="Education Title"
                  />
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div>
                      <RichTextEditor
                        value={expData.education.degree}
                        onSave={(val) => updateEducation('degree', val)}
                        isEditMode={isEditMode}
                        className="text-lg font-bold text-theme-primary"
                        placeholder="Degree"
                      />
                      <RichTextEditor
                        value={expData.education.school}
                        onSave={(val) => updateEducation('school', val)}
                        isEditMode={isEditMode}
                        className="text-theme-secondary"
                        placeholder="School/University"
                      />
                    </div>
                    <RichTextEditor
                      value={expData.education.period}
                      onSave={(val) => updateEducation('period', val)}
                      isEditMode={isEditMode}
                      className="text-sm text-theme-secondary opacity-60"
                      placeholder="Period"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default ExperienceSection;
