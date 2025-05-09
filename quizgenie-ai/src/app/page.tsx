import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Generate Quizzes with AI
        </h1>
        <p className="text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
          Create high-quality, customizable quizzes instantly using the power of AI. Perfect for educators, students, and content creators.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/create"
            className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create Quiz
          </Link>
          <Link
            href="/about"
            className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="text-2xl mb-4">⚡</div>
          <h3 className="text-lg font-semibold mb-2">Prompt-Based Generation</h3>
          <p className="text-gray-600">Generate quizzes from any topic or text using AI.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="text-2xl mb-4">🧠</div>
          <h3 className="text-lg font-semibold mb-2">Multiple Question Types</h3>
          <p className="text-gray-600">Support for MCQs, True/False, Fill-in-the-Blank, and more.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="text-2xl mb-4">🎛️</div>
          <h3 className="text-lg font-semibold mb-2">Customizable Parameters</h3>
          <p className="text-gray-600">Define difficulty, question types, and language.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="text-2xl mb-4">📦</div>
          <h3 className="text-lg font-semibold mb-2">Easy Export</h3>
          <p className="text-gray-600">Export in JSON, Markdown, or CSV formats.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="text-2xl mb-4">🌐</div>
          <h3 className="text-lg font-semibold mb-2">API Support</h3>
          <p className="text-gray-600">Integrate with any learning system via RESTful API.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="text-2xl mb-4">📄</div>
          <h3 className="text-lg font-semibold mb-2">Document Input</h3>
          <p className="text-gray-600">Upload PDFs or text files to generate quizzes.</p>
        </div>
      </div>
    </div>
  )
}
