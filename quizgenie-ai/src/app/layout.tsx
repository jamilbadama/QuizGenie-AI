import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Quiz Generator",
  description: "Generate quizzes using AI from any topic or text",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between items-center">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-indigo-600">🧠 QuizGenie</span>
                </div>
                <div className="flex items-center space-x-4">
                  <a href="/" className="text-gray-700 hover:text-indigo-600">Home</a>
                  <a href="/create" className="text-gray-700 hover:text-indigo-600">Create Quiz</a>
                  <a href="/about" className="text-gray-700 hover:text-indigo-600">About</a>
                </div>
              </div>
            </nav>
          </header>
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
