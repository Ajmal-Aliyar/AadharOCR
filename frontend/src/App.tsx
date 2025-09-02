import React, { useState } from 'react';
import { CreditCard, RefreshCw } from 'lucide-react';
import { FileUpload } from './components/FileUpload';
import { ProcessingStatus } from './components/ProcessingStatus';
import { ExtractedDetails } from './components/ExtractedDetails';
import { processImage, parseAadharText } from './utils/ocrProcessor';
import { AadharData, ProcessingState } from './types/aadhar';

function App() {
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [processing, setProcessing] = useState<ProcessingState>({
    front: false,
    back: false
  });
  const [progress, setProgress] = useState({ front: 0, back: 0 });
  const [errors, setErrors] = useState({ front: '', back: '' });
  const [extractedData, setExtractedData] = useState<AadharData | null>(null);
  const [completed, setCompleted] = useState({ front: false, back: false });

  const processImages = async () => {
    if (!frontImage && !backImage) return;

    setProcessing({ front: !!frontImage, back: !!backImage });
    setErrors({ front: '', back: '' });
    setExtractedData(null);
    setCompleted({ front: false, back: false });

    let frontText = '';
    let backText = '';

    try {
      if (frontImage) {
        frontText = await processImage(frontImage, (prog) => {
          setProgress(prev => ({ ...prev, front: prog }));
        });
        setCompleted(prev => ({ ...prev, front: true }));
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, front: 'Failed to process front image' }));
    }

    try {
      if (backImage) {
        backText = await processImage(backImage, (prog) => {
          setProgress(prev => ({ ...prev, back: prog }));
        });
        setCompleted(prev => ({ ...prev, back: true }));
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, back: 'Failed to process back image' }));
    }

    setProcessing({ front: false, back: false });

    if (frontText || backText) {
      const parsedData = parseAadharText(frontText, backText);
      setExtractedData({
        ...parsedData,
        frontText,
        backText
      });
    }
  };

  const resetAll = () => {
    setFrontImage(null);
    setBackImage(null);
    setProcessing({ front: false, back: false });
    setProgress({ front: 0, back: 0 });
    setErrors({ front: '', back: '' });
    setExtractedData(null);
    setCompleted({ front: false, back: false });
  };

  const canProcess = (frontImage || backImage) && !processing.front && !processing.back;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-blue-600 rounded-full">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Aadhar Card OCR
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Upload your Aadhar card images to automatically extract and view your details using advanced OCR technology
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            {/* File Upload Section */}
            <div className="grid gap-8 md:grid-cols-2 mb-8">
              <FileUpload
                onFileSelect={setFrontImage}
                selectedFile={frontImage}
                onClear={() => setFrontImage(null)}
                label="Aadhar Card Front"
              />
              <FileUpload
                onFileSelect={setBackImage}
                selectedFile={backImage}
                onClear={() => setBackImage(null)}
                label="Aadhar Card Back"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={processImages}
                disabled={!canProcess}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Extract Details
              </button>
              
              {(frontImage || backImage || extractedData) && (
                <button
                  onClick={resetAll}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200 flex items-center space-x-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Reset All</span>
                </button>
              )}
            </div>

            {/* Processing Status */}
            <div className="mt-8 space-y-4">
              {frontImage && (
                <ProcessingStatus
                  isProcessing={processing.front}
                  progress={progress.front}
                  error={errors.front}
                  success={completed.front}
                  label="Processing front image"
                />
              )}
              
              {backImage && (
                <ProcessingStatus
                  isProcessing={processing.back}
                  progress={progress.back}
                  error={errors.back}
                  success={completed.back}
                  label="Processing back image"
                />
              )}
            </div>
          </div>

          {/* Results */}
          {extractedData && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <ExtractedDetails data={extractedData} />
            </div>
          )}

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Instructions</h3>
            <ul className="space-y-2 text-blue-700">
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                <span>Upload clear, well-lit images of your Aadhar card</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                <span>Ensure text is readable and not blurred or skewed</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                <span>Both front and back images will provide the most complete extraction</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                <span>Processing may take a few moments depending on image quality</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;