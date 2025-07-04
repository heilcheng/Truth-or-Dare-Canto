# Truth or Dare - Cantonese Edition (MERN Stack)

A full-stack MERN (MongoDB, Express, React, Node.js) application for generating Cantonese "Truth or Dare" questions.

## Features

- 🎲 Random question generator
- ➕ Add custom questions
- 💾 Persistent storage with MongoDB
- 🎨 Modern dark theme UI
- 📱 Responsive design
- 🌐 RESTful API

## Project Structure

```
Truth-or-Dare-Canto/
├── src/                 # React frontend
│   ├── App.js          # Main React component
│   └── ...
├── server/             # Node.js backend
│   ├── server.js       # Express server
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   └── seed.js         # Database seeding script
└── package.json        # Frontend dependencies
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Backend Setup

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure MongoDB**
   - Replace `"YOUR_MONGODB_CONNECTION_STRING"` in `server.js` and `seed.js` with your actual MongoDB connection string
   - For MongoDB Atlas: Use the connection string from your cluster
   - For local MongoDB: Use `"mongodb://localhost:27017/truth-or-dare"`

4. **Seed the database (optional)**
   ```bash
   npm run seed
   ```

5. **Start the server**
   ```bash
   npm start
   ```
   
   For development with auto-restart:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the React development server**
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## API Endpoints

### GET /questions
- Returns all questions from the database
- Response: Array of question objects

### POST /questions/add
- Adds a new question to the database
- Body: `{ "text": "Your question here" }`
- Response: The newly created question object

## Database Schema

```javascript
{
  text: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

## Technologies Used

### Frontend
- React 18
- Material-UI
- Axios for HTTP requests

### Backend
- Node.js
- Express.js
- Mongoose (MongoDB ODM)
- CORS middleware

### Database
- MongoDB

## Development

### Running Both Servers

1. **Terminal 1 - Backend**
   ```bash
   cd server
   npm run dev
   ```

2. **Terminal 2 - Frontend**
   ```bash
   npm start
   ```

### Environment Variables

You can use environment variables for configuration:

**Backend (.env file in server directory)**
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

## Deployment

### Backend Deployment
- Deploy to platforms like Heroku, Railway, or Render
- Set environment variables for MongoDB connection
- Ensure CORS is configured for your frontend domain

### Frontend Deployment
- Build the React app: `npm run build`
- Deploy to platforms like Vercel, Netlify, or GitHub Pages
- Update API endpoints to point to your deployed backend

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
