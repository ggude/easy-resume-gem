
import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Briefcase, Plus, Trash2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const WorkExperienceForm = () => {
  const { resumeData, addWorkExperience, updateWorkExperience, removeWorkExperience } = useResume();
  const { workExperience } = resumeData;

  const handleInputChange = (
    id: string,
    field: string,
    value: string | boolean
  ) => {
    updateWorkExperience(id, { [field]: value });
  };

  return (
    <Card className="mb-6 border border-gray-200">
      <CardHeader className="bg-resume-light">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-resume-secondary flex items-center gap-2">
            <Briefcase size={18} />
            Work Experience
          </CardTitle>
          <Button 
            onClick={addWorkExperience}
            size="sm" 
            className="bg-resume-primary hover:bg-resume-secondary"
          >
            <Plus size={16} className="mr-1" /> Add Experience
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {workExperience.length === 0 ? (
          <Alert className="bg-resume-accent border-resume-primary">
            <AlertDescription>
              You haven't added any work experience yet. Click the "Add Experience" button to add your work history.
            </AlertDescription>
          </Alert>
        ) : (
          workExperience.map((exp, index) => (
            <div 
              key={exp.id} 
              className={`p-4 rounded-md ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} ${
                index !== workExperience.length - 1 ? 'mb-6' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-medium text-resume-secondary">
                  Position {index + 1}
                </h4>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 text-destructive border-destructive hover:bg-destructive/10"
                  onClick={() => removeWorkExperience(exp.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor={`company-${exp.id}`}>Company</Label>
                  <Input
                    id={`company-${exp.id}`}
                    value={exp.company}
                    onChange={(e) => handleInputChange(exp.id, 'company', e.target.value)}
                    placeholder="Company name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`position-${exp.id}`}>Position</Label>
                  <Input
                    id={`position-${exp.id}`}
                    value={exp.position}
                    onChange={(e) => handleInputChange(exp.id, 'position', e.target.value)}
                    placeholder="Job title"
                  />
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <Label htmlFor={`location-${exp.id}`}>Location</Label>
                <Input
                  id={`location-${exp.id}`}
                  value={exp.location}
                  onChange={(e) => handleInputChange(exp.id, 'location', e.target.value)}
                  placeholder="City, Country"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor={`startDate-${exp.id}`}>Start Date</Label>
                  <Input
                    id={`startDate-${exp.id}`}
                    value={exp.startDate}
                    onChange={(e) => handleInputChange(exp.id, 'startDate', e.target.value)}
                    placeholder="MM/YYYY"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`endDate-${exp.id}`} className={exp.current ? 'text-gray-400' : ''}>
                      End Date
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`current-${exp.id}`}
                        checked={exp.current}
                        onCheckedChange={(checked) => {
                          handleInputChange(exp.id, 'current', checked);
                          if (checked) {
                            handleInputChange(exp.id, 'endDate', 'Present');
                          } else {
                            handleInputChange(exp.id, 'endDate', '');
                          }
                        }}
                      />
                      <Label htmlFor={`current-${exp.id}`} className="text-sm">
                        Current
                      </Label>
                    </div>
                  </div>
                  <Input
                    id={`endDate-${exp.id}`}
                    value={exp.endDate}
                    onChange={(e) => handleInputChange(exp.id, 'endDate', e.target.value)}
                    placeholder="MM/YYYY or Present"
                    disabled={exp.current}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`description-${exp.id}`}>Description</Label>
                <Textarea
                  id={`description-${exp.id}`}
                  value={exp.description}
                  onChange={(e) => handleInputChange(exp.id, 'description', e.target.value)}
                  placeholder="Describe your responsibilities and achievements..."
                  className="min-h-[100px]"
                />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default WorkExperienceForm;
