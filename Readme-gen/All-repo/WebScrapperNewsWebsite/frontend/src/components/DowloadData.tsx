import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle2, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const DownloadData = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl transform hover:scale-[1.01] transition-all duration-300 shadow-2xl bg-white border-t-8 border-t-green-500">
        <CardHeader className="text-center pb-4 pt-8">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute -inset-4 bg-green-100/80 rounded-full" />
              <CheckCircle2 className="w-24 h-24 text-green-500 relative" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold text-gray-800 mb-4">
            Download Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center pt-4 pb-10">
          <p className="text-2xl text-gray-600 font-medium mb-8">
            Your data is ready to enjoy!
          </p>
          
          <div className="flex flex-col items-center space-y-6">
            <div className="flex items-center justify-center gap-4">
              <span className="text-4xl">🎉</span>
              <span className="text-4xl">⭐</span>
              <span className="text-4xl">✨</span>
            </div>
            
            <div className="bg-green-50 p-6 rounded-xl w-full max-w-lg border border-green-200 hover:border-green-300 transition-colors duration-300">
              <div className="flex items-center justify-center gap-3 text-green-700">
                <Download className="w-8 h-8" />
                <span className="text-xl font-medium">Successfully Downloaded</span>
              </div>
            </div>

            <Button 
              onClick={() => navigate('/SelectedNews')}
              className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl flex items-center gap-2 transform hover:translate-x-1 transition-all"
            >
              Continue to Selected News
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DownloadData;