import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { LogOut as LogOutIcon } from 'lucide-react';

const LogOut = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Button
      onClick={handleLogout}
      className="h-8 py-3 px-3 gap-2 hover:bg-red-600 transition-colors"
      variant="destructive"
    >
      <LogOutIcon className="h-5 w-5" />
      Log-Out
    </Button>
  );
};

export default LogOut;
