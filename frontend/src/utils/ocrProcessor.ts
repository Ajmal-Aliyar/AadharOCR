import Tesseract from 'tesseract.js';

export const processImage = async (
  imageFile: File,
  onProgress?: (progress: number) => void
): Promise<string> => {
  return new Promise((resolve, reject) => {
    Tesseract.recognize(imageFile, 'eng', {
      logger: (m) => {
        if (m.status === 'recognizing text' && onProgress) {
          onProgress(Math.round(m.progress * 100));
        }
      },
    })
      .then(({ data: { text } }) => {
        resolve(text);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const parseAadharText = (frontText: string, backText: string) => {
  const aadharData: any = {};

  // Parse Aadhar number (12 digits with or without spaces)
  const aadharMatch = (frontText + ' ' + backText).match(/\b\d{4}\s?\d{4}\s?\d{4}\b/);
  if (aadharMatch) {
    aadharData.aadharNumber = aadharMatch[0].replace(/\s/g, '');
  }

  // Parse name (usually appears after "Name" or before Aadhar number on front)
  const namePatterns = [
    /(?:Name|Name:|नाम|नाम:)\s*([A-Za-z\s]+)/i,
    /^([A-Z][a-zA-Z\s]+)\s*\d{4}/m
  ];
  
  for (const pattern of namePatterns) {
    const nameMatch = frontText.match(pattern);
    if (nameMatch && nameMatch[1]) {
      const name = nameMatch[1].trim();
      if (name.length > 2 && name.length < 50) {
        aadharData.name = name;
        break;
      }
    }
  }

  // Parse date of birth
  const dobPatterns = [
    /(?:DOB|Date of Birth|जन्म तिथि)[\s:]*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/i,
    /(?:DOB|Date of Birth|जन्म तिथि)[\s:]*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2})/i,
    /\b(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})\b/
  ];

  for (const pattern of dobPatterns) {
    const dobMatch = (frontText + ' ' + backText).match(pattern);
    if (dobMatch) {
      aadharData.dateOfBirth = dobMatch[1];
      break;
    }
  }

  // Parse gender
  const genderMatch = (frontText + ' ' + backText).match(/(?:Gender|Sex|लिंग)[\s:]*?(Male|Female|पुरुष|महिला|M|F)/i);
  if (genderMatch) {
    let gender = genderMatch[1].toLowerCase();
    if (gender === 'm' || gender === 'पुरुष') gender = 'Male';
    if (gender === 'f' || gender === 'महिला') gender = 'Female';
    aadharData.gender = gender;
  }

  // Parse father's name
  const fatherPatterns = [
    /(?:Father|Father's Name|पिता का नाम|S\/O|Son of|D\/O|Daughter of)[\s:]*([A-Za-z\s]+)/i
  ];

  for (const pattern of fatherPatterns) {
    const fatherMatch = (frontText + ' ' + backText).match(pattern);
    if (fatherMatch && fatherMatch[1]) {
      const fatherName = fatherMatch[1].trim();
      if (fatherName.length > 2 && fatherName.length < 50) {
        aadharData.fatherName = fatherName;
        break;
      }
    }
  }

  // Parse address (from back side, usually a longer text block)
  const addressLines = backText.split('\n').filter(line => 
    line.trim().length > 10 && 
    !line.match(/\d{4}\s?\d{4}\s?\d{4}/) && // Not Aadhar number
    !line.match(/PIN[\s:]*\d{6}/i) // Not just PIN code
  );

  if (addressLines.length > 0) {
    aadharData.address = addressLines.slice(0, 3).join(', ').trim();
  }

  return aadharData;
};