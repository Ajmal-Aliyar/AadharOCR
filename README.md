# Aadhaar OCR System (MERN Stack) - Service Layer Architecture

This project is a MERN (MongoDB, Express.js, React.js, Node.js) stack web application that performs **OCR (Optical Character Recognition)** on Aadhaar cards.  
Users can upload the **front and back images** of an Aadhaar card, and the system extracts and displays the relevant information using OCR.

---

## Features

- Upload Aadhaar front and back images (JPEG/PNG).
- Preview uploaded images before processing.
- Perform OCR on Aadhaar card images via backend API.
- Display extracted Aadhaar details in a **clean, organized format**.
- Error handling for invalid uploads and failed OCR.
- Responsive and user-friendly UI.

---

## Tech Stack

- **Frontend:** React.js (Vite/CRA), Tailwind CSS (if used)
- **Backend:** Node.js, Express.js
- **OCR Engine:** [Tesseract.js](https://tesseract.projectnaptha.com/) (or chosen OCR library/API)
- **Database (Optional):** MongoDB Atlas (for storing OCR results)
- **Deployment:** Vercel / Render / Heroku / Netlify (as applicable)

---

## Project Structure

```bash
.
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Landing & result pages
│   │   └── api/         # Axios API setup
│   └── package.json
├── server/              # Express backend
│   ├── routes/          # API routes
│   ├── controllers/     # OCR controllers
│   ├── services/        # OCR logic (Tesseract.js or API)
│   └── package.json
├── README.md
└── package.json

