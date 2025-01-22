# Backend for Email Builder

This is the backend for the EMail Builder application. It provides APIs to handle various functionalities, including file uploads, routing, and environmental configurations.

## Technologies Used

- **Node.js**
- **Express**
- **Multer** - For handling file uploads
- **dotenv** - For environment variable management
- **body-parser** - For parsing request bodies
- **React Router** - For routing in the frontend (mention only if applicable)

---

## Installation

### Prerequisites
- Node.js installed on your system
- npm  for managing dependencies

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name

## Deployment

The backend is deployed on **Render** and accessible at:  
**[https://your-backend-url.onrender.com](https://your-backend-url.onrender.com)**


## API Endpoints

### File Upload
- **Endpoint**: `/api/newTemoplates/Imageupload`
- **Method**: `POST`
- **Description**: Uploads a file using Multer.
- **Request Body**: `multipart/form-data`
  - `file`: File to be uploaded.
- **Response**: JSON with file details.

### Example API
- **Endpoint**: `/api/example`
- **Method**: `GET`
- **Description**: Example route to test the API.
- **Response**: `{ "message": "Example API is working" }`

---

---

## Dependencies

### Core Dependencies
- **[express](https://www.npmjs.com/package/express)**: Web framework for building APIs.
- **[dotenv](https://www.npmjs.com/package/dotenv)**: Loads environment variables from `.env`.
- **[multer](https://www.npmjs.com/package/multer)**: Middleware for handling `multipart/form-data`.
- **[body-parser](https://www.npmjs.com/package/body-parser)**: Parses incoming request bodies.

### Dev Dependencies
- **[nodemon](https://www.npmjs.com/package/nodemon)**: Restarts the server during development.

---





