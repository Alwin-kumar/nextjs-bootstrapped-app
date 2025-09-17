import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default function HomePage() {
  const { userId } = auth()

  if (userId) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            AI Resume & Certificate Manager
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Build professional resumes with AI assistance, manage your certificates, 
            and get ATS scores to improve your job applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 mx-auto">
              <span className="text-black font-bold text-xl">📄</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">AI Resume Builder</h3>
            <p className="text-gray-400">
              Create professional resumes with AI-powered improvements and get ATS scores 
              to optimize for job applications.
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 mx-auto">
              <span className="text-black font-bold text-xl">🏆</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Certificate Management</h3>
            <p className="text-gray-400">
              Upload and manage your certificates with AI-powered verification 
              to validate their authenticity.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Link
            href="/sign-up"
            className="inline-block bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors mr-4"
          >
            Get Started
          </Link>
          <Link
            href="/sign-in"
            className="inline-block border border-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Sign In
          </Link>
        </div>

        <div className="mt-16 text-sm text-gray-500">
          <p>Powered by AI • Secure • Professional</p>
        </div>
      </div>
    </div>
  )
}
