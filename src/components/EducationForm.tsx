
import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const EducationForm = () => {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResume();
  const { education } = resumeData;

  const handleInputChange = (
    id: string,
    field: string,
    value: string | boolean
  ) => {
    updateEducation(id, { [field]: value });
  };

  return (
    <Card className="mb-6 border border-gray-200">
      <CardHeader className="bg-resume-light">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-resume-secondary flex items-center gap-2">
            <GraduationCap size={18} />
            Education
          </CardTitle>
          <Button 
            onClick={addEducation}
            size="sm" 
            className="bg-resume-primary hover:bg-resume-secondary"
          >
            <Plus size={16} className="mr-1" /> Add Education
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {education.length === 0 ? (
          <Alert className="bg-resume-accent border-resume-primary">
            <AlertDescription>
              You haven't added any education yet. Click the "Add Education" button to add your educational background.
            </AlertDescription>
          </Alert>
        ) : (
          education.map((edu, index) => (
            <div 
              key={edu.id} 
              className={`p-4 rounded-md ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} ${
                index !== education.length - 1 ? 'mb-6' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-medium text-resume-secondary">
                  Education {index + 1}
                </h4>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 text-destructive border-destructive hover:bg-destructive/10"
                  onClick={() => removeEducation(edu.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
              
              <div className="space-y-2 mb-4">
                <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                <Input
                  id={`institution-${edu.id}`}
                  value={edu.institution}
                  onChange={(e) => handleInputChange(edu.id, 'institution', e.target.value)}
                  placeholder="University or School Name"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                  <Input
                    id={`degree-${edu.id}`}
                    value={edu.degree}
                    onChange={(e) => handleInputChange(edu.id, 'degree', e.target.value)}
                    placeholder="e.g. Bachelor's, Master's"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
                  <Input
                    id={`field-${edu.id}`}
                    value={edu.field}
                    onChange={(e) => handleInputChange(edu.id, 'field', e.target.value)}
                    placeholder="e.g. Computer Science"
                  />
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <Label htmlFor={`location-${edu.id}`}>Location</Label>
                <Input
                  id={`location-${edu.id}`}
                  value={edu.location}
                  onChange={(e) => handleInputChange(edu.id, 'location', e.target.value)}
                  placeholder="City, Country"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor={`startDate-${edu.id}`}>Start Date</Label>
                  <Input
                    id={`startDate-${edu.id}`}
                    value={edu.startDate}
                    onChange={(e) => handleInputChange(edu.id, 'startDate', e.target.value)}
                    placeholder="MM/YYYY"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`endDate-${edu.id}`} className={edu.current ? 'text-gray-400' : ''}>
                      End Date
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`current-${edu.id}`}
                        checked={edu.current}
                        onCheckedChange={(checked) => {
                          handleInputChange(edu.id, 'current', checked);
                          if (checked) {
                            handleInputChange(edu.id, 'endDate', 'Present');
                          } else {
                            handleInputChange(edu.id, 'endDate', '');
                          }
                        }}
                      />
                      <Label htmlFor={`current-${edu.id}`} className="text-sm">
                        Current
                      </Label>
                    </div>
                  </div>
                  <Input
                    id={`endDate-${edu.id}`}
                    value={edu.endDate}
                    onChange={(e) => handleInputChange(edu.id, 'endDate', e.target.value)}
                    placeholder="MM/YYYY or Present"
                    disabled={edu.current}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`description-${edu.id}`}>Additional Information (Optional)</Label>
                <Textarea
                  id={`description-${edu.id}`}
                  value={edu.description}
                  onChange={(e) => handleInputChange(edu.id, 'description', e.target.value)}
                  placeholder="Awards, achievements, relevant coursework..."
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

export default EducationForm;
