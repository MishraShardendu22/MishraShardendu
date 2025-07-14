import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, KeyRound } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const OtpPage = () => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!otp) {
      toast({
        variant: 'destructive',
        title: 'Validation Error',
        description: 'Please enter OTP!',
      });
      setIsLoading(false);
      return;
    }

    const otpData = { val: parseInt(otp, 10) };

    try {
      const response = await fetch('http://127.0.0.1:3000/checkotp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(otpData),
      });

      if (response.ok) {
        const result = await response.json();
        toast({
          title: 'Success!',
          description: result.message,
        });
        navigate('/login');
      } else {
        const error = await response.json();
        toast({
          variant: 'destructive',
          title: 'Verification Failed',
          description: error.message,
        });
        navigate('/signup');
      }
    } catch (err) {
      console.error('Error:', err);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong, please try again!',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1B1F38] p-4">
      {/* Back button */}
      <Button
        variant="ghost"
        className="absolute top-4 left-4 text-[#D9D9D9] hover:text-[#E0B0FF] hover:bg-[#3C3F51]/50"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      {/* Logo or Brand Name */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#E0B0FF] tracking-tight">YourBrand</h1>
      </div>

      <Card className="w-full max-w-md bg-[#16172B] border-[#3C3F51] shadow-xl shadow-[#6A0DAD]/10">
        <CardHeader className="space-y-1 pb-8">
          <CardTitle className="text-2xl text-center font-bold text-[#E0B0FF]">
            OTP Verification
          </CardTitle>
          <CardDescription className="text-center text-[#A6A6A6]">
            Please enter the verification code sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[#D9D9D9] font-medium" htmlFor="otp">
                Enter OTP Code
              </Label>
              <div className="relative group">
                <KeyRound className="absolute left-3 top-3 h-4 w-4 text-[#A6A6A6] group-hover:text-[#E0B0FF] transition-colors" />
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter verification code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="pl-10 bg-[#3C3F51] border-[#3C3F51] text-[#D9D9D9] placeholder:text-[#A6A6A6] focus:border-[#6A0DAD] focus:ring-[#6A0DAD] transition-all text-center tracking-widest"
                  required
                  maxLength={6}
                />
              </div>
            </div>

            <Button 
              className="w-full bg-[#6A0DAD] hover:bg-[#5B2C6F] text-[#D9D9D9] h-11 font-medium shadow-lg shadow-[#6A0DAD]/20 hover:shadow-[#6A0DAD]/30 transition-all"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                  <span>Verifying...</span>
                </div>
              ) : (
                'Verify OTP'
              )}
            </Button>

            <div className="space-y-4 text-center text-[#A6A6A6] text-sm">
              <p>
                Didn't receive the code?{' '}
                <Button
                  variant="link"
                  className="text-[#E0B0FF] hover:text-[#6A0DAD] p-0 font-medium"
                  onClick={() => {/* Add resend OTP logic */}}
                >
                  Resend
                </Button>
              </p>
              <p>
                Wrong email?{' '}
                <Button
                  variant="link"
                  className="text-[#E0B0FF] hover:text-[#6A0DAD] p-0 font-medium"
                  onClick={() => navigate('/signup')}
                >
                  Sign up again
                </Button>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OtpPage;