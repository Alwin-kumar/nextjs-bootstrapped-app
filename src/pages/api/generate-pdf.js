import { withAuth } from '@/lib/auth-middleware'
import { prisma } from '@/lib/prisma'

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method Not Allowed',
      message: 'Only POST method is allowed'
    })
  }

  try {
    const { resumeId } = req.body
    const { userId } = req

    if (!resumeId) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Resume ID is required'
      })
    }

    // Fetch resume data
    const resume = await prisma.resume.findFirst({
      where: { id: resumeId, userId }
    })

    if (!resume) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Resume not found'
      })
    }

    // Prepare resume data for PDF generation
    const resumeData = {
      personalInfo: {
        fullName: resume.fullName,
        email: resume.email,
        phone: resume.phone,
        address: resume.address,
        website: resume.website,
        linkedin: resume.linkedin,
        github: resume.github
      },
      summary: resume.summary,
      experience: resume.experience ? JSON.parse(resume.experience) : [],
      education: resume.education ? JSON.parse(resume.education) : [],
      skills: resume.skills ? JSON.parse(resume.skills) : [],
      projects: resume.projects ? JSON.parse(resume.projects) : []
    }

    // Generate PDF (server-side generation)
    const { jsPDF } = await import('jspdf')

    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 20
    let yPosition = margin

    // Set font
    pdf.setFont('helvetica')

    // Helper function to add text with word wrapping
    const addWrappedText = (text, x, y, maxWidth, fontSize = 12) => {
      pdf.setFontSize(fontSize)
      const lines = pdf.splitTextToSize(text, maxWidth)
      pdf.text(lines, x, y)
      return y + (lines.length * fontSize * 0.4)
    }

    // Header
    if (resumeData.personalInfo.fullName) {
      pdf.setFontSize(24)
      pdf.setFont('helvetica', 'bold')
      pdf.text(resumeData.personalInfo.fullName, margin, yPosition)
      yPosition += 15
    }

    // Contact info
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    const contactInfo = []
    if (resumeData.personalInfo.email) contactInfo.push(resumeData.personalInfo.email)
    if (resumeData.personalInfo.phone) contactInfo.push(resumeData.personalInfo.phone)
    if (resumeData.personalInfo.address) contactInfo.push(resumeData.personalInfo.address)

    if (contactInfo.length > 0) {
      pdf.text(contactInfo.join(' | '), margin, yPosition)
      yPosition += 10
    }

    // Social links
    const socialLinks = []
    if (resumeData.personalInfo.website) socialLinks.push(resumeData.personalInfo.website)
    if (resumeData.personalInfo.linkedin) socialLinks.push(resumeData.personalInfo.linkedin)
    if (resumeData.personalInfo.github) socialLinks.push(resumeData.personalInfo.github)

    if (socialLinks.length > 0) {
      pdf.text(socialLinks.join(' | '), margin, yPosition)
      yPosition += 15
    }

    // Summary
    if (resumeData.summary) {
      yPosition = checkPageBreak(pdf, yPosition, pageHeight, margin)
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'bold')
      pdf.text('PROFESSIONAL SUMMARY', margin, yPosition)
      yPosition += 8

      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'normal')
      yPosition = addWrappedText(resumeData.summary, margin, yPosition, pageWidth - 2 * margin)
      yPosition += 10
    }

    // Experience
    if (resumeData.experience && resumeData.experience.length > 0) {
      yPosition = checkPageBreak(pdf, yPosition, pageHeight, margin)
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'bold')
      pdf.text('WORK EXPERIENCE', margin, yPosition)
      yPosition += 8

      resumeData.experience.forEach(exp => {
        yPosition = checkPageBreak(pdf, yPosition, pageHeight, margin)

        pdf.setFontSize(12)
        pdf.setFont('helvetica', 'bold')
        pdf.text(exp.title || '', margin, yPosition)
        yPosition += 6

        pdf.setFontSize(11)
        pdf.setFont('helvetica', 'italic')
        pdf.text(exp.company || '', margin, yPosition)
        yPosition += 5

        pdf.setFont('helvetica', 'normal')
        const dateRange = `${exp.startDate || ''} - ${exp.endDate || 'Present'}`
        pdf.text(dateRange, margin, yPosition)
        yPosition += 5

        if (exp.description) {
          yPosition = addWrappedText(exp.description, margin + 5, yPosition, pageWidth - 2 * margin - 5, 10)
        }
        yPosition += 8
      })
    }

    // Education
    if (resumeData.education && resumeData.education.length > 0) {
      yPosition = checkPageBreak(pdf, yPosition, pageHeight, margin)
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'bold')
      pdf.text('EDUCATION', margin, yPosition)
      yPosition += 8

      resumeData.education.forEach(edu => {
        yPosition = checkPageBreak(pdf, yPosition, pageHeight, margin)

        pdf.setFontSize(12)
        pdf.setFont('helvetica', 'bold')
        pdf.text(edu.degree || '', margin, yPosition)
        yPosition += 6

        pdf.setFontSize(11)
        pdf.setFont('helvetica', 'italic')
        pdf.text(edu.institution || '', margin, yPosition)
        yPosition += 5

        pdf.setFont('helvetica', 'normal')
        pdf.text(edu.graduationDate || '', margin, yPosition)
        yPosition += 8
      })
    }

    // Skills
    if (resumeData.skills && resumeData.skills.length > 0) {
      yPosition = checkPageBreak(pdf, yPosition, pageHeight, margin)
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'bold')
      pdf.text('SKILLS', margin, yPosition)
      yPosition += 8

      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'normal')
      const skillsText = resumeData.skills.filter(skill => skill).join(' • ')
      yPosition = addWrappedText(skillsText, margin, yPosition, pageWidth - 2 * margin)
    }

    // Generate PDF buffer
    const pdfBuffer = pdf.output('arraybuffer')

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="${resume.title || 'resume'}.pdf"`)

    // Send PDF
    res.send(Buffer.from(pdfBuffer))

  } catch (error) {
    console.error('PDF generation error:', error)
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to generate PDF. Please try again.'
    })
  }
}

function checkPageBreak(pdf, yPosition, pageHeight, margin) {
  if (yPosition > pageHeight - margin) {
    pdf.addPage()
    return margin
  }
  return yPosition
}

export default withAuth(handler)
