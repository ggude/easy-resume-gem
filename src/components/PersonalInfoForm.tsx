
import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { User, Mail, Phone, MapPin, Briefcase, Globe, Linkedin } from 'lucide-react';

const PersonalInfoForm = () => {
  const { resumeData, updatePersonalInfo, updateSummary } = useResume();
  const { personalInfo, summary } = resumeData;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'summary') {
      updateSummary(value);
    } else {
      updatePersonalInfo({ [name]: value });
    }
  };

  return (
    <Card className="mb-6 border border-gray-200">
      <CardHeader className="bg-resume-light">
        <CardTitle className="text-xl text-resume-secondary flex items-center gap-2">
          <User size={18} />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={personalInfo.firstName}
              onChange={handleInputChange}
              placeholder="John"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={personalInfo.lastName}
              onChange={handleInputChange}
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <Label htmlFor="title" className="flex items-center gap-2">
            <Briefcase size={16} className="text-gray-500" /> 
            Professional Title
          </Label>
          <Input
            id="title"
            name="title"
            value={personalInfo.title}
            onChange={handleInputChange}
            placeholder="Software Engineer"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail size={16} className="text-gray-500" /> 
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={personalInfo.email}
              onChange={handleInputChange}
              placeholder="john.doe@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone size={16} className="text-gray-500" /> 
              Phone
            </Label>
            <Input
              id="phone"
              name="phone"
              value={personalInfo.phone}
              onChange={handleInputChange}
              placeholder="+1 123 456 7890"
            />
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <Label htmlFor="location" className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-500" /> 
            Location
          </Label>
          <Input
            id="location"
            name="location"
            value={personalInfo.location}
            onChange={handleInputChange}
            placeholder="New York, NY"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="website" className="flex items-center gap-2">
              <Globe size={16} className="text-gray-500" /> 
              Website (optional)
            </Label>
            <Input
              id="website"
              name="website"
              value={personalInfo.website}
              onChange={handleInputChange}
              placeholder="www.johndoe.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin" className="flex items-center gap-2">
              <Linkedin size={16} className="text-gray-500" /> 
              LinkedIn (optional)
            </Label>
            <Input
              id="linkedin"
              name="linkedin"
              value={personalInfo.linkedin}
              onChange={handleInputChange}
              placeholder="linkedin.com/in/johndoe"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">Professional Summary</Label>
          <Textarea
            id="summary"
            name="summary"
            value={summary}
            onChange={handleInputChange}
            placeholder="Write a brief summary of your professional background and key strengths..."
            className="min-h-[120px]"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;
