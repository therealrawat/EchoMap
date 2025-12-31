import jsPDF from 'jspdf';
import type { AnalysisResult } from '../types';

export function generatePDF(result: AnalysisResult, includeAnalytics: boolean) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - 2 * margin;
  let yPosition = margin;

  // Helper function to add a new page if needed
  const checkPageBreak = (requiredHeight: number) => {
    if (yPosition + requiredHeight > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  // Helper function to add text with word wrapping
  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 10) => {
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return lines.length * (fontSize * 0.4); // Approximate line height
  };

  // Title
  doc.setFontSize(24);
  doc.setTextColor(30, 58, 95); // vermeer-deepBlue
  doc.setFont('helvetica', 'bold');
  doc.text('EchoMap', margin, yPosition);
  yPosition += 12;

  doc.setFontSize(14);
  doc.setTextColor(45, 74, 107); // vermeer-softBlue
  doc.setFont('helvetica', 'normal');
  doc.text('Your Communication Profile & Roadmap', margin, yPosition);
  yPosition += 15;

  // Date
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on ${currentDate}`, margin, yPosition);
  yPosition += 15;

  // Analytics Section (if included)
  if (includeAnalytics) {
    checkPageBreak(40);
    doc.setFontSize(18);
    doc.setTextColor(30, 58, 95);
    doc.setFont('helvetica', 'bold');
    doc.text('Communication Scores', margin, yPosition);
    yPosition += 12;

    // Scores
    Object.entries(result.scores).forEach(([key, value]) => {
      checkPageBreak(15);
      const label = key === 'lexicalRange' ? 'Lexical Range' : key.charAt(0).toUpperCase() + key.slice(1);
      
      doc.setFontSize(11);
      doc.setTextColor(30, 58, 95);
      doc.setFont('helvetica', 'normal');
      doc.text(`${label}:`, margin, yPosition);
      
      // Score value
      doc.setFont('helvetica', 'bold');
      doc.text(`${value}/100`, pageWidth - margin - 20, yPosition);
      
      yPosition += 8;
      
      // Progress bar representation
      const barWidth = maxWidth * 0.8;
      const barHeight = 4;
      const filledWidth = (value / 100) * barWidth;
      
      // Background bar (light gray)
      doc.setFillColor(230, 230, 230);
      doc.rect(margin, yPosition - 3, barWidth, barHeight, 'F');
      
      // Filled bar
      doc.setFillColor(212, 165, 116); // vermeer-ochre
      doc.rect(margin, yPosition - 3, filledWidth, barHeight, 'F');
      
      yPosition += 10;
    });

    yPosition += 5;

    // Past Mistakes
    if (result.pastMistakes.length > 0) {
      checkPageBreak(30);
      doc.setFontSize(18);
      doc.setTextColor(30, 58, 95);
      doc.setFont('helvetica', 'bold');
      doc.text('Patterns to Address', margin, yPosition);
      yPosition += 12;

      result.pastMistakes.forEach((mistake) => {
        checkPageBreak(10);
        doc.setFontSize(10);
        doc.setTextColor(30, 58, 95);
        doc.setFont('helvetica', 'normal');
        const bulletX = margin + 5;
        doc.text('•', bulletX, yPosition);
        const textHeight = addWrappedText(mistake, margin + 10, yPosition, maxWidth - 10, 10);
        yPosition += Math.max(textHeight, 8);
      });

      yPosition += 10;
    }
  }

  // Roadmap Section
  checkPageBreak(30);
  doc.setFontSize(18);
  doc.setTextColor(30, 58, 95);
  doc.setFont('helvetica', 'bold');
  doc.text('7-Day Roadmap', margin, yPosition);
  yPosition += 15;

  // Roadmap Days
  result.roadmap.forEach((day, index) => {
    checkPageBreak(50);
    
    // Day number circle
    const circleX = margin + 5;
    const circleY = yPosition - 5;
    doc.setFillColor(212, 165, 116); // vermeer-ochre
    doc.circle(circleX, circleY, 6, 'F');
    doc.setTextColor(30, 58, 95);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(day.day.toString(), circleX, circleY + 2);

    // Day content
    const contentX = margin + 20;
    let contentY = yPosition;

    // Task
    doc.setFontSize(12);
    doc.setTextColor(30, 58, 95);
    doc.setFont('helvetica', 'bold');
    doc.text(`Day ${day.day} - Task`, contentX, contentY);
    contentY += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const taskHeight = addWrappedText(day.task, contentX, contentY, maxWidth - 25, 10);
    contentY += taskHeight + 5;

    // Why it matters
    doc.setFontSize(9);
    doc.setTextColor(45, 74, 107); // vermeer-softBlue
    doc.setFont('helvetica', 'italic');
    doc.text('Why it matters:', contentX, contentY);
    contentY += 6;

    doc.setFont('helvetica', 'normal');
    const whyHeight = addWrappedText(day.whyItMatters, contentX, contentY, maxWidth - 25, 9);
    contentY += whyHeight + 10;

    yPosition = contentY;

    // Add separator line between days (except last)
    if (index < result.roadmap.length - 1) {
      checkPageBreak(5);
      doc.setDrawColor(200, 200, 200); // Light gray separator
      doc.setLineWidth(0.5);
      doc.line(margin + 20, yPosition, pageWidth - margin, yPosition);
      yPosition += 8;
    }
  });

  // Footer
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.setFont('helvetica', 'normal');
    doc.text(
      `EchoMap - Page ${i} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' } as any
    );
  }

  // Generate filename
  const filename = `EchoMap-roadmap-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
}

