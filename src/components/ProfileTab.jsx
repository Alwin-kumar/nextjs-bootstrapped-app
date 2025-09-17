'use client'

import { useUser } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'

export default function ProfileTab() {
  const { user, isLoaded } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.primaryEmailAddress?.emailAddress || '',
  })

  if (!isLoaded) {
    return (
      <Card className="bg-gray-900/50 border-gray-800">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-700 rounded w-1/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            <div className="h-4 bg-gray-700 rounded w-1/3"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const handleSave = () => {
    // TODO: Implement profile update logic
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.primaryEmailAddress?.emailAddress || '',
    })
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      {/* Profile Overview */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Profile Overview</CardTitle>
          <CardDescription className="text-gray-400">
            Your account information and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar and Basic Info */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user?.imageUrl} alt={user?.fullName || 'User'} />
              <AvatarFallback className="bg-gray-700 text-white text-xl">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold text-white">
                {user?.fullName || 'User'}
              </h3>
              <p className="text-gray-400">{user?.primaryEmailAddress?.emailAddress}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                  Active
                </Badge>
                <Badge variant="outline" className="border-gray-600 text-gray-400">
                  Verified
                </Badge>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-gray-300">First Name</Label>
              {isEditing ? (
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              ) : (
                <p className="text-white p-2 bg-gray-800/50 rounded">{user?.firstName || 'Not set'}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-gray-300">Last Name</Label>
              {isEditing ? (
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              ) : (
                <p className="text-white p-2 bg-gray-800/50 rounded">{user?.lastName || 'Not set'}</p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="email" className="text-gray-300">Email Address</Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              ) : (
                <p className="text-white p-2 bg-gray-800/50 rounded">{user?.primaryEmailAddress?.emailAddress}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            {isEditing ? (
              <>
                <Button onClick={handleSave} className="bg-white text-black hover:bg-gray-200">
                  Save Changes
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Edit Profile
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Account Statistics */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Account Statistics</CardTitle>
          <CardDescription className="text-gray-400">
            Your activity and usage metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">0</div>
              <p className="text-sm text-gray-400">Resumes Created</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">0</div>
              <p className="text-sm text-gray-400">Certificates Uploaded</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">0</div>
              <p className="text-sm text-gray-400">AI Improvements</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
