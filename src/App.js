import React, { useState, useEffect } from 'react';
import { Button, Input, Card, CardContent, ThemeProvider, createTheme, Switch, FormControlLabel, Box } from '@mui/material';

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

// All original questions
const allQuestions = [
  "如果你係一種食物，你會係咩？點解？",
  "你最奇怪嘅夢係咩？",
  "如果你可以變成任何卡通人物，你會揀邊個？",
  "你最尷尬嘅舞步係咩？依家示範比大家睇！",
  "如果你嘅寵物識講嘢，你覺得佢會話咩俾你聽？",
  "你剪過最核突嘅髮型係點樣？有相睇吓嗎？",
  "如果你係一個超級英雄，你嘅超能力會係咩？你嘅弱點呢？",
  "你最鍾意嘅怪異食物配搭係咩？",
  "如果你一世只可以著一隻顏色嘅衫，你會揀咩色？",
  "你最後悔嘅飲醉酒經歷係咩？",
  "如果你可以同任何名人約會，你會揀邊個？點解？",
  "你最唔掂嘅約會經歷係咩？",
  "如果你可以改自己嘅名，你會改成咩名？",
  "你曾經喺公共場合做過最尷尬嘅事係咩？",
  "如果你可以變成任何動物，你會揀變成咩？點解？",
  "你最奇怪嘅習慣係咩？",
  "如果你一世只可以食一樣嘢，你會揀咩？",
  "你唱過最難聽嘅卡拉OK係咩歌？而家唱一段！",
  "如果你可以同歷史上嘅任何人食飯，你會揀邊個？你會問佢咩問題？",
  "你講過最離譜嘅大話係咩？",
  "如果你可以即時學識一種技能，你會揀咩？",
  "你做過最幼稚嘅事係咩？",
  "如果你可以變成任何電影角色，你會揀邊個？",
  "你出街最唔掂嘅打扮係點？",
  "如果你可以同任何虛構人物做朋友，你會揀邊個？",
  "你最鍾意嘅尷尬笑話係咩？而家講俾大家聽！",
  "如果你唔使瞓覺，你會用嗰啲多出嚟嘅時間做咩？",
  "你收集過最奇怪嘅嘢係咩？",
  "如果你可以成為任何名人嘅助理一天，你會揀邊個？點解？",
  "你煮過最失敗嘅食物係咩？",
  "如果你可以同任何動物交換一日，你會揀咩動物？",
  "你最奇怪嘅幸運物係咩？",
  "如果你一世只可以聽一首歌，你會揀咩歌？",
  "你喺網購做過最尷尬嘅事係咩？",
  "如果你係一種調味料，你會係咩？點解？",
  "你自拍過最核突嘅相係點樣？比大家睇吓！",
  "如果你一世只可以保持一個表情，你會揀咩表情？",
  "你有咩奇怪嘅天賦？而家示範俾大家睇！",
  "如果你可以同任何傢俬交換一日，你會揀咩？點解？",
  "你做過最失敗嘅DIY項目係咩？",
  "如果你可以變成一種交通工具，你會揀咩？點解？",
  "你出過最尷尬嘅Social Media Post係咩？",
  "如果你一世只可以用一個Emoji，你會揀邊個？",
  "你最奇怪嘅夢想工作係咩？",
  "如果你一世只可以睇一類型嘅電影，你會揀咩類型？",
  "你理髮最慘嘅經歷係咩？",
  "如果你可以變成一種水果，你會揀咩？點解？",
  "你寫過最尷尬嘅卡片內容係咩？",
  "如果你一世只可以玩一隻遊戲，你會揀咩？",
  "你最尷尬嘅戀愛經歷係咩？",
  "你試過喺公眾地方做過最瘋狂嘅事係咩？",
  "你會願意為錢做一啲羞恥嘅事嗎？如果會，係咩？",
  "你對一夜情有咩睇法？",
  "你曾經最尷尬嘅網上搜尋係咩？",
  "你覺得自己最「痴線」嘅性格係咩？",
  "你有冇試過鍾意你朋友嘅另一半？",
  "你有冇試過鍾意過一個唔應該鍾意嘅人？",
  "你曾經做過最唔負責任嘅事係咩？",
  "你覺得係咪有啲話題永遠唔應該同父母討論？",
  "你最怕另一半知你咩秘密？",
  "你試過拒絕一個你其實有興趣嘅人嗎？點解？",
  "你試過同幾個人同時有曖昧關係？",
  "你最荒唐嘅愛情經歷係咩？",
  "你覺得自己係咪一個醋王？",
  "你有冇試過喺社交平台上話自己單身，但其實有另一半？",
  "你覺得你最無法接受另一半做咩行為？",
  "你試過用邊種離譜嘅藉口甩底？",
  "你試過冇錢時做過最奇怪嘅事係咩？",
  "你有冇試過講一啲後悔講出口嘅說話？",
  "你覺得自己對異性係咪有過度幻想？",
  "你會唔會考慮同年紀大好多嘅人拍拖？",
  "你最尷尬嘅曖昧訊息係咩？",
  "你有冇試過幻想同某個朋友嘅另一半發展關係？",
  "你曾經最「狼死」嘅行為係咩？",
  "你最冇辦法原諒自己嘅一件事係咩？",
  "你有冇試過用朋友嘅秘密去威脅佢？",
  "你有無試過暗戀一個老師？",
  "你曾經最失禮嘅事係咩？",
  "你曾經最尷尬嘅性幻想係咩？",
  "你最瘋狂嘅夢想係咩？",
  "你有冇曾經覺得自己拍緊一段錯誤嘅拖？",
  "你最想同邊個朋友「絕交」但又唔敢？",
  "你有無試過偷偷鍾意自己嘅同學／同事？",
  "你最難忘嘅約會係點？",
  "你覺得喺戀愛入面最重要嘅係咩？",
  "你試過暗戀過一個完全唔識嘅陌生人？",
  "你有冇試過為咗戀愛而放棄朋友？",
  "你覺得自己係咪一個好容易會妒忌人地嘅人？",
  "你最癲嘅生日慶祝係點？",
  "你試過鍾意一個人幾耐先放手？",
  "你覺得有咩嘢係你應該話俾屋企人知但一直唔敢講？",
  "你有冇試過大庭廣眾之下認錯人？最尷尬嘅一次係點？",
  "你覺得自己嘅初戀/暗戀係幸福定係災難？",
  "你覺得自己最搞笑嘅一個癖好係咩？",
  "你有冇試過同一個人拖拖拉拉好多次？",
  "你有無好心做錯事嘅經歷？",
  "你有冇試過話人哋係你朋友但其實心入面唔係咁認為？",
  "你有冇試過懷疑自己係唔係同性戀？",
  "你有冇試過瞞住大家做咗一件自己覺得好有趣嘅事？",
  "你試過講過最假嘅藉口係咩？",
  "你覺得自己最想改變嘅一個缺點係咩？"
];

const TruthOrDareGenerator = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [themeMode, setThemeMode] = useState('dark');

  // Load questions from localStorage or use default questions
  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = () => {
    try {
      setLoading(true);
      
      // Try to load questions from localStorage
      const savedQuestions = localStorage.getItem('truth-or-dare-questions');
      
      if (savedQuestions) {
        const parsedQuestions = JSON.parse(savedQuestions);
        setQuestions(parsedQuestions);
        console.log('Loaded questions from localStorage');
      } else {
        // Use default questions and save to localStorage
        setQuestions(allQuestions);
        localStorage.setItem('truth-or-dare-questions', JSON.stringify(allQuestions));
        console.log('Using default questions and saving to localStorage');
      }
      
      setError(null);
    } catch (err) {
      console.error('Error loading questions:', err);
      setQuestions(allQuestions);
      setError('Error loading saved questions. Using default questions.');
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

  const addNewQuestion = () => {
    if (newQuestion.trim() !== "") {
      try {
        const updatedQuestions = [...questions, newQuestion.trim()];
        setQuestions(updatedQuestions);
        
        // Save to localStorage
        localStorage.setItem('truth-or-dare-questions', JSON.stringify(updatedQuestions));
        
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
      <Box 
        sx={{ 
          minHeight: '100vh', 
          bgcolor: 'background.default', 
          transition: 'background 0.3s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: { xs: 2, sm: 3, md: 4 },
          boxSizing: 'border-box',
          position: 'relative'
        }}
      >
        <Card 
          sx={{ 
            width: '100%',
            maxWidth: { xs: '100%', sm: 450, md: 500 },
            backgroundColor: 'background.paper',
            borderRadius: { xs: 3, sm: 4 },
            boxShadow: { xs: '0 8px 32px rgba(0,0,0,0.1)', sm: '0 12px 40px rgba(0,0,0,0.15)', md: '0 16px 48px rgba(0,0,0,0.2)' },
            border: '1px solid',
            borderColor: themeMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            backdropFilter: 'blur(10px)',
            animation: 'fadeInUp 0.6s ease-out'
          }}
        >
          <CardContent sx={{ 
            padding: { xs: 4, sm: 5 },
            '&:last-child': { paddingBottom: { xs: 4, sm: 5 } }
          }}>
            {/* Header Section */}
            <div style={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between', 
              alignItems: { xs: 'center', sm: 'center' }, 
              marginBottom: { xs: 4, sm: 5 },
              gap: { xs: 3, sm: 0 }
            }}>
              <div style={{ textAlign: { xs: 'center', sm: 'left' } }}>
                <h1 style={{ 
                  color: themeMode === 'dark' ? 'white' : '#1a1a1a', 
                  margin: 0,
                  fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                  fontWeight: 700,
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em'
                }}>
                  廣東話真心話
                </h1>
                <p style={{
                  color: themeMode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
                  margin: '8px 0 0 0',
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  fontWeight: 400
                }}>
                  問題生成器
                </p>
              </div>
              <FormControlLabel
                control={
                  <Switch 
                    checked={themeMode === 'dark'} 
                    onChange={handleThemeToggle} 
                    color="primary"
                    sx={{
                      '& .MuiSwitch-switchBase': {
                        color: themeMode === 'dark' ? '#fff' : '#1976d2',
                      },
                      '& .MuiSwitch-track': {
                        backgroundColor: themeMode === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(25,118,210,0.3)',
                      }
                    }}
                  />
                }
                label={themeMode === 'dark' ? '🌙 夜間' : '☀️ 日間'}
                labelPlacement="start"
                sx={{ 
                  margin: 0,
                  color: themeMode === 'dark' ? 'white' : '#1a1a1a',
                  fontWeight: 500,
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              />
            </div>
            
            {/* Loading State */}
            {loading && (
              <Box sx={{ 
                textAlign: 'center', 
                py: 3,
                animation: 'pulse 1.5s ease-in-out infinite'
              }}>
                <p style={{ 
                  color: themeMode === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)', 
                  fontSize: { xs: '0.95rem', sm: '1rem' },
                  margin: 0
                }}>
                  ⏳ 載入問題中...
                </p>
              </Box>
            )}
            
            {/* Error State */}
            {error && (
              <Box sx={{ 
                textAlign: 'center', 
                py: 2,
                mb: 3,
                backgroundColor: themeMode === 'dark' ? 'rgba(255,107,107,0.1)' : 'rgba(255,107,107,0.05)',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'rgba(255,107,107,0.3)'
              }}>
                <p style={{ 
                  color: '#ff6b6b', 
                  fontSize: { xs: '0.85rem', sm: '0.9rem' },
                  margin: 0,
                  fontWeight: 500
                }}>
                  ⚠️ {error}
                </p>
              </Box>
            )}
            
            {/* Generate Button */}
            <Button
              variant="contained"
              onClick={generateQuestion}
              fullWidth
              disabled={loading}
              sx={{ 
                marginBottom: 4,
                padding: { xs: 2, sm: 2.5 },
                fontSize: { xs: '1.1rem', sm: '1.2rem' },
                fontWeight: 600,
                backgroundColor: themeMode === 'dark' ? '#fff' : '#1976d2',
                color: themeMode === 'dark' ? '#1a1a1a' : '#fff',
                borderRadius: 3,
                textTransform: 'none',
                boxShadow: themeMode === 'dark' 
                  ? '0 4px 20px rgba(255,255,255,0.2)' 
                  : '0 4px 20px rgba(25,118,210,0.3)',
                '&:hover': { 
                  backgroundColor: themeMode === 'dark' ? '#f0f0f0' : '#1565c0',
                  transform: 'translateY(-2px)',
                  boxShadow: themeMode === 'dark' 
                    ? '0 6px 25px rgba(255,255,255,0.3)' 
                    : '0 6px 25px rgba(25,118,210,0.4)'
                },
                '&:active': {
                  transform: 'translateY(0)'
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              🎲 生成問題
            </Button>
            
            {/* Question Display */}
            {currentQuestion && (
              <Card 
                variant="outlined" 
                sx={{ 
                  marginBottom: 4, 
                  padding: { xs: 3, sm: 4 },
                  backgroundColor: themeMode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(25,118,210,0.05)', 
                  color: themeMode === 'dark' ? 'white' : '#1a1a1a',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: themeMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(25,118,210,0.2)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  animation: 'slideInUp 0.5s ease-out'
                }}
              >
                <p style={{ 
                  margin: 0,
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  lineHeight: 1.6,
                  textAlign: 'center',
                  fontWeight: 500
                }}>
                  💭 {currentQuestion}
                </p>
              </Card>
            )}
            
            {/* Add Question Section */}
            <Box sx={{ 
              backgroundColor: themeMode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
              borderRadius: 3,
              padding: { xs: 3, sm: 4 },
              border: '1px solid',
              borderColor: themeMode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
            }}>
              <h3 style={{
                color: themeMode === 'dark' ? 'white' : '#1a1a1a',
                margin: '0 0 16px 0',
                fontSize: { xs: '1.1rem', sm: '1.2rem' },
                fontWeight: 600,
                textAlign: 'center'
              }}>
                ➕ 添加新問題
              </h3>
              <div style={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 2, sm: 2 },
                marginBottom: 2
              }}>
                <Input
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="輸入你的問題..."
                  fullWidth
                  disabled={loading}
                  sx={{ 
                    color: themeMode === 'dark' ? 'white' : '#1a1a1a',
                    fontSize: { xs: '0.95rem', sm: '1rem' },
                    '&:before': { borderBottomColor: themeMode === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' },
                    '&:after': { borderBottomColor: themeMode === 'dark' ? '#fff' : '#1976d2' },
                    '&:hover:before': { borderBottomColor: themeMode === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }
                  }}
                />
                <Button
                  variant="contained"
                  onClick={addNewQuestion}
                  disabled={loading || newQuestion.trim() === ""}
                  sx={{ 
                    backgroundColor: themeMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(25,118,210,0.1)',
                    color: themeMode === 'dark' ? 'white' : '#1976d2',
                    minWidth: { xs: '100%', sm: 'auto' },
                    padding: { xs: 1.5, sm: 2 },
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 500,
                    border: '1px solid',
                    borderColor: themeMode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(25,118,210,0.2)',
                    '&:hover': { 
                      backgroundColor: themeMode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(25,118,210,0.2)',
                      transform: 'translateY(-1px)'
                    },
                    '&:disabled': {
                      opacity: 0.5,
                      transform: 'none'
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  添加
                </Button>
              </div>
            </Box>
            
            {/* Footer */}
            <Box sx={{ 
              textAlign: 'center', 
              mt: 4,
              pt: 3,
              borderTop: '1px solid',
              borderColor: themeMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
            }}>
              <p style={{ 
                color: themeMode === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)', 
                fontSize: { xs: '0.8rem', sm: '0.85rem' }, 
                margin: 0,
                fontWeight: 500
              }}>
                📊 總問題數: {questions.length} (本地儲存)
              </p>
            </Box>
          </CardContent>
        </Card>
      </Box>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </ThemeProvider>
  );
};

export default TruthOrDareGenerator;