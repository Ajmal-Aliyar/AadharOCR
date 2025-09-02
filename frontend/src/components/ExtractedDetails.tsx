import React from 'react';
import { User, Calendar, MapPin, Hash, Users } from 'lucide-react';
import { AadharData } from '../types/aadhar';

interface ExtractedDetailsProps {
  data: AadharData;
}

export const ExtractedDetails: React.FC<ExtractedDetailsProps> = ({ data }) => {
  const details = [
    {
      icon: User,
      label: 'Name',
      value: data.name,
      color: 'text-blue-600'
    },
    {
      icon: Hash,
      label: 'Aadhar Number',
      value: data.aadharNumber,
      color: 'text-green-600'
    },
    {
      icon: Calendar,
      label: 'Date of Birth',
      value: data.dateOfBirth,
      color: 'text-purple-600'
    },
    {
      icon: Users,
      label: 'Gender',
      value: data.gender,
      color: 'text-pink-600'
    },
    {
      icon: User,
      label: "Father's Name",
      value: data.fatherName,
      color: 'text-indigo-600'
    },
    {
      icon: MapPin,
      label: 'Address',
      value: data.address,
      color: 'text-orange-600'
    }
  ];

  const validDetails = details.filter(detail => detail.value);

  if (validDetails.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <p className="text-yellow-800">
          No clear Aadhar details could be extracted. Please ensure the images are clear and properly oriented.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Extracted Details</h2>
      
      <div className="grid gap-4 md:grid-cols-2">
        {validDetails.map((detail, index) => {
          const Icon = detail.icon;
          return (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg bg-gray-50`}>
                  <Icon className={`h-5 w-5 ${detail.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-500">{detail.label}</p>
                  <p className="text-base font-semibold text-gray-900 break-words">
                    {detail.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {(data.frontText || data.backText) && (
        <details className="bg-gray-50 border border-gray-200 rounded-lg">
          <summary className="cursor-pointer p-4 font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            View Raw Extracted Text
          </summary>
          <div className="p-4 pt-0 space-y-4">
            {data.frontText && (
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Front Side:</h4>
                <pre className="bg-white p-3 rounded border text-sm text-gray-600 whitespace-pre-wrap overflow-x-auto">
                  {data.frontText}
                </pre>
              </div>
            )}
            {data.backText && (
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Back Side:</h4>
                <pre className="bg-white p-3 rounded border text-sm text-gray-600 whitespace-pre-wrap overflow-x-auto">
                  {data.backText}
                </pre>
              </div>
            )}
          </div>
        </details>
      )}
    </div>
  );
};