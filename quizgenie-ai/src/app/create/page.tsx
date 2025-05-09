'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const quizSchema = z.object({
  topic: z.string().min(1, 'Topic is required'),
  numQuestions: z.number().min(1).max(20),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  questionTypes: z.array(z.enum(['mcq', 'true-false', 'fill-blank', 'short-answer'])),
  language: z.string(),
})

type QuizFormData = z.infer<typeof quizSchema>

export default function CreateQuiz() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [quizData, setQuizData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  
  const { register, handleSubmit, formState: { errors } } = useForm<QuizFormData>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      numQuestions: 5,
      difficulty: 'medium',
      questionTypes: ['mcq'],
      language: 'en',
    },
  })

  const onSubmit = async (data: QuizFormData) => {
    setIsGenerating(true)
    setError(null)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to generate quiz')
      }

      const result = await response.json()
      setQuizData(result)
    } catch (error) {
      console.error('Error generating quiz:', error)
      setError('Failed to generate quiz. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create New Quiz</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
            Topic or Text
          </label>
          <textarea
            id="topic"
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter your topic or paste text here..."
            {...register('topic')}
          />
          {errors.topic && (
            <p className="mt-1 text-sm text-red-600">{errors.topic.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="numQuestions" className="block text-sm font-medium text-gray-700">
              Number of Questions
            </label>
            <input
              type="number"
              id="numQuestions"
              min={1}
              max={20}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              {...register('numQuestions', { valueAsNumber: true })}
            />
          </div>

          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
              Difficulty
            </label>
            <select
              id="difficulty"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              {...register('difficulty')}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Question Types
          </label>
          <div className="space-y-2">
            {['mcq', 'true-false', 'fill-blank', 'short-answer'].map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  value={type}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  {...register('questionTypes')}
                />
                <span className="ml-2 text-sm text-gray-700">
                  {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700">
            Language
          </label>
          <select
            id="language"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            {...register('language')}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isGenerating}
          className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
        >
          {isGenerating ? 'Generating Quiz...' : 'Generate Quiz'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {quizData && (
        <div className="mt-8 space-y-6">
          <h2 className="text-2xl font-bold">{quizData.title}</h2>
          <div className="space-y-4">
            {quizData.questions.map((question: any, index: number) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow-sm">
                <p className="font-medium mb-2">
                  {index + 1}. {question.question}
                </p>
                {question.options && (
                  <div className="ml-4 space-y-2">
                    {question.options.map((option: string, optIndex: number) => (
                      <label key={optIndex} className="flex items-center">
                        <input
                          type="radio"
                          name={`question-${index}`}
                          className="mr-2"
                          disabled
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                )}
                <div className="mt-4 text-sm text-gray-600">
                  <p className="font-medium">Correct Answer: {question.correctAnswer}</p>
                  <p className="mt-1">Explanation: {question.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 