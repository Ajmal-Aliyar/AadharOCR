import "../assets/styles/cardInfo.css";
import { useAadhaar } from "../context/AadharContext";

const CardInfo = () => {
  const { details } = useAadhaar();

  return (
    <div className="card-body">
      <h3>API Response</h3>
      <div className="api-response-box">
        {!details ? (
          <p>Start performing OCR by uploading Aadhaar front and back</p>
        ) : (
          <ul>
            <li><strong>Name:</strong> {details.name || "N/A"}</li>
            <li><strong>DOB:</strong> {details.dob || "N/A"}</li>
            <li><strong>Gender:</strong> {details.gender || "N/A"}</li>
            <li><strong>UID:</strong> {details.UID || "N/A"}</li>
            <li><strong>Address:</strong> {details.address || "N/A"}</li>
            <li><strong>Pincode:</strong> {details.pincode || "N/A"}</li>
            <li><strong>Age Band:</strong> {details.ageBand || "N/A"}</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default CardInfo;
