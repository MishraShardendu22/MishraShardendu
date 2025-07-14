import type React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { LogOutIcon } from "lucide-react"
import { useUserStore } from "../store/store"

interface LogoutProps {
  className?: string
}

const LogOut: React.FC<LogoutProps> = () => {
  const navigate = useNavigate()
  const logout = useUserStore((state: any) => state.logout)

  const handleLogout = () => {
    logout()
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <Button
      onClick={handleLogout}
      className="h-8 gap-2 px-3 py-3 transition-colors hover:bg-red-600"
      variant="destructive"
    >
      <LogOutIcon className="w-5 h-5" />
      Log-Out
    </Button>
  )
}

export default LogOut

