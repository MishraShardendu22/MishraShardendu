import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Hospital, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Nav2 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      label: 'Donor',
      icon: <Users className="mr-2 h-5 w-5" />,
      route: '/donor',
    },
    {
      label: 'Hospital',
      icon: <Hospital className="mr-2 h-5 w-5" />,
      route: '/hospital',
    },
    {
      label: 'Organisation',
      icon: <Home className="mr-2 h-5 w-5" />,
      route: '/organisation',
    },
  ];

  return (
    <Card className="p-4 shadow-md">
      <nav className="flex space-x-4 justify-center">
        {navItems.map((item) => (
          <Button
            key={item.route}
            variant={location.pathname === item.route ? 'default' : 'outline'}
            onClick={() => navigate(item.route)}
            className="flex items-center"
          >
            {item.icon}
            {item.label}
          </Button>
        ))}
      </nav>
    </Card>
  );
};

export default Nav2;
