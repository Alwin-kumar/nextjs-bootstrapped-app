const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1'

export async function callOpenRouter(messages, options = {}) {
  if (!OPENROUTER_API_KEY) {
    throw new Error('OpenRouter API key is not configured')
  }

  const {
    model = 'anthropic/claude-sonnet-4',
    temperature = 0.7,
    maxTokens = 1000,
    ...otherOptions
  } = options

  try {
    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'X-Title': 'AI Resume Builder'
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens: maxTokens,
        ...otherOptions
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`OpenRouter API error: ${errorData.error?.message || response.statusText}`)
    }

    const data = await response.json()
    return data.choices[0]?.message?.content || ''
  } catch (error) {
    console.error('OpenRouter API call failed:', error)
    throw error
  }
}

export async function improveResumeText(resumeData) {
  const messages = [
    {
      role: 'system',
      content: `You are an expert resume writer and career coach. Your task is to improve resume content while maintaining professionalism and truthfulness. Focus on:
      - Making language more impactful and concise
      - Using strong action verbs
      - Quantifying achievements where possible
      - Ensuring consistent formatting and tone
      - Highlighting key skills and accomplishments
      Do not add false information or exaggerate claims.`
    },
    {
      role: 'user',
      content: `Please improve the following resume section. Make it more professional and impactful while keeping it truthful:

${JSON.stringify(resumeData, null, 2)}

Return the improved version in the same JSON structure.`
    }
  ]

  const response = await callOpenRouter(messages, {
    temperature: 0.3,
    maxTokens: 2000
  })

  try {
    return JSON.parse(response)
  } catch (error) {
    console.error('Failed to parse AI response:', error)
    throw new Error('Failed to parse AI response')
  }
}

export async function analyzeCertificate(documentText) {
  const messages = [
    {
      role: 'system',
      content: `You are an expert document analyzer specializing in certificate verification. Your task is to analyze certificate documents and determine their authenticity and validity. Consider:
      - Document format and structure
      - Issuer credibility
      - Date validity
      - Content consistency
      - Security features (if mentioned)
      Return a verification status and confidence score.`
    },
    {
      role: 'user',
      content: `Please analyze this certificate document and determine its authenticity:

${documentText}

Return a JSON response with:
- status: "verified", "suspicious", or "invalid"
- confidence: number between 0-100
- reasoning: brief explanation
- recommendations: any suggestions for verification`
    }
  ]

  const response = await callOpenRouter(messages, {
    temperature: 0.1,
    maxTokens: 1000
  })

  try {
    return JSON.parse(response)
  } catch (error) {
    console.error('Failed to parse certificate analysis response:', error)
    throw new Error('Failed to parse certificate analysis response')
  }
}

export async function calculateATSScore(resumeText) {
  const messages = [
    {
      role: 'system',
      content: `You are an ATS (Applicant Tracking System) expert. Your task is to analyze resume content and provide an ATS compatibility score along with specific recommendations for improvement. Consider:
      - Keyword optimization
      - Format and structure
      - File type compatibility
      - Content relevance
      - Industry-specific terminology
      Return a score from 0-100 and detailed feedback.`
    },
    {
      role: 'user',
      content: `Please analyze this resume for ATS compatibility and provide a score with recommendations:

${resumeText}

Return a JSON response with:
- score: number between 0-100
- grade: "A", "B", "C", "D", or "F"
- strengths: array of positive aspects
- weaknesses: array of areas for improvement
- recommendations: array of specific actionable suggestions`
    }
  ]

  const response = await callOpenRouter(messages, {
    temperature: 0.2,
    maxTokens: 1500
  })

  try {
    const result = JSON.parse(response)

    // Ensure score is within bounds
    result.score = Math.max(0, Math.min(100, result.score))

    // Assign grade based on score
    if (result.score >= 90) result.grade = 'A'
    else if (result.score >= 80) result.grade = 'B'
    else if (result.score >= 70) result.grade = 'C'
    else if (result.score >= 60) result.grade = 'D'
    else result.grade = 'F'

    return result
  } catch (error) {
    console.error('Failed to parse ATS analysis response:', error)
    throw new Error('Failed to parse ATS analysis response')
  }
}
