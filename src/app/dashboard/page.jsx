import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { User, FileText, Award } from 'lucide-react'
import ProfileTab from '@/components/ProfileTab'
import ResumeTab from '@/components/ResumeTab'
import CertificateTab from '@/components/CertificateTab'

export default function DashboardPage() {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Manage your resume and certificates with AI assistance</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Resumes</CardTitle>
              <FileText className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">0</div>
              <p className="text-xs text-gray-400">Created this month</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Certificates</CardTitle>
              <Award className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">0</div>
              <p className="text-xs text-gray-400">Verified certificates</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">ATS Score</CardTitle>
              <User className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">--</div>
              <p className="text-xs text-gray-400">Average score</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-900/50 border border-gray-800">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-white data-[state=active]:text-black"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="resume"
              className="data-[state=active]:bg-white data-[state=active]:text-black"
            >
              Resume
            </TabsTrigger>
            <TabsTrigger
              value="certificates"
              className="data-[state=active]:bg-white data-[state=active]:text-black"
            >
              Certificates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <ProfileTab />
          </TabsContent>

          <TabsContent value="resume" className="mt-6">
            <ResumeTab />
          </TabsContent>

          <TabsContent value="certificates" className="mt-6">
            <CertificateTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
