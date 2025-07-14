/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  User,
  Building2,
  Hospital,
  MapPin,
  Calendar,
  Phone,
  MailCheck,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useUserStore } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';

const Account = () => {
  const user = useUserStore((state: any) => state.user);
  const navigate = useNavigate();

  const renderRoleSpecificInfo = () => {
    switch (user.role) {
      case 'admin':
        return user.website ? (
          <>
            <Separator className="my-2" />
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center space-x-3"
            >
              <Building2 className="h-6 w-6 text-blue-800" />
              <p className="text-sm">
                <span className="font-semibold">Website:</span> {user.website}
              </p>
            </motion.div>
          </>
        ) : null;
      case 'organisation':
        return user.organisationName ? (
          <>
            <Separator className="my-2" />
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center space-x-3"
            >
              <Building2 className="h-6 w-6 text-blue-800" />
              <p className="text-sm">
                <span className="font-semibold">Organisation:</span>{' '}
                {user.organisationName}
              </p>
            </motion.div>
          </>
        ) : null;
      case 'hospital':
        return user.hospitalName ? (
          <>
            <Separator className="my-2" />
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center space-x-3"
            >
              <Hospital className="h-6 w-6 text-blue-800" />
              <p className="text-sm">
                <span className="font-semibold">Hospital:</span>{' '}
                {user.hospitalName}
              </p>
            </motion.div>
          </>
        ) : null;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen p-10">
        {' '}
        {/* Increased padding here */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          <Card className="bg-gradient-to-r from-slate-300 to-slate-300 max-w-6xl mx-auto shadow-2xl border-none">
            {' '}
            {/* Increased max-width here */}
            <CardHeader className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-t-xl p-6">
              <CardTitle className="flex items-center space-x-4">
                <User className="h-10 w-10 animate-pulse" />
                <span className="text-2xl font-bold tracking-wide">
                  Account Details
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    icon: <User className="h-6 w-6 text-red-600" />,
                    label: 'Name',
                    value: user.name,
                  },
                  {
                    icon: <MailCheck className="h-6 w-6 text-blue-600" />,
                    label: 'Email',
                    value: user.email,
                  },
                  {
                    icon: <Phone className="h-6 w-6 text-green-600" />,
                    label: 'Phone',
                    value: user.phone,
                  },
                  {
                    icon: <Calendar className="h-6 w-6 text-purple-600" />,
                    label: 'User Since',
                    value: new Date(user.createdAt).toLocaleDateString(),
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="bg-gray-50 p-6 rounded-lg shadow-lg flex items-start space-x-4"
                  >
                    {item.icon}
                    <div className="flex flex-col">
                      <p className="text-sm text-gray-500 uppercase tracking-wider">
                        {item.label}
                      </p>
                      <p className="font-semibold text-gray-800 break-words">
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Separator />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-lg flex items-start space-x-6"
              >
                <div className="flex items-center space-x-4">
                  <MapPin className="h-6 w-6 text-red-600" />
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider">
                      Address
                    </p>
                    <p className="font-semibold text-gray-800 break-words">
                      {user.address}
                    </p>
                  </div>
                </div>
              </motion.div>

              {renderRoleSpecificInfo()}

              <div className="flex justify-center mt-8">
                <button
                  onClick={() => navigate(-1)}
                  className="px-8 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Go Back
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default Account;
