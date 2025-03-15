
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  List, 
  FileText, 
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import PersonalInfoForm from '@/components/PersonalInfoForm';
import WorkExperienceForm from '@/components/WorkExperienceForm';
import EducationForm from '@/components/EducationForm';
import SkillsForm from '@/components/SkillsForm';
import ResumePreview from '@/components/ResumePreview';
import ResumeActions from '@/components/ResumeActions';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const isMobile = useIsMobile();
  const [previewVisible, setPreviewVisible] = useState(!isMobile);

  const togglePreview = () => {
    setPreviewVisible(!previewVisible);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-resume-primary">
            Resume Builder
          </h1>
          {isMobile && (
            <Button 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={togglePreview}
            >
              {previewVisible ? (
                <>
                  <ChevronRight size={16} />
                  Editor
                </>
              ) : (
                <>
                  Preview
                  <ChevronLeft size={16} />
                </>
              )}
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row gap-6 h-full">
          {/* Form Section */}
          <div className={`w-full ${isMobile ? (previewVisible ? 'hidden' : 'block') : 'md:w-1/2'}`}>
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full grid grid-cols-4 mb-6">
                <TabsTrigger value="personal" className="flex items-center gap-1">
                  <User size={16} className="hidden sm:inline" />
                  <span className="hidden sm:inline">Personal</span>
                  <User size={16} className="sm:hidden" />
                </TabsTrigger>
                <TabsTrigger value="work" className="flex items-center gap-1">
                  <Briefcase size={16} className="hidden sm:inline" />
                  <span className="hidden sm:inline">Work</span>
                  <Briefcase size={16} className="sm:hidden" />
                </TabsTrigger>
                <TabsTrigger value="education" className="flex items-center gap-1">
                  <GraduationCap size={16} className="hidden sm:inline" />
                  <span className="hidden sm:inline">Education</span>
                  <GraduationCap size={16} className="sm:hidden" />
                </TabsTrigger>
                <TabsTrigger value="skills" className="flex items-center gap-1">
                  <List size={16} className="hidden sm:inline" />
                  <span className="hidden sm:inline">Skills</span>
                  <List size={16} className="sm:hidden" />
                </TabsTrigger>
              </TabsList>
              
              <ScrollArea className="h-[calc(100vh-220px)]">
                <TabsContent value="personal">
                  <PersonalInfoForm />
                </TabsContent>
                <TabsContent value="work">
                  <WorkExperienceForm />
                </TabsContent>
                <TabsContent value="education">
                  <EducationForm />
                </TabsContent>
                <TabsContent value="skills">
                  <SkillsForm />
                </TabsContent>
                
                <div className="py-4">
                  <ResumeActions />
                </div>
              </ScrollArea>
            </Tabs>
          </div>
          
          {/* Preview Section */}
          <div className={`w-full ${isMobile ? (previewVisible ? 'block' : 'hidden') : 'md:w-1/2'}`}>
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4 flex items-center justify-between">
              <h2 className="text-lg font-medium flex items-center gap-2">
                <FileText size={18} className="text-resume-secondary" />
                Resume Preview
              </h2>
              {isMobile && (
                <Button 
                  variant="outline" 
                  className="flex items-center gap-1"
                  onClick={togglePreview}
                >
                  <ChevronRight size={16} />
                  Back to Editor
                </Button>
              )}
            </div>
            <div className="bg-gray-200 p-4 rounded-lg h-[calc(100vh-160px)] overflow-hidden">
              <ResumePreview />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
