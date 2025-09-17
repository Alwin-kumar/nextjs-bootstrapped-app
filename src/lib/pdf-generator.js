import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export async function generateResumePDF(resumeData, elementId = null) {
  try {
    let canvas

    if (elementId) {
      // Generate from DOM element
      const element = document.getElementById(elementId)
      if (!element) {
        throw new Error('Element not found for PDF generation')
      }
      canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      })
    } else {
      // Generate programmatically
      canvas = await generateResumeCanvas(resumeData)
    }

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')

    const imgWidth = 210 // A4 width in mm
    const pageHeight = 295 // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight

    let position = 0

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    return pdf
  } catch (error) {
    console.error('PDF generation error:', error)
    throw error
  }
}

async function generateResumeCanvas(resumeData) {
  // Create a temporary canvas for programmatic generation
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  // Set canvas size (A4 dimensions at 300 DPI)
  canvas.width = 2480 // 8.27 inches * 300 DPI
  canvas.height = 3508 // 11.69 inches * 300 DPI

  // Set white background
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Set text properties
  ctx.fillStyle = '#000000'
  ctx.font = 'bold 48px Arial'

  let yPosition = 100

  // Header
  if (resumeData.personalInfo?.fullName) {
    ctx.font = 'bold 60px Arial'
    ctx.fillText(resumeData.personalInfo.fullName, 100, yPosition)
    yPosition += 80
  }

  // Contact info
  ctx.font = 'normal 36px Arial'
  const contactInfo = []
  if (resumeData.personalInfo?.email) contactInfo.push(resumeData.personalInfo.email)
  if (resumeData.personalInfo?.phone) contactInfo.push(resumeData.personalInfo.phone)
  if (resumeData.personalInfo?.address) contactInfo.push(resumeData.personalInfo.address)

  if (contactInfo.length > 0) {
    ctx.fillText(contactInfo.join(' | '), 100, yPosition)
    yPosition += 60
  }

  // Summary
  if (resumeData.summary) {
    yPosition += 40
    ctx.font = 'bold 42px Arial'
    ctx.fillText('PROFESSIONAL SUMMARY', 100, yPosition)
    yPosition += 50

    ctx.font = 'normal 32px Arial'
    const summaryLines = wrapText(ctx, resumeData.summary, 800)
    summaryLines.forEach(line => {
      ctx.fillText(line, 100, yPosition)
      yPosition += 40
    })
  }

  // Experience
  if (resumeData.experience && resumeData.experience.length > 0) {
    yPosition += 40
    ctx.font = 'bold 42px Arial'
    ctx.fillText('WORK EXPERIENCE', 100, yPosition)
    yPosition += 50

    resumeData.experience.forEach(exp => {
      ctx.font = 'bold 36px Arial'
      ctx.fillText(exp.title || '', 100, yPosition)
      yPosition += 40

      ctx.font = 'italic 32px Arial'
      ctx.fillText(exp.company || '', 100, yPosition)
      yPosition += 35

      ctx.font = 'normal 28px Arial'
      ctx.fillText(`${exp.startDate || ''} - ${exp.endDate || 'Present'}`, 100, yPosition)
      yPosition += 35

      if (exp.description) {
        ctx.font = 'normal 30px Arial'
        const descLines = wrapText(ctx, exp.description, 800)
        descLines.forEach(line => {
          ctx.fillText(line, 120, yPosition)
          yPosition += 35
        })
      }
      yPosition += 30
    })
  }

  // Education
  if (resumeData.education && resumeData.education.length > 0) {
    yPosition += 40
    ctx.font = 'bold 42px Arial'
    ctx.fillText('EDUCATION', 100, yPosition)
    yPosition += 50

    resumeData.education.forEach(edu => {
      ctx.font = 'bold 36px Arial'
      ctx.fillText(edu.degree || '', 100, yPosition)
      yPosition += 40

      ctx.font = 'italic 32px Arial'
      ctx.fillText(edu.institution || '', 100, yPosition)
      yPosition += 35

      ctx.font = 'normal 28px Arial'
      ctx.fillText(edu.graduationDate || '', 100, yPosition)
      yPosition += 30
    })
  }

  // Skills
  if (resumeData.skills && resumeData.skills.length > 0) {
    yPosition += 40
    ctx.font = 'bold 42px Arial'
    ctx.fillText('SKILLS', 100, yPosition)
    yPosition += 50

    ctx.font = 'normal 32px Arial'
    const skillsText = resumeData.skills.filter(skill => skill).join(' • ')
    const skillLines = wrapText(ctx, skillsText, 800)
    skillLines.forEach(line => {
      ctx.fillText(line, 100, yPosition)
      yPosition += 40
    })
  }

  return canvas
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ')
  const lines = []
  let currentLine = ''

  words.forEach(word => {
    const testLine = currentLine + (currentLine ? ' ' : '') + word
    const metrics = ctx.measureText(testLine)
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = testLine
    }
  })

  if (currentLine) {
    lines.push(currentLine)
  }

  return lines
}

export function downloadPDF(pdf, filename = 'resume.pdf') {
  pdf.save(filename)
}
