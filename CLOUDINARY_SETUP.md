# Cloudinary Setup Guide

## 🚀 File Upload Storage with Cloudinary

This application now uses **Cloudinary** for secure, scalable file storage instead of local file storage. Cloudinary provides:

- ✅ **Global CDN** - Fast file delivery worldwide
- ✅ **Auto-optimization** - Images automatically optimized
- ✅ **Secure URLs** - HTTPS-protected file access
- ✅ **Scalable storage** - No storage limits
- ✅ **Format conversion** - Automatic format optimization

## 📋 Prerequisites

1. **Cloudinary Account**: [Create a free account](https://cloudinary.com/)
2. **API Credentials**: Get your Cloud Name, API Key, and API Secret

## 🔧 Setup Instructions

### Step 1: Create Cloudinary Account

1. Visit [https://cloudinary.com/](https://cloudinary.com/)
2. Click "Sign Up" and create your account
3. Verify your email address

### Step 2: Get Your Credentials

1. **Login** to your Cloudinary dashboard
2. **Navigate** to your Dashboard
3. **Copy your Cloud Name** from the top of the dashboard
4. **Go to Account Settings** → **API Keys**
5. **Copy your API Key and API Secret**

### Step 3: Configure Environment Variables

Update your `.env.local` file with your Cloudinary credentials:

```env
# Cloudinary (File Upload Storage)
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name_here
CLOUDINARY_API_KEY=your_actual_api_key_here
CLOUDINARY_API_SECRET=your_actual_api_secret_here
```

**Example:**
```env
CLOUDINARY_CLOUD_NAME=demo123456789
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwx
```

### Step 4: Test the Setup

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Go to the Certificates tab** in your dashboard

3. **Upload a certificate** (PDF or image)

4. **Check the browser console** for any errors

5. **Verify the file URL** - it should be a Cloudinary URL like:
   ```
   https://res.cloudinary.com/your-cloud-name/image/upload/certificates/user-id/filename.jpg
   ```

## 📁 File Organization

Cloudinary automatically organizes uploaded files:

```
/certificates/
  ├── user-123/
  │   ├── certificate-1.pdf
  │   ├── certificate-2.jpg
  │   └── certificate-3.png
  └── user-456/
      ├── diploma.pdf
      └── license.jpg
```

## 🔒 Security Features

- **Authenticated uploads** - Only logged-in users can upload
- **File type validation** - Only PDFs and images allowed
- **File size limits** - 10MB maximum per file
- **Secure URLs** - All files served over HTTPS
- **User isolation** - Files organized by user ID

## 🛠️ Troubleshooting

### Common Issues:

#### 1. "Upload failed" error
- ✅ Check your Cloudinary credentials in `.env.local`
- ✅ Verify your Cloudinary account has upload permissions
- ✅ Check the browser console for detailed error messages

#### 2. Files not displaying
- ✅ Ensure `res.cloudinary.com` is in your `next.config.js` image domains
- ✅ Check that files were uploaded successfully to Cloudinary
- ✅ Verify your Cloudinary account has media delivery enabled

#### 3. API Key issues
- ✅ Make sure you're using the correct API Key (not API Secret)
- ✅ Check that your Cloudinary account is active
- ✅ Verify you're not using sandbox/test credentials

### Debug Steps:

1. **Check environment variables:**
   ```bash
   echo $CLOUDINARY_CLOUD_NAME
   echo $CLOUDINARY_API_KEY
   ```

2. **Test Cloudinary connection:**
   - Visit your Cloudinary dashboard
   - Check if you can manually upload a file
   - Verify your account status

3. **Check browser network tab:**
   - Look for failed API calls to `/api/upload`
   - Check response status and error messages

## 💰 Cloudinary Pricing

- **Free Tier**: 25GB storage, 25GB monthly bandwidth
- **Pay-as-you-go**: Additional usage billed per GB
- **Enterprise**: Custom pricing for high-volume usage

## 🔄 Migration from Local Storage

If you were previously using local file storage:

1. **Backup existing files** (if any)
2. **Update your environment variables** with Cloudinary credentials
3. **Restart your development server**
4. **Test file uploads** to ensure everything works
5. **Update any existing file references** in your database

## 📞 Support

- **Cloudinary Documentation**: [https://cloudinary.com/documentation](https://cloudinary.com/documentation)
- **Cloudinary Support**: Available in your dashboard
- **Community Forums**: [https://community.cloudinary.com/](https://community.cloudinary.com/)

---

**🎉 Your file uploads are now powered by Cloudinary's global CDN!**
