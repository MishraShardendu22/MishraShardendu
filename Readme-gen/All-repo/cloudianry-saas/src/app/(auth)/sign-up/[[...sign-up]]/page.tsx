import { SignUp } from '@clerk/nextjs'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { UserPlus } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-950 p-4">
      <Card className="w-full max-w-md bg-gray-800 border border-purple-500 shadow-lg shadow-indigo-500/50">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center mb-6 text-purple-300">
            <UserPlus className="inline-block mr-2" /> Sign Up
          </h1>
          <SignUp
            appearance={{
              elements: {
                formButtonPrimary: 
                  'text-md bg-purple-600 hover:bg-purple-700 text-white',
                card: 'bg-transparent shadow-none',
                headerTitle: 'text-md text-purple-300',
                headerSubtitle: 'text-md text-indigo-200',
                socialButtonsBlockButton: 
                  'border-purple-500 text-md text-purple-300 transition duration-700 ease-in-out transform hover:bg-purple-500 hover:text-white',
                formFieldInput: 
                  'bg-gray-700 text-md border-purple-500 text-purple-400 focus:ring-2 focus:ring-indigo-500',
                footerActionLink: 'text-purple-300 hover:text-purple-200',
                formFieldLabel: 
                  'text-purple-200 text-md',
                formFieldInputOptional: 
                  'text-purple-400 text-md',
              },
            }}
          />
          <div className="mt-6 text-center">
            <Link href="/sign-in">
              <button className="text-lg font-semibold text-purple-500 hover:bg-purple-600 hover:text-white transition-all duration-300 rounded-lg px-4 py-2 border border-purple-500">
                Already have an account? Sign In
              </button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}
