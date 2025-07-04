import { MongoClient } from 'mongodb';
import { MONGODB_CONFIG } from '../config/db.js';

class MongoDBService {
  constructor() {
    this.client = null;
    this.db = null;
    this.collection = null;
  }

  async connect() {
    try {
      if (!this.client) {
        this.client = new MongoClient(MONGODB_CONFIG.connectionString);
        await this.client.connect();
        this.db = this.client.db(MONGODB_CONFIG.databaseName);
        this.collection = this.db.collection(MONGODB_CONFIG.collectionName);
        console.log('Connected to MongoDB Atlas');
      }
      return true;
    } catch (error) {
      console.error('MongoDB connection error:', error);
      return false;
    }
  }

  async disconnect() {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
      this.collection = null;
    }
  }

  async getAllQuestions() {
    try {
      const connected = await this.connect();
      if (!connected) {
        throw new Error('Failed to connect to MongoDB');
      }

      const questions = await this.collection.find({}).sort({ createdAt: -1 }).toArray();
      return questions;
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw error;
    }
  }

  async addQuestion(text) {
    try {
      const connected = await this.connect();
      if (!connected) {
        throw new Error('Failed to connect to MongoDB');
      }

      const newQuestion = {
        text: text.trim(),
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await this.collection.insertOne(newQuestion);
      return { ...newQuestion, _id: result.insertedId };
    } catch (error) {
      console.error('Error adding question:', error);
      throw error;
    }
  }

  async seedQuestions(questions) {
    try {
      const connected = await this.connect();
      if (!connected) {
        throw new Error('Failed to connect to MongoDB');
      }

      // Clear existing questions
      await this.collection.deleteMany({});

      // Insert seed questions
      const questionDocuments = questions.map(text => ({
        text: text.trim(),
        createdAt: new Date(),
        updatedAt: new Date()
      }));

      const result = await this.collection.insertMany(questionDocuments);
      console.log(`Seeded ${result.insertedCount} questions`);
      return result.insertedCount;
    } catch (error) {
      console.error('Error seeding questions:', error);
      throw error;
    }
  }
}

export default new MongoDBService(); 