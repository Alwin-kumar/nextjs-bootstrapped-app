import { withAuth } from '@/lib/auth-middleware'
import { calculateATSScore } from '@/lib/openrouter'
import { prisma } from '@/lib/prisma'

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method Not Allowed',
      message: 'Only POST method is allowed'
    })
  }

  try {
    const { resumeText, resumeId } = req.body
    const { userId } = req

    if (!resumeText) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Resume text is required'
      })
    }

    // If resumeId is provided, verify ownership and update the database
    if (resumeId) {
      const resume = await prisma.resume.findFirst({
        where: { id: resumeId, userId }
      })

      if (!resume) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Resume not found'
        })
      }
    }

    // Calculate ATS score
    const atsResult = await calculateATSScore(resumeText)

    // If resumeId is provided, update the resume with ATS data
    if (resumeId) {
      await prisma.resume.update({
        where: { id: resumeId },
        data: {
          atsScore: atsResult.score,
          atsAnalysis: JSON.stringify({
            grade: atsResult.grade,
            strengths: atsResult.strengths,
            weaknesses: atsResult.weaknesses,
            recommendations: atsResult.recommendations,
            analyzedAt: new Date().toISOString()
          }),
          updatedAt: new Date()
        }
      })
    }

    return res.status(200).json({
      success: true,
      atsResult,
      message: `ATS Score: ${atsResult.score}/100 (Grade: ${atsResult.grade})`
    })
  } catch (error) {
    console.error('ATS scoring error:', error)
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to calculate ATS score. Please try again.'
    })
  }
}

export default withAuth(handler)
