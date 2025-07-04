import React, { useState, useEffect } from 'react';
import { Button, Input, Card, CardContent, ThemeProvider, createTheme, Switch, FormControlLabel, Box } from '@mui/material';
import axios from 'axios';

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

const TruthOrDareGenerator = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [themeMode, setThemeMode] = useState('dark');

  // Fetch questions from the API when component mounts
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5001/questions/');
      const questionTexts = response.data.map(question => question.text);
      setQuestions(questionTexts);
      setError(null);
    } catch (err) {
      console.error('Error fetching questions:', err);
      setError('Failed to load questions. Please check if the server is running.');
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
        const response = await axios.post('http://localhost:5001/questions/add', {
          text: newQuestion.trim()
        });
        // Add the new question to the local state
        setQuestions([...questions, response.data.text]);
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
              Total Questions: {questions.length}
            </p>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default TruthOrDareGenerator;