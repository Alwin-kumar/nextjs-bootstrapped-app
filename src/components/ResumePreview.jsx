'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Edit, Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react'

export default function ResumePreview({ resumeData, onEdit }) {
  const { personalInfo, summary, experience, education, skills } = resumeData

  return (
    <div className="space-y-6">
      {/* Resume Preview Header */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Resume Preview</CardTitle>
              <CardDescription className="text-gray-400">
                Preview how your resume will look when formatted
              </CardDescription>
            </div>
            <Button onClick={onEdit} variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
              <Edit className="h-4 w-4 mr-2" />
              Edit Resume
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Resume Content */}
      <Card className="bg-white text-black">
        <CardContent className="p-8">
          {/* Header Section */}
          <div className="border-b-2 border-gray-300 pb-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {personalInfo.fullName || 'Your Name'}
            </h1>

            {/* Contact Information */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {personalInfo.email && (
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.address && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{personalInfo.address}</span>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4 text-sm text-blue-600 mt-2">
              {personalInfo.website && (
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {personalInfo.website}
                  </a>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-1">
                  <Linkedin className="h-4 w-4" />
                  <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {personalInfo.linkedin}
                  </a>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center gap-1">
                  <Github className="h-4 w-4" />
                  <a href={`https://${personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {personalInfo.github}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Professional Summary */}
          {summary && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-gray-700 leading-relaxed">{summary}</p>
            </div>
          )}

          {/* Work Experience */}
          {experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
                WORK EXPERIENCE
              </h2>
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <div key={exp.id || index} className="border-l-2 border-blue-500 pl-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                      <span className="text-sm text-gray-600">
                        {exp.startDate && exp.endDate
                          ? `${exp.startDate} - ${exp.endDate}`
                          : exp.startDate || 'Present'
                        }
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700">{exp.company}</span>
                      {exp.location && (
                        <span className="text-sm text-gray-600">{exp.location}</span>
                      )}
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
                EDUCATION
              </h2>
              <div className="space-y-3">
                {education.map((edu, index) => (
                  <div key={edu.id || index} className="border-l-2 border-green-500 pl-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                      {edu.graduationDate && (
                        <span className="text-sm text-gray-600">{edu.graduationDate}</span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">{edu.institution}</span>
                      {edu.location && (
                        <span className="text-sm text-gray-600">{edu.location}</span>
                      )}
                    </div>
                    {edu.gpa && (
                      <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
                SKILLS
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  skill && (
                    <Badge key={index} variant="secondary" className="bg-gray-200 text-gray-800">
                      {skill}
                    </Badge>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Placeholder for Projects */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
              PROJECTS
            </h2>
            <p className="text-gray-500 italic">Projects section will be displayed here</p>
          </div>
        </CardContent>
      </Card>

      {/* Preview Actions */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4">
            <Button onClick={onEdit} variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
              <Edit className="h-4 w-4 mr-2" />
              Continue Editing
            </Button>
            <Button className="bg-white text-black hover:bg-gray-200">
              Download PDF
            </Button>
            <Button variant="outline" className="border-purple-600 text-purple-400 hover:bg-purple-900">
              AI Optimize
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
