import { withAuth } from '@/lib/auth-middleware'
import { analyzeCertificate } from '@/lib/openrouter'
import { prisma } from '@/lib/prisma'

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method Not Allowed',
      message: 'Only POST method is allowed'
    })
  }

  try {
    const { certificateId, documentText } = req.body
    const { userId } = req

    if (!certificateId || !documentText) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Certificate ID and document text are required'
      })
    }

    // Verify certificate ownership
    const certificate = await prisma.certificate.findFirst({
      where: { id: certificateId, userId }
    })

    if (!certificate) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Certificate not found'
      })
    }

    // Analyze certificate
    const analysis = await analyzeCertificate(documentText)

    // Update certificate with verification results
    const updatedCertificate = await prisma.certificate.update({
      where: { id: certificateId },
      data: {
        isVerified: analysis.status === 'verified',
        verificationStatus: analysis.status,
        verificationDetails: JSON.stringify({
          confidence: analysis.confidence,
          reasoning: analysis.reasoning,
          recommendations: analysis.recommendations,
          analyzedAt: new Date().toISOString()
        }),
        updatedAt: new Date()
      }
    })

    return res.status(200).json({
      success: true,
      certificate: updatedCertificate,
      analysis,
      message: `Certificate ${analysis.status} with ${analysis.confidence}% confidence`
    })
  } catch (error) {
    console.error('Certificate verification error:', error)
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to verify certificate. Please try again.'
    })
  }
}

export default withAuth(handler)
