
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { type ResumeData } from "@/types/resume";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export async function generatePdf(elementId: string, fileName: string) {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with ID "${elementId}" not found`);
  }
  
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // A4 dimensions: 210 x 297 mm
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`${fileName}.pdf`);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}

export function saveResumeToLocalStorage(resume: ResumeData) {
  try {
    localStorage.setItem('resumeData', JSON.stringify(resume));
  } catch (error) {
    console.error('Error saving resume to localStorage:', error);
  }
}

export function getResumeFromLocalStorage(): ResumeData | null {
  try {
    const data = localStorage.getItem('resumeData');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading resume from localStorage:', error);
    return null;
  }
}
