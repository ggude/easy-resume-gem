
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DownloadCloud, 
  RefreshCw, 
  AlertTriangle
} from 'lucide-react';
import { useResume } from '@/context/ResumeContext';
import { generatePdf } from '@/lib/utils';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/components/ui/use-toast';

const ResumeActions = () => {
  const { resumeData, resetResume } = useResume();
  const { toast } = useToast();

  const handleDownload = async () => {
    try {
      const { firstName, lastName } = resumeData.personalInfo;
      const fileName = `${firstName || 'Resume'}_${lastName || ''}`.trim();
      
      await generatePdf('resume-preview', fileName || 'resume');
      
      toast({
        title: "Resume Downloaded",
        description: "Your resume has been successfully downloaded as a PDF.",
      });
    } catch (error) {
      console.error('Error downloading resume:', error);
      
      toast({
        title: "Download Failed",
        description: "There was an error downloading your resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Button 
        onClick={handleDownload}
        className="w-full bg-resume-primary hover:bg-resume-secondary"
      >
        <DownloadCloud className="mr-2 h-5 w-5" /> Download Resume
      </Button>
      
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="w-full border-destructive text-destructive hover:bg-destructive/10">
            <RefreshCw className="mr-2 h-5 w-5" /> Reset Resume
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Reset Resume Data
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete all your current resume data and reset it to default values.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={resetResume}
              className="bg-destructive hover:bg-destructive/90"
            >
              Reset Resume
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ResumeActions;
