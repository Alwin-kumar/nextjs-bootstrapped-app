import { auth } from '@clerk/nextjs'

export function withAuth(handler) {
  return async (req, res) => {
    try {
      const { userId } = auth()

      if (!userId) {
        return res.status(401).json({
          error: 'Unauthorized',
          message: 'You must be signed in to access this resource'
        })
      }

      // Add userId to request object for use in handlers
      req.userId = userId

      return handler(req, res)
    } catch (error) {
      console.error('Auth middleware error:', error)
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Authentication failed'
      })
    }
  }
}
