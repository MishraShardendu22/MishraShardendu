'use client'

import { Button } from '../ui/button'
import { Github } from 'lucide-react'
import { signIn } from 'next-auth/react'

export default function SignIn() {
  const handleSignIn = async () => {
    await signIn('github')
  }

  return (
    <Button
      onClick={handleSignIn}
      variant="outline"
      className="flex items-center gap-2 border-accent hover:border-accent/80 transition-all"
    >
      <Github size={18} />
      <span>Sign in with GitHub</span>
    </Button>
  )
}
