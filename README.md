# AI-Powered Certificate Management and Resume Builder

A modern, full-stack web application built with Next.js 15+ that provides AI-powered resume building and certificate management with authentication, database integration, and advanced features.

## 🚀 Features

### Core Functionality
- **Authentication**: Secure user authentication with Clerk
- **Dashboard**: Clean, dark-themed interface with 3 main tabs
- **Resume Builder**: Comprehensive resume creation with AI assistance
- **Certificate Management**: Upload, verify, and manage professional certificates
- **AI Integration**: Powered by OpenRouter API for intelligent features

### Resume Features
- **AI Resume Improvement**: Get AI-powered suggestions to enhance your resume
- **Live Preview**: See real-time preview of your resume as you build it
- **PDF Export**: Generate professional PDF versions of your resume
- **ATS Scoring**: Upload existing resumes to get ATS compatibility scores
- **Professional Templates**: Clean, modern resume templates

### Certificate Features
- **Document Upload**: Support for PDF and image certificate uploads
- **AI Verification**: Automatic verification of certificate authenticity
- **Metadata Management**: Store certificate details, dates, and credentials
- **Status Tracking**: Monitor verification status and validity

### Technical Features
- **Dark Theme**: Modern dark UI with excellent UX
- **Responsive Design**: Works perfectly on desktop and mobile
- **Real-time Updates**: Live preview and instant feedback
- **Secure API**: Protected endpoints with authentication
- **Database Integration**: PostgreSQL with Prisma ORM

## 🛠️ Tech Stack

### Frontend
- **Next.js 15+**: React framework with App Router
- **JavaScript/JSX**: No TypeScript for simplicity
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Modern UI components
- **Radix UI**: Accessible component primitives

### Backend
- **Next.js API Routes**: Serverless API endpoints
- **Prisma ORM**: Database ORM for PostgreSQL
- **Neon Database**: Serverless PostgreSQL database

### Authentication & AI
- **Clerk**: User authentication and management
- **OpenRouter API**: AI-powered features (resume improvement, certificate verification, ATS scoring)

### Additional Libraries
- **jsPDF**: PDF generation for resumes
- **html2canvas**: HTML to canvas conversion
- **Axios**: HTTP client for API calls
- **Lucide React**: Modern icon library

## 📋 Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- PostgreSQL database (Neon recommended)
- Clerk account for authentication
- OpenRouter API key for AI features

## 🚀 Getting Started

### 1. Clone and Install

```bash
git clone <repository-url>
cd ai-resume-certificate-manager
npm install
```

### 2. Environment Setup

Copy the environment template and fill in your credentials:

```bash
cp .env.example .env
```

Fill in the following required environment variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here

# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://username:password@your-neon-hostname/your-database-name?sslmode=require

# AI Service (OpenRouter)
OPENROUTER_API_KEY=sk-or-v1-your_openrouter_api_key_here

# Optional: Background Jobs
INNGEST_EVENT_KEY=your_inngest_event_key_here
INNGEST_SIGNING_KEY=your_inngest_signing_key_here
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:8000](http://localhost:8000) in your browser.

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.jsx         # Root layout with Clerk provider
│   │   ├── page.jsx           # Landing page
│   │   └── dashboard/         # Dashboard pages
│   │       └── page.jsx       # Main dashboard
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── ProfileTab.jsx    # User profile management
│   │   ├── ResumeTab.jsx     # Resume builder interface
│   │   ├── ResumeForm.jsx    # Resume form component
│   │   ├── ResumePreview.jsx # Resume preview component
│   │   └── CertificateTab.jsx # Certificate management
│   ├── lib/                  # Utility libraries
│   │   ├── prisma.js         # Database client
│   │   ├── openrouter.js     # AI API client
│   │   ├── auth-middleware.js # Authentication middleware
│   │   └── pdf-generator.js  # PDF generation utilities
│   └── pages/                # API routes
│       └── api/              # Next.js API routes
│           ├── user.js       # User management
│           ├── resume.js     # Resume CRUD operations
│           ├── certificate.js # Certificate CRUD operations
│           ├── generate-pdf.js # PDF generation
│           └── ai/           # AI-powered endpoints
│               ├── improve-resume.js
│               ├── verify-certificate.js
│               └── ats-score.js
├── prisma/
│   └── schema.prisma         # Database schema
├── public/                   # Static assets
└── .env.example             # Environment template
```

## 🔧 API Endpoints

### Authentication Required Endpoints

#### User Management
- `GET /api/user` - Get current user profile
- `PUT /api/user` - Update user profile

#### Resume Management
- `GET /api/resume` - Get user's resumes
- `POST /api/resume` - Create new resume
- `PUT /api/resume` - Update existing resume
- `DELETE /api/resume?id={id}` - Delete resume

#### Certificate Management
- `GET /api/certificate` - Get user's certificates
- `POST /api/certificate` - Create new certificate
- `PUT /api/certificate` - Update certificate
- `DELETE /api/certificate?id={id}` - Delete certificate

#### AI Features
- `POST /api/ai/improve-resume` - AI resume improvement
- `POST /api/ai/verify-certificate` - Certificate verification
- `POST /api/ai/ats-score` - ATS scoring analysis

#### PDF Generation
- `POST /api/generate-pdf` - Generate PDF from resume

## 🎨 UI Components

The application uses shadcn/ui components with a dark theme:

- **Tabs**: Navigation between Profile, Resume, and Certificates
- **Cards**: Content containers with glassmorphism effect
- **Forms**: Input fields, textareas, and select components
- **Buttons**: Primary, secondary, and outline variants
- **Progress**: Loading states and progress indicators
- **Badges**: Status indicators and tags

## 🔒 Security Features

- **Authentication**: Clerk handles secure user authentication
- **API Protection**: All endpoints require valid authentication
- **Data Validation**: Input validation on client and server
- **SQL Injection Protection**: Prisma ORM prevents SQL injection
- **XSS Protection**: Next.js built-in XSS protection

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables for Production

Ensure all environment variables are set in your production environment:

- Database URL should point to production database
- Clerk keys should be production keys
- OpenRouter API key should be configured
- Any file upload services should be configured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues:

1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure database is accessible
4. Check API keys are valid

## 🔄 Future Enhancements

- [ ] Multiple resume templates
- [ ] Advanced AI features (job matching, interview prep)
- [ ] Team collaboration features
- [ ] Integration with LinkedIn and other platforms
- [ ] Advanced analytics and insights
- [ ] Mobile app companion
- [ ] Multi-language support

---

Built with ❤️ using Next.js, Tailwind CSS, and modern web technologies.
