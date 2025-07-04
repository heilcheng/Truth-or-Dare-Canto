import React, { useState, useEffect } from 'react';
import { Button, Input, Card, CardContent, ThemeProvider, createTheme, Switch, FormControlLabel, Box } from '@mui/material';
import mongodbService from './services/mongodbService';

const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#000000' : '#1976d2',
    },
    background: {
      default: mode === 'dark' ? '#121212' : '#fafafa',
      paper: mode === 'dark' ? '#1E1E1E' : '#fff',
    },
  },
});

// Fallback questions if MongoDB is not available
const fallbackQuestions = [
  "如果你係一種食物，你會係咩？點解？",
  "你最奇怪嘅夢係咩？",
  "如果你可以變成任何卡通人物，你會揀邊個？",
  "你最尷尬嘅舞步係咩？依家示範比大家睇！",
  "如果你嘅寵物識講嘢，你覺得佢會話咩俾你聽？",
  "你剪過最核突嘅髮型係點樣？有相睇吓嗎？",
  "如果你係一個超級英雄，你嘅超能力會係咩？你嘅弱點呢？",
  "你最鍾意嘅怪異食物配搭係咩？",
  "如果你一世只可以著一隻顏色嘅衫，你會揀咩色？",
  "你最後悔嘅飲醉酒經歷係咩？"
];

const TruthOrDareGenerator = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [themeMode, setThemeMode] = useState('dark');
  const [usingMongoDB, setUsingMongoDB] = useState(false);

  // Fetch questions from MongoDB or fallback
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      
      // Try to connect to MongoDB Atlas
      const mongoQuestions = await mongodbService.getAllQuestions();
      
      if (mongoQuestions && mongoQuestions.length > 0) {
        const questionTexts = mongoQuestions.map(question => question.text);
        setQuestions(questionTexts);
        setUsingMongoDB(true);
        setError(null);
        console.log('Using MongoDB Atlas');
      } else {
        // If no questions in MongoDB, seed them
        await mongodbService.seedQuestions(fallbackQuestions);
        setQuestions(fallbackQuestions);
        setUsingMongoDB(true);
        setError(null);
        console.log('Seeded questions to MongoDB Atlas');
      }
    } catch (err) {
      console.log('MongoDB not available, using fallback questions');
      setQuestions(fallbackQuestions);
      setUsingMongoDB(false);
      setError('MongoDB not configured. Using local questions. To enable database, update src/config/db.js');
    } finally {
      setLoading(false);
    }
  };

  const generateQuestion = () => {
    if (questions.length === 0) {
      setCurrentQuestion("No questions available. Please add some questions first!");
      return;
    }
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
  };

  const addNewQuestion = async () => {
    if (newQuestion.trim() !== "") {
      try {
        if (usingMongoDB) {
          // Add to MongoDB
          const response = await mongodbService.addQuestion(newQuestion.trim());
          setQuestions([...questions, response.text]);
        } else {
          // Add to local state only
          setQuestions([...questions, newQuestion.trim()]);
        }
        
        setNewQuestion("");
        setError(null);
      } catch (err) {
        console.error('Error adding question:', err);
        setError('Failed to add question. Please try again.');
      }
    }
  };

  const handleThemeToggle = () => {
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const theme = getTheme(themeMode);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', transition: 'background 0.3s' }}>
        <Card sx={{ maxWidth: 400, margin: 'auto', marginTop: 2, backgroundColor: 'background.paper' }}>
          <CardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <h2 style={{ color: themeMode === 'dark' ? 'white' : '#222', margin: 0 }}>廣東話真心話問題生成器</h2>
              <FormControlLabel
                control={<Switch checked={themeMode === 'dark'} onChange={handleThemeToggle} color="primary" />}
                label={themeMode === 'dark' ? '夜間' : '日間'}
                labelPlacement="start"
                sx={{ marginLeft: 1, color: themeMode === 'dark' ? 'white' : '#222' }}
              />
            </div>
            
            {loading && (
              <p style={{ color: themeMode === 'dark' ? 'white' : '#222', textAlign: 'center' }}>Loading questions...</p>
            )}
            
            {error && (
              <p style={{ color: '#ff6b6b', textAlign: 'center', fontSize: '14px' }}>{error}</p>
            )}
            
            <Button
              variant="contained"
              onClick={generateQuestion}
              fullWidth
              disabled={loading}
              sx={{ marginBottom: 2, backgroundColor: themeMode === 'dark' ? 'black' : 'primary.main', '&:hover': { backgroundColor: themeMode === 'dark' ? '#333' : '#1565c0' } }}
            >
              生成問題
            </Button>
            
            {currentQuestion && (
              <Card variant="outlined" sx={{ marginBottom: 2, padding: 2, backgroundColor: themeMode === 'dark' ? '#2C2C2C' : '#f5f5f5', color: themeMode === 'dark' ? 'white' : '#222' }}>
                <p>{currentQuestion}</p>
              </Card>
            )}
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <Input
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="輸入新問題"
                fullWidth
                disabled={loading}
                sx={{ color: themeMode === 'dark' ? 'white' : '#222', '&:before': { borderBottomColor: themeMode === 'dark' ? 'white' : '#222' } }}
              />
              <Button
                variant="contained"
                onClick={addNewQuestion}
                disabled={loading || newQuestion.trim() === ""}
                sx={{ backgroundColor: themeMode === 'dark' ? 'black' : 'primary.main', '&:hover': { backgroundColor: themeMode === 'dark' ? '#333' : '#1565c0' } }}
              >
                添加
              </Button>
            </div>
            
            <p style={{ color: themeMode === 'dark' ? 'white' : '#222', fontSize: '12px', textAlign: 'center', marginTop: '10px' }}>
              Total Questions: {questions.length} {usingMongoDB ? '(MongoDB)' : '(Local)'}
            </p>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default TruthOrDareGenerator;