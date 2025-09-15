import {
  calculateAgeBand,
  extractAddress,
  extractDOB,
  extractGender,
  extractName,
  extractPincode,
  extractUID,
} from "@helpers/index";
import { AadhaarDetails } from "types";

function extractAadhaarDetails(
  frontText: string,
  backText: string
): AadhaarDetails {
  const frontUID = extractUID(frontText);
  const backUID = extractUID(backText);

  const result: AadhaarDetails = {
    name: extractName(frontText),
    dob: extractDOB(frontText),
    gender: extractGender(frontText),
    UID: frontUID,
    isUIDsame:
      frontUID !== null && backUID !== null ? frontUID === backUID : false,
    address: extractAddress(backText),
    pincode: extractPincode(backText),
    ageBand: calculateAgeBand(extractDOB(frontText)),
  };

  return result;
}

export default extractAadhaarDetails;
