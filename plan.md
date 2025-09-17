```markdown
# Detailed Implementation Plan for AI-Powered Certificate Management and Resume Builder Website

---

## Overview

This project is a modern Next.js (v15+) application using JavaScript and JSX, styled with Tailwind CSS and shadcn UI components. It features authentication via Clerk, data persistence with Prisma ORM and Neon PostgreSQL, AI-powered resume improvement and certificate verification using OpenRouter API, and background job processing with Inngest. The UI is dark-themed and mobile-responsive.

---

## 1. Environment Setup and Configuration

### Files:
- `.env.example`
- `next.config.js` (or `next.config.ts` to be converted to JS if needed)
- `prisma/schema.prisma`

### Changes:
- Create `.env.example` with all required keys (done).
- Configure Prisma to connect to Neon database using `DATABASE_URL`.
- Setup Clerk environment variables for authentication.
- Configure OpenRouter API key for AI features.
- Setup Inngest keys for background jobs.
- Ensure Tailwind CSS is configured for dark mode support.

---

## 2. Authentication Setup with Clerk

### Files:
- `src/app/layout.jsx` (or root layout)
- `src/app/page.jsx` (for sign-in/sign-up redirects)
- `src/components/ui/` (if needed for auth UI components)

### Changes:
- Integrate Clerk provider in root layout for session management.
- Protect dashboard routes to require authentication.
- Redirect unauthenticated users to Clerk sign-in page.
- Use Clerk hooks/components for user profile display in Profile tab.

---

## 3. Database Schema and Prisma Models

### Files:
- `prisma/schema.prisma`

### Changes:
- Define User model (linked to Clerk user ID).
- Define Resume model with fields for all resume inputs (name, contact, education, experience, skills, etc.).
- Define Certificate model with fields: certificate name, date received, document URL, verification status.
- Add relations between User and Resume, User and Certificate.
- Generate Prisma client.

---

## 4. API Routes and Backend Logic

### Files:
- `src/pages/api/resume.js`
- `src/pages/api/certificate.js`
- `src/pages/api/ats-score.js`
- `src/pages/api/ai/improve-resume.js`
- `src/pages/api/ai/verify-certificate.js`
- `src/pages/api/auth/[...clerk].js` (if needed)

### Changes:
- Implement RESTful API endpoints for CRUD operations on Resume and Certificate.
- Implement AI endpoints calling OpenRouter API for:
  - Resume improvement: Accept resume JSON, return improved text.
  - Certificate verification: Accept uploaded document, return verification status.
- Implement ATS scoring endpoint that accepts PDF resume upload, parses it, and returns ATS score using AI.
- Use Inngest for background processing of AI tasks if needed.
- Add error handling and validation for all endpoints.

---

## 5. Frontend UI Components and Pages

### Files:
- `src/app/dashboard/page.jsx`
- `src/components/ui/tabs.jsx` (or use existing shadcn UI Tabs)
- `src/components/ProfileTab.jsx`
- `src/components/ResumeTab.jsx`
- `src/components/CertificateTab.jsx`
- `src/components/ResumeForm.jsx`
- `src/components/ResumePreview.jsx`
- `src/components/CertificateForm.jsx`
- `src/components/CertificateList.jsx`
- `src/components/PdfUploader.jsx`

### Changes:

#### Dashboard Layout
- Create a dashboard page with 3 tabs: Profile, Resume, Certificates.
- Use shadcn UI Tabs component styled for dark mode.
- Responsive layout with sidebar or top navigation.

#### Profile Tab
- Display user info from Clerk.
- Allow editing basic profile details.

#### Resume Tab
- Form to input all resume details (name, contact, education, experience, skills, projects).
- Live preview of resume formatted nicely.
- "Improve with AI" button triggers API call to improve resume text.
- "Generate PDF" button to export resume as PDF.
- Section to upload existing resume PDF for ATS scoring.
- Display ATS score and suggestions.

#### Certificate Tab
- Form to input certificate details: name, date received.
- Upload document (image or PDF) with file input.
- Display list of uploaded certificates with verification status.
- AI verification triggered on upload or manual button.
- Show verification results clearly.

---

## 6. AI Integration Details

### AI Provider:
- OpenRouter API (default model: `anthropic/claude-sonnet-4`)

### API Endpoints:
- `POST /api/ai/improve-resume`: Input resume JSON, output improved resume text.
- `POST /api/ai/verify-certificate`: Input base64 document, output verification status.
- `POST /api/api/ats-score`: Input PDF file, output ATS score and feedback.

### Implementation:
- Use server-side API routes to call OpenRouter with appropriate prompt templates.
- Parse and handle AI responses.
- Expose system prompt customization in UI for advanced users (optional).
- Handle errors and rate limits gracefully.

---

## 7. PDF Generation and File Handling

### Libraries:
- Use `@react-pdf/renderer` or `jspdf` for client-side PDF generation.
- Use file input for uploads with validation (file type, size).
- Store uploaded files securely (e.g., cloud storage or Neon blob storage).
- Show upload progress and error messages.

---

## 8. Styling and Theming

### Files:
- `src/app/globals.css`
- Tailwind config files

### Changes:
- Ensure dark mode is enabled and default.
- Use Tailwind CSS with custom variables for colors.
- Style forms, buttons, tabs, previews with modern, clean UI.
- Use spacing, typography, and layout for clarity and accessibility.
- Responsive design for mobile and desktop.

---

## 9. Error Handling and Validation

- Validate all user inputs on client and server.
- Show user-friendly error messages.
- Handle API errors and loading states.
- Secure API routes to authenticated users only.
- Sanitize inputs to prevent injection attacks.

---

## 10. Testing and Deployment

- Write Jest + React Testing Library tests for key components and API routes.
- Manual testing for responsiveness and accessibility.
- Prepare production build with Turbopack.
- Document environment variables and setup in README.

---

# Summary

- Created `.env.example` with all required API keys and secrets placeholders.
- Setup Clerk authentication and protected dashboard routes.
- Defined Prisma schema for User, Resume, and Certificate models.
- Built REST API routes for resume and certificate CRUD, AI resume improvement, certificate verification, and ATS scoring.
- Developed a modern dark-themed dashboard with Profile, Resume, and Certificate tabs using shadcn UI Tabs.
- Resume tab includes input form, live preview, AI improvement, PDF export, and ATS scoring upload.
- Certificate tab supports certificate details input, document upload, and AI verification.
- Integrated OpenRouter API for AI features using `anthropic/claude-sonnet-4` model.
- Implemented PDF generation and file upload handling with validation.
- Ensured responsive, accessible UI with Tailwind CSS and error handling.
- Planned testing and deployment steps for production readiness.

This plan covers all dependent files, error handling, and best practices for a real-world, scalable AI-powered resume and certificate management platform.
