'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Upload, Award, CheckCircle, XCircle, Clock, Eye, Trash2 } from 'lucide-react'

export default function CertificateTab() {
  const [certificates, setCertificates] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [newCertificate, setNewCertificate] = useState({
    name: '',
    issuingOrganization: '',
    issueDate: '',
    expirationDate: '',
    credentialId: '',
    credentialUrl: '',
    description: ''
  })

  const handleInputChange = (field, value) => {
    setNewCertificate(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // TODO: Implement actual file upload to storage
    setTimeout(() => {
      setIsUploading(false)
      setUploadProgress(0)
      // Add certificate to list with mock verification
      const certificate = {
        id: Date.now(),
        ...newCertificate,
        documentUrl: 'mock-url',
        documentType: file.type.includes('pdf') ? 'pdf' : 'image',
        verificationStatus: 'pending',
        createdAt: new Date().toISOString()
      }
      setCertificates(prev => [...prev, certificate])
      setNewCertificate({
        name: '',
        issuingOrganization: '',
        issueDate: '',
        expirationDate: '',
        credentialId: '',
        credentialUrl: '',
        description: ''
      })
    }, 2000)
  }

  const handleVerifyCertificate = async (certificateId) => {
    // TODO: Implement AI verification
    setCertificates(prev =>
      prev.map(cert =>
        cert.id === certificateId
          ? { ...cert, verificationStatus: 'verified' }
          : cert
      )
    )
  }

  const handleDeleteCertificate = (certificateId) => {
    setCertificates(prev => prev.filter(cert => cert.id !== certificateId))
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'verified':
        return 'Verified'
      case 'rejected':
        return 'Rejected'
      default:
        return 'Pending Verification'
    }
  }

  return (
    <div className="space-y-6">
      {/* Add Certificate Form */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Award className="h-5 w-5" />
            Add New Certificate
          </CardTitle>
          <CardDescription className="text-gray-400">
            Upload and verify your professional certificates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="certName" className="text-gray-300">Certificate Name *</Label>
              <Input
                id="certName"
                value={newCertificate.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="AWS Certified Solutions Architect"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="organization" className="text-gray-300">Issuing Organization *</Label>
              <Input
                id="organization"
                value={newCertificate.issuingOrganization}
                onChange={(e) => handleInputChange('issuingOrganization', e.target.value)}
                placeholder="Amazon Web Services"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="issueDate" className="text-gray-300">Issue Date *</Label>
              <Input
                id="issueDate"
                type="date"
                value={newCertificate.issueDate}
                onChange={(e) => handleInputChange('issueDate', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expirationDate" className="text-gray-300">Expiration Date</Label>
              <Input
                id="expirationDate"
                type="date"
                value={newCertificate.expirationDate}
                onChange={(e) => handleInputChange('expirationDate', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="credentialId" className="text-gray-300">Credential ID</Label>
              <Input
                id="credentialId"
                value={newCertificate.credentialId}
                onChange={(e) => handleInputChange('credentialId', e.target.value)}
                placeholder="ABC123456"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="credentialUrl" className="text-gray-300">Credential URL</Label>
              <Input
                id="credentialUrl"
                value={newCertificate.credentialUrl}
                onChange={(e) => handleInputChange('credentialUrl', e.target.value)}
                placeholder="https://verify.example.com/cert123"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-300">Description</Label>
            <Textarea
              id="description"
              value={newCertificate.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Brief description of the certificate and what it validates..."
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label className="text-gray-300">Certificate Document *</Label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400 mb-2">
                Upload certificate image or PDF
              </p>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                className="hidden"
                id="certificate-upload"
              />
              <label htmlFor="certificate-upload">
                <Button
                  type="button"
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  disabled={isUploading}
                >
                  {isUploading ? 'Uploading...' : 'Choose File'}
                </Button>
              </label>
            </div>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Certificates List */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Your Certificates</CardTitle>
          <CardDescription className="text-gray-400">
            Manage and verify your professional certificates
          </CardDescription>
        </CardHeader>
        <CardContent>
          {certificates.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No certificates added yet. Add your first certificate above.
            </div>
          ) : (
            <div className="space-y-4">
              {certificates.map((cert) => (
                <div key={cert.id} className="border border-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      {getStatusIcon(cert.verificationStatus)}
                      <div>
                        <h3 className="text-white font-medium">{cert.name}</h3>
                        <p className="text-gray-400 text-sm">{cert.issuingOrganization}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          cert.verificationStatus === 'verified' ? 'default' :
                          cert.verificationStatus === 'rejected' ? 'destructive' : 'secondary'
                        }
                        className={
                          cert.verificationStatus === 'verified' ? 'bg-green-600' :
                          cert.verificationStatus === 'rejected' ? 'bg-red-600' : 'bg-yellow-600'
                        }
                      >
                        {getStatusText(cert.verificationStatus)}
                      </Badge>
                      <Button
                        onClick={() => handleDeleteCertificate(cert.id)}
                        variant="outline"
                        size="sm"
                        className="border-red-600 text-red-400 hover:bg-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400 mb-3">
                    <div>
                      <span className="font-medium">Issue Date:</span> {new Date(cert.issueDate).toLocaleDateString()}
                    </div>
                    {cert.expirationDate && (
                      <div>
                        <span className="font-medium">Expires:</span> {new Date(cert.expirationDate).toLocaleDateString()}
                      </div>
                    )}
                    {cert.credentialId && (
                      <div className="md:col-span-2">
                        <span className="font-medium">Credential ID:</span> {cert.credentialId}
                      </div>
                    )}
                  </div>

                  {cert.description && (
                    <p className="text-gray-300 text-sm mb-3">{cert.description}</p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="border-gray-600 text-gray-400">
                        {cert.documentType?.toUpperCase()}
                      </Badge>
                      <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                        <Eye className="h-4 w-4 mr-2" />
                        View Document
                      </Button>
                    </div>

                    {cert.verificationStatus === 'pending' && (
                      <Button
                        onClick={() => handleVerifyCertificate(cert.id)}
                        size="sm"
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      >
                        Verify with AI
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
