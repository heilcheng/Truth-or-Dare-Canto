import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#000000',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
});

const initialQuestions = [
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
  "你覺得自己最想改變嘅一個缺點係咩？",

];

const TruthOrDareGenerator = () => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [newQuestion, setNewQuestion] = useState("");

  useEffect(() => {
    setQuestions(initialQuestions);
  }, []);

  const generateQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
  };

  const addNewQuestion = () => {
    if (newQuestion.trim() !== "") {
      setQuestions([...questions, newQuestion]);
      setNewQuestion("");
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Card sx={{ maxWidth: 400, margin: 'auto', marginTop: 2, backgroundColor: 'background.paper' }}>
        <CardContent>
          <h2 style={{ color: 'white' }}>廣東話真心話問題生成器</h2>
          <Button 
            variant="contained" 
            onClick={generateQuestion}
            fullWidth
            sx={{ marginBottom: 2, backgroundColor: 'black', '&:hover': { backgroundColor: '#333' } }}
          >
            生成問題
          </Button>
          
          {currentQuestion && (
            <Card variant="outlined" sx={{ marginBottom: 2, padding: 2, backgroundColor: '#2C2C2C', color: 'white' }}>
              <p>{currentQuestion}</p>
            </Card>
          )}
          
          <div style={{ display: 'flex', gap: '8px' }}>
            <Input
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="輸入新問題"
              fullWidth
              sx={{ color: 'white', '&:before': { borderBottomColor: 'white' } }}
            />
            <Button 
              variant="contained" 
              onClick={addNewQuestion}
              sx={{ backgroundColor: 'black', '&:hover': { backgroundColor: '#333' } }}
            >
              添加
            </Button>
          </div>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default TruthOrDareGenerator;