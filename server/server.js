const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = "YOUR_MONGODB_CONNECTION_STRING";

// Full set of original questions for in-memory storage
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
Aren't you 'still haven't find what I look for'
"分享一個同你有關但你其實唔知「到底發生過什麼事」嘅情況？",
"你覺得自己仲會有幾多個「下一位前度」？",
"你覺得「老派約會」尚有無必要？",
"講一個「未開始已經結束」嘅故事？",
"你「夢中的婚禮」係咩樣?",
"你有無一刻覺得自己係「錯誤的宇宙尋找愛」。",
"你同唔同意「愛也許是地上最窮」？",
"你覺得係現實世界可唔可以做到：「真愛是任何形狀，對付百孔千瘡」？",
];

// Try to connect to MongoDB, but don't fail if it's not available
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.log('MongoDB not available, using in-memory storage for testing');
  console.log('To use MongoDB, update the MONGODB_URI in server.js');
});

// Routes
const questionsRoutes = require('./routes/questions');
app.use('/questions', questionsRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Truth or Dare API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
