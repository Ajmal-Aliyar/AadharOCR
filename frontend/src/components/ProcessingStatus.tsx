import React from 'react';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface ProcessingStatusProps {
  isProcessing: boolean;
  progress: number;
  error?: string;
  success?: boolean;
  label: string;
}

export const ProcessingStatus: React.FC<ProcessingStatusProps> = ({
  isProcessing,
  progress,
  error,
  success,
  label
}) => {
  if (!isProcessing && !error && !success) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        {isProcessing && <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />}
        {success && <CheckCircle className="h-5 w-5 text-green-600" />}
        {error && <AlertCircle className="h-5 w-5 text-red-600" />}
        
        <span className={`font-medium ${
          isProcessing ? 'text-blue-600' : 
          success ? 'text-green-600' : 
          error ? 'text-red-600' : 'text-gray-600'
        }`}>
          {label}
        </span>
      </div>
      
      {isProcessing && (
        <div className="space-y-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">Processing... {progress}%</p>
        </div>
      )}
      
      {error && (
        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
          {error}
        </p>
      )}
    </div>
  );
};