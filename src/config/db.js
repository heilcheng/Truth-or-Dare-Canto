// MongoDB Atlas Configuration
// You'll need to create a free MongoDB Atlas account and get your connection string

export const MONGODB_CONFIG = {
  // Replace with your MongoDB Atlas connection string
  // Format: mongodb+srv://username:password@cluster.mongodb.net/database
  connectionString: "YOUR_MONGODB_ATLAS_CONNECTION_STRING",
  
  // Database name
  databaseName: "truth-or-dare",
  
  // Collection name
  collectionName: "questions"
};

// Instructions to get MongoDB Atlas connection string:
// 1. Go to https://www.mongodb.com/atlas
// 2. Create a free account
// 3. Create a new cluster (free tier)
// 4. Click "Connect" on your cluster
// 5. Choose "Connect your application"
// 6. Copy the connection string
// 7. Replace <password> with your database password
// 8. Replace <dbname> with "truth-or-dare" 