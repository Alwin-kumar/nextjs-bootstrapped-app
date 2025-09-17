'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Trash2, Sparkles } from 'lucide-react'

export default function ResumeForm({ resumeData, onUpdate }) {
  const [activeSection, setActiveSection] = useState('personal')

  const updatePersonalInfo = (field, value) => {
    const newData = {
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value
      }
    }
    onUpdate(newData)
  }

  const updateSummary = (value) => {
    const newData = {
      ...resumeData,
      summary: value
    }
    onUpdate(newData)
  }

  const addExperience = () => {
    const newData = {
      ...resumeData,
      experience: [
        ...resumeData.experience,
        {
          id: Date.now(),
          title: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          description: ''
        }
      ]
    }
    onUpdate(newData)
  }

  const updateExperience = (id, field, value) => {
    const newData = {
      ...resumeData,
      experience: resumeData.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }
    onUpdate(newData)
  }

  const removeExperience = (id) => {
    const newData = {
      ...resumeData,
      experience: resumeData.experience.filter(exp => exp.id !== id)
    }
    onUpdate(newData)
  }

  const addEducation = () => {
    const newData = {
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          id: Date.now(),
          degree: '',
          institution: '',
          location: '',
          graduationDate: '',
          gpa: ''
        }
      ]
    }
    onUpdate(newData)
  }

  const updateEducation = (id, field, value) => {
    const newData = {
      ...resumeData,
      education: resumeData.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }
    onUpdate(newData)
  }

  const removeEducation = (id) => {
    const newData = {
      ...resumeData,
      education: resumeData.education.filter(edu => edu.id !== id)
    }
    onUpdate(newData)
  }

  const addSkill = () => {
    const newData = {
      ...resumeData,
      skills: [...resumeData.skills, '']
    }
    onUpdate(newData)
  }

  const updateSkill = (index, value) => {
    const newData = {
      ...resumeData,
      skills: resumeData.skills.map((skill, i) => i === index ? value : skill)
    }
    onUpdate(newData)
  }

  const removeSkill = (index) => {
    const newData = {
      ...resumeData,
      skills: resumeData.skills.filter((_, i) => i !== index)
    }
    onUpdate(newData)
  }

  const handleAIImprove = async (section) => {
    // TODO: Implement AI improvement for specific sections
    console.log(`AI improve ${section}`)
  }

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'personal', label: 'Personal Info' },
          { id: 'summary', label: 'Summary' },
          { id: 'experience', label: 'Experience' },
          { id: 'education', label: 'Education' },
          { id: 'skills', label: 'Skills' },
          { id: 'projects', label: 'Projects' }
        ].map(section => (
          <Button
            key={section.id}
            variant={activeSection === section.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveSection(section.id)}
            className={
              activeSection === section.id
                ? "bg-white text-black"
                : "border-gray-600 text-gray-300 hover:bg-gray-800"
            }
          >
            {section.label}
          </Button>
        ))}
      </div>

      {/* Personal Information */}
      {activeSection === 'personal' && (
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Personal Information</CardTitle>
            <CardDescription className="text-gray-400">
              Basic information that will appear at the top of your resume
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-gray-300">Full Name *</Label>
                <Input
                  id="fullName"
                  value={resumeData.personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                  placeholder="John Doe"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  placeholder="john@example.com"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-300">Phone</Label>
                <Input
                  id="phone"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="text-gray-300">Address</Label>
                <Input
                  id="address"
                  value={resumeData.personalInfo.address}
                  onChange={(e) => updatePersonalInfo('address', e.target.value)}
                  placeholder="City, State, Country"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website" className="text-gray-300">Website</Label>
                <Input
                  id="website"
                  value={resumeData.personalInfo.website}
                  onChange={(e) => updatePersonalInfo('website', e.target.value)}
                  placeholder="https://johndoe.com"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin" className="text-gray-300">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={resumeData.personalInfo.linkedin}
                  onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                  placeholder="linkedin.com/in/johndoe"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="github" className="text-gray-300">GitHub</Label>
                <Input
                  id="github"
                  value={resumeData.personalInfo.github}
                  onChange={(e) => updatePersonalInfo('github', e.target.value)}
                  placeholder="github.com/johndoe"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Professional Summary */}
      {activeSection === 'summary' && (
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Professional Summary</CardTitle>
                <CardDescription className="text-gray-400">
                  A brief overview of your professional background and key strengths
                </CardDescription>
              </div>
              <Button
                onClick={() => handleAIImprove('summary')}
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                AI Improve
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={resumeData.summary}
              onChange={(e) => updateSummary(e.target.value)}
              placeholder="Experienced software developer with 5+ years of expertise in full-stack development..."
              className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
            />
          </CardContent>
        </Card>
      )}

      {/* Work Experience */}
      {activeSection === 'experience' && (
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Work Experience</CardTitle>
                <CardDescription className="text-gray-400">
                  Your professional work history and achievements
                </CardDescription>
              </div>
              <Button onClick={addExperience} size="sm" className="bg-white text-black hover:bg-gray-200">
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {resumeData.experience.map((exp, index) => (
              <div key={exp.id} className="border border-gray-700 rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-medium">Experience {index + 1}</h4>
                  <Button
                    onClick={() => removeExperience(exp.id)}
                    variant="outline"
                    size="sm"
                    className="border-red-600 text-red-400 hover:bg-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Job Title</Label>
                    <Input
                      value={exp.title}
                      onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                      placeholder="Software Engineer"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">Company</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      placeholder="Tech Company Inc."
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">Location</Label>
                    <Input
                      value={exp.location}
                      onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                      placeholder="San Francisco, CA"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">Start Date</Label>
                    <Input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">End Date</Label>
                    <Input
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      placeholder="Present"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Description</Label>
                  <Textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                    placeholder="Describe your responsibilities and achievements..."
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
            ))}
            {resumeData.experience.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No work experience added yet. Click "Add Experience" to get started.
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Education */}
      {activeSection === 'education' && (
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Education</CardTitle>
                <CardDescription className="text-gray-400">
                  Your educational background and qualifications
                </CardDescription>
              </div>
              <Button onClick={addEducation} size="sm" className="bg-white text-black hover:bg-gray-200">
                <Plus className="h-4 w-4 mr-2" />
                Add Education
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {resumeData.education.map((edu, index) => (
              <div key={edu.id} className="border border-gray-700 rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-medium">Education {index + 1}</h4>
                  <Button
                    onClick={() => removeEducation(edu.id)}
                    variant="outline"
                    size="sm"
                    className="border-red-600 text-red-400 hover:bg-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Degree</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      placeholder="Bachelor of Science in Computer Science"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">Institution</Label>
                    <Input
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                      placeholder="University Name"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">Location</Label>
                    <Input
                      value={edu.location}
                      onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                      placeholder="City, State"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">Graduation Date</Label>
                    <Input
                      type="month"
                      value={edu.graduationDate}
                      onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">GPA (optional)</Label>
                    <Input
                      value={edu.gpa}
                      onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                      placeholder="3.8"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
            {resumeData.education.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No education added yet. Click "Add Education" to get started.
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Skills */}
      {activeSection === 'skills' && (
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Skills</CardTitle>
                <CardDescription className="text-gray-400">
                  Technical and soft skills relevant to your profession
                </CardDescription>
              </div>
              <Button onClick={addSkill} size="sm" className="bg-white text-black hover:bg-gray-200">
                <Plus className="h-4 w-4 mr-2" />
                Add Skill
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {resumeData.skills.map((skill, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Input
                  value={skill}
                  onChange={(e) => updateSkill(index, e.target.value)}
                  placeholder="JavaScript, React, Node.js"
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <Button
                  onClick={() => removeSkill(index)}
                  variant="outline"
                  size="sm"
                  className="border-red-600 text-red-400 hover:bg-red-900"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {resumeData.skills.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No skills added yet. Click "Add Skill" to get started.
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Projects - Placeholder for now */}
      {activeSection === 'projects' && (
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Projects</CardTitle>
            <CardDescription className="text-gray-400">
              Personal and professional projects you've worked on
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-400">
              Projects section coming soon...
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
