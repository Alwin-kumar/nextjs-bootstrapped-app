# Google Gemini AI Setup Guide

## 🚀 AI Integration with Google Gemini

Your application now uses **Google Gemini 1.5 Flash** for AI-powered features instead of OpenRouter. Gemini provides:

- ✅ **High Performance**: Fast response times with excellent quality
- ✅ **Cost Effective**: Generous free tier (60 requests/minute)
- ✅ **Reliable**: Google's enterprise-grade infrastructure
- ✅ **Advanced AI**: Latest Gemini 1.5 Flash model capabilities

## 📋 Prerequisites

1. **Google Account**: Required for Google AI Studio
2. **API Key**: Free Gemini API key from Google AI Studio

## 🔧 Setup Instructions

### Step 1: Access Google AI Studio

1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Navigate to the **API Keys** section

### Step 2: Create API Key

1. Click **"Create API Key"**
2. Choose a name for your API key (e.g., "Resume Builder App")
3. Copy the generated API key (it will look like: `AIzaSyC...`)

### Step 3: Configure Environment Variables

Update your `.env.local` file with your Gemini API key:

```env
# AI Service (Google Gemini)
GEMINI_API_KEY=AIzaSyC_your_actual_gemini_api_key_here
```

**Example:**
```env
GEMINI_API_KEY=AIzaSyC8rY8xBqWlFrMxPoLuQzX9aBcDeFgHiJk
```

### Step 4: Test the Setup

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Go to the Resume tab** in your dashboard

3. **Try the "Improve with AI" feature:**
   - Fill out some resume information
   - Click the "Improve with AI" button
   - Check the browser console for any errors

4. **Test ATS scoring:**
   - Upload a resume PDF
   - Check if ATS score is calculated

## 🔒 Security Features

- **API Key Protection**: Key is stored securely in environment variables
- **Rate Limiting**: Built-in rate limiting prevents abuse
- **Error Handling**: Comprehensive error messages for debugging
- **Authentication**: AI features require user authentication

## 💰 Gemini Pricing

### Free Tier (Perfect for Development)
- **60 requests per minute**
- **1,500 requests per day**
- **No credit card required**

### Paid Tier (For Production)
- **$0.00135 per 1,000 characters** (input)
- **$0.00405 per 1,000 characters** (output)
- **Very cost-effective** compared to other AI providers

## 🛠️ Troubleshooting

### Common Issues:

#### 1. "Gemini API key is not configured" error
- ✅ Check your `.env.local` file has `GEMINI_API_KEY=`
- ✅ Make sure the key starts with `AIzaSy`
- ✅ Restart your development server after adding the key

#### 2. "Quota exceeded" error
- ✅ You're hitting the free tier limits (60 requests/minute)
- ✅ Wait a minute and try again
- ✅ Consider upgrading to paid tier for production

#### 3. "Invalid API key" error
- ✅ Double-check your API key in Google AI Studio
- ✅ Make sure you're copying the entire key
- ✅ Verify the key is active in your Google AI Studio account

#### 4. AI responses are slow or failing
- ✅ Check your internet connection
- ✅ Verify Google AI Studio services are operational
- ✅ Check browser console for detailed error messages

### Debug Steps:

1. **Check environment variables:**
   ```bash
   echo $GEMINI_API_KEY
   ```

2. **Test API key validity:**
   - Visit [Google AI Studio](https://aistudio.google.com/)
   - Try a simple prompt in the playground
   - Verify your account has API access

3. **Check browser network tab:**
   - Look for failed API calls to `/api/ai/*`
   - Check response status and error messages

## 🔄 Migration from OpenRouter

If you were previously using OpenRouter:

1. **Remove OpenRouter key** from `.env.local`
2. **Add Gemini key** as shown above
3. **Restart your development server**
4. **Test all AI features** to ensure they work
5. **Update any documentation** references

## 📊 AI Features Available

### 1. Resume Improvement
- **Input**: Resume data in JSON format
- **Output**: Improved, professional resume content
- **Use Case**: Enhance resume sections with AI suggestions

### 2. Certificate Verification
- **Input**: Certificate document text
- **Output**: Verification status, confidence score, recommendations
- **Use Case**: Validate certificate authenticity

### 3. ATS Scoring
- **Input**: Resume text content
- **Output**: ATS compatibility score, grade, recommendations
- **Use Case**: Optimize resumes for applicant tracking systems

## 🎯 Best Practices

1. **Rate Limiting**: Respect the 60 requests/minute limit
2. **Error Handling**: Always handle API errors gracefully
3. **Caching**: Consider caching AI responses for repeated requests
4. **User Feedback**: Show loading states during AI processing
5. **Fallbacks**: Have fallback behavior if AI is unavailable

## 📞 Support

- **Google AI Studio**: [https://aistudio.google.com/](https://aistudio.google.com/)
- **Gemini API Documentation**: [https://ai.google.dev/docs](https://ai.google.dev/docs)
- **Community Support**: Google AI forums and documentation

---

**🎉 Your AI features are now powered by Google Gemini!** Enjoy fast, reliable, and cost-effective AI capabilities.
