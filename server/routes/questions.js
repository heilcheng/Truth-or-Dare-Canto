const express = require('express');
const router = express.Router();
const Question = require('../models/question.model');

// In-memory storage for testing when MongoDB is not available
let inMemoryQuestions = [
"你覺得男朋友唔浪漫算唔算一種罪？",
"分享一次你「至少做一件離譜的事」經歷",
"分享三個無血緣關係，而確實係最重要嘅「緊急聯絡人」。",
"咩情況下你會想「可不可以沒禮拜六沒禮拜日又一週」。",
"情境圖：Could you 'love the way you lie'? Who and how?",
"Have you ever 'found love in a hopeless place'?",
"「時光倒流一句話」，你會想同十年前自己講咩？",
"分享一下你「最佳損友」係邊個，試問依位損友做過d咩？",
"宜家係「懷舊金曲之夜」，你最中意邊首陳年舊曲？唱出黎！",
"分享一次做「電燈膽」嘅經驗，自己或者朋友都得！",
"情境圖：如果「今晚也不歸家找一個人」，你最想搵邊個？",
"Name someone that you want him/her to 'Call Me by Your Name',",
"Name a 'Somebody That I Used to Know',",
"分享最上一個「無題時想起的人」，點解會想起？",
"分享一個同你有關但你其實唔知「到底發生過什麼事」嘅情況？",
"你覺得自己仲會有幾多個「下一位前度」？",
"你覺得「老派約會」尚有無必要？",
"講一個「未開始已經結束」嘅故事？",
"你「夢中的婚禮」係咩樣?",
"你有無一刻覺得自己係「錯誤的宇宙尋找愛」。",
"你同唔同意「愛也許是地上最窮」？",
"你覺得係現實世界可唔可以做到：「真愛是任何形狀，對付百孔千瘡」？"
];

// GET /questions - Get all questions
router.get('/', async (req, res) => {
  try {
    // Try to use MongoDB first
    const questions = await Question.find({}).sort({ createdAt: -1 });
    res.json(questions);
  } catch (error) {
    // Fallback to in-memory storage
    console.log('Using in-memory storage for questions');
    const questions = inMemoryQuestions.map((text, index) => ({
      _id: `mem_${index}`,
      text: text,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    res.json(questions);
  }
});

// POST /questions/add - Add a new question
router.post('/add', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || text.trim() === '') {
      return res.status(400).json({ message: 'Question text is required' });
    }

    // Try to use MongoDB first
    const newQuestion = new Question({ text: text.trim() });
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    // Fallback to in-memory storage
    console.log('Using in-memory storage for adding question');
    const newQuestion = {
      _id: `mem_${Date.now()}`,
      text: text.trim(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    inMemoryQuestions.push(text.trim());
    res.status(201).json(newQuestion);
  }
});

module.exports = router; 
