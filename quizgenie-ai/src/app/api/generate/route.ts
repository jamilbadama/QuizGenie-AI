import { NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { topic, numQuestions, difficulty, questionTypes, language } = body

    if (!topic || !numQuestions || !difficulty || !questionTypes || !language) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Construct the prompt for the AI
    const prompt = `Generate a ${difficulty} difficulty quiz about "${topic}" with ${numQuestions} questions.
Include the following question types: ${questionTypes.join(', ')}.
The quiz should be in ${language} language.
Format the response as a JSON object with the following structure:
{
  "title": "Quiz Title",
  "questions": [
    {
      "type": "question_type",
      "question": "question_text",
      "options": ["option1", "option2", ...], // for MCQ
      "correctAnswer": "correct_answer",
      "explanation": "explanation_of_answer"
    }
  ]
}`

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4-turbo-preview",
      response_format: { type: "json_object" },
    })

    const quizData = JSON.parse(completion.choices[0].message.content || '{}')

    if (!quizData.title || !quizData.questions) {
      throw new Error('Invalid response format from OpenAI')
    }

    return NextResponse.json(quizData)
  } catch (error) {
    console.error('Error generating quiz:', error)
    return NextResponse.json(
      { error: 'Failed to generate quiz. Please try again.' },
      { status: 500 }
    )
  }
} 