import { Route, Routes } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import Otp from './pages/Otp'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import ProtectedRoute from './components/ProtectedRoute'
import ResetPassword from './pages/Reset'
import Logout from './pages/Logout'

const App = () => {
  return (
    <div className="min-h-screen bg-background dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </div>
  )
}

export default App