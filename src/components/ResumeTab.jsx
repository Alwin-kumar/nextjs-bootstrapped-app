'use client'

import { useState, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { FileText, Download, Sparkles, Upload, Eye } from 'lucide-react'
import ResumeForm from './ResumeForm'
import ResumePreview from './ResumePreview'

export default function ResumeTab() {
  const [activeTab, setActiveTab] = useState('builder')
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      website: '',
      linkedin: '',
      github: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: []
  })
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [atsScore, setAtsScore] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const fileInputRef = useRef(null)

  const handleResumeUpdate = (newData) => {
    setResumeData(newData)
  }

  const handleAIPreview = async () => {
    // TODO: Implement AI preview functionality
    console.log('AI Preview clicked')
  }

  const handleGeneratePDF = async () => {
    setIsGeneratingPDF(true)
    // TODO: Implement PDF generation
    setTimeout(() => {
      setIsGeneratingPDF(false)
    }, 2000)
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (file) {
      setIsAnalyzing(true)
      // TODO: Implement ATS analysis
      setTimeout(() => {
        setAtsScore(85) // Mock score
        setIsAnalyzing(false)
      }, 3000)
    }
  }

  return (
    <div className="space-y-6">
      {/* Resume Actions */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Resume Builder
          </CardTitle>
          <CardDescription className="text-gray-400">
            Create and optimize your resume with AI assistance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={handleAIPreview}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              AI Preview
            </Button>
            <Button
              onClick={handleGeneratePDF}
              disabled={isGeneratingPDF}
              className="bg-white text-black hover:bg-gray-200"
            >
              <Download className="h-4 w-4 mr-2" />
              {isGeneratingPDF ? 'Generating...' : 'Generate PDF'}
            </Button>
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload for ATS Analysis
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </CardContent>
      </Card>

      {/* ATS Score Display */}
      {atsScore !== null && (
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">ATS Score Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Overall Score</span>
                <Badge
                  variant={atsScore >= 80 ? "default" : atsScore >= 60 ? "secondary" : "destructive"}
                  className="text-lg px-3 py-1"
                >
                  {atsScore}/100
                </Badge>
              </div>
              <Progress value={atsScore} className="h-3" />
              <div className="text-sm text-gray-400">
                {atsScore >= 80
                  ? "Excellent! Your resume is well-optimized for ATS systems."
                  : atsScore >= 60
                  ? "Good score. Consider making some improvements."
                  : "Your resume needs optimization for better ATS compatibility."
                }
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ATS Analysis Loading */}
      {isAnalyzing && (
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <div>
                <p className="text-white font-medium">Analyzing Resume...</p>
                <p className="text-gray-400 text-sm">Checking ATS compatibility and scoring</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Resume Builder */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-900/50 border border-gray-800">
          <TabsTrigger
            value="builder"
            className="data-[state=active]:bg-white data-[state=active]:text-black"
          >
            Resume Builder
          </TabsTrigger>
          <TabsTrigger
            value="preview"
            className="data-[state=active]:bg-white data-[state=active]:text-black"
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="mt-6">
          <ResumeForm
            resumeData={resumeData}
            onUpdate={handleResumeUpdate}
          />
        </TabsContent>

        <TabsContent value="preview" className="mt-6">
          <ResumePreview
            resumeData={resumeData}
            onEdit={() => setActiveTab('builder')}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
