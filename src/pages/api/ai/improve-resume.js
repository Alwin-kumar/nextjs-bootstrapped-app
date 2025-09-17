import { withAuth } from '@/lib/auth-middleware'
import { improveResumeText } from '@/lib/openrouter'

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method Not Allowed',
      message: 'Only POST method is allowed'
    })
  }

  try {
    const { resumeData, section } = req.body

    if (!resumeData) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Resume data is required'
      })
    }

    const improvedData = await improveResumeText(resumeData)

    return res.status(200).json({
      success: true,
      improvedData,
      message: 'Resume improved successfully'
    })
  } catch (error) {
    console.error('Resume improvement error:', error)
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to improve resume. Please try again.'
    })
  }
}

export default withAuth(handler)
