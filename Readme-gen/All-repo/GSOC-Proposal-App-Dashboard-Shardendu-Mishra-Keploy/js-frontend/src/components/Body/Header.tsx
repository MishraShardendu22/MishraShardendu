import Tabs from './Tabs'
import { auth } from '@/auth'
import SignIn from '../AuthButton/SignIn'
import SignOut from '../AuthButton/SignOut'

const Header = async () => {
  const session = await auth()

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-background/95 backdrop-blur-sm border-b border-border/40 px-6 py-3 transition-all duration-200">
      <div className="flex items-center">
        <div className="text-xl font-bold text-primary">
          Keploy App Dashboard
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        <Tabs />
      </div>
      <div className="flex items-center">
        {session ? <SignOut /> : <SignIn />}
      </div>
    </nav>
  )
}

export default Header