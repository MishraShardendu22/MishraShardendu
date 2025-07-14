import React from 'react'
import { auth } from '@/auth'
import { EnhancedSpinner } from '@/components/Loader'
import ClientComponent from '../../components/RepoComponents/Storage'

const Page = async () => {
  const session = await auth()
  const username = session?.user?.login ?? ''

  if (!username) {
    return <EnhancedSpinner />
  }

  return (
    <div>
      <ClientComponent username={username} />
    </div>
  )
}

export default Page
