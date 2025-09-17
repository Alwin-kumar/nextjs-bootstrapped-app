import { withAuth } from '@/lib/auth-middleware'
import { prisma } from '@/lib/prisma'

async function handler(req, res) {
  const { userId } = req

  if (req.method === 'GET') {
    try {
      const certificates = await prisma.certificate.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
      })

      return res.status(200).json({
        success: true,
        certificates
      })
    } catch (error) {
      console.error('Error fetching certificates:', error)
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to fetch certificates'
      })
    }
  }

  if (req.method === 'POST') {
    try {
      const {
        name,
        issuingOrganization,
        issueDate,
        expirationDate,
        credentialId,
        credentialUrl,
        documentUrl,
        documentType,
        description,
        skills
      } = req.body

      if (!name || !issuingOrganization || !issueDate) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'Name, issuing organization, and issue date are required'
        })
      }

      const certificate = await prisma.certificate.create({
        data: {
          userId,
          name,
          issuingOrganization,
          issueDate: new Date(issueDate),
          expirationDate: expirationDate ? new Date(expirationDate) : null,
          credentialId,
          credentialUrl,
          documentUrl,
          documentType,
          description,
          skills: skills ? JSON.stringify(skills) : null,
          verificationStatus: documentUrl ? 'pending' : 'unverified'
        }
      })

      return res.status(201).json({
        success: true,
        certificate
      })
    } catch (error) {
      console.error('Error creating certificate:', error)
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to create certificate'
      })
    }
  }

  if (req.method === 'PUT') {
    try {
      const { id, ...updateData } = req.body

      if (!id) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'Certificate ID is required'
        })
      }

      // Verify ownership
      const existingCertificate = await prisma.certificate.findFirst({
        where: { id, userId }
      })

      if (!existingCertificate) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Certificate not found'
        })
      }

      const {
        name,
        issuingOrganization,
        issueDate,
        expirationDate,
        credentialId,
        credentialUrl,
        documentUrl,
        documentType,
        description,
        skills,
        verificationStatus
      } = updateData

      const updatedCertificate = await prisma.certificate.update({
        where: { id },
        data: {
          name: name || existingCertificate.name,
          issuingOrganization: issuingOrganization || existingCertificate.issuingOrganization,
          issueDate: issueDate ? new Date(issueDate) : existingCertificate.issueDate,
          expirationDate: expirationDate ? new Date(expirationDate) : existingCertificate.expirationDate,
          credentialId: credentialId !== undefined ? credentialId : existingCertificate.credentialId,
          credentialUrl: credentialUrl !== undefined ? credentialUrl : existingCertificate.credentialUrl,
          documentUrl: documentUrl !== undefined ? documentUrl : existingCertificate.documentUrl,
          documentType: documentType !== undefined ? documentType : existingCertificate.documentType,
          description: description !== undefined ? description : existingCertificate.description,
          skills: skills ? JSON.stringify(skills) : existingCertificate.skills,
          verificationStatus: verificationStatus || existingCertificate.verificationStatus,
          updatedAt: new Date()
        }
      })

      return res.status(200).json({
        success: true,
        certificate: updatedCertificate
      })
    } catch (error) {
      console.error('Error updating certificate:', error)
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to update certificate'
      })
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query

      if (!id) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'Certificate ID is required'
        })
      }

      // Verify ownership
      const existingCertificate = await prisma.certificate.findFirst({
        where: { id, userId }
      })

      if (!existingCertificate) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Certificate not found'
        })
      }

      await prisma.certificate.delete({
        where: { id }
      })

      return res.status(200).json({
        success: true,
        message: 'Certificate deleted successfully'
      })
    } catch (error) {
      console.error('Error deleting certificate:', error)
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to delete certificate'
      })
    }
  }

  return res.status(405).json({
    error: 'Method Not Allowed',
    message: 'Only GET, POST, PUT, and DELETE methods are allowed'
  })
}

export default withAuth(handler)
