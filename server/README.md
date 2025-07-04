# Truth or Dare Backend Server

This is the backend server for the Truth or Dare application built with Node.js, Express, and MongoDB.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure MongoDB**
   - Replace `"YOUR_MONGODB_CONNECTION_STRING"` in `server.js` with your actual MongoDB connection string
   - You can use MongoDB Atlas (cloud) or a local MongoDB instance

3. **Start the Server**
   ```bash
   npm start
   ```
   
   For development with auto-restart:
   ```bash
   npm run dev
   ```

## API Endpoints

### GET /questions
- **Description**: Get all questions from the database
- **Response**: Array of question objects with `_id`, `text`, `createdAt`, and `updatedAt` fields

### POST /questions/add
- **Description**: Add a new question to the database
- **Body**: `{ "text": "Your question here" }`
- **Response**: The newly created question object

## Database Schema

The Question model has the following structure:
```javascript
{
  text: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

## Environment Variables

You can also use environment variables for configuration:
- `MONGODB_URI`: Your MongoDB connection string
- `PORT`: Server port (default: 5000)

## Error Handling

The API includes proper error handling for:
- Database connection issues
- Invalid request data
- Server errors

All errors return appropriate HTTP status codes and error messages. 