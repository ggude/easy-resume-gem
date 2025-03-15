
import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { List, Plus, Trash2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const SkillsForm = () => {
  const { resumeData, addSkill, updateSkill, removeSkill } = useResume();
  const { skills } = resumeData;

  const handleSkillNameChange = (id: string, value: string) => {
    updateSkill(id, { name: value });
  };

  const handleSkillLevelChange = (id: string, value: number[]) => {
    updateSkill(id, { level: value[0] });
  };

  return (
    <Card className="mb-6 border border-gray-200">
      <CardHeader className="bg-resume-light">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-resume-secondary flex items-center gap-2">
            <List size={18} />
            Skills
          </CardTitle>
          <Button 
            onClick={addSkill}
            size="sm" 
            className="bg-resume-primary hover:bg-resume-secondary"
          >
            <Plus size={16} className="mr-1" /> Add Skill
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {skills.length === 0 ? (
          <Alert className="bg-resume-accent border-resume-primary">
            <AlertDescription>
              You haven't added any skills yet. Click the "Add Skill" button to showcase your expertise.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {skills.map((skill, index) => (
              <div 
                key={skill.id} 
                className={`p-4 rounded-md ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1 mr-4">
                    <Label htmlFor={`skill-${skill.id}`} className="mb-2 block">
                      Skill Name
                    </Label>
                    <Input
                      id={`skill-${skill.id}`}
                      value={skill.name}
                      onChange={(e) => handleSkillNameChange(skill.id, e.target.value)}
                      placeholder="e.g. JavaScript, Project Management"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 mt-6 text-destructive border-destructive hover:bg-destructive/10"
                    onClick={() => removeSkill(skill.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between mb-1">
                    <Label htmlFor={`level-${skill.id}`}>Proficiency Level</Label>
                    <span className="text-sm text-gray-500">
                      {skill.level === 1 && "Beginner"}
                      {skill.level === 2 && "Elementary"}
                      {skill.level === 3 && "Intermediate"}
                      {skill.level === 4 && "Advanced"}
                      {skill.level === 5 && "Expert"}
                    </span>
                  </div>
                  <Slider
                    id={`level-${skill.id}`}
                    value={[skill.level]}
                    min={1}
                    max={5}
                    step={1}
                    onValueChange={(value) => handleSkillLevelChange(skill.id, value)}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-gray-500 px-1">
                    <span>Beginner</span>
                    <span>Expert</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillsForm;
