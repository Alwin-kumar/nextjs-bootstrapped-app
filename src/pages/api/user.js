import { withAuth } from '@/lib/auth-middleware'
import { prisma } from '@/lib/prisma'

async function handler(req, res) {
  const { userId } = req

  if (req.method === 'GET') {
    try {
      // Get or create user in database
      let user = await prisma.user.findUnique({
        where: { clerkId: userId }
      })

      if (!user) {
        // Create user if doesn't exist
        user = await prisma.user.create({
          data: {
            clerkId: userId,
            email: '', // Will be updated from Clerk webhook
          }
        })
      }

      return res.status(200).json({
        success: true,
        user: {
          id: user.id,
          clerkId: user.clerkId,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
          createdAt: user.createdAt
        }
      })
    } catch (error) {
      console.error('Error fetching user:', error)
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to fetch user data'
      })
    }
  }

  if (req.method === 'PUT') {
    try {
      const { firstName, lastName, email } = req.body

      const updatedUser = await prisma.user.update({
        where: { clerkId: userId },
        data: {
          firstName,
          lastName,
          email,
          updatedAt: new Date()
        }
      })

      return res.status(200).json({
        success: true,
        user: updatedUser
      })
    } catch (error) {
      console.error('Error updating user:', error)
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to update user data'
      })
    }
  }

  return res.status(405).json({
    error: 'Method Not Allowed',
    message: 'Only GET and PUT methods are allowed'
  })
}

export default withAuth(handler)
