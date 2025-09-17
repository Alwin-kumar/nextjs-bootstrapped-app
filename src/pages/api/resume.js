import { withAuth } from '@/lib/auth-middleware'
import { prisma } from '@/lib/prisma'

async function handler(req, res) {
  const { userId } = req

  if (req.method === 'GET') {
    try {
      const resumes = await prisma.resume.findMany({
        where: { userId },
        orderBy: { updatedAt: 'desc' }
      })

      return res.status(200).json({
        success: true,
        resumes
      })
    } catch (error) {
      console.error('Error fetching resumes:', error)
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to fetch resumes'
      })
    }
  }

  if (req.method === 'POST') {
    try {
      const {
        title,
        personalInfo,
        summary,
        experience,
        education,
        skills,
        projects,
        additional
      } = req.body

      const resume = await prisma.resume.create({
        data: {
          userId,
          title: title || 'My Resume',
          fullName: personalInfo?.fullName || '',
          email: personalInfo?.email || '',
          phone: personalInfo?.phone || '',
          address: personalInfo?.address || '',
          website: personalInfo?.website || '',
          linkedin: personalInfo?.linkedin || '',
          github: personalInfo?.github || '',
          summary,
          experience: experience ? JSON.stringify(experience) : null,
          education: education ? JSON.stringify(education) : null,
          skills: skills ? JSON.stringify(skills) : null,
          projects: projects ? JSON.stringify(projects) : null,
          additional: additional ? JSON.stringify(additional) : null
        }
      })

      return res.status(201).json({
        success: true,
        resume
      })
    } catch (error) {
      console.error('Error creating resume:', error)
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to create resume'
      })
    }
  }

  if (req.method === 'PUT') {
    try {
      const { id, ...updateData } = req.body

      if (!id) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'Resume ID is required'
        })
      }

      // Verify ownership
      const existingResume = await prisma.resume.findFirst({
        where: { id, userId }
      })

      if (!existingResume) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Resume not found'
        })
      }

      const {
        title,
        personalInfo,
        summary,
        experience,
        education,
        skills,
        projects,
        additional
      } = updateData

      const updatedResume = await prisma.resume.update({
        where: { id },
        data: {
          title: title || existingResume.title,
          fullName: personalInfo?.fullName || existingResume.fullName,
          email: personalInfo?.email || existingResume.email,
          phone: personalInfo?.phone || existingResume.phone,
          address: personalInfo?.address || existingResume.address,
          website: personalInfo?.website || existingResume.website,
          linkedin: personalInfo?.linkedin || existingResume.linkedin,
          github: personalInfo?.github || existingResume.github,
          summary: summary !== undefined ? summary : existingResume.summary,
          experience: experience ? JSON.stringify(experience) : existingResume.experience,
          education: education ? JSON.stringify(education) : existingResume.education,
          skills: skills ? JSON.stringify(skills) : existingResume.skills,
          projects: projects ? JSON.stringify(projects) : existingResume.projects,
          additional: additional ? JSON.stringify(additional) : existingResume.additional,
          updatedAt: new Date()
        }
      })

      return res.status(200).json({
        success: true,
        resume: updatedResume
      })
    } catch (error) {
      console.error('Error updating resume:', error)
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to update resume'
      })
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query

      if (!id) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'Resume ID is required'
        })
      }

      // Verify ownership
      const existingResume = await prisma.resume.findFirst({
        where: { id, userId }
      })

      if (!existingResume) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Resume not found'
        })
      }

      await prisma.resume.delete({
        where: { id }
      })

      return res.status(200).json({
        success: true,
        message: 'Resume deleted successfully'
      })
    } catch (error) {
      console.error('Error deleting resume:', error)
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to delete resume'
      })
    }
  }

  return res.status(405).json({
    error: 'Method Not Allowed',
    message: 'Only GET, POST, PUT, and DELETE methods are allowed'
  })
}

export default withAuth(handler)
