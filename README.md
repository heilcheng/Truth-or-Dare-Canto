# Truth or Dare - Cantonese Edition (MERN Stack)

A full-stack MERN (MongoDB, Express, React, Node.js) application for generating Cantonese "Truth or Dare" questions.

## Features

- 🎲 Random question generator
- ➕ Add custom questions
- 💾 Persistent storage with MongoDB Atlas
- 🎨 Modern dark/light theme toggle
- 📱 Responsive design
- 🌐 Works on GitHub Pages

## Quick Start (GitHub Pages)

### 1. **Set up MongoDB Atlas (Free Database)**

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Select your preferred cloud provider & region
   - Click "Create"

3. **Set up Database Access**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Create a username and password (save these!)
   - Select "Read and write to any database"
   - Click "Add User"

4. **Set up Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for GitHub Pages)
   - Click "Confirm"

5. **Get Connection String**
   - Go back to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

### 2. **Configure the App**

1. **Update Database Configuration**
   ```bash
   # Edit src/config/db.js
   # Replace YOUR_MONGODB_ATLAS_CONNECTION_STRING with your actual connection string
   ```

2. **Example connection string format:**
   ```javascript
   connectionString: "mongodb+srv://username:password@cluster.mongodb.net/truth-or-dare"
   ```

### 3. **Deploy to GitHub Pages**

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Build the app**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

4. **Your app will be available at:**
   ```
   https://heilcheng.github.io/Truth-or-Dare-Canto
   ```

## Project Structure

```
Truth-or-Dare-Canto/
├── src/                 # React frontend
│   ├── App.js          # Main React component
│   ├── config/         # Database configuration
│   │   └── db.js       # MongoDB Atlas settings
│   └── services/       # Database services
│       └── mongodbService.js  # MongoDB operations
├── server/             # Node.js backend (optional)
└── package.json        # Frontend dependencies
```

## MongoDB Atlas Setup (Detailed)

### **Step 1: Create Account**
- Visit [MongoDB Atlas](https://www.mongodb.com/atlas)
- Click "Try Free" and create an account

### **Step 2: Create Cluster**
- Choose "FREE" tier (M0)
- Select cloud provider (AWS, Google Cloud, or Azure)
- Choose region closest to you
- Click "Create Cluster"

### **Step 3: Database Access**
- Go to "Database Access" → "Add New Database User"
- Username: `truth-or-dare-user`
- Password: Create a strong password
- Built-in Role: "Read and write to any database"
- Click "Add User"

### **Step 4: Network Access**
- Go to "Network Access" → "Add IP Address"
- Click "Allow Access from Anywhere" (0.0.0.0/0)
- Click "Confirm"

### **Step 5: Get Connection String**
- Go to "Database" → Click "Connect"
- Choose "Connect your application"
- Copy the connection string
- Replace `<password>` with your password
- Replace `<dbname>` with `truth-or-dare`

### **Step 6: Update Configuration**
Edit `src/config/db.js`:
```javascript
export const MONGODB_CONFIG = {
  connectionString: "mongodb+srv://truth-or-dare-user:YOUR_PASSWORD@cluster.mongodb.net/truth-or-dare",
  databaseName: "truth-or-dare",
  collectionName: "questions"
};
```

## Features

### **Database Integration**
- ✅ Connects directly to MongoDB Atlas from frontend
- ✅ Automatic seeding of initial questions
- ✅ Persistent storage of new questions
- ✅ Fallback to local storage if MongoDB unavailable

### **Theme Support**
- 🌙 Dark mode (default)
- ☀️ Light mode
- 🔄 Toggle between themes
- 🎨 Smooth transitions

### **Question Management**
- 📊 Shows total question count
- ➕ Add custom questions
- 🎲 Random question generation
- 💾 Data persistence

## Development

### **Local Development**
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### **Environment Setup**
- No environment variables needed for GitHub Pages
- MongoDB connection is configured in `src/config/db.js`
- App works offline with fallback questions

## Troubleshooting

### **MongoDB Connection Issues**
1. **Check connection string** in `src/config/db.js`
2. **Verify network access** allows connections from anywhere
3. **Confirm database user** has read/write permissions
4. **Check browser console** for connection errors

### **GitHub Pages Issues**
1. **Ensure homepage** is set correctly in `package.json`
2. **Check build output** in `build/` folder
3. **Verify gh-pages** dependency is installed
4. **Check GitHub Pages settings** in repository

## Security Notes

- ✅ Connection string is in frontend code (acceptable for public apps)
- ✅ Database user has minimal required permissions
- ✅ Network access is restricted to read/write operations
- ⚠️ For production apps, consider using environment variables

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
