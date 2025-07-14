'use client'

import { Button } from '../ui/button'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

const SignOut = () => {
  const handleLogOut = () => {
    signOut()
  }

  return (
    <Button
      onClick={handleLogOut}
      variant="ghost"
      className="flex items-center gap-2 hover:bg-destructive/10 hover:text-destructive transition-colors"
    >
      <LogOut size={16} />
      <span>Sign Out</span>
    </Button>
  )
}

export default SignOut
