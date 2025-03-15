
import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MailIcon, PhoneIcon, MapPinIcon, GlobeIcon, LinkedinIcon } from 'lucide-react';

const ResumePreview = () => {
  const { resumeData } = useResume();
  const { personalInfo, workExperience, education, skills, summary } = resumeData;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim();

  // Function to convert description text to bullet points
  const formatDescriptionWithBullets = (description: string) => {
    if (!description) return null;
    
    // Split by new lines or number patterns like "1.", "2.", etc.
    const items = description.split(/\n|(?:\d+\.\s*)/g).filter(item => item.trim());
    
    if (items.length <= 1) {
      return <p className="resume-item-description">{description}</p>;
    }
    
    return (
      <ul className="list-disc pl-5 space-y-1">
        {items.map((item, index) => (
          <li key={index} className="resume-item-description">{item.trim()}</li>
        ))}
      </ul>
    );
  };

  return (
    <Card className="h-full overflow-hidden" id="resume-preview">
      <div className="resume-container animate-fade-in">
        {/* Header */}
        <div className="resume-header">
          {fullName && <h1 className="resume-name">{fullName}</h1>}
          {personalInfo.title && <p className="resume-title">{personalInfo.title}</p>}
          
          <div className="resume-contact">
            {personalInfo.email && (
              <span className="flex items-center gap-1">
                <MailIcon size={14} />
                {personalInfo.email}
              </span>
            )}
            
            {personalInfo.phone && (
              <span className="flex items-center gap-1">
                <PhoneIcon size={14} />
                {personalInfo.phone}
              </span>
            )}
            
            {personalInfo.location && (
              <span className="flex items-center gap-1">
                <MapPinIcon size={14} />
                {personalInfo.location}
              </span>
            )}
            
            {personalInfo.website && (
              <span className="flex items-center gap-1">
                <GlobeIcon size={14} />
                {personalInfo.website}
              </span>
            )}
            
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1">
                <LinkedinIcon size={14} />
                {personalInfo.linkedin}
              </span>
            )}
          </div>
        </div>
        
        {/* Summary - without heading */}
        {summary && (
          <div className="resume-section">
            <p className="resume-item-description">{summary}</p>
          </div>
        )}
        
        {/* Work Experience */}
        {workExperience.length > 0 && (
          <div className="resume-section">
            <h2 className="resume-section-title">Work Experience</h2>
            {workExperience.map(exp => (
              <div key={exp.id} className="resume-item">
                <div className="resume-item-header">
                  <div>
                    <h3 className="resume-item-title font-semibold">{exp.position}</h3>
                    <p className="resume-item-subtitle">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                  </div>
                  {(exp.startDate || exp.endDate) && (
                    <p className="resume-item-date">
                      {exp.startDate} {(exp.startDate && exp.endDate) && '–'} {exp.endDate}
                    </p>
                  )}
                </div>
                {formatDescriptionWithBullets(exp.description)}
              </div>
            ))}
          </div>
        )}
        
        {/* Education */}
        {education.length > 0 && (
          <div className="resume-section">
            <h2 className="resume-section-title">Education</h2>
            {education.map(edu => (
              <div key={edu.id} className="resume-item">
                <div className="resume-item-header">
                  <div>
                    <h3 className="resume-item-title">
                      {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                    </h3>
                    <p className="resume-item-subtitle">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                  </div>
                  {(edu.startDate || edu.endDate) && (
                    <p className="resume-item-date">
                      {edu.startDate} {(edu.startDate && edu.endDate) && '–'} {edu.endDate}
                    </p>
                  )}
                </div>
                {formatDescriptionWithBullets(edu.description)}
              </div>
            ))}
          </div>
        )}
        
        {/* Skills */}
        {skills.length > 0 && (
          <div className="resume-section">
            <h2 className="resume-section-title">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <div key={skill.id} className="mb-2">
                  <Badge 
                    className="py-1.5 bg-resume-accent text-gray-700 hover:bg-resume-accent/80 font-normal"
                  >
                    {skill.name}
                    {skill.level > 0 && (
                      <span className="ml-2 skill-level inline-flex">
                        {[...Array(5)].map((_, i) => (
                          <span 
                            key={i} 
                            className={`skill-dot ${i < skill.level ? 'skill-dot-filled' : 'skill-dot-empty'}`}
                          />
                        ))}
                      </span>
                    )}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ResumePreview;
