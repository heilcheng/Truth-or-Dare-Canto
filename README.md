# Truth or Dare - Cantonese Edition

A React application for generating Cantonese "Truth or Dare" questions, perfect for GitHub Pages deployment.

## Features

- 🎲 Random question generator with 101 original Cantonese questions
- ➕ Add custom questions (saved in browser localStorage)
- 🎨 Modern dark/light theme toggle
- 📱 Responsive design
- 🌐 Works perfectly on GitHub Pages
- 💾 Persistent storage using browser localStorage

## Quick Start

### **Deploy to GitHub Pages**

1. **Clone and install dependencies**
   ```bash
   git clone https://github.com/heilcheng/Truth-or-Dare-Canto.git
   cd Truth-or-Dare-Canto
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
│   ├── App.css         # Styles
│   └── index.js        # App entry point
├── public/             # Static assets
└── package.json        # Dependencies and scripts
```

## Features

### **Question Management**
- 📊 Shows total question count
- ➕ Add custom questions (persisted in localStorage)
- 🎲 Random question generation
- 💾 Data persistence across browser sessions
- 🔄 101 original Cantonese questions included

### **Theme Support**
- 🌙 Dark mode (default)
- ☀️ Light mode
- 🔄 Toggle between themes
- 🎨 Smooth transitions

### **Storage**
- 💾 Uses browser localStorage for persistence
- 🔄 Automatically loads saved questions
- 📱 Works offline
- 🌐 No server required

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
- No environment variables needed
- No database setup required
- Works completely offline
- Perfect for GitHub Pages

## How It Works

1. **Initial Load**: App loads with 101 original Cantonese questions
2. **Local Storage**: Questions are saved to browser's localStorage
3. **Custom Questions**: New questions are added to localStorage
4. **Persistence**: Questions persist across browser sessions
5. **Offline**: Works completely offline

## Advantages of This Approach

### **For GitHub Pages**
- ✅ **No backend required** - GitHub Pages only supports static sites
- ✅ **No database setup** - Uses browser localStorage
- ✅ **Instant deployment** - Just push to GitHub
- ✅ **Free hosting** - GitHub Pages is completely free
- ✅ **Global CDN** - Fast loading worldwide

### **For Users**
- ✅ **Works offline** - No internet required after first load
- ✅ **Fast loading** - No API calls needed
- ✅ **Private data** - Questions stored locally on user's device
- ✅ **No accounts** - No registration required

## Troubleshooting

### **GitHub Pages Issues**
1. **Ensure homepage** is set correctly in `package.json`
2. **Check build output** in `build/` folder
3. **Verify gh-pages** dependency is installed
4. **Check GitHub Pages settings** in repository

### **Local Storage Issues**
1. **Check browser console** for localStorage errors
2. **Verify browser supports** localStorage
3. **Check storage quota** if many questions added
4. **Try incognito mode** to test fresh state

## Security & Privacy

- ✅ **No data sent to servers** - Everything stays local
- ✅ **No tracking** - No analytics or user tracking
- ✅ **Private by default** - Questions only visible to user
- ✅ **No accounts** - No personal data collected

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Future Enhancements

- 🔄 **Cloud sync** - Optional cloud storage for questions
- 📱 **PWA support** - Install as mobile app
- 🎨 **More themes** - Additional color schemes
- 📊 **Statistics** - Question usage analytics
- 🌐 **Multi-language** - Support for other languages

## License

This project is open source and available under the [MIT License](LICENSE).
