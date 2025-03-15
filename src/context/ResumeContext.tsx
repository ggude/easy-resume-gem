
import React, { createContext, useContext, useState, useEffect } from 'react';
import { type ResumeData, defaultResumeData } from '@/types/resume';
import { generateUniqueId, saveResumeToLocalStorage, getResumeFromLocalStorage } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

interface ResumeContextType {
  resumeData: ResumeData;
  updatePersonalInfo: (personalInfo: Partial<ResumeData['personalInfo']>) => void;
  updateSummary: (summary: string) => void;
  addWorkExperience: () => void;
  updateWorkExperience: (id: string, data: Partial<ResumeData['workExperience'][0]>) => void;
  removeWorkExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<ResumeData['education'][0]>) => void;
  removeEducation: (id: string) => void;
  addSkill: () => void;
  updateSkill: (id: string, data: Partial<ResumeData['skills'][0]>) => void;
  removeSkill: (id: string) => void;
  resetResume: () => void;
}

const ResumeContext = createContext<ResumeContextType | null>(null);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);

  // Load saved resume data from localStorage on initial render
  useEffect(() => {
    const savedResume = getResumeFromLocalStorage();
    if (savedResume) {
      setResumeData(savedResume);
    }
  }, []);

  // Save to localStorage whenever resumeData changes
  useEffect(() => {
    saveResumeToLocalStorage(resumeData);
  }, [resumeData]);

  const updatePersonalInfo = (personalInfo: Partial<ResumeData['personalInfo']>) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        ...personalInfo
      }
    }));
  };

  const updateSummary = (summary: string) => {
    setResumeData(prev => ({
      ...prev,
      summary
    }));
  };

  const addWorkExperience = () => {
    const newWorkExperience = {
      id: generateUniqueId(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    
    setResumeData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, newWorkExperience]
    }));
    
    toast({
      title: "Work experience added",
      description: "A new work experience entry has been added to your resume."
    });
  };

  const updateWorkExperience = (id: string, data: Partial<ResumeData['workExperience'][0]>) => {
    setResumeData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map(exp => 
        exp.id === id ? { ...exp, ...data } : exp
      )
    }));
  };

  const removeWorkExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter(exp => exp.id !== id)
    }));
    
    toast({
      title: "Work experience removed",
      description: "The work experience entry has been removed from your resume."
    });
  };

  const addEducation = () => {
    const newEducation = {
      id: generateUniqueId(),
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
    
    toast({
      title: "Education added",
      description: "A new education entry has been added to your resume."
    });
  };

  const updateEducation = (id: string, data: Partial<ResumeData['education'][0]>) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, ...data } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
    
    toast({
      title: "Education removed",
      description: "The education entry has been removed from your resume."
    });
  };

  const addSkill = () => {
    const newSkill = {
      id: generateUniqueId(),
      name: '',
      level: 3
    };
    
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
    
    toast({
      title: "Skill added",
      description: "A new skill has been added to your resume."
    });
  };

  const updateSkill = (id: string, data: Partial<ResumeData['skills'][0]>) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill => 
        skill.id === id ? { ...skill, ...data } : skill
      )
    }));
  };

  const removeSkill = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
    
    toast({
      title: "Skill removed",
      description: "The skill has been removed from your resume."
    });
  };

  const resetResume = () => {
    setResumeData(defaultResumeData);
    
    toast({
      title: "Resume reset",
      description: "All resume data has been reset to default values."
    });
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        updatePersonalInfo,
        updateSummary,
        addWorkExperience,
        updateWorkExperience,
        removeWorkExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addSkill,
        updateSkill,
        removeSkill,
        resetResume
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
